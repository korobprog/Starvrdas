import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import mermaid from 'mermaid';

// Инициализация Mermaid перед рендерингом приложения
mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
  er: {
    diagramPadding: 20,
    layoutDirection: 'TB',
    minEntityWidth: 100,
    minEntityHeight: 75,
    entityPadding: 15,
    stroke: 'gray',
    fill: 'honeydew',
    fontSize: 12,
  },
});

// Логирование для отладки
console.log('Mermaid initialized');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
