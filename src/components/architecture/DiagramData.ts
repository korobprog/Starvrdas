// Диаграммы Mermaid для архитектурной документации

export const overviewDiagram = `
graph TD
    subgraph "Клиентские приложения"
        A[Веб-клиент на React]
        B[Административная панель на React]
        C[PWA для стримеров]
    end

    subgraph "Серверная часть"
        D[Монолитный бэкенд на NestJS]
        E[Ant Media Server]
        F[(PostgreSQL + Prisma)]
        G[(Redis)]
    end

    subgraph "Внешние сервисы"
        H[Telegram API]
        I[Криптоплатежные шлюзы]
        J[YouTube API]
        K[Rutube API]
    end

    A --> D
    B --> D
    C --> D
    C --> E
    D --> E
    D --> F
    D --> G
    D --> H
    D --> I
    E --> J
    E --> K
`;

export const backendStructureDiagram = `
graph TD
    subgraph "NestJS Монолит"
        A[Основной модуль]
        B[Модуль аутентификации]
        C[Модуль пользователей]
        D[Модуль подписок]
        E[Модуль платежей]
        F[Модуль стриминга]
        G[Модуль уведомлений]
        H[Модуль календаря]
        I[Модуль аналитики]
    end

    A --> B
    A --> C
    A --> D
    A --> E
    A --> F
    A --> G
    A --> H
    A --> I
`;

export const databaseSchemaDiagram = `
erDiagram
    USERS ||--o{ SUBSCRIPTIONS : "имеет"
    USERS ||--o{ PAYMENTS : "совершает"
    USERS ||--o{ STREAMS : "создает"
    USERS ||--o{ VIEWS : "просматривает"
    USERS ||--o{ ADMINS : "может быть"
    USERS ||--o{ WALLET_TRANSACTIONS : "имеет"
    USERS ||--o{ SHARES : "делает"
    SUBSCRIPTION_PLANS ||--o{ SUBSCRIPTIONS : "используется в"
    SUBSCRIPTIONS ||--o{ PAYMENTS : "оплачивается через"
    EVENTS ||--o{ STREAMS : "имеет"
    EVENTS ||--o{ SUBSCRIPTIONS : "имеет"
    STREAMS ||--o{ VIEWS : "имеет"
    STREAMS ||--o{ SHARES : "имеет"
    
    USERS {
        UUID id PK
        String telegram_id UK
        String username
        UserRole role
        Decimal wallet_balance
        String wallet_currency
        String profile_image
        DateTime created_at
        DateTime updated_at
    }

    ADMINS {
        UUID id PK
        UUID user_id FK
        JSON permissions
        DateTime created_at
        DateTime updated_at
    }

    SUBSCRIPTION_PLANS {
        UUID id PK
        String name
        String description
        Decimal price
        String currency
        Integer duration
        JSON features
        DateTime created_at
        DateTime updated_at
    }

    SUBSCRIPTIONS {
        UUID id PK
        UUID user_id FK
        UUID plan_id FK
        UUID event_id FK
        DateTime start_date
        DateTime end_date
        SubscriptionStatus status
        DateTime created_at
        DateTime updated_at
    }

    PAYMENTS {
        UUID id PK
        UUID user_id FK
        UUID subscription_id FK
        Decimal amount
        String currency
        String payment_method
        PaymentStatus status
        String transaction_id
        DateTime created_at
        DateTime updated_at
    }

    WALLET_TRANSACTIONS {
        UUID id PK
        UUID user_id FK
        Decimal amount
        String currency
        TransactionType transaction_type
        UUID reference_id
        String reference_type
        TransactionStatus status
        DateTime created_at
    }

    EVENTS {
        UUID id PK
        String title
        String description
        DateTime start_time
        DateTime end_time
        UUID streamer_id FK
        Decimal price
        String currency
        EventStatus status
        DateTime created_at
        DateTime updated_at
    }

    STREAMS {
        UUID id PK
        UUID event_id FK
        UUID streamer_id FK
        String title
        String description
        String stream_key
        StreamStatus status
        DateTime start_time
        DateTime end_time
        String youtube_url
        String rutube_url
        String share_url
        DateTime created_at
        DateTime updated_at
    }

    VIEWS {
        UUID id PK
        UUID stream_id FK
        UUID user_id FK
        DateTime start_time
        DateTime end_time
        Integer duration
        JSON device_info
        DateTime created_at
    }

    SHARES {
        UUID id PK
        UUID user_id FK
        UUID stream_id FK
        String platform
        DateTime created_at
    }
`;

export const streamingArchitectureDiagram = `
graph TD
   A[Стример] -->|RTMP| B[Ant Media Server]
   B -->|WebRTC| C[Зритель 1]
   B -->|HLS| D[Зритель 2]
   B -->|RTMP| E[YouTube]
   B -->|RTMP| F[Rutube]
   B -->|WebSocket| G[Статистика и чат]
`;

export const multilanguageArchitectureDiagram = `
graph TD
   A[Клиентское приложение] --> B[i18n модуль]
   B --> C[Хранилище переводов]
   B --> D[Компоненты с поддержкой локализации]
   B --> E[Сервис определения языка]
   E --> F[Определение по браузеру]
   E --> G[Выбор пользователя]
   E --> H[Геолокация]
   C --> I[Русский язык]
   C --> J[Английский язык]
   K[Бэкенд] --> L[API с поддержкой локализации]
   L --> M[Локализованные данные]
   L --> N[Метаданные контента]
`;

export const multilanguageDataStructureDiagram = `
erDiagram
   LANGUAGES {
       UUID id PK
       String code UK
       String name
       Boolean is_default
       Boolean is_active
       DateTime created_at
       DateTime updated_at
   }

   TRANSLATIONS {
       UUID id PK
       UUID language_id FK
       String namespace
       String key
       Text value
       DateTime created_at
       DateTime updated_at
   }

   LOCALIZED_CONTENT {
       UUID id PK
       UUID entity_id
       String entity_type
       UUID language_id FK
       String field_name
       Text value
       DateTime created_at
       DateTime updated_at
   }

   USER_LANGUAGE_PREFERENCES {
       UUID id PK
       UUID user_id FK
       UUID language_id FK
       DateTime created_at
       DateTime updated_at
   }

   LANGUAGES ||--o{ TRANSLATIONS : "содержит"
   LANGUAGES ||--o{ LOCALIZED_CONTENT : "имеет"
   LANGUAGES ||--o{ USER_LANGUAGE_PREFERENCES : "выбран"
`;

export const paymentSystemArchitectureDiagram = `
graph TD
   A[Модуль платежей] --> B[Абстрактный интерфейс платежного шлюза]
   B --> C[Фабрика платежных шлюзов]
   C --> D[Определение региона пользователя]
   D --> E[Выбор доступных платежных методов]

   C --> F[Платежные шлюзы России]
   C --> G[Платежные шлюзы СНГ]
   C --> H[Платежные шлюзы Европы]
   C --> I[Платежные шлюзы Индии]

   F --> F1[ЮKassa]
   F --> F2[СБП]
   F --> F3[Криптовалютные шлюзы]

   G --> G1[Kaspi KZ]
   G --> G2[Белкарт]
   G --> G3[Криптовалютные шлюзы]

   H --> H1[Stripe]
   H --> H2[PayPal]
   H --> H3[Криптовалютные шлюзы]

   I --> I1[UPI]
   I --> I2[Paytm]
   I --> I3[RazorPay]
   I --> I4[PhonePe]
   I --> I5[Google Pay India]

   J[Сервис валидации платежей] --> K[Проверка статуса]
   J --> L[Обработка колбэков]
   J --> M[Обработка ошибок]

   N[Сервис конвертации валют] --> O[Актуальные курсы валют]
   N --> P[Расчет комиссий]

   Q[Сервис соответствия регуляторным требованиям] --> R[Россия]
   Q --> S[СНГ]
   Q --> T[Европа]
   Q --> U[Индия]
`;

export const paymentModuleExtensionDiagram = `
graph TD
   A[Модуль платежей] --> B[Подмодуль региональных платежей]
   B --> C[Сервис определения региона]
   B --> D[Сервис доступных методов оплаты]
   B --> E[Сервис валидации платежей]
   B --> F[Сервис конвертации валют]
   B --> G[Сервис соответствия регуляторным требованиям]

   H[Модуль подписок] --> I[Региональные цены]
   H --> J[Валютные настройки]

   K[Модуль пользователей] --> L[Региональные настройки]
   K --> M[Предпочитаемая валюта]
`;

export const paymentDatabaseSchemaDiagram = `
erDiagram
   PAYMENT_GATEWAYS {
       id UUID PK
       name String
       code String UK
       region String
       countries JSON
       currencies JSON
       config JSON
       is_active Boolean
       created_at DateTime
       updated_at DateTime
   }

   PAYMENT_METHODS {
       id UUID PK
       gateway_id UUID FK
       name String
       code String
       icon String
       min_amount Decimal
       max_amount Decimal
       currencies JSON
       is_active Boolean
       created_at DateTime
       updated_at DateTime
   }

   CURRENCIES {
       id UUID PK
       code String UK
       name String
       symbol String
       is_default Boolean
       is_active Boolean
       created_at DateTime
       updated_at DateTime
   }

   EXCHANGE_RATES {
       id UUID PK
       from_currency String
       to_currency String
       rate Decimal
       updated_at DateTime
   }

   REGIONS {
       id UUID PK
       code String UK
       name String
       countries JSON
       default_currency String
       available_gateways JSON
       created_at DateTime
       updated_at DateTime
   }

   REGULATORY_REQUIREMENTS {
       id UUID PK
       region_id UUID FK
       code String
       name String
       description Text
       implementation_details JSON
       is_mandatory Boolean
       created_at DateTime
       updated_at DateTime
   }

   SUBSCRIPTION_PLANS ||--o{ SUBSCRIPTION_PLAN_PRICES : "имеет"
   SUBSCRIPTION_PLAN_PRICES {
       id UUID PK
       plan_id UUID FK
       currency_id UUID FK
       region_id UUID FK
       price Decimal
       created_at DateTime
       updated_at DateTime
   }

   PAYMENT_GATEWAYS ||--o{ PAYMENT_METHODS : "предоставляет"
   REGIONS ||--o{ SUBSCRIPTION_PLAN_PRICES : "имеет"
   REGIONS ||--o{ REGULATORY_REQUIREMENTS : "требует"
   CURRENCIES ||--o{ SUBSCRIPTION_PLAN_PRICES : "используется в"
   CURRENCIES ||--o{ EXCHANGE_RATES : "конвертируется из"
   CURRENCIES ||--o{ EXCHANGE_RATES : "конвертируется в"
`;

export const paymentProcessDiagram = `
sequenceDiagram
   participant User as Пользователь
   participant Frontend as Фронтенд
   participant API as API сервер
   participant PaymentService as Сервис платежей
   participant RegService as Сервис регуляторных требований
   participant Gateway as Платежный шлюз
   participant DB as База данных

   User->>Frontend: Выбор подписки
   Frontend->>API: Запрос доступных методов оплаты
   API->>PaymentService: Определение региона пользователя
   PaymentService->>DB: Получение доступных шлюзов для региона
   DB->>PaymentService: Список доступных шлюзов
   PaymentService->>RegService: Проверка регуляторных требований
   RegService->>PaymentService: Применимые требования
   PaymentService->>API: Доступные методы оплаты с учетом требований
   API->>Frontend: Отображение методов оплаты

   User->>Frontend: Выбор метода оплаты
   Frontend->>API: Инициализация платежа
   API->>PaymentService: Создание платежа
   PaymentService->>RegService: Применение регуляторных требований
   RegService->>PaymentService: Модифицированный запрос платежа
   PaymentService->>Gateway: Запрос на создание платежа
   Gateway->>PaymentService: Ссылка на оплату / токен
   PaymentService->>DB: Сохранение информации о платеже
   PaymentService->>API: Данные для оплаты
   API->>Frontend: Перенаправление на оплату

   User->>Gateway: Оплата
   Gateway->>API: Уведомление о статусе платежа (webhook)
   API->>PaymentService: Обработка уведомления
   PaymentService->>RegService: Проверка соответствия требованиям
   RegService->>PaymentService: Результат проверки
   PaymentService->>DB: Обновление статуса платежа
   PaymentService->>DB: Активация подписки

   User->>Frontend: Возврат на сайт
   Frontend->>API: Проверка статуса платежа
   API->>PaymentService: Запрос статуса
   PaymentService->>DB: Получение статуса
   DB->>PaymentService: Статус платежа
   PaymentService->>API: Результат платежа
   API->>Frontend: Отображение результата
`;

export const paymentBackendIntegrationDiagram = `
graph TD
   subgraph "NestJS Монолит"
       A[Основной модуль]
       B[Модуль аутентификации]
       C[Модуль пользователей]
       D[Модуль подписок]
       E[Модуль платежей]
       F[Модуль стриминга]
       G[Модуль уведомлений]
       H[Модуль календаря]
       I[Модуль аналитики]
       J[Модуль локализации]
       K[Модуль региональных настроек]
       L[Модуль регуляторных требований]
   end

   A --> B
   A --> C
   A --> D
   A --> E
   A --> F
   A --> G
   A --> H
   A --> I
   A --> J
   A --> K
   A --> L

   J --> C
   J --> D
   J --> G
   J --> H

   K --> C
   K --> D
   K --> E

   L --> E
   L --> C
`;
