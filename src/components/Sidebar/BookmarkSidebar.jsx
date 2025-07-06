import { X, Trash2, ExternalLink } from 'lucide-react';
import { useBookmarks } from '../../hooks/useBookmarks';
import { formatRelativeTime, formatTitle } from '../../utils/formatters';
import './Sidebar.css';

/**
 * Sidebar component for displaying bookmarked articles
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether sidebar is open
 * @param {Function} props.onClose - Close handler
 * @param {Function} props.showToast - Function to show toast notifications
 * @returns {JSX.Element} Bookmark sidebar component
 */
const BookmarkSidebar = ({ isOpen, onClose, showToast }) => {
  const { bookmarks, removeBookmark } = useBookmarks();

  /**
   * Remove article from bookmarks
   * @param {string} id - Article ID
   * @param {Event} e - Click event
   */
  const handleRemove = (id, e) => {
    e.stopPropagation();
    removeBookmark(id);
    showToast('Removed from bookmarks', 'info');
  };

  /**
   * Open article in new tab
   * @param {string} url - Article URL
   */
  const openArticle = (url) => {
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white dark:bg-dark-900 shadow-xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="p-4 border-b dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Bookmarks</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-100 transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Bookmarks list */}
        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          {bookmarks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="text-gray-400 dark:text-gray-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">No bookmarks yet</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Save articles to read later by clicking the bookmark icon.
              </p>
            </div>
          ) : (
            <ul className="divide-y dark:divide-gray-800">
              {bookmarks.map((bookmark) => (
                <li 
                  key={bookmark.bookmarkId || bookmark.url} 
                  className="p-4 hover:bg-gray-50 dark:hover:bg-dark-100 transition-colors cursor-pointer"
                  onClick={() => openArticle(bookmark.url)}
                >
                  <div className="flex items-start gap-3">
                    {/* Thumbnail */}
                    {bookmark.urlToImage && (
                      <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden bg-gray-200 dark:bg-dark-200">
                        <img 
                          src={bookmark.urlToImage} 
                          alt="" 
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/64?text=News';
                          }}
                        />
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-medium text-sm mb-1 line-clamp-2">
                        {formatTitle(bookmark.title)}
                      </h3>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{formatRelativeTime(bookmark.publishedAt || bookmark.bookmarkedAt)}</span>
                        <div className="flex space-x-1">
                          <button 
                            onClick={(e) => handleRemove(bookmark.bookmarkId || bookmark.url, e)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Remove bookmark"
                          >
                            <Trash2 size={14} />
                          </button>
                          <button 
                            className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                            aria-label="Open in new tab"
                          >
                            <ExternalLink size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default BookmarkSidebar;