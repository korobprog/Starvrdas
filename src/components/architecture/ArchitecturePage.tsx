import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Hero from './Hero';
import ContentSection from './ContentSection';
import Subsection from './Subsection';
import MermaidDiagram from './MermaidDiagram';
import ApiGroup from './ApiGroup';
import Phase from './Phase';
import UserForecastChart from './UserForecastChart';
import MetricCard, { MetricIconType } from './MetricCard';
import Footer from './Footer';
import {
  overviewDiagram,
  backendStructureDiagram,
  databaseSchemaDiagram,
  streamingArchitectureDiagram,
  multilanguageArchitectureDiagram,
  multilanguageDataStructureDiagram,
  paymentSystemArchitectureDiagram,
  paymentModuleExtensionDiagram,
  paymentDatabaseSchemaDiagram,
  paymentProcessDiagram,
  paymentBackendIntegrationDiagram,
} from './DiagramData';
import {
  authEndpoints,
  userEndpoints,
  walletEndpoints,
  subscriptionEndpoints,
  paymentEndpoints,
  calendarEndpoints,
  streamingEndpoints,
  analyticsEndpoints,
  websocketEndpoints,
  notificationEndpoints,
} from './ApiEndpoints';
import './Architecture.css';

const ArchitecturePage: React.FC = () => {
  return (
    <div className="architecture-container">
      <Header />
      <Navigation />

      <main className="architecture-main">
        <Hero
          title="Архитектура стриминговой платформы с системой подписок"
          subtitle="Техническая документация"
        />

        <ContentSection id="overview" title="Общий обзор">
          <p>
            Стриминговая платформа представляет собой монолитное приложение с
            модульной структурой, разработанное с учетом возможного перехода к
            микросервисной архитектуре в будущем. Система состоит из трех
            основных клиентских компонентов и серверной части.
          </p>
          <MermaidDiagram chart={overviewDiagram} />
        </ContentSection>

        <ContentSection id="tech-stack" title="Технологический стек">
          <Subsection title="Фронтенд">
            <ul>
              <li>
                <strong>Веб-клиент</strong>: React с TypeScript, Redux для
                управления состоянием
              </li>
              <li>
                <strong>Административная панель</strong>: React с TypeScript,
                Redux, с использованием тех же компонентов, что и веб-клиент
              </li>
              <li>
                <strong>Мобильное приложение</strong>: Progressive Web
                Application (PWA) на основе React с TypeScript для
                кроссплатформенного доступа
              </li>
            </ul>
          </Subsection>

          <Subsection title="Бэкенд">
            <ul>
              <li>
                <strong>Основной сервер</strong>: NestJS (Node.js с TypeScript)
              </li>
              <li>
                <strong>Медиа-сервер</strong>: Ant Media Server
              </li>
              <li>
                <strong>Контейнеризация</strong>: Docker и Docker Compose
              </li>
            </ul>
          </Subsection>

          <Subsection title="База данных и кэширование">
            <ul>
              <li>
                <strong>Основная БД</strong>: PostgreSQL с Prisma ORM
              </li>
              <li>
                <strong>Кэширование</strong>: Redis для сессий, кэширования и
                очередей сообщений
              </li>
            </ul>
          </Subsection>
        </ContentSection>

        <ContentSection
          id="backend-structure"
          title="Модульная структура бэкенда"
        >
          <p>
            Монолитный бэкенд на NestJS будет разделен на модули, каждый из
            которых отвечает за определенную функциональность. Это позволит в
            будущем легко выделить отдельные модули в микросервисы.
          </p>
          <MermaidDiagram chart={backendStructureDiagram} />

          <Subsection title="Модуль аутентификации">
            <ul>
              <li>Интеграция с Telegram API для авторизации</li>
              <li>Управление JWT-токенами</li>
              <li>Проверка прав доступа для администраторов</li>
            </ul>
          </Subsection>

          <Subsection title="Модуль пользователей">
            <ul>
              <li>Управление профилями пользователей</li>
              <li>Разделение на роли (зрители, стримеры, администраторы)</li>
              <li>
                Управление администраторами (@art_om108, @maximkorobkov и др.)
              </li>
            </ul>
          </Subsection>

          <Subsection title="Модуль подписок">
            <ul>
              <li>Гибкая система настройки подписок</li>
              <li>Управление подписками пользователей</li>
            </ul>
          </Subsection>

          <Subsection title="Модуль платежей">
            <ul>
              <li>Интеграция с криптоплатежными шлюзами (BTC, ETH, USDT)</li>
              <li>Подготовка к интеграции с фиатными платежами</li>
            </ul>
          </Subsection>

          <Subsection title="Модуль стриминга">
            <ul>
              <li>Интеграция с Ant Media Server через REST API</li>
              <li>Управление стримами (создание, остановка, мониторинг)</li>
              <li>Интеграция с YouTube и Rutube API</li>
            </ul>
          </Subsection>

          <Subsection title="Модуль уведомлений">
            <ul>
              <li>Отправка уведомлений о начале трансляций</li>
              <li>Push-уведомления для мобильных устройств</li>
              <li>Интеграция с Telegram для отправки сообщений</li>
            </ul>
          </Subsection>

          <Subsection title="Модуль календаря">
            <ul>
              <li>Управление расписанием мероприятий</li>
              <li>Назначение стримеров на мероприятия</li>
              <li>Публикация календаря для пользователей</li>
            </ul>
          </Subsection>

          <Subsection title="Модуль аналитики">
            <ul>
              <li>Сбор данных о просмотрах, подписках, платежах</li>
              <li>Генерация отчетов для администраторов</li>
              <li>Фильтрация данных по различным параметрам</li>
            </ul>
          </Subsection>
        </ContentSection>

        <ContentSection id="database-schema" title="Схема базы данных">
          <MermaidDiagram chart={databaseSchemaDiagram} />
        </ContentSection>

        <ContentSection id="api" title="API-интерфейсы">
          <Subsection title="REST API">
            <ApiGroup title="Аутентификация" endpoints={authEndpoints} />
            <ApiGroup title="Пользователи" endpoints={userEndpoints} />
            <ApiGroup title="Кошелек" endpoints={walletEndpoints} />
            <ApiGroup title="Подписки" endpoints={subscriptionEndpoints} />
            <ApiGroup title="Платежи" endpoints={paymentEndpoints} />
            <ApiGroup title="Календарь" endpoints={calendarEndpoints} />
            <ApiGroup title="Стриминг" endpoints={streamingEndpoints} />
            <ApiGroup title="Аналитика" endpoints={analyticsEndpoints} />
            <ApiGroup title="Уведомления" endpoints={notificationEndpoints} />
          </Subsection>

          <Subsection title="WebSocket API">
            <ApiGroup
              title="WebSocket эндпоинты"
              endpoints={websocketEndpoints}
            />
          </Subsection>
        </ContentSection>

        <ContentSection
          id="streaming-architecture"
          title="Архитектура стриминга"
        >
          <p>
            Для обеспечения высококачественного стриминга с минимальной
            задержкой используется Ant Media Server, который поддерживает
            различные протоколы стриминга и может масштабироваться при
            увеличении нагрузки.
          </p>
          <MermaidDiagram chart={streamingArchitectureDiagram} />

          <Subsection title="Протоколы стриминга">
            <ul>
              <li>
                <strong>RTMP</strong> - для входящих потоков от стримеров
              </li>
              <li>
                <strong>WebRTC</strong> - для зрителей, требующих минимальной
                задержки
              </li>
              <li>
                <strong>HLS</strong> - для зрителей с ограниченной пропускной
                способностью
              </li>
            </ul>
          </Subsection>

          <Subsection title="Адаптивный битрейт">
            <p>
              Система автоматически адаптирует качество видео в зависимости от
              пропускной способности канала зрителя:
            </p>
            <ul>
              <li>Высокое качество (1080p) - 3-6 Мбит/с</li>
              <li>Среднее качество (720p) - 1.5-3 Мбит/с</li>
              <li>Низкое качество (480p) - 0.8-1.5 Мбит/с</li>
              <li>Мобильное качество (360p) - 0.5-0.8 Мбит/с</li>
            </ul>
          </Subsection>

          <Subsection title="Запись и хранение">
            <p>
              Все стримы автоматически записываются и сохраняются для
              последующего просмотра:
            </p>
            <ul>
              <li>Временное хранение на локальных дисках Ant Media Server</li>
              <li>Долгосрочное хранение в облачном хранилище</li>
              <li>Автоматическое создание превью и миниатюр</li>
            </ul>
          </Subsection>
        </ContentSection>

        <ContentSection id="implementation-plan" title="План реализации">
          <Phase title="Фаза 1: Базовая функциональность (1 месяц)">
            <ul>
              <li>Настройка инфраструктуры и окружения разработки</li>
              <li>Реализация базовой структуры бэкенда</li>
              <li>Интеграция с Telegram API для авторизации</li>
              <li>Реализация базовой функциональности стриминга</li>
              <li>Разработка основных компонентов веб-клиента</li>
            </ul>
          </Phase>

          <Phase title="Фаза 2: Расширенная функциональность (1 месяц)">
            <ul>
              <li>Реализация системы подписок</li>
              <li>Интеграция с криптоплатежными шлюзами</li>
              <li>Разработка административной панели</li>
              <li>Реализация календаря мероприятий</li>
              <li>Интеграция с YouTube и Rutube API</li>
            </ul>
          </Phase>

          <Phase title="Фаза 3: Финальная доработка (1 месяц)">
            <ul>
              <li>Разработка PWA для стримеров</li>
              <li>Реализация системы аналитики</li>
              <li>Оптимизация производительности</li>
              <li>Тестирование и исправление ошибок</li>
              <li>Подготовка к запуску</li>
            </ul>
          </Phase>
        </ContentSection>

        <ContentSection id="user-forecast" title="Прогноз пользователей">
          <p>
            На основе анализа рынка и потенциальной аудитории был составлен
            прогноз роста пользователей платформы в течение первого года после
            запуска.
          </p>

          <UserForecastChart />

          <div className="key-metrics">
            <MetricCard
              label="Время реализации"
              value="3 месяца"
              icon={MetricIconType.TIME}
              description="Полный цикл разработки"
              color="#3498db"
            />
            <MetricCard
              label="Стоимость проекта"
              value="15 000 ₽"
              icon={MetricIconType.COST}
              description="В месяц"
              color="#e74c3c"
            />
            <MetricCard
              label="Прогноз пользователей через 6 месяцев"
              value="5 000"
              icon={MetricIconType.USERS}
              color="#2ecc71"
            />
            <MetricCard
              label="Прогноз пользователей через 12 месяцев"
              value="15 000"
              icon={MetricIconType.USERS}
              color="#2ecc71"
            />
            <MetricCard
              label="Конверсия в платящих пользователей"
              value="8%"
              icon={MetricIconType.CONVERSION}
              color="#f39c12"
            />
            <MetricCard
              label="Средний доход с пользователя"
              value="500 ₽"
              icon={MetricIconType.COST}
              color="#9b59b6"
            />
          </div>
        </ContentSection>

        <ContentSection
          id="multilanguage"
          title="Многоязычность клиентского приложения"
        >
          <p>
            Система многоязычности обеспечивает полную локализацию интерфейса и
            контента приложения для различных языков, с возможностью
            динамического переключения и автоматического определения
            предпочтительного языка пользователя.
          </p>

          <Subsection title="Общая архитектура многоязычности">
            <MermaidDiagram chart={multilanguageArchitectureDiagram} />
          </Subsection>

          <Subsection title="Технический стек для многоязычности">
            <ul>
              <li>
                <strong>Фронтенд</strong>:
                <ul>
                  <li>
                    React-i18next для управления переводами в React-приложениях
                  </li>
                  <li>Формат JSON для файлов переводов</li>
                  <li>
                    Динамическая загрузка языковых пакетов для оптимизации
                    производительности
                  </li>
                  <li>
                    Компоненты с поддержкой RTL (для возможного добавления
                    языков с письмом справа налево в будущем)
                  </li>
                </ul>
              </li>
              <li>
                <strong>Бэкенд</strong>:
                <ul>
                  <li>
                    NestJS i18n модуль для локализации серверных сообщений
                  </li>
                  <li>
                    Хранение локализованного контента в базе данных с языковыми
                    метками
                  </li>
                  <li>
                    API для получения переводов и локализованного контента
                  </li>
                </ul>
              </li>
            </ul>
          </Subsection>

          <Subsection title="Структура данных для многоязычности">
            <MermaidDiagram chart={multilanguageDataStructureDiagram} />
          </Subsection>

          <Subsection title="API для многоязычности">
            <ul>
              <li>
                <code>GET /api/languages</code> - Получение списка доступных
                языков
              </li>
              <li>
                <code>GET /api/translations/:lang</code> - Получение переводов
                для конкретного языка
              </li>
              <li>
                <code>GET /api/translations/:lang/:namespace</code> - Получение
                переводов для конкретного языка и пространства имен
              </li>
              <li>
                <code>PATCH /api/users/me/language</code> - Обновление языковых
                предпочтений пользователя
              </li>
            </ul>
          </Subsection>

          <Subsection title="Компоненты пользовательского интерфейса для многоязычности">
            <ul>
              <li>Селектор языка в шапке сайта</li>
              <li>Автоматическое определение языка при первом посещении</li>
              <li>
                Сохранение выбранного языка в профиле пользователя и локальном
                хранилище
              </li>
              <li>
                Адаптация UI под особенности выбранного языка (длина текста,
                направление письма)
              </li>
            </ul>
          </Subsection>
        </ContentSection>

        <ContentSection id="payment-systems" title="Платежные системы">
          <p>
            Система платежей обеспечивает гибкую интеграцию с различными
            платежными шлюзами в зависимости от региона пользователя, с
            поддержкой множества валют и соблюдением региональных регуляторных
            требований.
          </p>

          <Subsection title="Общая архитектура платежной системы">
            <MermaidDiagram chart={paymentSystemArchitectureDiagram} />
          </Subsection>

          <Subsection title="Расширение модуля платежей">
            <MermaidDiagram chart={paymentModuleExtensionDiagram} />
          </Subsection>

          <Subsection title="Расширение схемы базы данных">
            <MermaidDiagram chart={paymentDatabaseSchemaDiagram} />
          </Subsection>

          <Subsection title="Процесс обработки платежей">
            <MermaidDiagram chart={paymentProcessDiagram} />
          </Subsection>

          <Subsection title="Интеграция с платежными шлюзами">
            <Subsection title="Россия">
              <ul>
                <li>
                  <strong>ЮKassa (Юмани)</strong> - для карт и электронных
                  кошельков
                </li>
                <li>
                  <strong>Система быстрых платежей (СБП)</strong> - для
                  банковских переводов
                </li>
                <li>
                  <strong>Криптовалютные шлюзы</strong> - для платежей в BTC,
                  ETH, USDT
                </li>
              </ul>
            </Subsection>

            <Subsection title="СНГ">
              <ul>
                <li>
                  <strong>Kaspi KZ</strong> - для Казахстана
                </li>
                <li>
                  <strong>Белкарт</strong> - для Беларуси
                </li>
                <li>
                  <strong>Криптовалютные шлюзы</strong> - для всех стран СНГ
                </li>
              </ul>
            </Subsection>

            <Subsection title="Европа">
              <ul>
                <li>
                  <strong>Stripe</strong> - для карт и банковских переводов
                </li>
                <li>
                  <strong>PayPal</strong> - для электронных платежей
                </li>
                <li>
                  <strong>Криптовалютные шлюзы</strong> - для всех европейских
                  стран
                </li>
              </ul>
            </Subsection>

            <Subsection title="Индия">
              <ul>
                <li>
                  <strong>UPI (Unified Payments Interface)</strong> - популярная
                  система мгновенных платежей
                </li>
                <li>
                  <strong>Paytm</strong> - крупнейший цифровой кошелек и
                  платежная система
                </li>
                <li>
                  <strong>RazorPay</strong> - платежный шлюз для онлайн-бизнеса
                </li>
                <li>
                  <strong>PhonePe</strong> - популярное платежное приложение
                </li>
                <li>
                  <strong>Google Pay India</strong> - адаптированная для
                  индийского рынка версия
                </li>
              </ul>
            </Subsection>
          </Subsection>

          <Subsection title="Соответствие регуляторным требованиям">
            <Subsection title="Индия">
              <ul>
                <li>
                  <strong>Требования RBI (Reserve Bank of India):</strong>
                  <ul>
                    <li>
                      Двухфакторная аутентификация для всех онлайн-транзакций
                    </li>
                    <li>
                      Хранение данных платежных карт только на серверах в Индии
                    </li>
                    <li>
                      Соответствие стандарту PCI DSS для обработки платежных
                      данных
                    </li>
                    <li>Интеграция с системой UPI для мгновенных платежей</li>
                  </ul>
                </li>
                <li>
                  <strong>Требования KYC (Know Your Customer):</strong>
                  <ul>
                    <li>
                      Верификация личности для транзакций выше определенной
                      суммы
                    </li>
                    <li>
                      Сбор и хранение необходимых идентификационных данных
                    </li>
                    <li>
                      Интеграция с Aadhaar (система уникальной идентификации в
                      Индии)
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Налоговые требования:</strong>
                  <ul>
                    <li>
                      Автоматический расчет и удержание GST (Goods and Services
                      Tax)
                    </li>
                    <li>
                      Формирование налоговых отчетов для индийских пользователей
                    </li>
                    <li>
                      Соответствие требованиям TDS (Tax Deducted at Source)
                    </li>
                  </ul>
                </li>
              </ul>
            </Subsection>
          </Subsection>

          <Subsection title="API для платежей">
            <ul>
              <li>
                <code>GET /api/payment-methods</code> - Получение доступных
                методов оплаты для текущего региона пользователя
              </li>
              <li>
                <code>GET /api/currencies</code> - Получение списка
                поддерживаемых валют
              </li>
              <li>
                <code>GET /api/subscription-plans/prices</code> - Получение цен
                планов подписок в валюте пользователя
              </li>
              <li>
                <code>POST /api/payments/init</code> - Инициализация платежа с
                выбором платежного метода
              </li>
              <li>
                <code>GET /api/regions</code> - Получение информации о регионах
                и доступных платежных методах
              </li>
            </ul>
          </Subsection>

          <Subsection title="Интеграция многоязычности и платежных шлюзов">
            <p>
              Интеграция платежных шлюзов с системой многоязычности обеспечивает
              корректное отображение информации о платежах на языке пользователя
              и учитывает региональные особенности.
            </p>
            <MermaidDiagram chart={paymentBackendIntegrationDiagram} />
          </Subsection>
        </ContentSection>
      </main>
      <Footer />
    </div>
  );
};

export default ArchitecturePage;
