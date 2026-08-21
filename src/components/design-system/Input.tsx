import React from 'react';
import './Input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  containerClassName = '',
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`ds-input-container ${containerClassName}`}>
      {label && (
        <label htmlFor={inputId} className="ds-input-label">
          {label}
        </label>
      )}
      <div className={`ds-input-wrapper ${error ? 'ds-input-has-error' : ''}`}>
        {leftIcon && <span className="ds-input-icon-left">{leftIcon}</span>}
        <input
          ref={ref}
          id={inputId}
          className={`ds-input ${leftIcon ? 'ds-input-with-left-icon' : ''} ${rightIcon ? 'ds-input-with-right-icon' : ''} ${className}`}
          {...props}
        />
        {rightIcon && <span className="ds-input-icon-right">{rightIcon}</span>}
      </div>
      {error && <span className="ds-input-error">{error}</span>}
      {!error && helperText && <span className="ds-input-helper">{helperText}</span>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
