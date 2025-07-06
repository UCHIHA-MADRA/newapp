import { createContext, useContext, useState } from "react";
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

  const resetFilters = () => {
    setSearchQuery("");
    setCategory(NEWS_CATEGORIES[0].id);
    setSortBy("publishedAt");
    setCurrentPage(1);
    setSelectedArticle(null);
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
    resetFilters,
  };

  return (
    <NewsContext.Provider value={contextValue}>
      {children}
    </NewsContext.Provider>
  );
};
