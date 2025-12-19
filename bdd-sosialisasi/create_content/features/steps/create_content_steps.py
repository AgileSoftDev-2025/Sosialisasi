import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from behave import given, when, then, step
import time
import os

BASE_URL = "http://localhost:3000"

# --- HELPER FUNCTIONS ---

def perform_login(context, email="barimbingpilemon@gmail.com", password="Password123*"):
    if not hasattr(context, 'driver') or not context.driver:
        options = uc.ChromeOptions()
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--start-maximized')
        context.driver = uc.Chrome(options=options)
    
    context.driver.get(f"{BASE_URL}/auth/login")
    
    try:
        WebDriverWait(context.driver, 20).until(
            EC.presence_of_element_located((By.NAME, "email"))
        )
        context.driver.find_element(By.NAME, "email").send_keys(email)
        context.driver.find_element(By.NAME, "password").send_keys(password)
        context.driver.find_element(By.XPATH, "//button[normalize-space()='Login']").click()
        
        WebDriverWait(context.driver, 20).until(EC.url_contains("/dashboard"))
    except Exception as e:
        print(f"Login failed: {e}")

def create_dummy_image(filename):
    filepath = os.path.abspath(os.path.join(os.getcwd(), filename))
    if not os.path.exists(filepath):
        with open(filepath, "wb") as f:
            f.write(b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\nIDATx\x9cc\x00\x01\x00\x00\x05\x00\x01\r\n\x2e\xe4\x00\x00\x00\x00IEND\xaeB`\x82")
    return filepath

# --- STEPS DEFINITIONS ---

@given('I am logged in as a user')
def step_impl_logged_in_user(context):
    perform_login(context)

@given('I am NOT logged in as a user')
def step_impl_not_logged_in(context):
    if hasattr(context, 'driver') and context.driver:
        context.driver.delete_all_cookies()
        context.driver.refresh()
    else:
        options = uc.ChromeOptions()
        context.driver = uc.Chrome(options=options)

@given('I am on "{url}"')
@when('I am on "{url}"')
@when('I try to access "{url}"')
def step_impl_open_page(context, url):
    if not hasattr(context, 'driver') or not context.driver:
        options = uc.ChromeOptions()
        context.driver = uc.Chrome(options=options)
    context.driver.get(f"{BASE_URL}{url}")
    time.sleep(2)

@then('The page should redirect to "{page_path}"')
def step_impl_should_be_on(context, page_path):
    WebDriverWait(context.driver, 15).until(EC.url_contains(page_path))
    assert page_path in context.driver.current_url

@when('I select the category "{category}"')
def step_impl_select_category(context, category):
    # Mencari tombol kategori berdasarkan teks di dalam tag p
    xpath = f"//p[normalize-space()='{category}']/parent::div"
    category_btn = WebDriverWait(context.driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, xpath))
    )
    category_btn.click()

@when('I enter "{text}" into the post description')
def step_impl_enter_description(context, text):
    # Mencari textarea berdasarkan placeholder atau tag name
    textarea = WebDriverWait(context.driver, 10).until(
        EC.presence_of_element_located((By.TAG_NAME, "textarea"))
    )
    textarea.clear()
    textarea.send_keys(text)

@when('I leave the post description empty')
def step_impl_empty_description(context):
    textarea = WebDriverWait(context.driver, 10).until(
        EC.presence_of_element_located((By.TAG_NAME, "textarea"))
    )
    textarea.clear()

@when('I upload an image "{filename}"')
def step_impl_upload_image(context, filename):
    filepath = create_dummy_image(filename)
    # Target input file ID 'fileUpload' dari CreatePage.tsx
    upload_input = context.driver.find_element(By.ID, "fileUpload")
    upload_input.send_keys(filepath)

@then('I should see an image preview')
def step_impl_verify_preview(context):
    preview_img = WebDriverWait(context.driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//img[@alt='Preview']"))
    )
    assert preview_img.is_displayed()

@when('I click the "{button_text}" button')
def step_impl_click_post(context, button_text):
    # Mencari tombol berdasarkan tipe submit (tombol Post)
    post_button = WebDriverWait(context.driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']"))
    )
    post_button.click()

@then('I should see a success message "{message}"')
def step_impl_success_toast(context, message):
    xpath = f"//*[contains(text(), '{message}')]"
    success_toast = WebDriverWait(context.driver, 15).until(
        EC.presence_of_element_located((By.XPATH, xpath))
    )
    assert success_toast.is_displayed()

@then('I should see an error message "{message}"')
def step_impl_error_msg(context, message):
    # Berdasarkan <p className="text-sm text-red-500"> di CreatePage.tsx
    xpath = f"//p[contains(@class, 'text-red-500') and contains(text(), '{message}')]"
    error_p = WebDriverWait(context.driver, 10).until(
        EC.presence_of_element_located((By.XPATH, xpath))
    )
    assert error_p.is_displayed()

@then('I should still be on "{url}"')
def step_impl_still_on_page(context, url):
    time.sleep(1)
    assert url in context.driver.current_url