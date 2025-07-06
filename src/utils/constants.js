/**
 * Application constants and configuration
 */

export const NEWS_CATEGORIES = [
  { id: 'general', name: 'General', icon: '📰' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'health', name: 'Health', icon: '🏥' },
  { id: 'science', name: 'Science', icon: '🔬' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
];

export const NEWS_SOURCES = [
  { id: 'newsapi', name: 'NewsAPI', url: 'https://newsapi.org/v2' },
  { id: 'gnews', name: 'GNews', url: 'https://gnews.io/api/v4' },
  { id: 'newsdata', name: 'NewsData.io', url: 'https://newsdata.io/api/1' },
];

export const SORT_OPTIONS = [
  { id: 'publishedAt', name: 'Latest' },
  { id: 'popularity', name: 'Popular' },
  { id: 'relevancy', name: 'Relevant' },
];

export const API_ENDPOINTS = {
  NEWSAPI: {
    EVERYTHING: '/everything',
    TOP_HEADLINES: '/top-headlines',
    SOURCES: '/sources',
  },
};

export const STORAGE_KEYS = {
  BOOKMARKS: 'newshub_bookmarks',
  THEME: 'newshub_theme',
  PREFERENCES: 'newshub_preferences',
};

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};