import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'outline' 
  | 'ghost' 
  | 'glow'
  | 'cyan';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  to?: string;
  href?: string;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  to,
  href,
  className = '',
  disabled,
  ...props
}, ref) => {
  const baseClasses = `ds-button ds-button-${variant} ds-button-${size} ${isLoading ? 'ds-button-loading' : ''} ${className}`;

  const content = (
    <>
      {isLoading && (
        <span className="ds-button-spinner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
          </svg>
        </span>
      )}
      {!isLoading && leftIcon && <span className="ds-button-icon-left">{leftIcon}</span>}
      <span className="ds-button-text">{children}</span>
      {!isLoading && rightIcon && <span className="ds-button-icon-right">{rightIcon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={baseClasses} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      className={baseClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
