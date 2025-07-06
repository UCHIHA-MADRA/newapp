import { useEffect, useState } from "react";
import { useNews as useNewsContext } from "../context/NewsContext";
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
    currentPage,
    country, // Added country from context
    articles,
    setArticles,
    loading,
    setLoading,
    error,
    setError
  } = useNewsContext();

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
          country, // Pass country to API
        });

        // KEY FIX: Check if this is the first page or a new search
        if (currentPage === 1) {
          // First page or new search - replace articles
          setArticles(response.articles || []);
        } else {
          // Subsequent pages - append to existing articles
          setArticles(prevArticles => [
            ...prevArticles,
            ...(response.articles || [])
          ]);
        }
        
        setTotalResults(response.totalResults || 0);
      } catch (err) {
        setError(err.message || "Failed to fetch news");
        // Only clear articles on error if it's the first page
        if (currentPage === 1) {
          setArticles([]);
        }
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [searchQuery, category, sortBy, currentPage, country]); // Added country dependency

  // Reset to page 1 when search parameters change
  useEffect(() => {
    // This effect will trigger when search params change
    // The context should handle resetting currentPage to 1
  }, [searchQuery, category, sortBy, country]); // Added country dependency

  return {
    articles,
    loading,
    error,
    totalResults,
    hasMore: articles.length < totalResults,
  };
};