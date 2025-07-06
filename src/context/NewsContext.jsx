import { createContext, useContext, useState, useEffect } from "react";
import { NEWS_CATEGORIES } from "../utils/constants";

const NewsContext = createContext();

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error("useNews must be used within a NewsProvider");
  }
  return context;
};

export const NewsProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState(NEWS_CATEGORIES[0].id);
  const [sortBy, setSortBy] = useState("publishedAt");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [country, setCountry] = useState("us"); // Added country state

  // Reset page and articles when search parameters change
  useEffect(() => {
    setCurrentPage(1);
    setArticles([]); // Clear articles when search params change
  }, [searchQuery, category, sortBy, country]); // Added country dependency

  const resetFilters = () => {
    setSearchQuery("");
    setCategory(NEWS_CATEGORIES[0].id);
    setSortBy("publishedAt");
    setCurrentPage(1);
    setSelectedArticle(null);
    setArticles([]);
    setCountry("us"); // Reset country too
  };

  const contextValue = {
    searchQuery,
    setSearchQuery,
    category,
    setCategory,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    selectedArticle,
    setSelectedArticle,
    articles,
    setArticles,
    loading,
    setLoading,
    error,
    setError,
    country, // Added country to context
    setCountry, // Added setCountry to context
    resetFilters,
  };

  return (
    <NewsContext.Provider value={contextValue}>
      {children}
    </NewsContext.Provider>
  );
};