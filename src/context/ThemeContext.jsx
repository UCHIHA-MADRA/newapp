import { createContext, useEffect, useState } from "react";

// Define constants inline
const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

/**
 * Context for managing application theme
 */
export const ThemeContext = createContext();

/**
 * Provider component for theme management
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Theme provider component
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check system preference (fallback to light if matchMedia not available)
    try {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? THEMES.DARK
        : THEMES.LIGHT;
    } catch (error) {
      return THEMES.LIGHT;
    }
  });

  // Update DOM when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(THEMES.LIGHT, THEMES.DARK);
    root.classList.add(theme);
  }, [theme]);

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
