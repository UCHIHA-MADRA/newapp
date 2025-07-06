// hooks/useNews.js
import { useEffect, useState } from "react";
import { useNews as useNewsContext } from "../context/NewsContext"; // Import the context hook
import { fetchNews } from "../services/newsApi";

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
  } = useNewsContext(); // Use the context hook to get filter states

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
          category: category !== "general" ? category : "",
          sortBy,
          page: currentPage,
        });

        setArticles(response.articles || []);
        setTotalResults(response.totalResults || 0);
      } catch (err) {
        setError(err.message || "Failed to fetch news");
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
    hasMore: articles.length < totalResults,
  };
};