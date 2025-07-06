import { useContext } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNews } from '../../hooks/useNews';
import { NewsContext } from '../../context/NewsContext';
import NewsCard from './NewsCard';
import LoadingSpinner from '../UI/LoadingSpinner';
import './NewsGrid.css';

/**
 * Grid component for displaying news articles
 * @param {Object} props - Component props
 * @param {Function} props.showToast - Function to show toast notifications
 * @returns {JSX.Element} News grid component
 */
const NewsGrid = ({ showToast }) => {
  const { setCurrentPage, currentPage } = useContext(NewsContext);
  const { articles, loading, error, hasMore, totalResults } = useNews();

  /**
   * Load more articles
   */
  const loadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Results count */}
      {!loading && articles.length > 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing {articles.length} of {totalResults} results
        </p>
      )}

      {/* News grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard 
            key={article.url} 
            article={article} 
            showToast={showToast} 
          />
        ))}

        {/* Loading placeholders */}
        {loading && Array.from({ length: 6 }).map((_, index) => (
          <div 
            key={`skeleton-${index}`} 
            className="bg-gray-100 dark:bg-dark-100 rounded-lg h-96 animate-pulse"
          ></div>
        ))}
      </div>

      {/* Empty state */}
      {!loading && articles.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold mb-2">No articles found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}

      {/* Load more button */}
      {!loading && hasMore && (
        <div className="text-center pt-4">
          <button
            onClick={loadMore}
            className="px-6 py-2 bg-white dark:bg-dark-100 border border-gray-300 dark:border-gray-700 rounded-full shadow-sm hover:shadow-md transition-all flex items-center mx-auto"
          >
            Load More <ChevronDown size={16} className="ml-2" />
          </button>
        </div>
      )}

      {/* Loading indicator */}
      {loading && articles.length > 0 && (
        <div className="text-center py-4">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default NewsGrid;