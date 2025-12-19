import time

def after_scenario(context, scenario):
    if hasattr(context, 'driver') and context.driver:
        try:
            # 1. Tutup browser secara manual
            context.driver.quit()
        except Exception:
            pass
        finally:
            # 2. TRIK JITU: "Matikan" fungsi quit agar tidak dipanggil lagi oleh destructor (__del__)
            # Ini mencegah OSError: [WinError 6] saat Python membersihkan memori
            try:
                context.driver.quit = lambda: None
            except:
                pass
            
            # 3. Kosongkan variabel driver
            context.driver = None