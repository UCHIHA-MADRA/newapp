import { createContext, useState } from 'react';
import { NEWS_CATEGORIES } from '../utils/constants';

/**
 * Context for managing news state
 */
export const NewsContext = createContext();

/**
 * Provider component for news state management
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} News provider component
 */
export const NewsProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState(NEWS_CATEGORIES[0].id);
  const [sortBy, setSortBy] = useState('publishedAt');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);

  /**
   * Reset all filters to default values
   */
  const resetFilters = () => {
    setSearchQuery('');
    setCategory(NEWS_CATEGORIES[0].id);
    setSortBy('publishedAt');
    setCurrentPage(1);
  };

  return (
    <NewsContext.Provider value={{
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
      resetFilters
    }}>
      {children}
    </NewsContext.Provider>
  );
};