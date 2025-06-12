import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
} from 'recharts';
import './Architecture.css';

// Компонент для форматирования чисел в подсказках
// Определение типов для CustomTooltip
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name?: string;
    dataKey?: string;
    payload?: Record<string, unknown>;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <p
          className="label"
          style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}
        >{`${label}`}</p>
        <p className="intro" style={{ margin: '0 0 5px 0' }}>
          <span style={{ color: '#3498db', fontWeight: 'bold' }}>
            {`${payload[0].value.toLocaleString('ru-RU')}`}
          </span>{' '}
          пользователей
        </p>
        <p
          className="desc"
          style={{ margin: '0', fontSize: '0.8rem', color: '#666' }}
        >
          {label ? getGrowthDescription(label) : ''}
        </p>
      </div>
    );
  }

  return null;
};

// Функция для получения описания роста
const getGrowthDescription = (month: string): string => {
  const monthIndex = [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
  ].indexOf(month);
  if (monthIndex === 0) return 'Начало работы сервиса';

  const growthDescriptions = [
    'Запуск рекламной кампании',
    'Добавление новых функций',
    'Партнерская программа',
    'Запуск мобильного приложения',
    'Интеграция с соцсетями',
    'Запуск премиум-подписки',
    'Выход на международный рынок',
    'Добавление новых языков',
    'Оптимизация платформы',
    'Праздничные акции',
    'Годовщина запуска',
  ];

  return growthDescriptions[monthIndex - 1];
};

const UserForecastChart: React.FC = () => {
  // Состояние для переключения типа графика
  const [chartType, setChartType] = useState<'line' | 'bar' | 'area'>('area');

  const data = [
    { month: 'Янв', users: 500, target: 400 },
    { month: 'Фев', users: 1000, target: 900 },
    { month: 'Мар', users: 2000, target: 1800 },
    { month: 'Апр', users: 3500, target: 3000 },
    { month: 'Май', users: 5000, target: 4500 },
    { month: 'Июн', users: 6500, target: 6000 },
    { month: 'Июл', users: 8000, target: 7500 },
    { month: 'Авг', users: 10000, target: 9000 },
    { month: 'Сен', users: 11500, target: 10500 },
    { month: 'Окт', users: 13000, target: 12000 },
    { month: 'Ноя', users: 14000, target: 13500 },
    { month: 'Дек', users: 15000, target: 15000 },
  ];

  // Функция для форматирования чисел на оси Y
  const formatYAxis = (tickItem: number): string => {
    return tickItem >= 1000
      ? `${(tickItem / 1000).toFixed(0)}K`
      : tickItem.toString();
  };

  // Стили для кнопок переключения
  const buttonStyle = (active: boolean) => ({
    padding: '8px 12px',
    margin: '0 5px',
    backgroundColor: active ? 'var(--primary-color)' : 'var(--light-color)',
    color: active ? 'white' : 'var(--text-color)',
    border: 'none',
    borderRadius: 'var(--border-radius)',
    cursor: 'pointer',
    transition: 'var(--transition)',
    fontWeight: active ? 'bold' : 'normal',
  });

  return (
    <div className="chart-container">
      <h3
        style={{
          textAlign: 'center',
          marginBottom: '1rem',
          color: 'var(--secondary-color)',
        }}
      >
        Прогноз роста пользовательской базы в первый год
      </h3>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}
      >
        <button
          onClick={() => setChartType('line')}
          style={buttonStyle(chartType === 'line')}
        >
          Линейный
        </button>
        <button
          onClick={() => setChartType('bar')}
          style={buttonStyle(chartType === 'bar')}
        >
          Столбчатый
        </button>
        <button
          onClick={() => setChartType('area')}
          style={buttonStyle(chartType === 'area')}
        >
          Область
        </button>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        {chartType === 'line' ? (
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis dataKey="month" tick={{ fill: 'var(--text-color)' }} />
            <YAxis
              tickFormatter={formatYAxis}
              tick={{ fill: 'var(--text-color)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '10px' }}
              formatter={(value) => <span>{value}</span>}
            />
            <ReferenceLine
              y={15000}
              label="Цель"
              stroke="var(--accent-color)"
              strokeDasharray="3 3"
            />
            <Line
              type="monotone"
              dataKey="users"
              name="Количество пользователей"
              stroke="var(--primary-color)"
              activeDot={{
                r: 8,
                fill: 'var(--primary-color)',
                stroke: 'white',
              }}
              strokeWidth={3}
              dot={{
                fill: 'var(--primary-color)',
                stroke: 'white',
                strokeWidth: 2,
                r: 4,
              }}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
            <Line
              type="monotone"
              dataKey="target"
              name="Целевые показатели"
              stroke="var(--accent-color)"
              strokeDasharray="5 5"
              strokeWidth={2}
              dot={false}
              activeDot={false}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          </LineChart>
        ) : chartType === 'bar' ? (
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis dataKey="month" tick={{ fill: 'var(--text-color)' }} />
            <YAxis
              tickFormatter={formatYAxis}
              tick={{ fill: 'var(--text-color)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '10px' }}
              formatter={(value) => <span>{value}</span>}
            />
            <ReferenceLine
              y={15000}
              label={{ value: 'Цель', position: 'right' }}
              stroke="var(--accent-color)"
              strokeDasharray="3 3"
            />
            <Bar
              dataKey="users"
              name="Количество пользователей"
              fill="var(--primary-color)"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          </BarChart>
        ) : (
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--primary-color)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--primary-color)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis dataKey="month" tick={{ fill: 'var(--text-color)' }} />
            <YAxis
              tickFormatter={formatYAxis}
              tick={{ fill: 'var(--text-color)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '10px' }}
              formatter={(value) => <span>{value}</span>}
            />
            <ReferenceLine
              y={15000}
              label={{ value: 'Цель', position: 'right' }}
              stroke="var(--accent-color)"
              strokeDasharray="3 3"
            />
            <Area
              type="monotone"
              dataKey="users"
              name="Количество пользователей"
              stroke="var(--primary-color)"
              fillOpacity={1}
              fill="url(#colorUsers)"
              activeDot={{
                r: 8,
                fill: 'var(--primary-color)',
                stroke: 'white',
              }}
              strokeWidth={3}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
            <Line
              type="monotone"
              dataKey="target"
              name="Целевые показатели"
              stroke="var(--accent-color)"
              strokeDasharray="5 5"
              strokeWidth={2}
              dot={false}
              activeDot={false}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        )}
      </ResponsiveContainer>

      <div
        style={{
          textAlign: 'center',
          fontSize: '0.9rem',
          color: 'var(--dark-color)',
          opacity: 0.7,
          marginTop: '0.5rem',
        }}
      >
        * Прогноз основан на данных аналитики рынка стриминговых платформ
      </div>
    </div>
  );
};

export default UserForecastChart;
