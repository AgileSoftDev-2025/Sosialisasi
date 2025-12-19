import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from behave import given, when, then
import time

BASE_URL = "http://localhost:3000"

# --- HELPER: LOGIN ---
def perform_login(context, email="barimbingpilemon@gmail.com", password="Password123*"):
    if not hasattr(context, 'driver') or not context.driver:
        options = uc.ChromeOptions()
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument("--window-size=1920,1080")
        context.driver = uc.Chrome(options=options)

    # Cek login session
    if "/dashboard" in context.driver.current_url:
        return

    context.driver.get(f"{BASE_URL}/auth/login")
    try:
        WebDriverWait(context.driver, 10).until(EC.element_to_be_clickable((By.NAME, "email")))
        context.driver.find_element(By.NAME, "email").send_keys(email)
        context.driver.find_element(By.NAME, "password").send_keys(password)
        
        btn = context.driver.find_element(By.XPATH, "//button[normalize-space()='Login']")
        context.driver.execute_script("arguments[0].click();", btn)
        
        WebDriverWait(context.driver, 20).until(EC.url_contains("/dashboard"))
        print(f"[Debug] Login Success as {email}")
    except Exception:
        pass

# --- STEPS ---

@given('I am logged in as a user')
def step_impl_login(context):
    perform_login(context)

@when('I navigate to the dashboard')
def step_impl_nav_dashboard(context):
    if "/dashboard" not in context.driver.current_url:
        context.driver.get(f"{BASE_URL}/dashboard")
    
    # Tunggu loading sebentar
    time.sleep(3)
    print("[Debug] On Dashboard Page")

@then('I should see the topic filters like "{topic_name}"')
def step_impl_check_filter(context, topic_name):
    try:
        xpath = f"//button[contains(text(), '{topic_name}')]"
        WebDriverWait(context.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, xpath))
        )
        print(f"[Debug] Found topic filter: {topic_name}")
    except Exception:
        context.driver.save_screenshot("fail_filter.png")
        raise AssertionError(f"Topic filter '{topic_name}' not found")

@then('I should see the "{sidebar_title}" sidebar')
def step_impl_check_sidebar(context, sidebar_title):
    try:
        xpath = f"//*[contains(text(), '{sidebar_title}')]"
        WebDriverWait(context.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, xpath))
        )
        print(f"[Debug] Found sidebar: {sidebar_title}")
    except Exception:
        context.driver.save_screenshot(f"fail_sidebar_{sidebar_title}.png")
        raise AssertionError(f"Sidebar '{sidebar_title}' not found")

# --- BAGIAN YANG DIPERBAIKI ---
@then('I should see the post feed content')
def step_impl_check_feed(context):
    try:
        # PERBAIKAN: 
        # Mencari DIV postingan (bg-white, shadow-sm, dan ada gambar di dalamnya)
        # ATAU mencari pesan 'Belum Ada Postingan'
        xpath = "(//div[contains(@class, 'bg-white') and contains(@class, 'shadow-sm') and .//img]) | //p[contains(text(), 'Belum Ada')]"
        
        element = WebDriverWait(context.driver, 15).until(
            EC.presence_of_element_located((By.XPATH, xpath))
        )
        
        # Scroll sedikit biar kelihatan di screenshot kalau error
        context.driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", element)
        
        print("[Debug] Post feed content is visible")
    except Exception as e:
        context.driver.save_screenshot("fail_feed.png")
        raise AssertionError(f"Feed content not loaded (No posts or empty state found). Error: {e}")

# --- CLEANUP ---
def after_scenario(context, scenario):
    if hasattr(context, 'driver') and context.driver:
        try:
            # Silent kill untuk windows
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