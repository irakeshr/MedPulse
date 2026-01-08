import React from 'react';

const ModerationCard = ({ data }) => {
  
  // Helper: Get styles based on severity
  const getStyles = (severity) => {
    switch (severity) {
      case 'high': return {
        border: "border-red-200 dark:border-red-900/40",
        headerBg: "bg-red-50 dark:bg-red-900/10",
        badge: "text-red-700 dark:text-red-300 bg-white dark:bg-red-900/40 border-red-200 dark:border-red-800"
      };
      case 'medium': return {
        border: "border-[#e5e7eb] dark:border-[#2a3838]",
        headerBg: "bg-gray-50 dark:bg-[#1e3030]",
        badge: "text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800"
      };
      case 'low': return {
        border: "border-[#e5e7eb] dark:border-[#2a3838]",
        headerBg: "bg-gray-50 dark:bg-[#1e3030]",
        badge: "text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600",
        opacity: "opacity-90 hover:opacity-100"
      };
      default: return {};
    }
  };

  const style = getStyles(data.severity);

  return (
    <div className={`bg-white dark:bg-[#1a2c2c] rounded-2xl border shadow-sm overflow-hidden transition-all hover:shadow-md ${style.border} ${style.opacity || ''}`}>
      
      {/* --- CARD HEADER --- */}
      <div className={`${style.headerBg} px-6 py-3 border-b ${style.border} flex justify-between items-center`}>
        <div className="flex items-center gap-3">
          <span className={`flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded border ${style.badge}`}>
            <span className="material-symbols-outlined text-[16px]">
              {data.severity === 'high' ? 'warning' : data.severity === 'medium' ? 'medical_services' : 'campaign'}
            </span>
            {data.type}
          </span>
          <span className="text-xs text-med-text-secondary">
            Flagged {data.time} • {data.reports ? `${data.reports} User Reports` : `Reported by ${data.reporter}`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-med-text-secondary uppercase">ID: #{data.id}</span>
        </div>
      </div>

      {/* --- CARD BODY --- */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: Content Display */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-start gap-4">
            
            {/* Avatar Logic */}
            {data.user.avatar ? (
              <div className="size-10 rounded-full bg-gray-200 flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: `url(${data.user.avatar})` }}></div>
            ) : (
              <div className={`size-10 rounded-full bg-${data.user.color || 'gray'}-100 text-${data.user.color || 'gray'}-600 flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                {data.user.initials}
              </div>
            )}
            
            {/* User Content Bubble */}
            <div className="flex-1 bg-med-gray dark:bg-[#253636] p-4 rounded-xl rounded-tl-none border border-transparent dark:border-[#2a3838]">
              <div className="flex justify-between mb-2">
                <span className="font-bold text-sm text-med-dark dark:text-white">{data.user.name}</span>
                <span className="text-xs text-med-text-secondary">Posted in <span className="font-medium text-primary-dark">{data.user.channel}</span></span>
              </div>
              <p className="text-med-dark dark:text-gray-200 text-sm leading-relaxed">
                {data.content}
              </p>
              
              {/* Optional Image Attachment */}
              {data.image && (
                <div className="mt-3 rounded-lg overflow-hidden h-40 bg-gray-200 bg-cover bg-center relative" style={{ backgroundImage: `url(${data.image})` }}>
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="text-white text-xs font-bold bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">Image Attachment</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Context Box (Conditional) */}
          {data.context && (
            <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30 rounded-lg p-3 ml-14">
              <h5 className="text-xs font-bold text-yellow-800 dark:text-yellow-500 mb-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">info</span>
                Context: Previous history
              </h5>
              <p className="text-xs text-yellow-800/80 dark:text-yellow-500/80">{data.context.text}</p>
            </div>
          )}
        </div>

        {/* RIGHT: Actions Panel */}
        <div className="lg:col-span-4 flex flex-col gap-3 border-l border-gray-100 dark:border-gray-800 lg:pl-6">
          <h4 className="text-xs font-bold uppercase text-med-text-secondary tracking-wider mb-1">Take Action</h4>
          
          {/* Bot / Spam Actions */}
          {data.actions.includes('delete_spam') ? (
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </button>
              <button className="flex-[3] flex items-center justify-center gap-2 px-4 py-2.5 bg-med-dark dark:bg-white text-white dark:text-med-dark rounded-lg text-sm font-bold hover:opacity-90 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[18px]">delete_forever</span>
                Delete as Spam
              </button>
            </div>
          ) : (
            <>
              {/* Standard Actions */}
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[18px]">check</span>
                Approve Content
              </button>
              
              {data.actions.includes('warn') && (
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">edit_note</span>
                  Add Warning Label
                </button>
              )}

              {data.actions.includes('remove_warn') && (
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                  Remove & Warn
                </button>
              )}

              {data.actions.includes('ban') && (
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-[#253636] border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 rounded-lg text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">block</span>
                  Ban User
                </button>
              )}

              {data.actions.includes('hide') && (
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-[#253636] border border-[#e5e7eb] dark:border-[#2a3838] text-med-dark dark:text-white rounded-lg text-sm font-bold hover:bg-med-gray dark:hover:bg-[#2a3838] transition-colors">
                  <span className="material-symbols-outlined text-[18px]">visibility_off</span>
                  Hide Content
                </button>
              )}
            </>
          )}

          {/* Footer Info */}
          {data.isBot && <p className="text-[10px] text-center text-med-text-secondary mt-1">This user account is flagged as potential bot.</p>}
          
          {!data.isBot && !data.actions.includes('delete_spam') && (
            <div className="mt-2 pt-3 border-t border-gray-100 dark:border-gray-700">
              <button className="w-full text-xs text-med-text-secondary hover:text-primary font-medium flex items-center justify-center gap-1">
                Send to Escalation Queue <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModerationCard;