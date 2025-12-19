
const CaseCard = ({ data }) => {
  return (
    <article className={`flex flex-col md:flex-row gap-5 p-5 rounded-2xl bg-surface-light dark:bg-surface-dark shadow-card hover:shadow-md transition-shadow 
      ${data.isUrgent 
        ? "border-l-4 border-l-red-500 dark:border-t dark:border-r dark:border-b dark:border-gray-700" 
        : "border border-[#dbe6e6] dark:border-[#2a3c3c]"
      }`}>
      <div className="flex-shrink-0">
        <div 
          className="size-14 rounded-full bg-gray-200 dark:bg-gray-700 bg-center bg-cover" 
          style={{ backgroundImage: `url('${data.avatar}')` }}
        ></div>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-2.5 py-0.5 rounded-md ${data.priorityStyle} text-xs font-bold uppercase tracking-wide`}>
            {data.priority}
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-[#f0f4f4] dark:bg-[#1f3333] text-secondary dark:text-gray-400 text-xs font-medium">
            {data.specialty}
          </span>
          <span className="text-xs text-secondary dark:text-gray-500 ml-auto flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">schedule</span> {data.time}
          </span>
        </div>
        <h4 className="text-lg font-bold text-[#111818] dark:text-white">{data.title}</h4>
        <p className="text-secondary dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
          {data.desc}
        </p>
        
        <div className="flex items-center gap-2 mt-2 pt-3 border-t border-[#f0f4f4] dark:border-[#2a3c3c]">
          {data.viewers > 0 ? (
            <>
              <div className="flex -space-x-2 mr-2">
                <div className="size-6 rounded-full border-2 border-white dark:border-[#1a2c2c] bg-gray-200"></div>
                <div className="size-6 rounded-full border-2 border-white dark:border-[#1a2c2c] bg-gray-300"></div>
              </div>
              <span className="text-xs text-secondary dark:text-gray-500 font-medium">{data.viewers} other doctors viewing</span>
              <div className="flex-1"></div>
              <button className="px-4 py-2 rounded-lg text-secondary dark:text-gray-400 text-sm font-semibold hover:bg-[#f0f4f4] dark:hover:bg-[#2a3c3c] transition-colors">Dismiss</button>
              <button className="px-5 py-2 rounded-lg bg-primary text-[#111818] text-sm font-bold shadow-sm hover:brightness-105 transition-all">Review Case</button>
            </>
          ) : (
            <>
              <div className="flex-1"></div>
              <button className="px-4 py-2 rounded-lg text-secondary dark:text-gray-400 text-sm font-semibold hover:bg-[#f0f4f4] dark:hover:bg-[#2a3c3c] transition-colors">Dismiss</button>
              <button className="px-5 py-2 rounded-lg border border-primary text-primary-dark dark:text-primary text-sm font-bold hover:bg-primary/5 transition-all">Quick Reply</button>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default CaseCard;