import React from 'react';
import './TechGridBackground.css';

export interface TechGridBackgroundProps {
  variant?: 'grid' | 'dots' | 'both';
  glowColor?: 'purple' | 'cyan' | 'both' | 'none';
  children?: React.ReactNode;
  className?: string;
}

export const TechGridBackground: React.FC<TechGridBackgroundProps> = ({
  variant = 'both',
  glowColor = 'both',
  children,
  className = '',
}) => {
  return (
    <div className={`ds-bg-root ${className}`}>
      {/* Ambient Glows */}
      {(glowColor === 'purple' || glowColor === 'both') && (
        <div className="ds-glow-top-center" />
      )}
      {(glowColor === 'cyan' || glowColor === 'both') && (
        <div className="ds-glow-bottom-right" />
      )}

      {/* Grid Patterns */}
      {(variant === 'grid' || variant === 'both') && <div className="ds-tech-grid" />}
      {(variant === 'dots' || variant === 'both') && <div className="ds-dot-grid" />}

      {/* Content wrapper */}
      <div className="ds-bg-content">{children}</div>
    </div>
  );
};

export default TechGridBackground;
