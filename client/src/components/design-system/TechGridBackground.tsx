import React, { useRef, useState, useCallback } from 'react';
import './TechGridBackground.css';

export interface TechGridBackgroundProps {
  variant?: 'grid' | 'dots' | 'both';
  glowColor?: 'purple' | 'cyan' | 'both' | 'none';
  interactive?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const TechGridBackground: React.FC<TechGridBackgroundProps> = ({
  variant = 'both',
  glowColor = 'both',
  interactive = true,
  children,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 40 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={`ds-bg-root ${isHovered ? 'ds-bg-hovered' : ''} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        '--mouse-x': `${mousePos.x}%`,
        '--mouse-y': `${mousePos.y}%`,
        '--mouse-offset-x': `${(mousePos.x - 50) * 0.4}px`,
        '--mouse-offset-y': `${(mousePos.y - 40) * 0.4}px`,
      } as React.CSSProperties}
    >
      {/* Interactive dynamic cursor spotlight */}
      {interactive && (
        <div className="ds-interactive-mouse-glow" aria-hidden="true" />
      )}

      {/* Ambient shifting background glows */}
      {(glowColor === 'purple' || glowColor === 'both') && (
        <div className="ds-glow-top-center ds-ambient-shift" />
      )}
      {(glowColor === 'cyan' || glowColor === 'both') && (
        <div className="ds-glow-bottom-right ds-ambient-shift-reverse" />
      )}

      {/* Expansive grid patterns */}
      {(variant === 'grid' || variant === 'both') && <div className="ds-tech-grid" />}
      {(variant === 'dots' || variant === 'both') && <div className="ds-dot-grid" />}

      {/* Interactive cursor grid highlight */}
      {interactive && <div className="ds-tech-grid-spotlight" aria-hidden="true" />}

      {/* Content wrapper */}
      <div className="ds-bg-content">{children}</div>
    </div>
  );
};

export default TechGridBackground;
