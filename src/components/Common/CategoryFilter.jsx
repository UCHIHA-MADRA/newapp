import { useContext } from 'react';
import { NewsContext } from '../../context/NewsContext';
import { NEWS_CATEGORIES } from '../../utils/constants';

/**
 * Category filter component for news categories
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.isMobile - Whether component is rendered on mobile
 * @returns {JSX.Element} Category filter component
 */
const CategoryFilter = ({ className = '', isMobile = false }) => {
  const { category, setCategory } = useContext(NewsContext);

  return (
    <div className={className}>
      {NEWS_CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setCategory(cat.id)}
          className={`px-3 py-1.5 rounded-full transition-all ${isMobile ? 'w-full text-left' : ''} ${
            category === cat.id
              ? 'bg-primary-500 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-100'
          }`}
        >
          <span className="mr-2">{cat.icon}</span>
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;