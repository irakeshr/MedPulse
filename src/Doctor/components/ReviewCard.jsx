import React from 'react';

const ReviewCard = ({ data }) => {
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

  return (
    <article className="flex flex-col gap-4 p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-[#dbe6e6] dark:border-[#2a3c3c] shadow-card">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar Logic: Image OR Initials */}
          {avatarUrl ? (
            <div 
              className="size-10 rounded-full bg-gray-200 dark:bg-gray-700 bg-center bg-cover" 
              style={{ backgroundImage: `url("${avatarUrl}")` }}
            ></div>
          ) : (
            <div className={`size-10 rounded-full ${avatarColor || 'bg-blue-100'} dark:bg-opacity-30 flex items-center justify-center ${textColor || 'text-blue-600'} dark:text-opacity-80 font-bold text-sm`}>
              {initials}
            </div>
          )}
          
          <div>
            <h4 className="font-bold text-[#111818] dark:text-white text-sm">{name}</h4>
            <p className="text-xs text-secondary dark:text-gray-400">Consultation: {consultation}</p>
          </div>
        </div>

        {/* Star Rating & Time */}
        <div className="flex flex-col items-end gap-1">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={`material-symbols-outlined text-[18px] ${i < rating ? '' : 'opacity-30'}`} 
                style={{ fontVariationSettings: i < rating ? "'FILL' 1" : "'FILL' 0" }}
              >
                star
              </span>
            ))}
          </div>
          <span className="text-xs text-secondary dark:text-gray-500">{time}</span>
        </div>
      </div>

      <div>
        <p className="text-[#111818] dark:text-gray-200 text-sm leading-relaxed">
          {content}
        </p>
      </div>

      {/* CONDITIONAL RENDERING: Doctor Reply vs Action Buttons */}
      {doctorReply ? (
        <>
          <div className="bg-[#f0f4f4] dark:bg-[#1f3333] rounded-xl p-4 flex gap-3">
            <div 
              className="size-8 rounded-full bg-cover bg-center flex-shrink-0" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBaiLmrJHNaQy9G159MMy-qukkpz4uk6IOL9tuwFpUhsZ7KdhjcKDo_m_mz4s4ZzokcKg0MWa7QfAXKKdJxyrhPP-s0SA_KyYwFqm9Un_cLnUBK73HU30pczBcxd_fP2Lsg9JhRLVHbClvVKMBt_pVYGLaW9pOldbgi44o_Bs_QEov5FM5dLo4LO7o3VzusqXQ8ipYNEl_su5wckhc2gQbTwM1R0IcjdlS2EH4yKViS2GlTA0-802DlYrRXbnGhd2fog3l8zA1RARo")' }} // Hardcoded doctor avatar for now
            ></div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#111818] dark:text-white">Dr. Richards</span>
                <span className="text-[10px] text-secondary dark:text-gray-500">Replied {doctorReply.time}</span>
              </div>
              <p className="text-xs text-secondary dark:text-gray-400 leading-relaxed">
                {doctorReply.text}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-1 pt-2 border-t border-transparent">
            <button className="text-primary text-sm font-bold hover:underline ml-auto">Edit Reply</button>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-3 mt-2 pt-4 border-t border-[#f0f4f4] dark:border-[#2a3c3c]">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f0f4f4] dark:bg-[#1f3333] hover:bg-[#e0e6e6] dark:hover:bg-[#2a3c3c] text-sm font-bold text-[#111818] dark:text-white transition-colors">
            <span className="material-symbols-outlined text-[18px]">reply</span>
            Reply
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-secondary dark:text-gray-400 text-sm font-medium hover:bg-[#f0f4f4] dark:hover:bg-[#2a3c3c] transition-colors ml-auto">
            <span className="material-symbols-outlined text-[18px]">flag</span>
            Report
          </button>
        </div>
      )}
    </article>
  );
};

export default ReviewCard;