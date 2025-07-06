import { Bookmark, Share2, ExternalLink } from 'lucide-react';
import { useBookmarks } from '../../hooks/useBookmarks';
import { useNews } from '../../context/NewsContext'; // ✅ This was correct in your original!
import { formatRelativeTime, formatTitle, formatDescription } from '../../utils/formatters';
import { shareArticle, getDomain } from '../../utils/helpers';
import './NewsGrid.css';

/**
 * Card component for displaying a news article
 * @param {Object} props - Component props
 * @param {Object} props.article - Article data
 * @param {Function} props.showToast - Function to show toast notifications
 * @returns {JSX.Element} News card component
 */
const NewsCard = ({ article, showToast }) => {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const { setSelectedArticle } = useNews(); // ✅ Use the context hook
  const bookmarked = isBookmarked(article.url);

  /**
   * Toggle bookmark status
   * @param {Event} e - Click event
   */
  const toggleBookmark = (e) => {
    e.stopPropagation();
    
    if (bookmarked) {
      removeBookmark(article.url);
      showToast('Removed from bookmarks', 'info');
    } else {
      addBookmark(article);
      showToast('Added to bookmarks', 'success');
    }
  };

  /**
   * Share article
   * @param {Event} e - Click event
   */
  const handleShare = async (e) => {
    e.stopPropagation();
    const success = await shareArticle(article);
    
    if (success) {
      showToast('Article shared successfully', 'success');
    } else {
      showToast('Failed to share article', 'error');
    }
  };

  /**
   * Open article in modal
   */
  const openArticle = () => {
    setSelectedArticle(article);
  };

  /**
   * Open article in new tab
   * @param {Event} e - Click event
   */
  const openInNewTab = (e) => {
    e.stopPropagation();
    window.open(article.url, '_blank');
  };

  return (
    <article 
      onClick={openArticle}
      className="news-card glass-card hover-lift rounded-lg overflow-hidden shadow-lg transition-all duration-300 cursor-pointer bg-white dark:bg-dark-100"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-dark-200">
        {article.urlToImage ? (
          <img 
            src={article.urlToImage} 
            alt={article.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/640x360?text=No+Image';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-dark-200">
            <span className="text-gray-400 dark:text-gray-600 text-sm">No Image</span>
          </div>
        )}
        
        {/* Source badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 text-xs rounded-full bg-black/50 text-white backdrop-blur-sm font-medium">
            {getDomain(article.url)}
          </span>
        </div>
        
        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <button 
            onClick={toggleBookmark}
            className="p-1.5 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors duration-200"
            aria-label={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
          >
            <Bookmark size={16} className={bookmarked ? 'fill-white' : ''} />
          </button>
          
          <button 
            onClick={handleShare}
            className="p-1.5 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors duration-200"
            aria-label="Share article"
          >
            <Share2 size={16} />
          </button>
          
          <button 
            onClick={openInNewTab}
            className="p-1.5 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors duration-200"
            aria-label="Open in new tab"
          >
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
      
      {/* Content - Centered */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-900 dark:text-gray-100">
          {formatTitle(article.title)}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
          {formatDescription(article.description)}
        </p>
        
        <div className="flex justify-center items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
          <span>{article.author ? `By ${article.author}` : 'Unknown author'}</span>
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          <span>{formatRelativeTime(article.publishedAt)}</span>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;