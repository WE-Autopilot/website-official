/**
 * Type definitions for the WEAP application
 */

export interface Team {
  id: string;
  name: string;
  description: string;
  badge?: string;
  icon?: string;
}

export type TFunction = (key: string) => string;

export interface AnalyticsEvent {
  category: string;
  action: string;
  label: string;
  value?: number | null;
  timestamp: number;
  url?: string;
  referrer?: string;
}
