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
        WebDriverWait(context.driver, 10).until(EC.visibility_of_element_located((By.NAME, "email")))
        context.driver.find_element(By.NAME, "email").send_keys("adminsosialisasi123@gmail.com")
        context.driver.find_element(By.NAME, "password").send_keys("PasswordAdmin123*")
        context.driver.find_element(By.XPATH, "//button[contains(text(), 'Login') or normalize-space()='Login']").click()
        WebDriverWait(context.driver, 15).until(EC.url_contains("/admin"))
    except Exception:
        pass 

@when('I am on "{path}"')
def step_visit_path(context, path):
    context.driver.get(f"{context.base_url}{path}")
    WebDriverWait(context.driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, 'body')))
    time.sleep(2)

@then('I should see "{text}"')
def step_check_text(context, text):
    try:
        WebDriverWait(context.driver, 10).until(
            lambda driver: text.lower() in driver.find_element(By.TAG_NAME, 'body').text.lower()
        )
    except:
        raise AssertionError(f"Teks '{text}' tidak ditemukan.")

@when('I select "{value}" from "{element_id}"')
def step_select_dropdown(context, value, element_id):
    try:
        select_el = WebDriverWait(context.driver, 10).until(
            EC.presence_of_element_located((By.ID, element_id))
        )
        Select(select_el).select_by_value(value)
        time.sleep(2) 
    except Exception as e:
        raise AssertionError(f"Gagal memilih dropdown {element_id}: {e}")

@then('I should see "{text}" in the table header')
def step_check_header(context, text):
    xpath = f"//thead//th[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '{text.lower()}')]"
    if not context.driver.find_elements(By.XPATH, xpath):
        raise AssertionError(f"Header '{text}' tidak ditemukan.")

@then('I should see "{text}" in the user table')
def step_check_table_row(context, text):
    xpath = f"//tbody//tr//*[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '{text.lower()}')]"
    try:
        WebDriverWait(context.driver, 5).until(EC.presence_of_element_located((By.XPATH, xpath)))
    except:
        raise AssertionError(f"Data user '{text}' tidak ditemukan di tabel.")

@then('I should not see "{text}" in the status column')
def step_check_not_visible(context, text):
    xpath = f"//tbody//tr//*[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '{text.lower()}')]"
    if len(context.driver.find_elements(By.XPATH, xpath)) > 0:
         raise AssertionError(f"Data '{text}' seharusnya tidak muncul setelah difilter.")

@when('I toggle the status switch for "{user_name}"')
def step_toggle_user_status(context, user_name):
    try:
        xpath = f"//input[@aria-label='Toggle status for {user_name}']/parent::*"
        
        try:
            switch_element = WebDriverWait(context.driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, f"//*[@aria-label='Toggle status for {user_name}']"))
            )
        except:
             switch_element = context.driver.find_element(By.XPATH, f"//input[@aria-label='Toggle status for {user_name}']/..")

        context.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", switch_element)
        time.sleep(0.5)
        
        switch_element.click()
        time.sleep(1)
        
    except Exception as e:
        raise AssertionError(f"Gagal menekan switch untuk {user_name}: {e}")

@then('I should see "Aktif" in the user table option')
def step_check_dropdown_option_result(context):
    rows = context.driver.find_elements(By.CSS_SELECTOR, "tbody tr")