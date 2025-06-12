import React, { useState } from 'react';
import './Architecture.css';

const Navigation: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleNav = () => {
    setIsActive(!isActive);
  };

  return (
    <nav
      className={`architecture-nav ${isActive ? 'active' : ''}`}
      id="main-nav"
    >
      <div className="nav-toggle" onClick={toggleNav}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul>
        <li>
          <a href="#overview">Общий обзор</a>
        </li>
        <li>
          <a href="#tech-stack">Технологический стек</a>
        </li>
        <li>
          <a href="#backend-structure">Модульная структура бэкенда</a>
        </li>
        <li>
          <a href="#database-schema">Схема базы данных</a>
        </li>
        <li>
          <a href="#api">API-интерфейсы</a>
        </li>
        <li>
          <a href="#streaming-architecture">Архитектура стриминга</a>
        </li>
        <li>
          <a href="#ui-components">Компоненты пользовательского интерфейса</a>
        </li>
        <li>
          <a href="#deployment">Развертывание и масштабирование</a>
        </li>
        <li>
          <a href="#implementation-plan">План реализации</a>
        </li>
        <li>
          <a href="#multilanguage">Многоязычность</a>
        </li>
        <li>
          <a href="#payment-systems">Платежные системы</a>
        </li>
        <li>
          <a href="#user-forecast">Прогноз пользователей</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
