import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { TOAST_TYPES } from '../../utils/constants';

/**
 * Toast notification component
 * @param {Object} props - Component props
 * @param {string} props.message - Toast message
 * @param {string} props.type - Toast type (success, error, info, warning)
 * @param {Function} props.onClose - Close handler
 * @returns {JSX.Element} Toast component
 */
const Toast = ({ message, type = TOAST_TYPES.INFO, onClose }) => {
  // Auto-close toast after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  // Toast icon based on type
  const getIcon = () => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return <CheckCircle size={20} className="text-green-500" />;
      case TOAST_TYPES.ERROR:
        return <AlertCircle size={20} className="text-red-500" />;
      case TOAST_TYPES.WARNING:
        return <AlertTriangle size={20} className="text-yellow-500" />;
      case TOAST_TYPES.INFO:
      default:
        return <Info size={20} className="text-blue-500" />;
    }
  };

  // Toast background color based on type
  const getBgColor = () => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case TOAST_TYPES.ERROR:
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case TOAST_TYPES.WARNING:
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case TOAST_TYPES.INFO:
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div className={`${getBgColor()} rounded-lg shadow-lg border p-4 max-w-md flex items-center`}>
        <div className="mr-3">
          {getIcon()}
        </div>
        <div className="flex-1 mr-2">
          <p className="text-sm text-gray-800 dark:text-gray-200">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;