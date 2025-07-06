import { ChevronDown, AlertCircle } from "lucide-react";
import { useNews as useNewsContext } from "../../context/NewsContext"; // ✅ Use context hook
import { useNews } from "../../hooks/useNews"; // ✅ Use the data fetching hook
import NewsCard from "./NewsCard";
import LoadingSpinner from "../UI/LoadingSpinner";
import "./NewsGrid.css";

/**
 * Grid component for displaying news articles
 * @param {Object} props - Component props
 * @param {Function} props.showToast - Function to show toast notifications
 * @returns {JSX.Element} News grid component
 */
const NewsGrid = ({ showToast }) => {
  const { setCurrentPage, currentPage } = useNewsContext(); // ✅ Get context methods
  const { articles, loading, error, hasMore, totalResults } = useNews(); // ✅ Get data from hook

  /**
   * Load more articles
   */
  const loadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="glass-effect-strong p-8 max-w-md mx-auto text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <h3 className="text-xl font-semibold mb-2 text-white">
            Something went wrong
          </h3>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Results count */}
      {!loading && articles.length > 0 && (
        <div className="glass-effect px-6 py-4 rounded-2xl">
          <p className="text-sm text-gray-300 font-medium">
            Showing{" "}
            <span className="text-blue-400 font-semibold">
              {articles.length}
            </span>{" "}
            of{" "}
            <span className="text-blue-400 font-semibold">{totalResults}</span>{" "}
            results
          </p>
        </div>
      )}

      {/* News grid */}
      <div className="news-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <div key={`${article.url}-${index}`} className="fade-in">
            <NewsCard article={article} showToast={showToast} />
          </div>
        ))}

        {/* Loading placeholders */}
        {loading &&
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="glass-effect p-6 rounded-2xl"
            >
              <div className="skeleton h-48 mb-4 rounded-lg"></div>
              <div className="skeleton h-4 mb-2 rounded"></div>
              <div className="skeleton h-4 mb-2 rounded w-3/4"></div>
              <div className="skeleton h-3 rounded w-1/2"></div>
            </div>
          ))}
      </div>

      {/* Empty state */}
      {!loading && articles.length === 0 && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="glass-effect-strong p-12 max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">
              No articles found
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>
        </div>
      )}

      {/* Load more button */}
      {!loading && hasMore && (
        <div className="flex justify-center pt-8">
          <button
            onClick={loadMore}
            className="btn-primary hover-lift flex items-center gap-2 px-8 py-4 text-lg group"
          >
            Load More Articles
            <ChevronDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
          </button>
        </div>
      )}

      {/* Loading indicator */}
      {loading && articles.length > 0 && (
        <div className="flex justify-center pt-8">
          <div className="glass-effect p-4 rounded-2xl">
            <LoadingSpinner />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsGrid;