import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from behave import given, when, then, step
import time
import os
import requests

BASE_URL = "http://localhost:3000"

def perform_login(context, email="barimbingpilemon@gmail.com", password="Password123*"):
    try:
        if not hasattr(context, 'driver') or not context.driver:
            options = uc.ChromeOptions()
            options.add_argument('--no-sandbox')
            options.add_argument('--disable-dev-shm-usage')
            options.add_argument('--start-maximized')
            context.driver = uc.Chrome(options=options)
            context.driver.maximize_window()
        
        context.driver.get(f"{BASE_URL}/auth/login")
        WebDriverWait(context.driver, 20).until( 
             EC.presence_of_element_located((By.XPATH, "//button[normalize-space()='Login']"))
        )

        email_field = context.driver.find_element(By.NAME, "email")
        email_field.clear()
        email_field.send_keys(email)
        
        password_field = context.driver.find_element(By.NAME, "password")
        password_field.clear()
        password_field.send_keys(password)
        
        login_button = context.driver.find_element(By.XPATH, "//button[normalize-space()='Login']")
        login_button.click()
        
        WebDriverWait(context.driver, 20).until(
            EC.url_contains("/dashboard")
        )
        
    except Exception as e:
        raise

def create_dummy_file(filename):
    filepath = os.path.abspath(os.path.join(os.getcwd(), filename))
    if not os.path.exists(filepath):
        try:
            with open(filepath, "w") as f:
                f.write("This is a dummy file for testing.")
        except Exception as e:
            raise
    return filepath


@given('I am logged in as a user')
def step_impl_logged_in_user(context):
    perform_login(context)

@given('A content with ID "{post_id}" exists and is displayed')
def step_impl_dummy_content(context, post_id):
    context.last_post_id = post_id
    
@given('I am NOT logged in as a user')
def step_impl_not_logged_in(context):
    if hasattr(context, 'driver') and context.driver:
        context.driver.delete_all_cookies() # Bersihkan sesi
    else:
        options = uc.ChromeOptions()
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--start-maximized')
        context.driver = uc.Chrome(options=options)
        context.driver.maximize_window()


@when('I am on "{url}"')
def step_impl_open_page(context, url):
    if not hasattr(context, 'driver') or not context.driver:
        options = uc.ChromeOptions()
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--start-maximized')
        context.driver = uc.Chrome(options=options)
        context.driver.maximize_window()
        
    try:
        context.driver.get(f"{BASE_URL}{url}")
        WebDriverWait(context.driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )
        time.sleep(1)
    except Exception as e:
        raise

@then('I should be on "{page_path}"')
@then(u'The page should redirect to "{page_path}"')
def step_impl_should_be_on(context, page_path):
    try:
        WebDriverWait(context.driver, 10).until(
            EC.url_contains(page_path)
        )
        current_url = context.driver.current_url
        assert page_path in current_url
    except Exception:
        current_url = context.driver.current_url
        raise AssertionError(f"Expected URL to contain '{page_path}', but was on '{current_url}'")


# --- TOGGLE LIKE STEPS ---

@given('I note the initial like count for "{post_id}"')
def step_impl_note_initial_count(context, post_id):
    try:
        xpath_count = f"//button[contains(@class, 'hover:text-red-500')]//span"
        
        count_element = WebDriverWait(context.driver, 5).until(
            EC.presence_of_element_located((By.XPATH, xpath_count))
        )
        context.initial_like_count = int(count_element.text.strip())
        
    except Exception as e:
        raise AssertionError(f"Failed to read initial like count: {e}")

@when('I click the heart icon for content with ID "{post_id}"')
@when('I attempt to click the heart icon for content with ID "{post_id}"')
def step_impl_click_like_button(context, post_id):
    try:
        xpath_post_feed = f"//div[@key='{post_id}']//button[contains(@class, 'hover:text-red-500')]"
        xpath_general = f"//button[contains(@class, 'hover:text-red-500')]//i[contains(@class, 'fa-heart')]/parent::button"
        
        try:
            like_button = WebDriverWait(context.driver, 5).until(
                EC.element_to_be_clickable((By.XPATH, xpath_post_feed))
            )
        except:
            like_button = WebDriverWait(context.driver, 5).until(
                EC.element_to_be_clickable((By.XPATH, xpath_general))
            )
            
        context.driver.execute_script("arguments[0].scrollIntoView(true);", like_button)
        like_button.click()
        time.sleep(2) 
        
    except Exception as e:
        pass 

@then('The heart icon for "{post_id}" should be "{color}" and "{style}"')
def step_impl_verify_heart_icon(context, post_id, color, style):
    try:
        style_class = f"fa-{style}"
        
        xpath_post_feed = f"//div[@key='{post_id}']//button[contains(@class, 'hover:text-red-500')]//i"
        xpath_general = f"//button[contains(@class, 'hover:text-red-500')]//i"
            
        try:
            icon = WebDriverWait(context.driver, 5).until(
                EC.presence_of_element_located((By.XPATH, xpath_post_feed))
            )
        except:
            icon = WebDriverWait(context.driver, 5).until(
                EC.presence_of_element_located((By.XPATH, xpath_general))
            )
        
        class_attr = icon.get_attribute("class")
        
        assert style_class in class_attr
        
        if color == "red":
            assert "text-red-500" in class_attr
        elif color == "grey":
            assert "text-red-500" not in class_attr 

    except Exception as e:
        raise AssertionError("Heart icon state verification failed.")

@then('The like count for "{post_id}" should be increased by 1')
def step_impl_verify_like_count_increased(context, post_id):
    expected_count = context.initial_like_count + 1
    step_impl_verify_like_count_generic(context, post_id, expected_count)

@then('The like count for "{post_id}" should be decreased by 1')
def step_impl_verify_like_count_decreased(context, post_id):
    expected_count = context.initial_like_count - 1
    step_impl_verify_like_count_generic(context, post_id, expected_count)

@then(u'The like count for "{post_id}" should remain {expected_count:d}')
def step_impl_verify_like_count_remain(context, post_id, expected_count):
    step_impl_verify_like_count_generic(context, post_id, expected_count)


def step_impl_verify_like_count_generic(context, post_id, expected_count):
    try:
        xpath_count = f"//button[contains(@class, 'hover:text-red-500')]//span[normalize-space()='{expected_count}']" 

        count_element = WebDriverWait(context.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, xpath_count))
        )
        
        actual_count = int(count_element.text.strip())
        assert actual_count == expected_count

    except Exception as e:
        raise AssertionError("Relative like count verification failed.")
        