import React from 'react';

const SavedItemCard = ({ item, onRemove }) => {
  
  // 1. Logic to decide which content to render based on type
  const renderContent = () => {
    switch (item.type) {
      case 'post': return <PostContent item={item} />;
      case 'article': return <ArticleContent item={item} />;
      case 'doctor': return <DoctorContent item={item} />;
      default: return null;
    }
  };

  return (
    <article className="bg-white dark:bg-[#1a2c2c] rounded-2xl p-6 shadow-soft hover:shadow-md border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row gap-5 relative group transition-all duration-200">
      
      {/* --- COMMON: Remove Button (Absolute Positioned) --- */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button 
          onClick={() => onRemove(item.id)}
          className="text-med-text-secondary dark:text-gray-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 p-2 rounded-full transition-colors" 
          title="Remove from saved"
        >
          <span className="material-symbols-outlined fill text-[20px]">bookmark_remove</span>
        </button>
      </div>

      {/* --- DYNAMIC CONTENT --- */}
      {renderContent()}
    
    </article>
  );
};

// --- SUB-COMPONENTS (Internal Use Only) ---

const PostContent = ({ item }) => (
  <div className="flex-1">
    <div className="flex items-center flex-wrap gap-2 mb-3">
      <span className="bg-primary/10 text-primary-dark dark:text-primary text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">Symptom Post</span>
      <span className="text-xs text-med-text-secondary dark:text-gray-500">•</span>
      <span className="text-xs text-med-text-secondary dark:text-gray-500 flex items-center gap-1">
        <span className="material-symbols-outlined text-[14px]">schedule</span> {item.savedAt}
      </span>
    </div>
    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 leading-tight  cursor-pointer transition-colors">
      {item.title}
    </h3>
    <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2 mb-4">
      {item.description}
    </p>
    <div className="flex items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
      <div className="flex items-center gap-2">
        {item.author.image ? (
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-6 border border-slate-200 dark:border-slate-700" style={{ backgroundImage: `url(${item.author.image})` }}></div>
        ) : (
            <div className="flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/40 text-indigo-500 dark:text-indigo-300 rounded-full size-6 ring-1 ring-indigo-100 dark:ring-indigo-900">
                <span className="material-symbols-outlined text-[14px]">visibility_off</span>
            </div>
        )}
        <span className="text-xs font-semibold text-slate-700 dark:text-gray-300">{item.author.name}</span>
      </div>
      <span className="inline-flex items-center gap-1 text-slate-500 dark:text-gray-400 text-xs font-medium">
        <span className="material-symbols-outlined text-[14px]">chat_bubble</span> {item.stats.responses} Responses
      </span>
    </div>
  </div>
);

const ArticleContent = ({ item }) => (
  <>
    <div className="w-full md:w-40 h-48 md:h-auto bg-cover bg-center rounded-xl shrink-0 border border-slate-100 dark:border-slate-700 shadow-sm" style={{ backgroundImage: `url('${item.image}')` }}></div>
    <div className="flex-1 flex flex-col justify-center">
      <div className="flex items-center flex-wrap gap-2 mb-3">
        <span className="bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">Article</span>
        <span className="text-xs text-med-text-secondary dark:text-gray-500">•</span>
        <span className="text-xs text-med-text-secondary dark:text-gray-500 flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">schedule</span> {item.savedAt}
        </span>
      </div>
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 leading-tight group-hover:text-primary cursor-pointer transition-colors">
        {item.title}
      </h3>
      <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2 mb-4">
        {item.description}
      </p>
      <div className="flex items-center gap-3 text-xs text-med-text-secondary dark:text-gray-400 font-medium">
        <span className="flex items-center gap-1 text-primary-dark dark:text-primary">
            <span className="material-symbols-outlined text-[16px]">verified_user</span> {item.author.name}
        </span>
        <span>•</span>
        <span>{item.readTime}</span>
      </div>
    </div>
  </>
);

const DoctorContent = ({ item }) => (
  <>
    <div className="bg-center bg-no-repeat bg-cover rounded-full size-24 shrink-0 border-4 border-emerald-50 dark:border-emerald-900/20 shadow-sm mx-auto md:mx-0" style={{ backgroundImage: `url("${item.image}")` }}></div>
    <div className="flex-1 text-center md:text-left w-full">
      <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
        <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">Doctor Profile</span>
      </div>
      <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors">{item.name}</h3>
        {item.isVerified && <span className="material-symbols-outlined text-primary text-[20px] fill" title="Verified Doctor">verified</span>}
      </div>
      <p className="text-sm text-slate-500 dark:text-gray-400 font-medium mb-3">{item.specialty}</p>
      <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed mb-4 max-w-lg mx-auto md:mx-0">
        {item.description}
      </p>
      <div className="flex items-center justify-center md:justify-start gap-3">
        <button className="text-xs font-semibold bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg transition-colors shadow-sm hover:shadow">Book Consultation</button>
        <button className="text-xs font-semibold border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-[#253636] text-slate-700 dark:text-gray-300 px-5 py-2.5 rounded-lg transition-colors">View Profile</button>
      </div>
    </div>
  </>
);

export default SavedItemCard;