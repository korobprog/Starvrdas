#!/bin/bash

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Создаем директории для временных файлов
echo -e "${CYAN}ℹ️ Создание временных директорий...${NC}"
/bin/mkdir -p $HOME/tmp/DrissionPage/autoPortData
/bin/chmod -R 777 $HOME/tmp/DrissionPage
/bin/mkdir -p $HOME/tmp/browser_data
/bin/chmod -R 777 $HOME/tmp/browser_data

# Устанавливаем переменные окружения для браузера
export TMPDIR=$HOME/tmp
export BROWSER_ARGS="--headless=new --no-sandbox --disable-dev-shm-usage"
export BROWSER_PATH="/opt/google/chrome/chrome"
export DRIVER_PATH="/usr/local/bin/chromedriver"
export BROWSER_TYPE="chrome"
export BROWSER_USER_DATA_DIR="$HOME/tmp/browser_data"

# Проверяем наличие chromedriver и устанавливаем его, если он отсутствует
if [ ! -f "/usr/local/bin/chromedriver" ]; then
  echo -e "${YELLOW}⚠️ Chromedriver не найден. Скачиваем и устанавливаем...${NC}"
  
  # Скачиваем последнюю стабильную версию chromedriver
  TMP_DIR=$(mktemp -d)
  cd $TMP_DIR
  
  # Используем фиксированную версию chromedriver (114.0.5735.90)
  DRIVER_VERSION="114.0.5735.90"
  
  echo -e "${CYAN}ℹ️ Скачиваем chromedriver версии ${DRIVER_VERSION}...${NC}"
  wget "https://chromedriver.storage.googleapis.com/${DRIVER_VERSION}/chromedriver_linux64.zip"
  
  # Распаковываем и устанавливаем
  unzip chromedriver_linux64.zip
  sudo mv chromedriver /usr/local/bin/
  sudo chmod +x /usr/local/bin/chromedriver
  
  # Очистка
  cd -
  rm -rf $TMP_DIR
  
  echo -e "${GREEN}✅ Chromedriver успешно установлен!${NC}"
fi

# Создаем тестовый скрипт для проверки Chrome и chromedriver
echo -e "${CYAN}ℹ️ Создание тестового скрипта для Chrome...${NC}"
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
echo -e "${CYAN}ℹ️ Тестируем Chrome с chromedriver...${NC}"
python3 $HOME/temp/test_chrome.py

# Если тест прошел успешно, запускаем CursorFreeVIP
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Тест Chrome успешно завершен!${NC}"
    
    # Получаем последнюю версию CursorFreeVIP
    echo -e "${CYAN}ℹ️ Проверка последней версии CursorFreeVIP...${NC}"
    latest_release=$(/usr/bin/curl -s https://api.github.com/repos/yeongpin/cursor-free-vip/releases/latest) || {
        echo -e "${RED}❌ Не удалось получить информацию о последней версии${NC}"
        exit 1
    }
    
    VERSION=$(echo "$latest_release" | /bin/grep -o '"tag_name": ".*"' | /usr/bin/cut -d'"' -f4 | /usr/bin/tr -d 'v')
    if [ -z "$VERSION" ]; then
        echo -e "${RED}❌ Не удалось получить версию из ответа GitHub API${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Найдена последняя версия: ${VERSION}${NC}"
    
    # Определяем архитектуру системы
    if [[ "$(/usr/bin/uname)" == "Linux" ]]; then
        ARCH=$(/usr/bin/uname -m)
        if [[ "$ARCH" == "aarch64" || "$ARCH" == "arm64" ]]; then
            OS="linux_arm64"
        else
            OS="linux_x64"
        fi
    else
        echo -e "${RED}❌ Неподдерживаемая операционная система${NC}"
        exit 1
    fi
    
    # Скачиваем и запускаем CursorFreeVIP
    local downloads_dir="$HOME/Downloads"
    local binary_name="CursorFreeVIP_${VERSION}_${OS}"
    local binary_path="${downloads_dir}/${binary_name}"
    local download_url="https://github.com/yeongpin/cursor-free-vip/releases/download/v${VERSION}/${binary_name}"
    
    # Проверяем, существует ли файл
    if [ -f "${binary_path}" ]; then
        echo -e "${GREEN}✅ Найден существующий файл установки${NC}"
    else
        echo -e "${CYAN}ℹ️ Скачиваем CursorFreeVIP...${NC}"
        mkdir -p "${downloads_dir}"
        
        if ! /usr/bin/curl -L -o "${binary_path}" "$download_url"; then
            echo -e "${RED}❌ Не удалось скачать файл${NC}"
            
            # Пробуем без архитектуры
            if [[ "$OS" == "linux_x64" || "$OS" == "linux_arm64" ]]; then
                OS="linux"
                binary_name="CursorFreeVIP_${VERSION}_${OS}"
                binary_path="${downloads_dir}/${binary_name}"
                download_url="https://github.com/yeongpin/cursor-free-vip/releases/download/v${VERSION}/${binary_name}"
                
                echo -e "${CYAN}ℹ️ Пробуем скачать без указания архитектуры: ${download_url}${NC}"
                if ! /usr/bin/curl -L -o "${binary_path}" "$download_url"; then
                    echo -e "${RED}❌ Не удалось скачать файл${NC}"
                    exit 1
                fi
            else
                exit 1
            fi
        fi
    fi
    
    # Запускаем CursorFreeVIP
    echo -e "${CYAN}ℹ️ Запуск CursorFreeVIP...${NC}"
    chmod +x "${binary_path}"
    "${binary_path}"
else
    echo -e "${RED}❌ Тест Chrome завершился с ошибкой. Проверьте настройки браузера.${NC}"
    exit 1
fi