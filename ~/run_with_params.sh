#!/bin/bash

# Создаем директорию DrissionPage в нашей временной директории
/bin/mkdir -p $HOME/tmp/DrissionPage/autoPortData
/bin/chmod -R 777 $HOME/tmp/DrissionPage

# Устанавливаем переменные окружения
export TMPDIR=$HOME/tmp
export BROWSER_ARGS="--headless=new --no-sandbox"

# Создаем файл с параметрами браузера для Chrome
cat > $HOME/browser_params.json << PARAMS
{
  "browser_path": "/opt/google/chrome/chrome",
  "driver_path": "/usr/local/bin/chromedriver",
  "headless": true,
  "no_sandbox": true,
  "user_data_dir": "$HOME/tmp/browser_data",
  "additional_args": "--headless=new --no-sandbox"
}
PARAMS

# Создаем директорию для данных браузера
/bin/mkdir -p $HOME/tmp/browser_data
/bin/chmod -R 777 $HOME/tmp/browser_data

# Проверяем наличие chromedriver и устанавливаем его, если он отсутствует
if [ ! -f "/usr/local/bin/chromedriver" ]; then
  echo "Chromedriver не найден. Скачиваем и устанавливаем..."
  
  # Скачиваем последнюю стабильную версию chromedriver
  TMP_DIR=$(mktemp -d)
  cd $TMP_DIR
  
  # Используем фиксированную версию chromedriver (114.0.5735.90)
  DRIVER_VERSION="114.0.5735.90"
  
  echo "Скачиваем chromedriver версии $DRIVER_VERSION..."
  wget "https://chromedriver.storage.googleapis.com/$DRIVER_VERSION/chromedriver_linux64.zip"
  
  # Распаковываем и устанавливаем
  unzip chromedriver_linux64.zip
  sudo mv chromedriver /usr/local/bin/
  sudo chmod +x /usr/local/bin/chromedriver
  
  # Очистка
  cd -
  rm -rf $TMP_DIR
  
  echo "Chromedriver успешно установлен!"
fi

# Обновляем конфигурационный файл для использования Chrome по умолчанию
mkdir -p $HOME/.cursor-free-vip
cat > $HOME/.cursor-free-vip/config.ini << EOF
[Browser]
default_browser = chrome
chrome_path = /bin/google-chrome
chrome_driver_path = /usr/local/bin/chromedriver
edge_path = /usr/bin/microsoft-edge
edge_driver_path = /usr/local/bin/msedgedriver
firefox_path = /usr/lib/firefox/firefox
firefox_driver_path = /usr/local/bin/geckodriver
brave_path = /usr/bin/brave-browser
brave_driver_path = /usr/local/bin/chromedriver
opera_path = /usr/bin/opera
opera_driver_path = /usr/local/bin/chromedriver
operagx_path = /usr/bin/opera-gx
operagx_driver_path = /usr/local/bin/chromedriver

[Turnstile]
handle_turnstile_time = 2
handle_turnstile_random_time = 1-3

[Timing]
min_random_time = 0.1
max_random_time = 0.8
page_load_wait = 0.1-0.8
input_wait = 0.3-0.8
submit_wait = 0.5-1.5
verification_code_input = 0.1-0.3
verification_success_wait = 2-3
verification_retry_wait = 2-3
email_check_initial_wait = 4-6
email_refresh_wait = 2-4
settings_page_load_wait = 1-2
failed_retry_time = 0.5-1
retry_interval = 8-12
max_timeout = 160

[Utils]
enabled_update_check = True
enabled_force_update = False
enabled_account_info = True

[OAuth]
show_selection_alert = False
timeout = 120
max_attempts = 3

[Token]
refresh_server = https://token.cursorpro.com.cn
enable_refresh = True

[Language]
current_language = 
fallback_language = en
auto_update_languages = True
language_cache_dir = $HOME/.cursor-free-vip/language_cache

[LinuxPaths]
storage_path = 
sqlite_path = 
machine_id_path = 
cursor_path = /opt/Cursor/resources/app
updater_path = $HOME/.config/cursor-updater
update_yml_path = 
product_json_path = 

[TempMailPlus]
enabled = false
email = 
epin =
EOF

# Создаем тестовый скрипт для проверки Chrome и chromedriver
mkdir -p $HOME/temp
cat > $HOME/temp/test_chrome.py << EOF
#!/usr/bin/env python3

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import time

print("Запуск теста chromedriver с Chrome...")

try:
    # Настройка сервиса chromedriver
    service = Service(executable_path="/usr/local/bin/chromedriver")
    
    # Настройка опций Chrome
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.binary_location = "/opt/google/chrome/chrome"
    
    # Создание экземпляра Chrome WebDriver
    print("Запуск Chrome...")
    driver = webdriver.Chrome(service=service, options=options)
    
    # Открытие веб-страницы
    print("Открытие веб-страницы...")
    driver.get("https://www.example.com")
    
    # Получение заголовка страницы
    title = driver.title
    print(f"Заголовок страницы: {title}")
    
    # Ожидание 3 секунды
    print("Ожидание 3 секунды...")
    time.sleep(3)
    
    # Закрытие браузера
    print("Закрытие браузера...")
    driver.quit()
    
    print("Тест успешно завершен!")
except Exception as e:
    print(f"Произошла ошибка: {e}")
EOF

chmod +x $HOME/temp/test_chrome.py

# Запускаем тестовый скрипт для проверки Chrome и chromedriver
echo "Тестируем Chrome с chromedriver..."
python3 $HOME/temp/test_chrome.py

# Запускаем оригинальный скрипт (используем абсолютный путь)
/bin/bash $HOME/install_fixed.sh