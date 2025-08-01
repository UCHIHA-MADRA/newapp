import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

/**
 * Hook for accessing theme context
 * @returns {Object} Theme context values
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};