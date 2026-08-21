import React from 'react';
import Badge, { BadgeVariant } from './Badge';
import './SectionHeading.css';

export interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: BadgeVariant;
  badgeDot?: boolean;
  badgePulse?: boolean;
  title: string;
  titleGradient?: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  children?: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  badgeVariant = 'purple',
  badgeDot = true,
  badgePulse = false,
  title,
  titleGradient,
  subtitle,
  align = 'center',
  className = '',
  children,
}) => {
  return (
    <div className={`ds-section-heading ds-heading-align-${align} ${className}`}>
      {badge && (
        <div className="ds-section-badge-wrap">
          <Badge variant={badgeVariant} size="sm" dot={badgeDot} pulse={badgePulse}>
            {badge}
          </Badge>
        </div>
      )}
      <h2 className="ds-section-title">
        {title}{' '}
        {titleGradient && (
          <span className="ds-section-title-gradient">{titleGradient}</span>
        )}
      </h2>
      {subtitle && <p className="ds-section-subtitle">{subtitle}</p>}
      {children}
    </div>
  );
};

export default SectionHeading;
