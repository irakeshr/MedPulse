import React from 'react';

const CustomToast = ({ closeToast, title, message, type = 'success' }) => {
  // Define colors based on type (success, error, etc.) if needed
  const styles = {
    success: {
      border: 'border-green-500',
      bgIcon: 'bg-green-100 dark:bg-green-900/30',
      textIcon: 'text-green-600 dark:text-green-400',
      iconName: 'check_circle'
    },
    error: {
      border: 'border-red-500',
      bgIcon: 'bg-red-100 dark:bg-red-900/30',
      textIcon: 'text-red-600 dark:text-red-400',
      iconName: 'error'
    }
  };

  const currentStyle = styles[type] || styles.success;

  return (
    <div className="w-full h-full bg-transparent">
      <div className={`bg-white dark:bg-[#1a2c2c] border-l-4 ${currentStyle.border} rounded-lg shadow-lg dark:shadow-black/30 p-4 flex items-center gap-4 min-w-[320px] max-w-sm`}>
        {/* Icon */}
        <div className={`${currentStyle.bgIcon} rounded-full p-2 flex-shrink-0`}>
          <span className={`material-symbols-outlined ${currentStyle.textIcon} text-[20px] fill`}>
            {currentStyle.iconName}
          </span>
        </div>

        {/* Text Content */}
        <div className="flex-1">
          <h6 className="font-semibold text-med-dark dark:text-white text-sm">
            {title}
          </h6>
          <p className="text-xs text-med-text-secondary dark:text-gray-400 mt-0.5">
            {message}
          </p>
        </div>

        {/* Close Button */}
        <button 
          onClick={closeToast}
          className="text-med-text-secondary dark:text-gray-500 hover:text-med-dark dark:hover:text-white transition-colors p-1 rounded-full hover:bg-med-gray dark:hover:bg-[#253636]"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  );
};

export default CustomToast;