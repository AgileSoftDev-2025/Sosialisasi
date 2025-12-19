from behave import given, when, then
import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import os

@given('I am on the login page "{url}"')
def step_impl_open_login_page(context, url):
    options = uc.ChromeOptions()
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--start-maximized') 
    
    context.driver = uc.Chrome(options=options)
    context.driver.get(url)
    context.driver.maximize_window()
    
    try:
        WebDriverWait(context.driver, 15).until(
            EC.element_to_be_clickable((By.NAME, "password"))
        )
    except Exception as e:
        print(f"Failed to load login page or find 'password' element: {e}")
        raise

@when('I fill in "{field_name}" with "{value}"')
def step_impl_fill_field(context, field_name, value):
    try:
        field_input = WebDriverWait(context.driver, 10).until(
            EC.presence_of_element_located((By.NAME, field_name))
        )
        field_input.clear()
        field_input.send_keys(value)
    except Exception as e:
        print(f"Error filling in field '{field_name}': {e}")
        raise

@when('I press "{button_text}"')
def step_impl_press_button(context, button_text):
    try:
        xpath = f"//button[normalize-space()='{button_text}']"
        button = WebDriverWait(context.driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, xpath))
        )
        button.click()
    except Exception as e:
        print(f"Error pressing button '{button_text}': {e}")
        raise

@then('I should see "{content}"')
def step_impl_should_see(context, content):
    try:
        element = WebDriverWait(context.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, f"//*[contains(text(), '{content}')]"))
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