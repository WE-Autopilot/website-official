import React, { memo } from 'react';
import AntigravityGrid from './AntigravityGrid';
import './TechGridBackground.css';

export interface TechGridBackgroundProps {
  variant?: 'grid' | 'dots' | 'both';
  glowColor?: 'purple' | 'cyan' | 'both' | 'none';
  showGrid?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const TechGridBackground: React.FC<TechGridBackgroundProps> = ({
  glowColor = 'purple',
  showGrid = false, // Disabled by default, enabled only on Home page
  children,
  className = '',
}) => {
  return (
    <div className={`ds-bg-root ${className}`}>
      {/* Soft, non-intrusive ambient background lighting */}
      {glowColor !== 'none' && (
        <div className="ds-subtle-ambient-glow" aria-hidden="true" />
      )}

      {/* Interactive Google Antigravity Spring Matrix (Home page only) */}
      {showGrid && <AntigravityGrid />}

      {/* Content wrapper */}
      <div className="ds-bg-content">{children}</div>
    </div>
  );
};

export default memo(TechGridBackground);
