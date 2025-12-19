from behave import given, when, then
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
import time

@given('I am logged in as an administrator')
def step_impl_admin_login(context):
    if "/admin" in context.driver.current_url:
        return

    context.driver.get(f"{context.base_url}/auth/login")
    try:
        WebDriverWait(context.driver, 10).until(
             EC.visibility_of_element_located((By.NAME, "email"))
        )
        context.driver.find_element(By.NAME, "email").send_keys("adminsosialisasi123@gmail.com")
        context.driver.find_element(By.NAME, "password").send_keys("PasswordAdmin123*")
        
        context.driver.find_element(By.XPATH, "//button[contains(text(), 'Login') or normalize-space()='Login']").click()
        WebDriverWait(context.driver, 15).until(EC.url_contains("/admin"))
        time.sleep(2) 
    except Exception as e:
        context.driver.save_screenshot("login_failed.png")
        raise AssertionError(f"Gagal Login: {e}")

@when('I am on "{path}"')
def step_impl_visit_path(context, path):
    full_url = f"{context.base_url}{path}"
    context.driver.get(full_url)
    WebDriverWait(context.driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, 'body')))
    time.sleep(2) 

@then('I should see "{text}"')
def step_impl_verify_text(context, text):
    try:
        WebDriverWait(context.driver, 10).until(
            lambda driver: text.lower() in driver.find_element(By.TAG_NAME, 'body').text.lower()
        )
    except Exception:
        context.driver.save_screenshot(f"missing_text_{text}.png")
        raise AssertionError(f"Teks '{text}' tidak ditemukan di halaman.")

@when('I select "{value}" from "{element_id}"')
def step_select_dropdown(context, value, element_id):
    try:
        select_element = WebDriverWait(context.driver, 10).until(
            EC.presence_of_element_located((By.ID, element_id))
        )
        select = Select(select_element)
        select.select_by_value(value)
        time.sleep(2)
    except Exception as e:
        raise AssertionError(f"Gagal memilih dropdown {element_id}: {e}")

@when('I set the date "{element_id}" to "{date_value}"')
def step_set_date(context, element_id, date_value):
    try:
        date_input = context.driver.find_element(By.ID, element_id)
        date_input.send_keys(date_value)
        time.sleep(2)
    except Exception as e:
        raise AssertionError(f"Gagal set tanggal: {e}")

@then('I should see "{text}" in the table header')
def step_check_table_header(context, text):
    xpath = f"//thead//th[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '{text.lower()}')]"
    if not context.driver.find_elements(By.XPATH, xpath):
        raise AssertionError(f"Header tabel '{text}' tidak ditemukan.")

@then('I should see "{text}" in the content table')
def step_check_table_content(context, text):
    xpath = f"//tbody//tr//*[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '{text.lower()}')]"
    try:
        WebDriverWait(context.driver, 5).until(EC.presence_of_element_located((By.XPATH, xpath)))
    except:
        raise AssertionError(f"Data '{text}' tidak ditemukan di dalam tabel.")

@then('I should not see "{text}" in the content column')
def step_check_not_in_table(context, text):
    xpath = f"//tbody//tr//*[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '{text.lower()}')]"
    elements = context.driver.find_elements(By.XPATH, xpath)
    if len(elements) > 0:
        raise AssertionError(f"Error: Data '{text}' seharusnya TIDAK MUNCUL (karena difilter), tapi ditemukan.")

@then('I should see button "{text}"')
def step_check_button(context, text):
    xpath = f"//button[contains(text(), '{text}')]"
    if not context.driver.find_elements(By.XPATH, xpath):
        raise AssertionError(f"Tombol '{text}' tidak ditemukan.")