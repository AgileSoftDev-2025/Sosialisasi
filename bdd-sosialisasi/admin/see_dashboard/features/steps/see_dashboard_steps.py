from behave import given, when, then
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

@given('I am logged in as an administrator')
def step_impl_admin_login(context):
    if "/admin/dashboard" in context.driver.current_url:
        return
        
    context.driver.get(f"{context.base_url}/auth/login")
    wait = WebDriverWait(context.driver, 15)
    
    try:
        # Menunggu input email muncul menggunakan XPATH yang lebih fleksibel
        email_field = wait.until(
            EC.visibility_of_element_located((By.XPATH, "//input[@type='email']"))
        )
        email_field.clear()
        email_field.send_keys("adminsosialisasi123@gmail.com") 
        
        # Mencari password berdasarkan tipe
        pass_field = context.driver.find_element(By.XPATH, "//input[@type='password']")
        pass_field.clear()
        pass_field.send_keys("PasswordAdmin123*")
        
        # Klik tombol login
        login_btn = context.driver.find_element(By.XPATH, "//button[@type='submit']")
        login_btn.click()
        
        # Menunggu hingga URL berubah ke dashboard admin
        wait.until(EC.url_contains("/admin/dashboard"))
        
    except Exception as e:
        # Simpan screenshot untuk melihat apa yang terjadi di layar saat error
        context.driver.save_screenshot("login_failed.png")
        raise e
    
@when('I am on "{path}"')
def step_impl_visit_path(context, path):
    full_url = f"{context.base_url}{path}"
    context.driver.get(full_url)
    time.sleep(3) 

@then('I should see "{text}"')
def step_impl_verify_text(context, text):
    try:
        body = context.driver.find_element(By.TAG_NAME, 'body')
        WebDriverWait(context.driver, 10).until(
            lambda driver: text in driver.find_element(By.TAG_NAME, 'body').text
        )
        
    except Exception:
        raise AssertionError(f"Teks '{text}' tidak ditemukan pada halaman admin dashboard.")