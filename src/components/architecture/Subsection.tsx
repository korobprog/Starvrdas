import React from 'react';
import type { ReactNode } from 'react';
import './Architecture.css';

interface SubsectionProps {
  title: string;
  children: ReactNode;
}

const Subsection: React.FC<SubsectionProps> = ({ title, children }) => {
  return (
    <div className="subsection">
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default Subsection;
