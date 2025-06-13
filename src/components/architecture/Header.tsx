import React from 'react';
import './Architecture.css';
import Logo from './Logo';

const Header: React.FC = () => {
  return (
    <header className="architecture-header">
      <div className="logo">
        <Logo width={50} height={50} color="#3498db" />
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
