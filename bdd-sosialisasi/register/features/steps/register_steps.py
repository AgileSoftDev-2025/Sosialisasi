from behave import given, when, then
import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import os

def create_dummy_file(filename):
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

@given('I am on "{url}"')
def step_impl_open_page(context, url):
    options = uc.ChromeOptions()
    context.driver = uc.Chrome(options=options)
    context.driver.get(url)
    context.driver.maximize_window()
    try:
        WebDriverWait(context.driver, 10).until(
            EC.element_to_be_clickable((By.NAME, "confirmPassword"))
        )
    except Exception as e:
        print(f"Failed to load registration page or find 'fullName' element: {e}")
        raise


@when('I fill in "{field_name}" with "{value}"')
def step_impl_fill_field(context, field_name, value):
    try:
        field_input = context.driver.find_element(By.NAME, field_name)
        field_input.clear()
        field_input.send_keys(value)
    except Exception as e:
        print(f"Error filling in field '{field_name}': {e}")
        raise

@when('I select "{option_text}" from "{select_name}"')
def step_impl_select_option(context, option_text, select_name):
    try:
        if select_name == "status":
            select_button_xpath = "//button[.//span[contains(., 'Select your role')]]"
            select_button = WebDriverWait(context.driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, select_button_xpath))
            )
            select_button.click()

            WebDriverWait(context.driver, 10).until(
                EC.visibility_of_element_located((By.XPATH, "//ul[@role='listbox']"))
            )

            option_xpath = f"//li[@role='option' and normalize-space()='{option_text}']"
            option = WebDriverWait(context.driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, option_xpath))
            )
            option.click()
        else:
            raise Exception(f"Step definition not implemented for select: {select_name}")
    except Exception as e:
        print(f"Error selecting '{option_text}' from '{select_name}': {e}")
        context.driver.save_screenshot(f"fail_select_{select_name}.png")
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

@when('I attach the file "{filename}" to "{field_name}"')
def step_impl_attach_file(context, filename, field_name):
    try:
        filepath = create_dummy_file(filename)
        
        element_id = ""
        if field_name == "profilePicture":
            element_id = "profile-picture-upload"
        else:
            raise Exception(f"Unknown file input field: {field_name}")

        upload_element = context.driver.find_element(By.ID, element_id)
        upload_element.send_keys(filepath)
    except Exception as e:
        print(f"Error attaching file '{filename}' to '{field_name}': {e}")
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
        context.driver.save_screenshot(f"fail_should_see_{content[:10]}.png")
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
    