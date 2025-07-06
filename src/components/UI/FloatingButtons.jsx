import { ArrowUp, Bookmark } from 'lucide-react';
import { useState, useEffect } from 'react';

/**
 * Floating action buttons component
 * @param {Object} props - Component props
 * @param {Function} props.onBookmarksClick - Bookmark button click handler
 * @returns {JSX.Element} Floating buttons component
 */
const FloatingButtons = ({ onBookmarksClick }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll to top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Scroll to top of page
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col space-y-2">
      {/* Bookmarks button */}
      <button
        onClick={onBookmarksClick}
        className="p-3 rounded-full bg-primary-500 text-white shadow-lg hover:bg-primary-600 transition-colors md:hidden"
        aria-label="Open bookmarks"
      >
        <Bookmark size={20} />
      </button>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-gray-200 dark:bg-dark-200 text-gray-700 dark:text-gray-300 shadow-lg hover:bg-gray-300 dark:hover:bg-dark-300 transition-colors animate-fade-in"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default FloatingButtons;