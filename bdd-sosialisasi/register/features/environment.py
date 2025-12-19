def after_scenario(context, scenario):
    if hasattr(context, 'driver'):
        try:
            context.driver.quit()
        except Exception as e:
            print(f"Error while quitting driver: {e}")