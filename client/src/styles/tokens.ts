/**
 * WEAP Design Tokens - Silicon Valley Minimalist Theme
 * Modern Dark Slate & Obsidian with Western Electric Purple & Autonomous Cyan Accents
 */

export const colors = {
  // Background surfaces
  bg: {
    base: '#06070a',
    primary: '#0a0c12',
    secondary: '#0f121d',
    tertiary: '#161a29',
    elevated: '#1e2337',
    glass: 'rgba(16, 20, 34, 0.65)',
    glassCard: 'rgba(15, 19, 32, 0.75)',
    glassHover: 'rgba(255, 255, 255, 0.06)',
  },

  // Western Heritage Purple / Electric Violet
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6', // Primary Accent
    600: '#7c3aed', // Western Electric Purple
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#3b0764',
    glow: 'rgba(139, 92, 246, 0.35)',
  },

  // Autonomous Tech Cyan / Electric Sky
  cyan: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#7dd3fc',
    400: '#38bdf8', // Lidar Cyan
    500: '#06b6d4',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    glow: 'rgba(56, 189, 248, 0.35)',
  },

  // Engineering Sub-team Signatures
  teams: {
    planning: '#a855f7',    // Planning & Control - Purple
    perception: '#06b6d4',  // Perception - Cyan
    localization: '#3b82f6',// Localization - Blue
    build: '#10b981',       // Build - Emerald
  },

  // Text Hierarchy
  text: {
    primary: '#f8fafc',
    secondary: '#cbd5e1',
    muted: '#94a3b8',
    subtle: '#64748b',
    disabled: '#475569',
  },

  // Borders
  border: {
    subtle: 'rgba(255, 255, 255, 0.07)',
    medium: 'rgba(255, 255, 255, 0.12)',
    bright: 'rgba(255, 255, 255, 0.22)',
    purple: 'rgba(139, 92, 246, 0.4)',
    cyan: 'rgba(56, 189, 248, 0.4)',
  },

  // Telemetry & Status
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#0ea5e9',
  }
};

export const typography = {
  fontFamily: {
    sans: "'Plus Jakarta Sans', 'Inter', sans-serif",
    display: "'Space Grotesk', 'Plus Jakarta Sans', sans-serif",
    heading: "'Jura', 'Space Grotesk', sans-serif",
    mono: "'JetBrains Mono', 'IBM Plex Mono', monospace",
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  letterSpacing: {
    tightest: '-0.03em',
    tight: '-0.02em',
    normal: '0',
    wide: '0.05em',
    widest: '0.1em',
  }
};

export const radii = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
  md: '0 4px 12px -2px rgba(0, 0, 0, 0.5), 0 2px 6px -1px rgba(0, 0, 0, 0.4)',
  lg: '0 12px 32px -4px rgba(0, 0, 0, 0.6), 0 4px 12px -2px rgba(0, 0, 0, 0.4)',
  xl: '0 20px 48px -8px rgba(0, 0, 0, 0.75)',
  glass: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
  glowPurple: '0 0 25px -5px rgba(139, 92, 246, 0.45)',
  glowCyan: '0 0 25px -5px rgba(56, 189, 248, 0.45)',
};

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '400ms cubic-bezier(0.4, 0, 0.2, 1)',
  spring: '500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};
