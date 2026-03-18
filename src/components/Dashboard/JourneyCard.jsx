import React from 'react';

const JourneyCard = ({
  icon,
  title,
  description,
  linkText,
  onLinkClick,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      <button
        onClick={onLinkClick}
        className="text-blue-600 font-medium text-sm hover:text-blue-700 flex items-center gap-1"
      >
        {linkText}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default JourneyCard;
