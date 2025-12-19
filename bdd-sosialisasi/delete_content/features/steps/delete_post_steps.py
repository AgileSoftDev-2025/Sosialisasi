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

    # Cek session
    if "/dashboard" in context.driver.current_url:
        return

    context.driver.get(f"{BASE_URL}/auth/login")
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

# --- STEPS ---

@given('I am logged in as "{email}"')
def step_impl_login(context, email):
    # Password default sesuai requestmu
    perform_login(context, email, "Password123*")

@given('I am on "/dashboard/profile"')
def step_impl_profile_page(context):
    context.driver.get(f"{BASE_URL}/dashboard/profile")
    try:
        # Tunggu elemen profile muncul (misal foto profile atau nama)
        WebDriverWait(context.driver, 15).until(
            EC.presence_of_element_located((By.XPATH, "//h1[contains(@class, 'text-xl font-bold')]"))
        )
        # Tunggu sebentar agar list post ter-render
        time.sleep(3)
    except Exception as e:
        print(f"[Error] Failed to load profile page: {e}")
        raise

@given('I have at least one post on my profile')
def step_impl_check_posts(context):
    try:
        # Cari elemen <article>, ini membungkus setiap post di kodemu
        posts = context.driver.find_elements(By.TAG_NAME, "article")
        
        if len(posts) == 0:
            raise AssertionError("No posts found to delete! Please create a post manually first.")
        
        # Simpan jumlah post awal ke dalam context untuk verifikasi nanti
        context.initial_post_count = len(posts)
        print(f"[Debug] Initial post count: {context.initial_post_count}")
        
    except Exception as e:
        print(f"[Error] Failed to count posts: {e}")
        raise

@when('I click the options menu (three dots) on the first post')
def step_impl_click_menu(context):
    try:
        # Cari icon titik tiga di post pertama
        # Class di kodemu: fa-solid fa-ellipsis-vertical
        xpath = "(//i[contains(@class, 'fa-ellipsis-vertical')])[1]"
        
        menu_icon = WebDriverWait(context.driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, xpath))
        )
        
        # Scroll dan Klik
        context.driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", menu_icon)
        time.sleep(0.5)
        context.driver.execute_script("arguments[0].click();", menu_icon)
        
        print("[Debug] Clicked three dots menu")
        time.sleep(1) # Tunggu dropdown muncul
        
    except Exception as e:
        print(f"[Error] Failed to click menu icon: {e}")
        context.driver.save_screenshot("fail_click_menu.png")
        raise

@when('I press the "Hapus" button')
def step_impl_click_delete(context):
    try:
        # Cari tombol Hapus di dalam dropdown yang baru muncul
        # Selector tombol di kodemu: button > text "Hapus"
        xpath = "//button[contains(text(), 'Hapus')]"
        
        delete_btn = WebDriverWait(context.driver, 5).until(
            EC.element_to_be_clickable((By.XPATH, xpath))
        )
        
        context.driver.execute_script("arguments[0].click();", delete_btn)
        print("[Debug] Clicked 'Hapus'")
        
        # Tunggu proses API delete dan refresh list (optimistic update)
        time.sleep(3)
        
    except Exception as e:
        print(f"[Error] Failed to click delete button: {e}")
        context.driver.save_screenshot("fail_click_delete.png")
        raise

@then('the post should be removed from the list')
def step_impl_verify_deletion(context):
    # Hitung ulang jumlah post
    current_posts = context.driver.find_elements(By.TAG_NAME, "article")
    current_count = len(current_posts)
    
    print(f"[Debug] Post count before: {context.initial_post_count}, After: {current_count}")
    
    # Verifikasi jumlah berkurang 1
    assert current_count == context.initial_post_count - 1, \
        f"Post was not deleted. Count expected {context.initial_post_count - 1}, but got {current_count}"

# --- CLEANUP ---
def after_scenario(context, scenario):
    if hasattr(context, 'driver') and context.driver:
        try:
            context.driver.quit()
        except:
            pass
        finally:
            try:
                context.driver.quit = lambda: None
            except:
                pass
            context.driver = None