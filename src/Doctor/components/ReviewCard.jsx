import React from 'react';

const ReviewCard = ({ data, onReply }) => {
  const { 
    name, 
    consultation, 
    rating, 
    time, 
    content, 
    initials, 
    avatarColor, 
    textColor, 
    avatarUrl, 
    doctorReply 
  } = data;

  const getAvatarColors = () => {
    const colors = ['blue', 'purple', 'green', 'amber', 'pink', 'teal'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return {
      bg: `bg-${randomColor}-100`,
      text: `text-${randomColor}-600`
    };
  };

  const colors = avatarColor ? { bg: avatarColor, text: textColor } : getAvatarColors();

  return (
    <article className="flex flex-col gap-5 p-6 rounded-2xl bg-white dark:bg-[#1a2c2c] border border-slate-200 dark:border-[#2a3c3c] shadow-sm hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={name} 
              className="size-12 rounded-full border-2 border-slate-100 dark:border-[#2a3c3c]" 
            />
          ) : (
            <div className={`size-12 rounded-full ${colors.bg} dark:bg-opacity-20 flex items-center justify-center ${colors.text} font-bold text-sm`}>
              {initials || 'AN'}
            </div>
          )}
          
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white">{name}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Consultation: {consultation}</p>
          </div>
        </div>

        {/* Rating & Time */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-1 bg-slate-50 dark:bg-[#152626] px-2 py-1 rounded-lg">
            <span className="text-sm font-bold text-slate-900 dark:text-white">{rating}</span>
            <span className="material-symbols-outlined text-yellow-400 text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500">{time}</span>
        </div>
      </div>

      {/* Content */}
      <div className="pl-[3.75rem]">
        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          {content}
        </p>
      </div>

      {/* Doctor Reply Section */}
      {doctorReply ? (
        <div className="ml-[3.75rem] bg-gradient-to-r from-primary/5 to-transparent dark:from-[#13ecec]/5 rounded-xl p-4 border-l-2 border-primary">
          <div className="flex items-center gap-2 mb-2">
            <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[14px]">medical_services</span>
            </div>
            <span className="text-xs font-bold text-primary">Your Response</span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-400">{doctorReply.time || 'Recently'}</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {doctorReply.text}
          </p>
          <button className="mt-3 text-xs font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">edit</span>
            Edit Reply
          </button>
        </div>
      ) : (
        <div className="ml-[3.75rem] pt-4 border-t border-slate-100 dark:border-[#2a3c3c]">
          <button 
            onClick={onReply}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-sm font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">reply</span>
            Reply to Patient
          </button>
        </div>
      )}
    </article>
  );
};

export default ReviewCard;
