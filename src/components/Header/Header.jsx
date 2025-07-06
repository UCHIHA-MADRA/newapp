import { useState, useEffect } from 'react';
import { Moon, Sun, Bookmark, Search as SearchIcon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useBookmarks } from '../../hooks/useBookmarks';
import { NEWS_CATEGORIES } from '../../utils/constants';
import SearchBar from '../Common/SearchBar';
import CategoryFilter from '../Common/CategoryFilter';
import './Header.css';

/**
 * Header component with navigation and theme toggle
 * @param {Object} props - Component props
 * @param {Function} props.onBookmarksClick - Bookmark sidebar toggle handler
 * @param {Function} props.showToast - Function to show toast notifications
 * @returns {JSX.Element} Header component
 */
const Header = ({ onBookmarksClick, showToast }) => {
  const { theme, toggleTheme } = useTheme();
  const { bookmarks } = useBookmarks();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-md shadow-md' : 'bg-white dark:bg-dark-900'}`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold gradient-text">NewsHub</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <CategoryFilter className="flex space-x-4" />
        </nav>

        {/* Search and Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Toggle */}
          <button 
            onClick={() => setSearchVisible(!searchVisible)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-100 transition-colors"
            aria-label="Toggle search"
          >
            <SearchIcon size={20} className="text-gray-700 dark:text-gray-300" />
          </button>

          {/* Bookmarks Button */}
          <button 
            onClick={onBookmarksClick}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-100 transition-colors relative"
            aria-label="Bookmarks"
          >
            <Bookmark size={20} className="text-gray-700 dark:text-gray-300" />
            {bookmarks.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {bookmarks.length}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-100 transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-gray-300" />
            ) : (
              <Moon size={20} className="text-gray-700" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 w-full bg-gray-700 dark:bg-gray-300 transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-gray-700 dark:bg-gray-300 transition-opacity ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block h-0.5 w-full bg-gray-700 dark:bg-gray-300 transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className={`container mx-auto px-4 py-2 transition-all duration-300 ${searchVisible ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <SearchBar />
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="container mx-auto px-4 py-4 bg-white dark:bg-dark-900 border-t dark:border-gray-800">
          <CategoryFilter className="flex flex-col space-y-2" isMobile={true} />
        </div>
      </div>
    </header>
  );
};

export default Header;