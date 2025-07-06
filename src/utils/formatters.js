/**
 * Date and text formatting utilities
 */
import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';

/**
 * Format date to relative time (e.g., "2 hours ago")
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted relative time
 */
export const formatRelativeTime = (date) => {
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(parsedDate)) return 'Unknown time';
    
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  } catch {
    return 'Unknown time';
  }
};

/**
 * Format date to readable format
 * @param {string|Date} date - Date to format
 * @param {string} formatString - Format pattern
 * @returns {string} Formatted date
 */
export const formatDate = (date, formatString = 'MMM dd, yyyy') => {
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(parsedDate)) return 'Invalid date';
    
    return format(parsedDate, formatString);
  } catch {
    return 'Invalid date';
  }
};

/**
 * Format article title for display
 * @param {string} title - Article title
 * @param {number} maxLength - Maximum length
 * @returns {string} Formatted title
 */
export const formatTitle = (title, maxLength = 80) => {
  if (!title) return 'Untitled';
  
  // Remove source attribution (e.g., " - CNN")
  const cleanTitle = title.replace(/ - [^-]+$/, '');
  
  if (cleanTitle.length <= maxLength) return cleanTitle;
  return cleanTitle.substr(0, maxLength) + '...';
};

/**
 * Format article description
 * @param {string} description - Article description
 * @param {number} maxLength - Maximum length
 * @returns {string} Formatted description
 */
export const formatDescription = (description, maxLength = 150) => {
  if (!description) return 'No description available';
  
  if (description.length <= maxLength) return description;
  return description.substr(0, maxLength) + '...';
};

/**
 * Format author name
 * @param {string} author - Author name
 * @returns {string} Formatted author
 */
export const formatAuthor = (author) => {
  if (!author) return 'Unknown Author';
  
  // Handle multiple authors
  if (author.includes(',')) {
    const authors = author.split(',');
    if (authors.length > 2) {
      return `${authors[0].trim()} and ${authors.length - 1} others`;
    }
    return authors.map(a => a.trim()).join(' and ');
  }
  
  return author;
};