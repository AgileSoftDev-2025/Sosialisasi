import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from behave import given, when, then, step
import time
import os

BASE_URL = "http://localhost:3000"

# --- LOGIN HELPER ---
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
        WebDriverWait(context.driver, 15).until(
             EC.element_to_be_clickable((By.NAME, "password"))
        )

        email_field = context.driver.find_element(By.NAME, "email")
        email_field.clear()
        email_field.send_keys(email)
        
        password_field = context.driver.find_element(By.NAME, "password")
        password_field.clear()
        password_field.send_keys(password)
        
        login_button = context.driver.find_element(By.XPATH, "//button[normalize-space()='Login']")
        login_button.click()
        
        WebDriverWait(context.driver, 15).until(
            EC.url_contains("/dashboard")
        )
        
        print(f"\n[Debug] Successfully logged in as {email} and redirected to dashboard.")
        
    except Exception as e:
        print(f"[Error] Login failed: {e}")
        if hasattr(context, 'driver') and context.driver:
            context.driver.save_screenshot("login_failure.png") 
        raise

# --- STEPS IMPLEMENTATION ---

@given('I am logged in as a user')
def step_impl_logged_in_user(context):
    perform_login(context)

@step('I am on "{url}"')
def step_impl_open_page(context, url):
    try:
        context.driver.get(f"{BASE_URL}{url}")
        WebDriverWait(context.driver, 15).until(
            EC.presence_of_element_located((By.XPATH, "//div[contains(@class, 'rounded-lg bg-white')]"))
        )
        print(f"\n[Debug] Navigated to {url}")
    except Exception as e:
        print(f"Failed to load page {url}: {e}")
        raise

@when('I press the comment icon on the first post')
def step_impl_press_comment_icon(context):
    try:
        xpath = "(//button[.//i[contains(@class, 'fa-comment')]])[1]"
        button = WebDriverWait(context.driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, xpath))
        )
        context.driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", button)
        time.sleep(1)
        button.click()
        print(f"\n[Debug] Pressed comment toggle button on the first post")
        
        WebDriverWait(context.driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//textarea[@placeholder='Write a Comment']"))
        )
    except Exception as e:
        print(f"Error pressing comment icon: {e}")
        context.driver.save_screenshot("fail_press_comment_icon.png")
        raise

# Menangani input normal
@when('I fill in the comment area with "{value}"')
def step_impl_fill_comment_area(context, value):
    _fill_comment_logic(context, value)

# Menangani input kosong ("") yang sebelumnya error
@when('I fill in the comment area with ""')
def step_impl_fill_empty_comment(context):
    _fill_comment_logic(context, "")

def _fill_comment_logic(context, value):
    try:
        xpath = "//textarea[@placeholder='Write a Comment']"
        field_input = WebDriverWait(context.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, xpath))
        )
        
        field_input.clear()
        if value:
            field_input.send_keys(value)
        else:
            # Jika kosong, kita kirim backspace atau clear saja untuk memicu event react
            field_input.send_keys("a")
            field_input.send_keys("\b") 
        
        # Trigger event input manual agar state React terbaca
        context.driver.execute_script("arguments[0].dispatchEvent(new Event('input', { bubbles: true }));", field_input)
        
        print(f"\n[Debug] Filled comment area with '{value}'")
    except Exception as e:
        print(f"Error filling in comment area: {e}")
        context.driver.save_screenshot("fail_fill_comment.png")
        raise

@when('I press "{button_text}"')
def step_impl_press_button(context, button_text):
    try:
        xpath = f"//button[contains(., '{button_text}')]"
        button = WebDriverWait(context.driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, xpath))
        )
        context.driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", button)
        time.sleep(1)
        button.click()
        
        # Jika tombol send, tunggu sebentar agar komentar muncul
        if "Send" in button_text:
            time.sleep(3) 
            
        print(f"\n[Debug] Pressed button '{button_text}'")
    except Exception as e:
        print(f"Error pressing button '{button_text}': {e}")
        context.driver.save_screenshot(f"fail_press_{button_text}.png")
        raise

@then('I should see "{content}"')
def step_impl_should_see(context, content):
    try:
        time.sleep(1) 
        xpath = f"//*[contains(text(), '{content}')]"
        element = WebDriverWait(context.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, xpath))
        )
        context.driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", element)
        assert element.is_displayed()
        print(f"\n✅ Assertion Passed: Found content '{content}'")
    except Exception:
        print(f"\n⚠️ Assertion FAILED: Could not find content '{content}'")
        context.driver.save_screenshot(f"fail_should_see_{content[:10].replace(' ', '_')}.png")
        raise AssertionError(f"Could not find content: {content}")

@then('I should not see an active "{button_text}" button')
def step_impl_check_disabled_button(context, button_text):
    try:
        xpath = f"//button[contains(., '{button_text}')]"
        button = context.driver.find_element(By.XPATH, xpath)
        is_disabled = button.get_attribute("disabled") is not None or "cursor-not-allowed" in button.get_attribute("class") or "disabled" in button.get_attribute("class")
        
        assert is_disabled
        print(f"\n✅ Assertion Passed: Button '{button_text}' is correctly disabled.")
    except Exception as e:
        print(f"\n⚠️ Assertion FAILED: Button '{button_text}' should be disabled but isn't.")
        context.driver.save_screenshot("fail_check_disabled.png")
        raise AssertionError(f"Button '{button_text}' is not disabled")

def after_scenario(context, scenario):
    if hasattr(context, 'driver') and context.driver:
        try:
            context.driver.quit()
        except OSError:
            pass # Abaikan error handle invalid Windows
        context.driver = None