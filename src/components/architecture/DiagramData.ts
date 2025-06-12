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
    USERS {
        id UUID PK
        telegram_id String UK
        username String
        role UserRole
        wallet_balance Decimal
        wallet_currency String
        profile_image String
        created_at DateTime
        updated_at DateTime
    }

    ADMINS {
        id UUID PK
        user_id UUID FK
        permissions JSON
        created_at DateTime
        updated_at DateTime
    }

    SUBSCRIPTION_PLANS {
        id UUID PK
        name String
        description String
        price Decimal
        currency String
        duration Integer
        features JSON
        created_at DateTime
        updated_at DateTime
    }

    SUBSCRIPTIONS {
        id UUID PK
        user_id UUID FK
        plan_id UUID FK
        event_id UUID FK
        start_date DateTime
        end_date DateTime
        status SubscriptionStatus
        created_at DateTime
        updated_at DateTime
    }

    PAYMENTS {
        id UUID PK
        user_id UUID FK
        subscription_id UUID FK
        amount Decimal
        currency String
        payment_method String
        status PaymentStatus
        transaction_id String
        created_at DateTime
        updated_at DateTime
    }

    WALLET_TRANSACTIONS {
        id UUID PK
        user_id UUID FK
        amount Decimal
        currency String
        transaction_type TransactionType
        reference_id UUID
        reference_type String
        status TransactionStatus
        created_at DateTime
    }

    EVENTS {
        id UUID PK
        title String
        description String
        start_time DateTime
        end_time DateTime
        streamer_id UUID FK
        price Decimal
        currency String
        status EventStatus
        created_at DateTime
        updated_at DateTime
    }

    STREAMS {
        id UUID PK
        event_id UUID FK
        streamer_id UUID FK
        title String
        description String
        stream_key String
        status StreamStatus
        start_time DateTime
        end_time DateTime
        youtube_url String
        rutube_url String
        share_url String
        created_at DateTime
        updated_at DateTime
    }

    VIEWS {
        id UUID PK
        stream_id UUID FK
        user_id UUID FK
        start_time DateTime
        end_time DateTime
        duration Integer
        device_info JSON
        created_at DateTime
    }

    SHARES {
        id UUID PK
        user_id UUID FK
        stream_id UUID FK
        platform String
        created_at DateTime
    }

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
