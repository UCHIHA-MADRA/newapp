import { useContext } from 'react';
import { BookmarkContext } from '../context/BookmarkContext';

/**
 * Hook for accessing bookmark context
 * @returns {Object} Bookmark context values
 */
export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  
  return context;
};