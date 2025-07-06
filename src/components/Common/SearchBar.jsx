import { useState, useContext, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import  NewsContext  from '../../context/NewsContext';
import { debounce } from '../../utils/helpers';

/**
 * Search bar component for filtering news
 * @returns {JSX.Element} Search bar component
 */
const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useContext(NewsContext);
  const [inputValue, setInputValue] = useState(searchQuery);
  const inputRef = useRef(null);

  // Create debounced search function
  const debouncedSearch = useRef(
    debounce((value) => {
      setSearchQuery(value);
    }, 500)
  ).current;

  // Update input value when searchQuery changes
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  // Clean up debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel && debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  /**
   * Handle input change
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  /**
   * Clear search input
   */
  const clearSearch = () => {
    setInputValue('');
    setSearchQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
        />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Search for news..."
          className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-100 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
        />
        {inputValue && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;