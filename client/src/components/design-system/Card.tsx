import React from 'react';
import './Card.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'glass' | 'solid' | 'interactive' | 'glow-purple' | 'glow-cyan';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'glass',
  padding = 'md',
  className = '',
  ...props
}) => {
  return (
    <div
      className={`ds-card ds-card-${variant} ds-card-p-${padding} ${className}`}
      {...props}
    >
      <div className="ds-card-glow-sheen" />
      {children}
    </div>
  );
};

export default Card;
