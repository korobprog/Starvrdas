#!/usr/bin/env python3

from selenium import webdriver
from selenium.webdriver.firefox.service import Service
import time

print("Запуск теста geckodriver...")

try:
    # Настройка сервиса geckodriver
    service = Service(executable_path="/usr/local/bin/geckodriver")
    
    # Создание экземпляра Firefox WebDriver
    print("Запуск Firefox...")
    driver = webdriver.Firefox(service=service)
    
    # Открытие веб-страницы
    print("Открытие веб-страницы...")
    driver.get("https://www.example.com")
    
    # Получение заголовка страницы
    title = driver.title
    print(f"Заголовок страницы: {title}")
    
    # Ожидание 3 секунды, чтобы увидеть браузер
    print("Ожидание 3 секунды...")
    time.sleep(3)
    
    # Закрытие браузера
    print("Закрытие браузера...")
    driver.quit()
    
    print("Тест успешно завершен!")
except Exception as e:
    print(f"Произошла ошибка: {e}")