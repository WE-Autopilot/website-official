import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge, { BadgeVariant } from './Badge';
import './TechCard.css';

export interface TechCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  badgeVariant?: BadgeVariant;
  icon?: React.ReactNode;
  to?: string;
  href?: string;
  cornerAccent?: boolean;
  accentColor?: 'purple' | 'cyan' | 'planning' | 'perception' | 'localization' | 'build';
  tags?: string[];
  className?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export const TechCard: React.FC<TechCardProps> = ({
  title,
  subtitle,
  description,
  badge,
  badgeVariant = 'default',
  icon,
  to,
  href,
  cornerAccent = true,
  accentColor = 'purple',
  tags,
  className = '',
  children,
  footer,
}) => {
  const CardWrapper = to ? Link : href ? 'a' : 'div';
  const linkProps = to ? { to } : href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    // @ts-ignore
    <CardWrapper
      className={`ds-tech-card ds-tech-accent-${accentColor} ${to || href ? 'ds-tech-clickable' : ''} ${className}`}
      {...linkProps}
    >
      {cornerAccent && <div className="ds-tech-corners" />}

      {/* Top Bar: Icon + Badge/Arrow */}
      <div className="ds-tech-card-topbar">
        {icon && <div className="ds-tech-icon-box">{icon}</div>}
        <div className="ds-tech-topbar-actions">
          {badge && <Badge variant={badgeVariant} size="sm">{badge}</Badge>}
          {(to || href) && (
            <div className="ds-tech-arrow" aria-hidden="true">
              <ArrowUpRight size={15} />
            </div>
          )}
        </div>
      </div>

      {/* Title & Subtitle Block (Full Width, prevents cramped wrapping) */}
      <div className="ds-tech-title-block">
        {subtitle && <span className="ds-tech-subtitle">{subtitle}</span>}
        <h3 className="ds-tech-title">{title}</h3>
      </div>

      {/* Description */}
      {description && <p className="ds-tech-desc">{description}</p>}

      {/* Tech tags */}
      {tags && tags.length > 0 && (
        <div className="ds-tech-tags">
          {tags.map((tag, i) => (
            <span key={i} className="ds-tech-tag">{tag}</span>
          ))}
        </div>
      )}

      {children && <div className="ds-tech-body">{children}</div>}
      {footer && <div className="ds-tech-footer">{footer}</div>}
    </CardWrapper>
  );
};

export default TechCard;
