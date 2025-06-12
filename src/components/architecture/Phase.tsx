import React from 'react';
import type { ReactNode } from 'react';
import './Architecture.css';

interface PhaseProps {
  title: string;
  children: ReactNode;
}

const Phase: React.FC<PhaseProps> = ({ title, children }) => {
  return (
    <div className="phase">
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default Phase;
