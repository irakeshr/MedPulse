import React from 'react';

const DiscussionCard = ({ discussion }) => {
  return (
    <article className="bg-white dark:bg-[#1a2c2c] rounded-2xl p-5 shadow-sm border border-[#e5e7eb] dark:border-[#2a3838] hover:border-med-text-secondary/30 transition-colors cursor-pointer">
      <header className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {discussion.isAnonymous ? (
            <div className="flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/40 text-indigo-500 dark:text-indigo-300 rounded-full size-6">
              <span className="material-symbols-outlined text-[14px]">visibility_off</span>
            </div>
          ) : (
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-full size-6" 
              style={{ backgroundImage: `url("${discussion.userImage}")` }}
            ></div>
          )}
          
          <span className="text-xs font-semibold text-med-dark dark:text-white">
            {discussion.userName}
          </span>
          <span className="text-xs text-med-text-secondary dark:text-gray-500">•</span>
          <span className="text-xs text-med-text-secondary dark:text-gray-500">{discussion.timeAgo}</span>
        </div>
        
        {/* Category Badge */}
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${discussion.categoryColor}`}>
          {discussion.category}
        </span>
      </header>

      <h3 className="text-lg font-bold text-med-dark dark:text-white mb-2">{discussion.title}</h3>
      <p className="text-med-dark dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
        {discussion.content}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {discussion.tags.map((tag, index) => (
             <span key={index} className="inline-flex items-center px-2 py-1 rounded bg-med-gray dark:bg-[#253636] text-med-text-secondary dark:text-gray-400 text-xs">
               {tag}
             </span>
          ))}
        </div>
        <div className="flex items-center gap-4 text-med-text-secondary dark:text-gray-400 text-xs">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            <span>{discussion.stats.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
            <span>{discussion.stats.replies} Replies</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default DiscussionCard;