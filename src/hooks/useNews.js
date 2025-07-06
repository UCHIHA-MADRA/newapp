import { useContext, useEffect, useState } from 'react';
import { NewsContext } from '../context/NewsContext';
import { fetchNews } from '../services/newsApi';

/**
 * Hook for fetching and managing news data
 * @returns {Object} News data and state
 */
export const useNews = () => {
  const { 
    searchQuery, 
    category, 
    sortBy, 
    currentPage 
  } = useContext(NewsContext);
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetchNews({
          q: searchQuery,
          category: category !== 'general' ? category : '',
          sortBy,
          page: currentPage
        });
        
        setArticles(response.articles || []);
        setTotalResults(response.totalResults || 0);
      } catch (err) {
        setError(err.message || 'Failed to fetch news');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [searchQuery, category, sortBy, currentPage]);

  return {
    articles,
    loading,
    error,
    totalResults,
    hasMore: articles.length < totalResults
  };
};