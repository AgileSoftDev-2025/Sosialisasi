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
    perform_login(context, email, "Password123*")

@given('I am on "/dashboard/messages"')
def step_impl_messages_page(context):
    context.driver.get(f"{BASE_URL}/dashboard/messages")
    try:
        # Tunggu sampai sidebar conversation muncul
        WebDriverWait(context.driver, 15).until(
            EC.presence_of_element_located((By.XPATH, "//h1[contains(text(), 'Messages')]"))
        )
        time.sleep(2) # Tunggu list user ter-load
    except Exception as e:
        print(f"[Error] Failed to load messages page: {e}")
        context.driver.save_screenshot("fail_load_messages.png")
        raise

@when('I select the conversation with "{user_name}"')
def step_impl_select_conversation(context, user_name):
    try:
        # Cari user di sidebar kiri berdasarkan nama (h3)
        # Struktur di kode: div > div > h3.text-gray-900
        xpath = f"//h3[contains(text(), '{user_name}')]"
        
        user_element = WebDriverWait(context.driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, xpath))
        )
        
        context.driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", user_element)
        time.sleep(0.5)
        context.driver.execute_script("arguments[0].click();", user_element)
        
        print(f"[Debug] Selected conversation with {user_name}")
        time.sleep(2) # Tunggu chat room terbuka
        
    except Exception as e:
        print(f"[Error] User '{user_name}' not found in conversation list: {e}")
        context.driver.save_screenshot("fail_select_user.png")
        raise

@when('I type "{message}" into the message input')
def step_impl_type_message(context, message):
    try:
        # Cari input field (placeholder="Write a message...")
        xpath = "//input[@placeholder='Write a message...']"
        
        input_field = WebDriverWait(context.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, xpath))
        )
        
        input_field.clear()
        input_field.send_keys(message)
        print(f"[Debug] Typed message: {message}")
        
    except Exception as e:
        print(f"[Error] Message input field not found: {e}")
        context.driver.save_screenshot("fail_type_message.png")
        raise

@when('I press the send button')
def step_impl_press_send(context):
    try:
        # Cari tombol kirim (ikon pesawat/panah biru) di sebelah input
        # Biasanya tombol ini sibling dari input field
        # Kita cari tombol yang punya onClick={handleSendMessage} -> di HTML jadi button biasa
        # Strategi: Cari tombol di dalam div border-t (footer chat)
        xpath = "//div[contains(@class, 'border-t')]//button[contains(@class, 'bg-blue-600')]"
        
        send_btn = WebDriverWait(context.driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, xpath))
        )
        
        context.driver.execute_script("arguments[0].click();", send_btn)
        print("[Debug] Pressed Send Button")
        time.sleep(2) # Tunggu pesan terkirim dan muncul di chat bubble
        
    except Exception as e:
        print(f"[Error] Send button not found: {e}")
        context.driver.save_screenshot("fail_send_btn.png")
        raise

@then('I should see "{message}" in the chat history')
def step_impl_verify_message(context, message):
    try:
        # Cari bubble chat yang berisi teks pesan tersebut
        # Bubble chat user sendiri biasanya punya class 'bg-blue-600' atau 'text-white'
        xpath = f"//div[contains(@class, 'bg-blue-600')]//p[text()='{message}']"
        
        WebDriverWait(context.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, xpath))
        )
        print(f"[Debug] Message '{message}' verified in chat history")
        
    except Exception as e:
        print(f"[Error] Message '{message}' not found in chat history: {e}")
        context.driver.save_screenshot("fail_verify_message.png")
        raise AssertionError(f"Message '{message}' was sent but not found in chat history")

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