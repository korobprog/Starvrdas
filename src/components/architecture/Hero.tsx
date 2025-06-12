import React from 'react';
import './Architecture.css';

interface HeroProps {
  title: string;
  subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
  return (
    <section className="hero">
      <h1>{title}</h1>
      <p className="subtitle">{subtitle}</p>
    </section>
  );
};

export default Hero;
