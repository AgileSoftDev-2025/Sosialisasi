def after_scenario(context, scenario):
    if hasattr(context, 'driver') and context.driver:
        context.driver.quit()