/**
 * Application constants and configuration
 */
export const NEWS_CATEGORIES = [
  { id: "general", name: "General", icon: "📰" },
  { id: "business", name: "Business", icon: "💼" },
  { id: "technology", name: "Technology", icon: "💻" },
  { id: "entertainment", name: "Entertainment", icon: "🎬" },
  { id: "health", name: "Health", icon: "🏥" },
  { id: "science", name: "Science", icon: "🔬" },
  { id: "sports", name: "Sports", icon: "⚽" },
];

export const NEWS_COUNTRIES = [
  { code: "us", name: "United States", flag: "🇺🇸" },
  { code: "gb", name: "United Kingdom", flag: "🇬🇧" },
  { code: "ca", name: "Canada", flag: "🇨🇦" },
  { code: "au", name: "Australia", flag: "🇦🇺" },
  { code: "in", name: "India", flag: "🇮🇳" },
  { code: "de", name: "Germany", flag: "🇩🇪" },
  { code: "fr", name: "France", flag: "🇫🇷" },
  { code: "jp", name: "Japan", flag: "🇯🇵" },
  { code: "br", name: "Brazil", flag: "🇧🇷" },
  { code: "mx", name: "Mexico", flag: "🇲🇽" },
  { code: "ru", name: "Russia", flag: "🇷🇺" },
  { code: "cn", name: "China", flag: "🇨🇳" },
  { code: "it", name: "Italy", flag: "🇮🇹" },
  { code: "es", name: "Spain", flag: "🇪🇸" },
  { code: "nl", name: "Netherlands", flag: "🇳🇱" },
  { code: "se", name: "Sweden", flag: "🇸🇪" },
  { code: "no", name: "Norway", flag: "🇳🇴" },
  { code: "za", name: "South Africa", flag: "🇿🇦" },
  { code: "eg", name: "Egypt", flag: "🇪🇬" },
  { code: "sg", name: "Singapore", flag: "🇸🇬" },
];

export const NEWS_SOURCES = [
  { id: "newsapi", name: "NewsAPI", url: "https://newsapi.org/v2" },
  { id: "gnews", name: "GNews", url: "https://gnews.io/api/v4" },
  { id: "newsdata", name: "NewsData.io", url: "https://newsdata.io/api/1" },
];

export const SORT_OPTIONS = [
  { id: "publishedAt", name: "Latest" },
  { id: "popularity", name: "Popular" },
  { id: "relevancy", name: "Relevant" },
];

export const API_ENDPOINTS = {
  NEWSAPI: {
    EVERYTHING: "/everything",
    TOP_HEADLINES: "/top-headlines",
    SOURCES: "/sources",
  },
};

export const STORAGE_KEYS = {
  BOOKMARKS: "newshub_bookmarks",
  THEME: "newshub_theme",
  PREFERENCES: "newshub_preferences",
};

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

export const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
};
