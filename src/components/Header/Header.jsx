/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  Search,
  X,
  Bookmark,
  Settings,
  Sun,
  Moon,
  Globe,
  TrendingUp,
  Bell,
  ChevronDown,
  Newspaper,
  Heart,
  User,
  Zap,
  Filter,
} from "lucide-react";
import { useNews } from "../../context/NewsContext";
import { useTheme } from "../../hooks/useTheme";
import { NEWS_CATEGORIES, NEWS_COUNTRIES } from "../../utils/constants";

const Header = ({ showToast = () => {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [country, setCountry] = useState("us");

  // Use the useNews hook for state management
  const { searchQuery, setSearchQuery, category, setCategory, setCurrentPage } = useNews();
  const { theme, toggleTheme } = useTheme();

  // Icon mapping for categories
  const iconMap = {
    general: Globe,
    business: TrendingUp,
    technology: Settings,
    entertainment: Heart,
    health: Zap,
    science: Filter,
    sports: TrendingUp,
  };

  // Color mapping for categories
  const colorMap = {
    general: "from-blue-500 to-blue-600",
    business: "from-green-500 to-green-600",
    technology: "from-purple-500 to-purple-600",
    entertainment: "from-pink-500 to-pink-600",
    health: "from-red-500 to-red-600",
    science: "from-indigo-500 to-indigo-600",
    sports: "from-orange-500 to-orange-600",
  };

  // Enhanced categories with icons and colors
  const categories = NEWS_CATEGORIES.map((cat) => ({
    ...cat,
    icon: iconMap[cat.id] || Globe,
    color: colorMap[cat.id] || "from-gray-500 to-gray-600",
  }));

  const countries = NEWS_COUNTRIES;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentPage(1);
      setIsMenuOpen(false);
      showToast("Search updated", "success");
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1);
    setIsMenuOpen(false);
    showToast(`Category changed to ${newCategory}`, "success");
  };

  const handleCountryChange = (newCountry) => {
    setCountry(newCountry);
    setCurrentPage(1);
    setIsMenuOpen(false);
    const countryName = countries.find((c) => c.code === newCountry)?.name;
    showToast(`Country changed to ${countryName}`, "success");
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
    showToast("Search cleared", "info");
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <header className="header-container">
      <div className="header-wrapper">
        <div className="header-content">
          {/* Logo Section */}
          <div className="logo-section">
            <div className="logo-container">
              <div className="logo-icon-wrapper">
                <div className="logo-icon">
                  <Newspaper className="logo-newspaper" />
                </div>
                <div className="notification-dot"></div>
              </div>
              <div className="logo-text-container">
                <div className="text-isolate">
                  <h1 className="logo-title">NewsHub</h1>
                </div>
                <p className="logo-subtitle">Stay Informed</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {categories.slice(0, 4).map((cat) => {
              const IconComponent = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`nav-button ${
                    category === cat.id ? `nav-button-active ${cat.color}` : "nav-button-inactive"
                  }`}
                >
                  <IconComponent size={16} className="nav-icon" />
                  <span className="nav-text">{cat.name}</span>
                  {category === cat.id && <div className="nav-indicator"></div>}
                </button>
              );
            })}
          </nav>

          {/* Search Bar */}
          <div className="search-container">
            <form onSubmit={handleSearchSubmit}>
              <div className="search-wrapper">
                <div className={`search-input-wrapper ${isSearchFocused ? "search-focused" : ""}`}>
                  <Search className={`search-icon ${isSearchFocused ? "search-icon-focused" : ""}`} size={20} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearchSubmit(e);
                      }
                    }}
                    placeholder="Search breaking news, topics, sources..."
                    className="search-input"
                  />
                  {searchQuery && (
                    <button type="button" onClick={clearSearch} className="search-clear">
                      <X size={18} />
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Desktop Actions */}
          <div className="desktop-actions">
            {/* Country Selector */}
            <div className="country-selector">
              <select value={country} onChange={(e) => handleCountryChange(e.target.value)} className="country-select">
                {countries.map((c) => (
                  <option key={c.code} value={c.code} className="country-option">
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="country-chevron" />
            </div>

            {/* Notifications */}
            <button className="action-button">
              <Bell size={20} />
              {notifications > 0 && <span className="notification-badge">{notifications}</span>}
            </button>

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="action-button" aria-label="Toggle theme">
              {theme === "dark" ? <Sun size={20} className="theme-icon" /> : <Moon size={20} className="theme-icon" />}
            </button>

            {/* Bookmarks */}
            <button className="action-button">
              <Bookmark size={20} />
            </button>

            {/* Profile */}
            <div className="profile-container">
              <button onClick={toggleProfile} className="profile-button">
                <User size={20} />
                <ChevronDown size={16} className={`profile-chevron ${isProfileOpen ? "rotated" : ""}`} />
              </button>
              {isProfileOpen && (
                <div className="profile-dropdown">
                  <div className="profile-info">
                    <p className="profile-name">John Doe</p>
                    <p className="profile-email">john@example.com</p>
                  </div>
                  <a href="#" className="profile-link">
                    Profile Settings
                  </a>
                  <a href="#" className="profile-link">
                    Preferences
                  </a>
                  <div className="profile-divider"></div>
                  <a href="#" className="profile-link">
                    Sign Out
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="mobile-menu-button" aria-label="Toggle menu">
            <div className="hamburger">
              <div className={`hamburger-line ${isMenuOpen ? "hamburger-line-1-open" : "hamburger-line-1"}`}></div>
              <div className={`hamburger-line ${isMenuOpen ? "hamburger-line-2-open" : "hamburger-line-2"}`}></div>
              <div className={`hamburger-line ${isMenuOpen ? "hamburger-line-3-open" : "hamburger-line-3"}`}></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? "mobile-menu-open" : "mobile-menu-closed"}`}>
          <div className="mobile-menu-content">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit}>
              <div className="mobile-search">
                <Search className="mobile-search-icon" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchSubmit(e);
                    }
                  }}
                  placeholder="Search breaking news..."
                  className="mobile-search-input"
                />
                {searchQuery && (
                  <button type="button" onClick={clearSearch} className="mobile-search-clear">
                    <X size={18} />
                  </button>
                )}
              </div>
            </form>

            {/* Mobile Categories */}
            <div className="mobile-categories">
              <h3 className="mobile-categories-title">Categories</h3>
              <div className="mobile-categories-grid">
                {categories.map((cat) => {
                  const IconComponent = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`mobile-category-button ${
                        category === cat.id ? `mobile-category-active ${cat.color}` : "mobile-category-inactive"
                      }`}
                    >
                      <IconComponent size={18} />
                      <span className="mobile-category-text">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="mobile-actions">
              <div className="mobile-country-selector">
                <select
                  value={country}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="mobile-country-select"
                >
                  {countries.map((c) => (
                    <option key={c.code} value={c.code} className="mobile-country-option">
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="mobile-country-chevron" />
              </div>
              <div className="mobile-action-buttons">
                <button className="mobile-action-button">
                  <Bell size={20} />
                  {notifications > 0 && <span className="mobile-notification-badge">{notifications}</span>}
                </button>
                <button onClick={toggleTheme} className="mobile-action-button">
                  {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button className="mobile-action-button">
                  <Bookmark size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;