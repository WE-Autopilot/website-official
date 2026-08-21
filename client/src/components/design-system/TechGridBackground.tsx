import React, { useRef, useState, useCallback } from 'react';
import AutonomousPointMesh from './AutonomousPointMesh';
import './TechGridBackground.css';

export interface TechGridBackgroundProps {
  variant?: 'grid' | 'dots' | 'both';
  glowColor?: 'purple' | 'cyan' | 'both' | 'none';
  interactive?: boolean;
  showMesh?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const TechGridBackground: React.FC<TechGridBackgroundProps> = ({
  variant = 'both',
  glowColor = 'both',
  interactive = true,
  showMesh = true,
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
        '--mouse-x-norm': mousePos.x / 100,
        '--mouse-y-norm': mousePos.y / 100,
        '--mouse-offset-x': `${(mousePos.x - 50) * 0.4}px`,
        '--mouse-offset-y': `${(mousePos.y - 40) * 0.4}px`,
      } as React.CSSProperties}
    >
      {/* 3D Perspective Grid Plane */}
      <div className="ds-perspective-plane" aria-hidden="true">
        {/* Dynamic cursor glow */}
        {interactive && (
          <div className="ds-interactive-mouse-glow" />
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
        {interactive && <div className="ds-tech-grid-spotlight" />}
      </div>

      {/* Autonomous LiDAR Point Cloud / Boids Particle Mesh */}
      {showMesh && <AutonomousPointMesh interactive={interactive} />}

      {/* Content wrapper */}
      <div className="ds-bg-content">{children}</div>
    </div>
  );
};

export default TechGridBackground;
