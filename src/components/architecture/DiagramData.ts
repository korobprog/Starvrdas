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
