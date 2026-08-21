import React from 'react';
import './MetricCard.css';

export interface MetricCardProps {
  value: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  trend?: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  sublabel,
  icon,
  trend,
  className = '',
}) => {
  return (
    <div className={`ds-metric-card ${className}`}>
      <div className="ds-metric-top">
        <span className="ds-metric-value">{value}</span>
        {icon && <div className="ds-metric-icon">{icon}</div>}
      </div>
      <div className="ds-metric-label">{label}</div>
      {(sublabel || trend) && (
        <div className="ds-metric-sub">
          {trend && <span className="ds-metric-trend">{trend}</span>}
          {sublabel && <span className="ds-metric-sublabel">{sublabel}</span>}
        </div>
      )}
    </div>
  );
};

export default MetricCard;
