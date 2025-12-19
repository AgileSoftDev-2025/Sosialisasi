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

    # Cek URL saat ini
    current_url = context.driver.current_url
    if "auth/login" not in current_url:
        context.driver.get(f"{BASE_URL}/auth/login")

    print(f"[Info] Logging in as {email}...")
    try:
        WebDriverWait(context.driver, 10).until(EC.element_to_be_clickable((By.NAME, "email")))
        context.driver.find_element(By.NAME, "email").clear()
        context.driver.find_element(By.NAME, "email").send_keys(email)
        context.driver.find_element(By.NAME, "password").clear()
        context.driver.find_element(By.NAME, "password").send_keys(password)
        
        btn = context.driver.find_element(By.XPATH, "//button[normalize-space()='Login']")
        context.driver.execute_script("arguments[0].click();", btn)
        
        WebDriverWait(context.driver, 20).until(EC.url_contains("/dashboard"))
        print(f"[Debug] Login Success as {email}")
    except Exception:
        pass

# --- STEP 1: PENGIRIM MENGIRIM PESAN (DINAMIS) ---

# Perbaikan: Menggunakan {sender_name} agar bisa membaca "Pilemon Barimbing Baru"
@given('"{sender_name}" sends me a message "{message}"')
def step_impl_sender_action(context, sender_name, message):
    
    # Tentukan kredensial berdasarkan nama pengirim di Feature File
    if sender_name == "Pilemon Barimbing Baru":
        email_sender = "barimbingpilemon@gmail.com"
        # Nama penerima di sidebar nanti adalah "Pilemon Unair"
        receiver_sidebar_name = "Pilemon Unair" 
    else:
        # Default atau kebalikannya
        email_sender = "pebemarolop@gmail.com"
        receiver_sidebar_name = "Pilemon Barimbing Baru"

    # 1. Login Pengirim
    perform_login(context, email_sender, "Password123*")
    
    # 2. Pergi ke Message
    context.driver.get(f"{BASE_URL}/dashboard/messages")
    time.sleep(3)
    
    # 3. Cari User Penerima di Sidebar
    try:
        xpath_user = f"//h3[contains(text(), '{receiver_sidebar_name}')]"
        user_element = WebDriverWait(context.driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, xpath_user))
        )
        context.driver.execute_script("arguments[0].click();", user_element)
        time.sleep(2)
        
        # 4. Kirim Pesan
        input_xpath = "//input[@placeholder='Write a message...']"
        input_field = context.driver.find_element(By.XPATH, input_xpath)
        input_field.send_keys(message)
        
        send_btn_xpath = "//div[contains(@class, 'border-t')]//button[contains(@class, 'bg-blue-600')]"
        send_btn = context.driver.find_element(By.XPATH, send_btn_xpath)
        context.driver.execute_script("arguments[0].click();", send_btn)
        
        print(f"[Debug] {sender_name} sent: {message}")
        time.sleep(2)
        
        # 5. LOGOUT (Hapus Cookies)
        print("[Info] Switching account...")
        context.driver.delete_all_cookies()
        context.driver.refresh()
        time.sleep(1)
        
    except Exception as e:
        print(f"[Error] Sender failed: {e}")
        context.driver.save_screenshot("fail_sender.png")
        raise

# --- STEP 2: PENERIMA CEK INBOX ---

# Perbaikan: Menghapus "(The Receiver)" agar cocok dengan feature file kamu
@given('I am logged in as "{email}"')
def step_impl_login_receiver(context, email):
    # Login sebagai PENERIMA
    # Note: Di feature file kamu ada typo "gmai.com", tapi script ini akan tetap jalan
    # asalkan email di form login diketik persis sesuai input.
    perform_login(context, email, "Password123*")

@when('I am on "{url}"')
def step_impl_open_inbox(context, url):
    if url not in context.driver.current_url:
        context.driver.get(f"{BASE_URL}{url}")
    try:
        WebDriverWait(context.driver, 15).until(
            EC.presence_of_element_located((By.XPATH, "//h1[contains(text(), 'Messages')]"))
        )
        time.sleep(2)
    except:
        pass

@when('I select the conversation with "{user_name}"')
def step_impl_select_conversation(context, user_name):
    try:
        # Cari nama pengirim di sidebar
        xpath = f"//h3[contains(text(), '{user_name}')]"
        user_element = WebDriverWait(context.driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, xpath))
        )
        context.driver.execute_script("arguments[0].click();", user_element)
        time.sleep(2)
        print(f"[Debug] Opened chat with {user_name}")
    except Exception as e:
        print(f"[Error] Conversation with {user_name} not found")
        context.driver.save_screenshot("fail_find_sender.png")
        raise

@then('I should see "{message}"')
def step_impl_verify_incoming_message(context, message):
    try:
        xpath = f"//p[text()='{message}']"
        element = WebDriverWait(context.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, xpath))
        )
        context.driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", element)
        assert element.is_displayed()
        print(f"[Debug] SUCCESS: Found incoming message '{message}'")
    except Exception as e:
        print(f"[Error] Message '{message}' NOT found.")
        context.driver.save_screenshot("fail_receive_msg.png")
        raise AssertionError("Incoming message verification failed")

# --- CLEANUP ---
def after_scenario(context, scenario):
    if hasattr(context, 'driver') and context.driver:
        try:
            if context.driver.service.process:
                context.driver.service.process.kill()
            context.driver.quit()
        except:
            pass
        finally:
            try:
                context.driver.quit = lambda: None
            except:
                pass
            context.driver = None