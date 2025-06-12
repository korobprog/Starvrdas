import React, { useEffect } from 'react';
import mermaid from 'mermaid';
import './Architecture.css';

interface MermaidDiagramProps {
  chart: string;
  id?: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({
  chart,
  id = `mermaid-${Math.random().toString(36).substring(2, 9)}`,
}) => {
  useEffect(() => {
    // Очищаем предыдущие диаграммы с тем же ID
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = chart;
      element.removeAttribute('data-processed');
    }

    try {
      // Перерендерим все диаграммы на странице
      mermaid.contentLoaded();
    } catch (error) {
      console.error('Ошибка при рендеринге Mermaid диаграммы:', error);
      console.log('Диаграмма:', chart);
    }
  }, [chart, id]);

  return (
    <div className="mermaid-diagram">
      <div className="mermaid" id={id}>
        {chart}
      </div>
    </div>
  );
};

export default MermaidDiagram;
