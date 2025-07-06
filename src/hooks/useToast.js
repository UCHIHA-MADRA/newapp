import { useState, useCallback } from 'react';
import { TOAST_TYPES } from '../utils/constants';

/**
 * Hook for managing toast notifications
 * @returns {Object} Toast state and methods
 */
export const useToast = () => {
  const [toast, setToast] = useState(null);

  /**
   * Show a toast notification
   * @param {string} message - Toast message
   * @param {string} type - Toast type (success, error, info, warning)
   * @param {number} duration - Duration in milliseconds
   */
  const showToast = useCallback((message, type = TOAST_TYPES.INFO, duration = 3000) => {
    setToast({ message, type });
    
    // Auto-hide toast after duration
    const timer = setTimeout(() => {
      setToast(null);
    }, duration);
    
    return () => clearTimeout(timer);
  }, []);

  /**
   * Hide the current toast
   */
  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return { toast, showToast, hideToast };
};