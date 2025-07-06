import { X, Bookmark, Share2, ExternalLink } from 'lucide-react';
import { useNews } from '../../context/NewsContext';
import { useBookmarks } from '../../hooks/useBookmarks';
import { formatDate, formatAuthor } from '../../utils/formatters';
import { shareArticle, getDomain } from '../../utils/helpers';
import './Modal.css';

/**
 * Modal component for displaying article details
 * @param {Object} props - Component props
 * @param {Function} props.showToast - Function to show toast notifications
 * @returns {JSX.Element} Article modal component
 */
const ArticleModal = ({ showToast }) => {
  const { selectedArticle, setSelectedArticle } = useNews();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  if (!selectedArticle) return null;

  const bookmarked = isBookmarked(selectedArticle.url);

  /**
   * Close the modal
   */
  const closeModal = () => {
    setSelectedArticle(null);
  };

  /**
   * Toggle bookmark status
   */
  const toggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(selectedArticle.url);
      showToast('Removed from bookmarks', 'info');
    } else {
      addBookmark(selectedArticle);
      showToast('Added to bookmarks', 'success');
    }
  };

  /**
   * Share article
   */
  const handleShare = async () => {
    const success = await shareArticle(selectedArticle);
    
    if (success) {
      showToast('Article shared successfully', 'success');
    } else {
      showToast('Failed to share article', 'error');
    }
  };

  /**
   * Open article in new tab
   */
  const openInNewTab = () => {
    window.open(selectedArticle.url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      ></div>

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-dark-100 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-xl transform transition-all animate-slide-up">
          {/* Close button */}
          <button 
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-200/80 dark:bg-dark-200/80 backdrop-blur-sm z-10"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Image header */}
          <div className="relative h-64 md:h-80 bg-gray-200 dark:bg-dark-200">
            {selectedArticle.urlToImage ? (
              <img 
                src={selectedArticle.urlToImage} 
                alt={selectedArticle.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400 dark:text-gray-600">No Image Available</span>
              </div>
            )}

            {/* Source badge */}
            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1.5 text-sm rounded-full bg-black/60 text-white backdrop-blur-sm">
                {getDomain(selectedArticle.url)}
              </span>
            </div>

            {/* Action buttons */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button 
                onClick={toggleBookmark}
                className="p-2 rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/80 transition-colors"
                aria-label={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
              >
                <Bookmark size={18} className={bookmarked ? 'fill-white' : ''} />
              </button>
              
              <button 
                onClick={handleShare}
                className="p-2 rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/80 transition-colors"
                aria-label="Share article"
              >
                <Share2 size={18} />
              </button>
              
              <button 
                onClick={openInNewTab}
                className="p-2 rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/80 transition-colors"
                aria-label="Open in new tab"
              >
                <ExternalLink size={18} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-20rem)]">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {selectedArticle.title}
            </h2>

            <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-6 gap-y-2">
              {selectedArticle.author && (
                <span className="mr-4">By {formatAuthor(selectedArticle.author)}</span>
              )}
              {selectedArticle.publishedAt && (
                <span className="mr-4">{formatDate(selectedArticle.publishedAt)}</span>
              )}
              {selectedArticle.source?.name && (
                <span>Source: {selectedArticle.source.name}</span>
              )}
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                {selectedArticle.description}
              </p>
              
              {selectedArticle.content && (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedArticle.content.replace(/\[\+\d+ chars\]$/, '')}
                </p>
              )}

              <div className="mt-8 pt-6 border-t dark:border-gray-800">
                <a 
                  href={selectedArticle.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
                >
                  Read Full Article
                  <ExternalLink size={16} className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;