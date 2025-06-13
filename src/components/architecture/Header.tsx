import React from 'react';
import './Architecture.css';

const Header: React.FC = () => {
  return (
    <header className="architecture-header">
      <div className="logo">
        <img src="https://via.placeholder.com/50x50" alt="Логотип" />
        <span>Стриминговая платформа</span>
      </div>
      <div className="project-info">
        <div className="info-item">
          <span className="label">Время реализации:</span>
          <span className="value">3 месяца</span>
        </div>
        <div className="info-item">
          <span className="label">Стоимость:</span>
          <span className="value">90 000 рублей</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
