/**
 * Type definitions for the WEAP application
 */

export interface ApplicationFormData {
  name: string;
  schoolEmail: string;
  studentId: string;
  program: string;
  discordUsername: string;
  team: string[];
  interest?: string;
  resumeUrl?: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  badge?: string;
  icon?: string;
}

export type TFunction = (key: string) => string;

export interface SubmissionResponse {
  success: boolean;
  message?: string;
  errors?: Record<string, string> | string[];
  data?: any;
}

export interface AnalyticsEvent {
  category: string;
  action: string;
  label: string;
  value?: number | null;
  timestamp: number;
  url?: string;
  referrer?: string;
}
