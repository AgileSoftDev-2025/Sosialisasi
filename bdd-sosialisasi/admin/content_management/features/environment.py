import undetected_chromedriver as uc
from selenium.webdriver.common.by import By

def before_all(context):
    context.base_url = "http://localhost:3000"
    
    options = uc.ChromeOptions()
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--start-maximized')
    
    context.driver = uc.Chrome(options=options)
    context.driver.maximize_window()
    context.driver.implicitly_wait(10)

def after_all(context):
    if hasattr(context, 'driver') and context.driver:
        context.driver.quit()