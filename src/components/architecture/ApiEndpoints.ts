// API эндпоинты для архитектурной документации

export interface ApiParameter {
  name: string;
  type: string;
  description: string;
  required?: boolean;
}

export interface ApiResponse {
  status: number;
  description: string;
  schema?: string;
}

export interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
  parameters?: ApiParameter[];
  responses?: ApiResponse[];
}

export const authEndpoints: ApiEndpoint[] = [
  {
    method: 'POST',
    path: '/api/auth/telegram',
    description: 'Авторизация через Telegram',
    parameters: [
      {
        name: 'telegramAuthData',
        type: 'object',
        description: 'Данные авторизации от Telegram',
        required: true,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Успешная авторизация',
        schema: '{ token: string, refreshToken: string, user: User }',
      },
      {
        status: 401,
        description: 'Ошибка авторизации',
      },
    ],
  },
  {
    method: 'POST',
    path: '/api/auth/refresh',
    description: 'Обновление токена',
    parameters: [
      {
        name: 'refreshToken',
        type: 'string',
        description: 'Токен обновления',
        required: true,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Токен успешно обновлен',
        schema: '{ token: string, refreshToken: string }',
      },
      {
        status: 401,
        description: 'Недействительный токен обновления',
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/auth/me',
    description: 'Получение информации о текущем пользователе',
    responses: [
      {
        status: 200,
        description: 'Информация о пользователе',
        schema: '{ id: string, username: string, role: string, ... }',
      },
      {
        status: 401,
        description: 'Пользователь не авторизован',
      },
    ],
  },
];

export const userEndpoints: ApiEndpoint[] = [
  {
    method: 'GET',
    path: '/api/users',
    description: 'Получение списка пользователей (для админов)',
    parameters: [
      {
        name: 'page',
        type: 'number',
        description: 'Номер страницы',
        required: false,
      },
      {
        name: 'limit',
        type: 'number',
        description: 'Количество записей на странице',
        required: false,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Список пользователей',
        schema: '{ users: User[], total: number, page: number, limit: number }',
      },
      {
        status: 403,
        description: 'Доступ запрещен',
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/users/:id',
    description: 'Получение информации о пользователе',
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'Идентификатор пользователя',
        required: true,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Информация о пользователе',
        schema: '{ id: string, username: string, role: string, ... }',
      },
      {
        status: 404,
        description: 'Пользователь не найден',
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/users/me',
    description: 'Получение информации о текущем пользователе',
    responses: [
      {
        status: 200,
        description: 'Информация о текущем пользователе',
        schema: '{ id: string, username: string, role: string, ... }',
      },
      {
        status: 401,
        description: 'Пользователь не авторизован',
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/users/me/profile',
    description: 'Получение профиля текущего пользователя',
    responses: [
      {
        status: 200,
        description: 'Профиль пользователя',
        schema: '{ id: string, username: string, profile_image: string, ... }',
      },
      {
        status: 401,
        description: 'Пользователь не авторизован',
      },
    ],
  },
  {
    method: 'PATCH',
    path: '/api/users/:id',
    description: 'Обновление информации о пользователе',
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'Идентификатор пользователя',
        required: true,
      },
      {
        name: 'userData',
        type: 'object',
        description: 'Данные для обновления',
        required: true,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Пользователь успешно обновлен',
        schema: '{ id: string, username: string, ... }',
      },
      {
        status: 404,
        description: 'Пользователь не найден',
      },
    ],
  },
  {
    method: 'POST',
    path: '/api/users/admins',
    description: 'Создание нового администратора (для админов)',
    parameters: [
      {
        name: 'adminData',
        type: 'object',
        description: 'Данные нового администратора',
        required: true,
      },
    ],
    responses: [
      {
        status: 201,
        description: 'Администратор успешно создан',
        schema: '{ id: string, username: string, role: "admin", ... }',
      },
      {
        status: 403,
        description: 'Доступ запрещен',
      },
    ],
  },
];

export const walletEndpoints: ApiEndpoint[] = [
  {
    method: 'GET',
    path: '/api/wallet/balance',
    description: 'Получение баланса кошелька',
    responses: [
      {
        status: 200,
        description: 'Баланс кошелька',
        schema: '{ balance: number, currency: string }',
      },
      {
        status: 401,
        description: 'Пользователь не авторизован',
      },
    ],
  },
  {
    method: 'POST',
    path: '/api/wallet/deposit',
    description: 'Пополнение кошелька',
    parameters: [
      {
        name: 'amount',
        type: 'number',
        description: 'Сумма пополнения',
        required: true,
      },
      {
        name: 'currency',
        type: 'string',
        description: 'Валюта пополнения',
        required: true,
      },
      {
        name: 'paymentMethod',
        type: 'string',
        description: 'Метод оплаты',
        required: true,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Успешное пополнение',
        schema: '{ transactionId: string, status: string, amount: number }',
      },
      {
        status: 400,
        description: 'Неверные параметры запроса',
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/wallet/transactions',
    description: 'Получение истории транзакций',
    parameters: [
      {
        name: 'page',
        type: 'number',
        description: 'Номер страницы',
        required: false,
      },
      {
        name: 'limit',
        type: 'number',
        description: 'Количество записей на странице',
        required: false,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'История транзакций',
        schema:
          '{ transactions: Transaction[], total: number, page: number, limit: number }',
      },
      {
        status: 401,
        description: 'Пользователь не авторизован',
      },
    ],
  },
];

export const subscriptionEndpoints: ApiEndpoint[] = [
  {
    method: 'GET',
    path: '/api/subscription-plans',
    description: 'Получение списка планов подписок',
    responses: [
      {
        status: 200,
        description: 'Список планов подписок',
        schema: '{ plans: SubscriptionPlan[] }',
      },
    ],
  },
  {
    method: 'POST',
    path: '/api/subscription-plans',
    description: 'Создание нового плана подписки (для админов)',
    parameters: [
      {
        name: 'planData',
        type: 'object',
        description: 'Данные плана подписки',
        required: true,
      },
    ],
    responses: [
      {
        status: 201,
        description: 'План подписки успешно создан',
        schema: '{ id: string, name: string, price: number, ... }',
      },
      {
        status: 403,
        description: 'Доступ запрещен',
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/subscriptions',
    description: 'Получение списка подписок пользователя',
    parameters: [
      {
        name: 'page',
        type: 'number',
        description: 'Номер страницы',
        required: false,
      },
      {
        name: 'limit',
        type: 'number',
        description: 'Количество записей на странице',
        required: false,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Список подписок пользователя',
        schema:
          '{ subscriptions: Subscription[], total: number, page: number, limit: number }',
      },
      {
        status: 401,
        description: 'Пользователь не авторизован',
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/subscriptions/active',
    description: 'Получение списка активных подписок пользователя',
    responses: [
      {
        status: 200,
        description: 'Список активных подписок',
        schema: '{ subscriptions: Subscription[] }',
      },
      {
        status: 401,
        description: 'Пользователь не авторизован',
      },
    ],
  },
  {
    method: 'POST',
    path: '/api/subscriptions',
    description: 'Создание новой подписки',
    parameters: [
      {
        name: 'planId',
        type: 'string',
        description: 'Идентификатор плана подписки',
        required: true,
      },
      {
        name: 'paymentMethod',
        type: 'string',
        description: 'Метод оплаты',
        required: true,
      },
    ],
    responses: [
      {
        status: 201,
        description: 'Подписка успешно создана',
        schema:
          '{ id: string, planId: string, startDate: string, endDate: string, ... }',
      },
      {
        status: 400,
        description: 'Неверные параметры запроса',
      },
    ],
  },
  {
    method: 'POST',
    path: '/api/events/:id/subscribe',
    description: 'Подписка на мероприятие',
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'Идентификатор мероприятия',
        required: true,
      },
      {
        name: 'paymentMethod',
        type: 'string',
        description: 'Метод оплаты',
        required: true,
      },
    ],
    responses: [
      {
        status: 201,
        description: 'Успешная подписка на мероприятие',
        schema: '{ subscriptionId: string, eventId: string, status: string }',
      },
      {
        status: 404,
        description: 'Мероприятие не найдено',
      },
    ],
  },
];

export const paymentEndpoints: ApiEndpoint[] = [
  {
    method: 'POST',
    path: '/api/payments',
    description: 'Создание нового платежа',
    parameters: [
      {
        name: 'amount',
        type: 'number',
        description: 'Сумма платежа',
        required: true,
      },
      {
        name: 'currency',
        type: 'string',
        description: 'Валюта платежа',
        required: true,
      },
      {
        name: 'paymentMethod',
        type: 'string',
        description: 'Метод оплаты',
        required: true,
      },
      {
        name: 'subscriptionId',
        type: 'string',
        description: 'Идентификатор подписки (если применимо)',
        required: false,
      },
    ],
    responses: [
      {
        status: 201,
        description: 'Платеж успешно создан',
        schema:
          '{ id: string, amount: number, currency: string, status: string, ... }',
      },
      {
        status: 400,
        description: 'Неверные параметры запроса',
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/payments',
    description: 'Получение списка платежей пользователя',
    parameters: [
      {
        name: 'page',
        type: 'number',
        description: 'Номер страницы',
        required: false,
      },
      {
        name: 'limit',
        type: 'number',
        description: 'Количество записей на странице',
        required: false,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Список платежей',
        schema:
          '{ payments: Payment[], total: number, page: number, limit: number }',
      },
      {
        status: 401,
        description: 'Пользователь не авторизован',
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/payments/:id/status',
    description: 'Проверка статуса платежа',
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'Идентификатор платежа',
        required: true,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Статус платежа',
        schema: '{ id: string, status: string, updatedAt: string }',
      },
      {
        status: 404,
        description: 'Платеж не найден',
      },
    ],
  },
];

export const calendarEndpoints: ApiEndpoint[] = [
  {
    method: 'GET',
    path: '/api/events',
    description: 'Получение списка мероприятий',
    parameters: [
      {
        name: 'page',
        type: 'number',
        description: 'Номер страницы',
        required: false,
      },
      {
        name: 'limit',
        type: 'number',
        description: 'Количество записей на странице',
        required: false,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Список мероприятий',
        schema:
          '{ events: Event[], total: number, page: number, limit: number }',
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/events/upcoming',
    description: 'Получение списка предстоящих мероприятий',
    parameters: [
      {
        name: 'limit',
        type: 'number',
        description: 'Количество записей',
        required: false,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Список предстоящих мероприятий',
        schema: '{ events: Event[] }',
      },
    ],
  },
  {
    method: 'POST',
    path: '/api/events',
    description: 'Создание нового мероприятия',
    parameters: [
      {
        name: 'eventData',
        type: 'object',
        description: 'Данные мероприятия',
        required: true,
      },
    ],
    responses: [
      {
        status: 201,
        description: 'Мероприятие успешно создано',
        schema: '{ id: string, title: string, startTime: string, ... }',
      },
      {
        status: 400,
        description: 'Неверные параметры запроса',
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/events/:id',
    description: 'Получение информации о мероприятии',
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'Идентификатор мероприятия',
        required: true,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Информация о мероприятии',
        schema: '{ id: string, title: string, description: string, ... }',
      },
      {
        status: 404,
        description: 'Мероприятие не найдено',
      },
    ],
  },
  {
    method: 'PATCH',
    path: '/api/events/:id',
    description: 'Обновление информации о мероприятии',
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'Идентификатор мероприятия',
        required: true,
      },
      {
        name: 'eventData',
        type: 'object',
        description: 'Данные для обновления',
        required: true,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Мероприятие успешно обновлено',
        schema: '{ id: string, title: string, ... }',
      },
      {
        status: 404,
        description: 'Мероприятие не найдено',
      },
    ],
  },
  {
    method: 'DELETE',
    path: '/api/events/:id',
    description: 'Удаление мероприятия',
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'Идентификатор мероприятия',
        required: true,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Мероприятие успешно удалено',
      },
      {
        status: 404,
        description: 'Мероприятие не найдено',
      },
    ],
  },
];

export const streamingEndpoints: ApiEndpoint[] = [
  {
    method: 'POST',
    path: '/api/streams',
    description: 'Создание нового стрима',
    parameters: [
      {
        name: 'streamData',
        type: 'object',
        description: 'Данные стрима',
        required: true,
      },
    ],
    responses: [
      {
        status: 201,
        description: 'Стрим успешно создан',
        schema: '{ id: string, title: string, streamKey: string, ... }',
      },
      {
        status: 400,
        description: 'Неверные параметры запроса',
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/streams',
    description: 'Получение списка стримов',
    parameters: [
      {
        name: 'page',
        type: 'number',
        description: 'Номер страницы',
        required: false,
      },
      {
        name: 'limit',
        type: 'number',
        description: 'Количество записей на странице',
        required: false,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Список стримов',
        schema:
          '{ streams: Stream[], total: number, page: number, limit: number }',
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/streams/active',
    description: 'Получение списка активных стримов',
    responses: [
      {
        status: 200,
        description: 'Список активных стримов',
        schema: '{ streams: Stream[] }',
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/streams/:id',
    description: 'Получение информации о стриме',
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'Идентификатор стрима',
        required: true,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Информация о стриме',
        schema: '{ id: string, title: string, status: string, ... }',
      },
      {
        status: 404,
        description: 'Стрим не найден',
      },
    ],
  },
  {
    method: 'PATCH',
    path: '/api/streams/:id',
    description: 'Обновление информации о стриме',
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'Идентификатор стрима',
        required: true,
      },
      {
        name: 'streamData',
        type: 'object',
        description: 'Данные для обновления',
        required: true,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Стрим успешно обновлен',
        schema: '{ id: string, title: string, ... }',
      },
      {
        status: 404,
        description: 'Стрим не найден',
      },
    ],
  },
  {
    method: 'POST',
    path: '/api/streams/:id/start',
    description: 'Запуск стрима',
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'Идентификатор стрима',
        required: true,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Стрим успешно запущен',
        schema: '{ id: string, status: "live", startTime: string }',
      },
      {
        status: 404,
        description: 'Стрим не найден',
      },
    ],
  },
  {
    method: 'POST',
    path: '/api/streams/:id/stop',
    description: 'Остановка стрима',
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'Идентификатор стрима',
        required: true,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Стрим успешно остановлен',
        schema: '{ id: string, status: "ended", endTime: string }',
      },
      {
        status: 404,
        description: 'Стрим не найден',
      },
    ],
  },
  {
    method: 'POST',
    path: '/api/streams/:id/share',
    description: 'Поделиться стримом',
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'Идентификатор стрима',
        required: true,
      },
      {
        name: 'platform',
        type: 'string',
        description: 'Платформа для шеринга',
        required: true,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Успешный шеринг',
        schema: '{ id: string, shareUrl: string }',
      },
      {
        status: 404,
        description: 'Стрим не найден',
      },
    ],
  },
];

export const analyticsEndpoints: ApiEndpoint[] = [
  {
    method: 'GET',
    path: '/api/analytics/views',
    description: 'Получение статистики просмотров',
    parameters: [
      {
        name: 'startDate',
        type: 'string',
        description: 'Начальная дата (YYYY-MM-DD)',
        required: false,
      },
      {
        name: 'endDate',
        type: 'string',
        description: 'Конечная дата (YYYY-MM-DD)',
        required: false,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Статистика просмотров',
        schema: '{ views: { date: string, count: number }[], total: number }',
      },
      {
        status: 403,
        description: 'Доступ запрещен',
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/analytics/subscriptions',
    description: 'Получение статистики подписок',
    parameters: [
      {
        name: 'startDate',
        type: 'string',
        description: 'Начальная дата (YYYY-MM-DD)',
        required: false,
      },
      {
        name: 'endDate',
        type: 'string',
        description: 'Конечная дата (YYYY-MM-DD)',
        required: false,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Статистика подписок',
        schema:
          '{ subscriptions: { date: string, count: number }[], total: number }',
      },
      {
        status: 403,
        description: 'Доступ запрещен',
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/analytics/payments',
    description: 'Получение статистики платежей',
    parameters: [
      {
        name: 'startDate',
        type: 'string',
        description: 'Начальная дата (YYYY-MM-DD)',
        required: false,
      },
      {
        name: 'endDate',
        type: 'string',
        description: 'Конечная дата (YYYY-MM-DD)',
        required: false,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Статистика платежей',
        schema:
          '{ payments: { date: string, amount: number, currency: string }[], total: number }',
      },
      {
        status: 403,
        description: 'Доступ запрещен',
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/analytics/streams',
    description: 'Получение статистики стримов',
    parameters: [
      {
        name: 'startDate',
        type: 'string',
        description: 'Начальная дата (YYYY-MM-DD)',
        required: false,
      },
      {
        name: 'endDate',
        type: 'string',
        description: 'Конечная дата (YYYY-MM-DD)',
        required: false,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Статистика стримов',
        schema:
          '{ streams: { date: string, count: number, viewCount: number }[], total: number }',
      },
      {
        status: 403,
        description: 'Доступ запрещен',
      },
    ],
  },
];

export const websocketEndpoints: ApiEndpoint[] = [
  {
    method: 'WS',
    path: '/api/notifications',
    description: 'Канал для получения уведомлений в реальном времени',
    responses: [
      {
        status: 101,
        description: 'Успешное подключение к WebSocket',
        schema: '{ type: string, data: object }',
      },
    ],
  },
  {
    method: 'WS',
    path: '/api/streams/:id/chat',
    description: 'Чат для стрима',
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'Идентификатор стрима',
        required: true,
      },
    ],
    responses: [
      {
        status: 101,
        description: 'Успешное подключение к WebSocket',
        schema:
          '{ type: "message", user: { id: string, username: string }, text: string, timestamp: string }',
      },
    ],
  },
  {
    method: 'WS',
    path: '/api/streams/:id/stats',
    description: 'Статистика стрима в реальном времени',
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'Идентификатор стрима',
        required: true,
      },
    ],
    responses: [
      {
        status: 101,
        description: 'Успешное подключение к WebSocket',
        schema: '{ viewCount: number, activeUsers: number, status: string }',
      },
    ],
  },
];

export const notificationEndpoints: ApiEndpoint[] = [
  {
    method: 'GET',
    path: '/api/notifications',
    description: 'Получение списка уведомлений пользователя',
    parameters: [
      {
        name: 'page',
        type: 'number',
        description: 'Номер страницы',
        required: false,
      },
      {
        name: 'limit',
        type: 'number',
        description: 'Количество записей на странице',
        required: false,
      },
      {
        name: 'read',
        type: 'boolean',
        description: 'Фильтр по прочитанным/непрочитанным уведомлениям',
        required: false,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Список уведомлений',
        schema:
          '{ notifications: Notification[], total: number, page: number, limit: number }',
      },
      {
        status: 401,
        description: 'Пользователь не авторизован',
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/notifications/unread/count',
    description: 'Получение количества непрочитанных уведомлений',
    responses: [
      {
        status: 200,
        description: 'Количество непрочитанных уведомлений',
        schema: '{ count: number }',
      },
      {
        status: 401,
        description: 'Пользователь не авторизован',
      },
    ],
  },
  {
    method: 'PATCH',
    path: '/api/notifications/:id/read',
    description: 'Отметить уведомление как прочитанное',
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'Идентификатор уведомления',
        required: true,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Уведомление отмечено как прочитанное',
        schema: '{ id: string, read: true, readAt: string }',
      },
      {
        status: 404,
        description: 'Уведомление не найдено',
      },
    ],
  },
  {
    method: 'PATCH',
    path: '/api/notifications/read-all',
    description: 'Отметить все уведомления как прочитанные',
    responses: [
      {
        status: 200,
        description: 'Все уведомления отмечены как прочитанные',
        schema: '{ count: number }',
      },
      {
        status: 401,
        description: 'Пользователь не авторизован',
      },
    ],
  },
  {
    method: 'POST',
    path: '/api/notifications/settings',
    description: 'Обновление настроек уведомлений пользователя',
    parameters: [
      {
        name: 'settings',
        type: 'object',
        description: 'Настройки уведомлений',
        required: true,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Настройки успешно обновлены',
        schema: '{ email: boolean, push: boolean, telegram: boolean }',
      },
      {
        status: 400,
        description: 'Неверные параметры запроса',
      },
    ],
  },
];
