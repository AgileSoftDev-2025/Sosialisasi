import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from behave import given, when, then
import time

BASE_URL = "http://localhost:3000"

# --- LOGIN HELPER ---
def perform_login(context, email="barimbingpilemon@gmail.com", password="Password123*"):
    if not hasattr(context, 'driver') or not context.driver:
        options = uc.ChromeOptions()
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        # PENTING: Layar lebar agar layout Feed sempurna
        options.add_argument("--window-size=1920,1080")
        context.driver = uc.Chrome(options=options)

    # Cek apakah sudah login
    try:
        if "/dashboard" in context.driver.current_url:
            return
    except:
        pass

    print("[Info] Performing Login...")
    context.driver.get(f"{BASE_URL}/auth/login")
    try:
        WebDriverWait(context.driver, 10).until(EC.element_to_be_clickable((By.NAME, "email")))
        context.driver.find_element(By.NAME, "email").send_keys(email)
        context.driver.find_element(By.NAME, "password").send_keys(password)
        
        btn = context.driver.find_element(By.XPATH, "//button[normalize-space()='Login']")
        context.driver.execute_script("arguments[0].click();", btn)
        
        WebDriverWait(context.driver, 20).until(EC.url_contains("/dashboard"))
        print(f"[Debug] Login Success")
    except Exception as e:
        print(f"[Error] Login failed: {e}")
        raise

# --- STEPS ---

@given('I am logged in as a user')
def step_impl_login(context):
    perform_login(context)

@given('I am on the dashboard')
def step_impl_dashboard(context):
    if "/dashboard" not in context.driver.current_url:
        context.driver.get(f"{BASE_URL}/dashboard")
    
    # Tunggu sampai Feed Postingan muncul
    # Kita cari div yang memiliki class 'cursor-pointer' (tanda card user bisa diklik)
    try:
        WebDriverWait(context.driver, 15).until(
            EC.presence_of_element_located((By.XPATH, "//div[contains(@class, 'cursor-pointer')]"))
        )
    except:
        print("[Warn] Feed might be slow to load")

# --- GANTI BAGIAN INI DI connection_steps.py ---

@when('I click on a user\'s name in the post feed') 
def step_impl_click_feed_user(context):
    try:
        time.sleep(3) # Tunggu feed loading
        
        # Nama akun yang sedang login (harus dihindari)
        my_name = "Pilemon Barimbing Baru"
        
        # STRATEGI BARU: Klik langsung elemen TEXT (H3), bukan DIV pembungkus.
        # Event bubbling React akan meneruskan klik ini ke parent-nya.
        # Cari H3 pertama yang teksnya BUKAN nama sendiri.
        xpath = f"(//h3[contains(@class, 'font-semibold') and not(contains(text(), '{my_name}'))])[1]"
        
        name_element = WebDriverWait(context.driver, 15).until(
            EC.element_to_be_clickable((By.XPATH, xpath))
        )
        
        # Ambil teks nama untuk debug
        target_name = name_element.text
        print(f"[Debug] Target User Found: '{target_name}'")
        
        # Scroll pas ke tengah elemen
        context.driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", name_element)
        time.sleep(1)
        
        # Klik Paksa JS pada TEKS-nya
        context.driver.execute_script("arguments[0].click();", name_element)
        
        print(f"[Debug] Clicked on text: '{target_name}'")
        
    except Exception as e:
        print(f"[Error] Failed to click user name. XPath used: {xpath}")
        context.driver.save_screenshot("fail_click_feed.png")
        raise

@when('I wait for the profile page to load')
def step_impl_wait_profile(context):
    try:
        # 1. Tunggu URL berubah
        WebDriverWait(context.driver, 10).until(EC.url_contains("/profileuser/"))
        
        # 2. Tunggu elemen Profil (Nama User / H1) muncul
        WebDriverWait(context.driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "h1"))
        )
        
        # 3. Tunggu tombol koneksi muncul (PENTING)
        # Tombol bisa 'Berkoneksi', 'Batalkan', atau 'Terima'
        WebDriverWait(context.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//button[contains(., 'Berkoneksi') or contains(., 'Batalkan')]"))
        )
        
        time.sleep(2) # Stabilisasi
        print("[Debug] Profile page loaded completely")
        
    except Exception as e:
        print(f"[Error] Profile page not loaded. Current URL: {context.driver.current_url}")
        context.driver.save_screenshot("fail_profile_load.png")
        raise

@when('I press the "Berkoneksi" button')
def step_impl_press_connect(context):
    try:
        # Cari tombol spesifik "Berkoneksi"
        xpath = "//button[contains(., 'Berkoneksi')]"
        
        # Cek dulu, jangan-jangan statusnya sudah "Batalkan" (sudah connect duluan)
        # Jika sudah terlanjur connect, kita biarkan saja (atau bisa kita reset dulu kalau mau kompleks)
        if "Batalkan" in context.driver.page_source:
            print("[Info] Button is already 'Batalkan'. Resetting logic to test 'Berkoneksi'...")
            # Klik Batalkan dulu biar jadi Berkoneksi lagi (Toggle)
            cancel_btn = context.driver.find_element(By.XPATH, "//button[contains(., 'Batalkan')]")
            context.driver.execute_script("arguments[0].click();", cancel_btn)
            time.sleep(3) # Tunggu reset
        
        # Sekarang klik Berkoneksi
        button = WebDriverWait(context.driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, xpath))
        )
        
        context.driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", button)
        time.sleep(0.5)
        context.driver.execute_script("arguments[0].click();", button)
        
        print("[Debug] Pressed 'Berkoneksi'")
        time.sleep(3) # Tunggu proses API
        
    except Exception as e:
        print(f"[Error] Failed to press 'Berkoneksi': {e}")
        context.driver.save_screenshot("fail_press_connect.png")
        raise

@then('I should see the button change to "Batalkan"')
def step_impl_verify_change(context):
    try:
        xpath = "//button[contains(., 'Batalkan')]"
        WebDriverWait(context.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, xpath))
        )
        print("[Debug] Success! Button changed to 'Batalkan'")
    except Exception:
        print("[Error] Button did not change to 'Batalkan'.")
        context.driver.save_screenshot("fail_verify.png")
        raise AssertionError("Button state did not update")

