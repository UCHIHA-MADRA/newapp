import { createContext, useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import { generateId } from '../utils/helpers';

/**
 * Context for managing bookmarked articles
 */
export const BookmarkContext = createContext();

/**
 * Provider component for bookmark management
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Bookmark provider component
 */
export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(() => {
    // Get saved bookmarks from localStorage
    const savedBookmarks = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  // Update localStorage when bookmarks change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  }, [bookmarks]);

  /**
   * Add article to bookmarks
   * @param {Object} article - Article to bookmark
   * @returns {boolean} Success status
   */
  const addBookmark = (article) => {
    // Check if already bookmarked
    if (bookmarks.some(bookmark => bookmark.url === article.url)) {
      return false;
    }
    
    // Add unique ID and timestamp
    const bookmarkToAdd = {
      ...article,
      bookmarkId: generateId(),
      bookmarkedAt: new Date().toISOString()
    };
    
    setBookmarks(prev => [bookmarkToAdd, ...prev]);
    return true;
  };

  /**
   * Remove article from bookmarks
   * @param {string} articleId - ID of article to remove
   * @returns {boolean} Success status
   */
  const removeBookmark = (articleId) => {
    const initialLength = bookmarks.length;
    setBookmarks(prev => prev.filter(bookmark => 
      bookmark.bookmarkId !== articleId && bookmark.url !== articleId
    ));
    return bookmarks.length !== initialLength;
  };

  /**
   * Check if article is bookmarked
   * @param {string} articleUrl - URL of article to check
   * @returns {boolean} Is bookmarked
   */
  const isBookmarked = (articleUrl) => {
    return bookmarks.some(bookmark => bookmark.url === articleUrl);
  };

  return (
    <BookmarkContext.Provider value={{ 
      bookmarks, 
      addBookmark, 
      removeBookmark, 
      isBookmarked 
    }}>
      {children}
    </BookmarkContext.Provider>
  );
};