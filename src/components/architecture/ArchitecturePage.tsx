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
      </main>
      <Footer />
    </div>
  );
};

export default ArchitecturePage;
