import React from 'react';
import './Tabs.css';

export interface TabItem {
  id: string;
  label: string;
  count?: number | string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div className={`ds-tabs-container ${className}`} role="tablist">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            className={`ds-tab-button ${isActive ? 'ds-tab-active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.icon && <span className="ds-tab-icon">{tab.icon}</span>}
            <span className="ds-tab-label">{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`ds-tab-count ${isActive ? 'ds-count-active' : ''}`}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
