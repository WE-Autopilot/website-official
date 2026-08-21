import React from 'react';
import Logo from './Logo';
import './LogoLoader.css';

export interface LogoLoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  className?: string;
  speed?: number;
}

export const LogoLoader: React.FC<LogoLoaderProps> = ({
  size = 'lg',
  message = 'Initializing autonomous systems...',
  className = '',
  speed = 90,
}) => {
  return (
    <div className={`ds-logo-loader-container ${className}`}>
      <div className="ds-logo-loader-glow" />
      <Logo size={size} animated={true} animationSpeed={speed} linkToHome={false} />
      {message && <span className="ds-logo-loader-message">{message}</span>}
    </div>
  );
};

export default LogoLoader;
