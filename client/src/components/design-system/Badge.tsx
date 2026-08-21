import React from 'react';
import './Badge.css';

export type BadgeVariant = 
  | 'default' 
  | 'purple' 
  | 'cyan' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'outline'
  | 'planning'
  | 'perception'
  | 'localization'
  | 'build';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  pulse?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  pulse = false,
  icon,
  className = '',
  ...props
}) => {
  return (
    <span
      className={`ds-badge ds-badge-${variant} ds-badge-${size} ${className}`}
      {...props}
    >
      {dot && (
        <span className={`ds-badge-dot ${pulse ? 'ds-badge-dot-pulse' : ''}`} />
      )}
      {icon && <span className="ds-badge-icon">{icon}</span>}
      <span className="ds-badge-label">{children}</span>
    </span>
  );
};

export default Badge;
