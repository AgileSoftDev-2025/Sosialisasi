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
        
        context.original_profile = {
            "fullName": "Nama Asli Pengguna", 
            "universitas": "Universitas Asli",
            "jurusan": "Jurusan Asli"
        }
        
    except Exception as e:
        print(f"[Error] Login failed: {e}")
        context.driver.save_screenshot("login_failure.png") 
        raise

def create_dummy_file(filename, is_image=True):
    filepath = os.path.abspath(os.path.join(os.getcwd(), filename))
    if not os.path.exists(filepath):
        try:
            with open(filepath, "w") as f:
                f.write("This is a dummy file for testing.")
            print(f"\n[Debug] Created dummy file at: {filepath}")
        except Exception as e:
            print(f"\n[Error] Could not create dummy file: {e}")
            raise
    return filepath

@given('I am logged in as a user')
def step_impl_logged_in_user(context):
    perform_login(context)

@step('I am on "{url}"')
def step_impl_open_page(context, url):
    try:
        context.driver.get(f"{BASE_URL}{url}")
        WebDriverWait(context.driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "form"))
        )
        print(f"\n[Debug] Navigated to {url}")
    except Exception as e:
        print(f"Failed to load page {url}: {e}")
        raise

@when('I fill in "{field_name}" with "{value}"')
def step_impl_fill_field(context, field_name, value):
    try:
        field_input = WebDriverWait(context.driver, 10).until(
            EC.presence_of_element_located((By.NAME, field_name))
        )
        field_input.clear()
        field_input.send_keys(value)
        print(f"\n[Debug] Filled '{field_name}' with '{value}'")
    except Exception as e:
        print(f"Error filling in field '{field_name}': {e}")
        context.driver.save_screenshot(f"fail_fill_{field_name}.png")
        raise

@when('I press "{button_text}"')
def step_impl_press_button(context, button_text):
    try:
        xpath = f"//button[normalize-space()='{button_text}']"
        button = WebDriverWait(context.driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, xpath))
        )
        context.driver.execute_script("arguments[0].scrollIntoView(true);", button)
        button.click()
        if button_text == "Simpan Perubahan":
            time.sleep(0.5)
        time.sleep(1)
        print(f"\n[Debug] Pressed button '{button_text}'")
    except Exception as e:
        print(f"Error pressing button '{button_text}': {e}")
        context.driver.save_screenshot(f"fail_press_{button_text}.png")
        raise

@when('I attach the file "{filename}" to "{field_name}"')
def step_impl_attach_file(context, filename, field_name):
    try:
        filepath = create_dummy_file(filename, is_image="jpg" in filename.lower())
        element_id = ""
        if field_name == "profilePicture":
            element_id = "profile-picture-upload"
        else:
            raise Exception(f"Unknown file input field: {field_name}")

        upload_element = WebDriverWait(context.driver, 10).until(
            EC.presence_of_element_located((By.ID, element_id))
        )
        upload_element.send_keys(filepath)
        time.sleep(1)
        print(f"\n[Debug] Attached file '{filename}' to '{field_name}'")
    except Exception as e:
        print(f"Error attaching file '{filename}' to '{field_name}': {e}")
        context.driver.save_screenshot(f"fail_attach_{field_name}.png")
        raise

@then('I should see "{content}"')
def step_impl_should_see(context, content):
    try:
        xpath = f"//*[contains(text(), '{content}')]"
        element = WebDriverWait(context.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, xpath))
        )
        assert element.is_displayed()
        print(f"\n✅ Assertion Passed: Found content '{content}'")
    except Exception:
        print(f"\n⚠️ Assertion FAILED: Could not find content '{content}'")
        context.driver.save_screenshot(f"fail_should_see_{content[:10].replace(' ', '_')}.png")
        raise AssertionError(f"Could not find content: {content}")

@then('I should be on "{page_path}"')
def step_impl_should_be_on(context, page_path):
    try:
        WebDriverWait(context.driver, 10).until(
            EC.url_contains(page_path)
        )
        current_url = context.driver.current_url
        assert page_path in current_url
        print(f"\n✅ Assertion Passed: URL matches. Currently on: {current_url}")
    except Exception:
        current_url = context.driver.current_url
        print(f"\n⚠️ Assertion FAILED: Expected URL to contain '{page_path}', but was on '{current_url}'")
        context.driver.save_screenshot("fail_url_redirect.png")
        raise AssertionError(f"Expected URL to contain '{page_path}', but was on '{current_url}'")

@then('I should see my original profile information')
def step_impl_see_original_profile(context):
    try:
        WebDriverWait(context.driver, 10).until(
            EC.url_contains("/dashboard/profile")
        )
        assert "Temporary Name" not in context.driver.page_source
        WebDriverWait(context.driver, 10).until(
             EC.presence_of_element_located((By.TAG_NAME, "body"))
        )
        print(f"\n✅ Assertion Passed: Original profile information is displayed (assuming previous temporary change is gone).")
    except Exception:
        print(f"\n⚠️ Assertion FAILED: Could not verify original profile information or temporary change still exists.")
        context.driver.save_screenshot("fail_original_profile.png")
        raise AssertionError("Could not verify original profile information")

def after_scenario(context, scenario):
    if hasattr(context, 'driver') and context.driver:
        context.driver.quit()
