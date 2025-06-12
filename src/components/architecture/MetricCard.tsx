import React from 'react';
import './Architecture.css';

// Константы для типов иконок
export const MetricIconType = {
  TIME: 'time',
  COST: 'cost',
  USERS: 'users',
  MODULES: 'modules',
  API: 'api',
  CONVERSION: 'conversion',
  CUSTOM: 'custom',
} as const;

// Тип для иконок
export type MetricIconTypeValue =
  (typeof MetricIconType)[keyof typeof MetricIconType];

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: MetricIconTypeValue;
  description?: string;
  color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  icon = MetricIconType.CUSTOM,
  description,
  color,
}) => {
  // Функция для отображения иконки в зависимости от типа
  const renderIcon = () => {
    switch (icon) {
      case MetricIconType.TIME:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="metric-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        );
      case MetricIconType.COST:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="metric-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        );
      case MetricIconType.USERS:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="metric-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        );
      case MetricIconType.MODULES:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="metric-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        );
      case MetricIconType.API:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="metric-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        );
      case MetricIconType.CONVERSION:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="metric-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="metric-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        );
    }
  };

  const cardStyle = color ? { borderTop: `4px solid ${color}` } : {};

  return (
    <div className="metric-card" style={cardStyle}>
      <div className="metric-icon-container">{renderIcon()}</div>
      <div className="metric-value">{value}</div>
      <div className="metric-label">{label}</div>
      {description && <div className="metric-description">{description}</div>}
    </div>
  );
};

export default MetricCard;
