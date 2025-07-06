import axios from 'axios';
import { API_ENDPOINTS, NEWS_SOURCES } from '../utils/constants';

// Create axios instance
const newsApiClient = axios.create({
  baseURL: import.meta.env.VITE_NEWSAPI_BASE_URL || 'https://newsapi.org/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add API key to requests
newsApiClient.interceptors.request.use(config => {
  config.params = {
    ...config.params,
    apiKey: import.meta.env.VITE_NEWSAPI_KEY,
  };
  return config;
});

/**
 * Fetch news articles based on parameters
 * @param {Object} params - Query parameters
 * @param {string} params.q - Search query
 * @param {string} params.category - News category
 * @param {string} params.sortBy - Sort method
 * @param {number} params.page - Page number
 * @param {number} params.pageSize - Results per page
 * @returns {Promise<Object>} News response
 */
export const fetchNews = async (params = {}) => {
  try {
    // Use search query or top headlines based on parameters
    const endpoint = params.q 
      ? API_ENDPOINTS.NEWSAPI.EVERYTHING 
      : API_ENDPOINTS.NEWSAPI.TOP_HEADLINES;
    
    const response = await newsApiClient.get(endpoint, {
      params: {
        ...params,
        pageSize: params.pageSize || 12,
        language: 'en',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    
    // Try fallback API if primary fails
    return await fetchFallbackNews(params);
  }
};

/**
 * Fetch news from fallback API
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} News response
 */
const fetchFallbackNews = async (params = {}) => {
  // Implementation for fallback API (GNews or NewsData)
  // This would be implemented similarly to the primary API
  
  // For now, return empty results to avoid breaking the app
  return {
    articles: [],
    totalResults: 0,
    status: 'error',
    message: 'Primary API failed and fallback not implemented yet'
  };
};

/**
 * Fetch news sources
 * @returns {Promise<Array>} List of news sources
 */
export const fetchNewsSources = async () => {
  try {
    const response = await newsApiClient.get(API_ENDPOINTS.NEWSAPI.SOURCES);
    return response.data.sources || [];
  } catch (error) {
    console.error('Error fetching sources:', error);
    return [];
  }
};