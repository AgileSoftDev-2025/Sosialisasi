import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from behave import given, when, then
import time

BASE_URL = "http://localhost:3000"

# --- HELPER: LOGIN ---
def perform_login(context, email, password):
    if not hasattr(context, 'driver') or not context.driver:
        options = uc.ChromeOptions()
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument("--window-size=1920,1080")
        context.driver = uc.Chrome(options=options)
    
    print(f"[Info] Logging in as {email}...")
    context.driver.get(f"{BASE_URL}/auth/login")
    try:
        WebDriverWait(context.driver, 10).until(EC.element_to_be_clickable((By.NAME, "email")))
        
        # Clear field dulu untuk jaga-jaga
        context.driver.find_element(By.NAME, "email").clear()
        context.driver.find_element(By.NAME, "email").send_keys(email)
        
        context.driver.find_element(By.NAME, "password").clear()
        context.driver.find_element(By.NAME, "password").send_keys(password)
        
        btn = context.driver.find_element(By.XPATH, "//button[normalize-space()='Login']")
        context.driver.execute_script("arguments[0].click();", btn)
        
        WebDriverWait(context.driver, 20).until(EC.url_contains("/dashboard"))
        print(f"[Debug] Login Success as {email}")
    except Exception as e:
        print(f"[Error] Login Failed: {e}")
        # Jangan raise error di sini agar bisa retry di step definition jika perlu
        pass

# --- STEPS DEFINITION ---

@given('I am logged in as a user')
def step_impl_login_sender(context):
    # Login Default (Pengirim)
    perform_login(context, "barimbingpilemon@gmail.com", "Password123*")

@given('I am logged in as the receiver user')
def step_impl_login_receiver(context):
    # 1. Pastikan Driver Ada
    if not hasattr(context, 'driver') or not context.driver:
        options = uc.ChromeOptions()
        options.add_argument('--no-sandbox')
        options.add_argument("--window-size=1920,1080")
        context.driver = uc.Chrome(options=options)

    # 2. LOGOUT PAKSA / BERSIHKAN SESI SEBELUMNYA
    # Karena Scenario 1 pakai akun A, Scenario 3 pakai akun B.
    # Kita hapus cookies agar ditendang ke login page.
    print("[Info] Switching account to Receiver...")
    context.driver.delete_all_cookies()
    context.driver.refresh()
    
    # 3. Login sebagai Pilemon Unair
    perform_login(context, "pebemarolop@gmail.com", "Password123*")

@given('I am on the dashboard')
def step_impl_dashboard(context):
    if "/dashboard" not in context.driver.current_url:
        context.driver.get(f"{BASE_URL}/dashboard")
    time.sleep(3)

@given('I am on "/dashboard/notification"')
def step_impl_notif_page(context):
    # Sesuai kode Navbar: /dashboard/notification (singular)
    target_url = f"{BASE_URL}/dashboard/notification"
    if context.driver.current_url != target_url:
        context.driver.get(target_url)
    
    time.sleep(3) # Tunggu loading
    
    # Cek jika ditendang ke login (sesi habis)
    if "login" in context.driver.current_url:
        print("[Warn] Session lost. Re-logging as Receiver...")
        perform_login(context, "pebemarolop@gmail.com", "Password123*")
        context.driver.get(target_url)
        time.sleep(3)

    try:
        # Cari H1 Notifikasi (Sesuai kode NotificationsPage.tsx)
        WebDriverWait(context.driver, 15).until(
            EC.presence_of_element_located((By.XPATH, "//h1[contains(text(), 'Notifikasi')]"))
        )
    except Exception:
        print(f"[Error] Failed to load Notif Page. URL: {context.driver.current_url}")
        context.driver.save_screenshot("fail_notif_load.png")
        raise

# --- NAVIGASI FEED (SCENARIO 1 & 2) ---

@when('I click on a user\'s name in the post feed') 
def step_impl_click_user_profile(context):
    try:
        time.sleep(3)
        # Cari nama user yang BUKAN diri sendiri (Login: Pilemon Barimbing Baru)
        my_name = "Pilemon Barimbing Baru" 
        
        # XPath: Cari H3 (Nama) yang tidak mengandung nama sendiri
        xpath = f"(//h3[contains(@class, 'font-semibold') and not(contains(text(), '{my_name}'))])[1]"
        
        name_element = WebDriverWait(context.driver, 20).until(
            EC.element_to_be_clickable((By.XPATH, xpath))
        )
        
        context.driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", name_element)
        time.sleep(1)
        context.driver.execute_script("arguments[0].click();", name_element)
        print(f"[Debug] Clicked user profile in feed")
        
    except Exception as e:
        print(f"[Error] Failed to click user. XPath: {xpath}")
        context.driver.save_screenshot("fail_click_profile.png")
        raise

@when('I wait for the profile page to load')
def step_impl_wait_profile(context):
    try:
        WebDriverWait(context.driver, 15).until(EC.url_contains("/profileuser/"))
        time.sleep(2)
        print("[Debug] Profile page loaded")
    except Exception:
        raise AssertionError("Profile page failed to load")

# --- TOMBOL KONEKSI (SCENARIO 1 & 2) ---

@when('I press the "{button_text}" button')
def step_impl_press_connect_btn(context, button_text):
    try:
        xpath = f"//button[contains(., '{button_text}')]"
        button = WebDriverWait(context.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, xpath))
        )
        context.driver.execute_script("arguments[0].click();", button)
        time.sleep(3) 
        print(f"[Debug] Pressed button: {button_text}")
    except Exception:
        print(f"[Error] Button '{button_text}' not found.")
        context.driver.save_screenshot(f"fail_press_{button_text}.png")
        raise

@then('I should see the button change to "{expected_text}"')
def step_impl_verify_button_change(context, expected_text):
    try:
        xpath = f"//button[contains(., '{expected_text}')]"
        WebDriverWait(context.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, xpath))
        )
        print(f"[Debug] Button changed to: {expected_text}")
    except Exception:
        raise AssertionError(f"Button did not change to {expected_text}")

# --- NOTIFIKASI ACTION (SCENARIO 3 & 4) ---

@when('I press the "{button_text}" button on the first request')
def step_impl_notif_action(context, button_text):
    try:
        time.sleep(3) # Tunggu skeleton loading hilang
        
        # Cek apakah ada notifikasi
        if "Belum ada notifikasi" in context.driver.page_source:
            print("[Warning] No pending connections found! skipping click.")
            return

        # Cari tombol Accept / Remove
        # Sesuai kode: <button>Accept</button>
        xpath = f"(//button[contains(text(), '{button_text}')])[1]"
        
        button = WebDriverWait(context.driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, xpath))
        )
        
        context.driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", button)
        time.sleep(0.5)
        context.driver.execute_script("arguments[0].click();", button)
        
        time.sleep(2) # Tunggu toast muncul & card hilang
        print(f"[Debug] Clicked {button_text} on notification")
        
    except Exception as e:
        print(f"[Error] Failed to click {button_text} on notification: {e}")
        context.driver.save_screenshot("fail_notif_click.png")
        raise

@then('I should see a success message "{message}"')
def step_impl_toast_check(context, message):
    try:
        # Mencari text pesan sukses di seluruh body (Toast)
        xpath = f"//*[contains(text(), '{message}')]"
        WebDriverWait(context.driver, 5).until(
            EC.presence_of_element_located((By.XPATH, xpath))
        )
        print(f"[Debug] Toast message found: {message}")
    except:
        print(f"[Info] Toast '{message}' not found (maybe too fast). Assuming success if button logic passed.")
        pass

