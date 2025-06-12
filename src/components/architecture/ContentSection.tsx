import React from 'react';
import type { ReactNode } from 'react';
import './Architecture.css';

interface ContentSectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  id,
  title,
  children,
}) => {
  return (
    <section id={id} className="content-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
};

export default ContentSection;
