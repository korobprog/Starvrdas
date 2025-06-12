import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import './Architecture.css';

interface MermaidDiagramProps {
  chart: string;
  id?: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({
  chart,
  id = `mermaid-${Math.random().toString(36).substr(2, 9)}`,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
    });

    if (containerRef.current) {
      try {
        mermaid.render(id, chart).then((svgCode) => {
          if (containerRef.current) {
            containerRef.current.innerHTML = svgCode.svg;
          }
        });
      } catch (error) {
        console.error('Ошибка при рендеринге Mermaid диаграммы:', error);
      }
    }
  }, [chart, id]);

  return (
    <div className="mermaid-diagram">
      <div ref={containerRef} className="mermaid" id={id}>
        {chart}
      </div>
    </div>
  );
};

export default MermaidDiagram;
