import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  punctuation?: string;
  linkToHome?: boolean;
  className?: string;
  showSubtitle?: boolean;
  subtitleText?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  punctuation = '/',
  linkToHome = true,
  className = '',
  showSubtitle = false,
  subtitleText = 'Western Engineering AutoPilot',
}) => {
  const content = (
    <div className={`ds-logo-wrapper ds-logo-${size} ${className}`}>
      <div className="ds-logo-main">
        <span className="ds-logo-text">autopilot</span>
        {punctuation && <span className="ds-logo-punct">{punctuation}</span>}
      </div>
      {showSubtitle && <span className="ds-logo-subtitle">{subtitleText}</span>}
    </div>
  );

  if (linkToHome) {
    return (
      <Link to="/" className="ds-logo-link" aria-label="AutoPilot Home">
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
