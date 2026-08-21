import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

export const DEFAULT_PUNCTUATION_SEQUENCE = ['!', '^', '*', ',', '.', ':', '::', '"', '+', '/', '|', '<'];

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  punctuation?: string;
  animated?: boolean;
  animateOnHover?: boolean;
  isLoading?: boolean;
  animationSpeed?: number;
  sequence?: string[];
  linkToHome?: boolean;
  className?: string;
  showSubtitle?: boolean;
  subtitleText?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  punctuation = '/',
  animated = false,
  animateOnHover = true,
  isLoading = false,
  animationSpeed = 200,
  sequence = DEFAULT_PUNCTUATION_SEQUENCE,
  linkToHome = true,
  className = '',
  showSubtitle = false,
  subtitleText = 'Western Engineering AutoPilot',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const shouldAnimate = animated || isLoading || (animateOnHover && isHovered);

  useEffect(() => {
    if (!shouldAnimate || sequence.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sequence.length);
    }, animationSpeed);

    return () => clearInterval(interval);
  }, [shouldAnimate, animationSpeed, sequence]);

  const displayPunctuation = shouldAnimate ? sequence[currentIndex] : punctuation;

  const content = (
    <div
      className={`ds-logo-wrapper ds-logo-${size} ${shouldAnimate ? 'ds-logo-animating' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="ds-logo-main">
        <span className="ds-logo-text">autopilot</span>
        {displayPunctuation && (
          <span className={`ds-logo-punct ${shouldAnimate ? 'ds-logo-punct-active' : ''}`}>
            {displayPunctuation}
          </span>
        )}
      </div>
      {showSubtitle && <span className="ds-logo-subtitle">{subtitleText}</span>}
    </div>
  );

  if (linkToHome) {
    return (
      <Link
        to="/"
        className="ds-logo-link"
        aria-label="AutoPilot Home"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
