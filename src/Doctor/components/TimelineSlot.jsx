import React from 'react';

const TimelineSlot = ({ data, isLast }) => {
  // Helper to determine styles based on status/urgency
  const getStatusStyles = () => {
    if (data.isUrgent) {
      return {
        wrapper: "bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500",
        text: "text-red-700 dark:text-red-300",
        badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-200"
      };
    }
    if (data.statusColor === 'green') {
      return {
        wrapper: "bg-white dark:bg-[#1a2c2c] border-l-4 border-emerald-500",
        text: "text-[#111818] dark:text-white",
        badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
      };
    }
    // Default / Pending
    return {
      wrapper: "bg-white dark:bg-[#1a2c2c] border-l-4 border-amber-400",
      text: "text-[#111818] dark:text-white",
      badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
    };
  };

  const styles = getStatusStyles();

  return (
    <div className="flex gap-4 group">
      
      {/* 1. TIME COLUMN */}
      <div className="flex flex-col items-end w-16 pt-1 shrink-0">
        <span className="text-sm font-bold text-[#111818] dark:text-white leading-none">
          {data.time.split(' ')[0]}
        </span>
        <span className="text-[10px] font-medium text-secondary dark:text-gray-500 uppercase">
          {data.time.split(' ')[1]}
        </span>
      </div>

      {/* 2. TIMELINE LINE & NODE */}
      <div className="relative flex flex-col items-center">
        {/* The Dot */}
        <div className={`size-3 rounded-full border-2 z-10 
          ${data.isUrgent ? 'border-red-500 bg-red-100' : 'border-primary bg-background-light dark:bg-background-dark dark:border-primary'}
        `}></div>
        {/* The Line (Only render if not the last item) */}
        {!isLast && (
          <div className="h-full w-0.5 bg-gray-200 dark:bg-[#2a3c3c] absolute top-3"></div>
        )}
      </div>

      {/* 3. CARD CONTENT */}
      <div className="flex-1 pb-8">
        
        {/* --- APPOINTMENT TYPE --- */}
        {data.type === 'appointment' && (
          <div className={`relative p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ${styles.wrapper}`}>
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                {/* Avatar */}
                <div 
                  className="size-12 rounded-full bg-cover bg-center border border-gray-100 dark:border-gray-700 shadow-sm"
                  style={{ backgroundImage: `url(${data.avatar})` }}
                ></div>
                
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h4 className={`text-base font-bold ${styles.text}`}>
                      {data.patientName}
                    </h4>
                    {data.isUrgent && (
                      <span className="animate-pulse flex h-2 w-2 rounded-full bg-red-500"></span>
                    )}
                  </div>
                  
                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 ${styles.badge}`}>
                      {data.isUrgent ? 'Urgent' : data.status}
                    </span>
                    <span className="text-xs text-secondary dark:text-gray-400 font-medium">
                      • {data.mode}
                    </span>
                  </div>

                  <p className="text-sm text-secondary dark:text-gray-400 mt-1">
                    {data.note}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button className="text-secondary dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-[#253636] p-1.5 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            </div>
          </div>
        )}

        {/* --- BLOCKED / HOSPITAL TYPE --- */}
        {data.type === 'blocked' && (
          <div className="p-4 rounded-xl bg-[#f8fafc] dark:bg-[#152020] border border-gray-200 dark:border-[#2a3c3c] relative overflow-hidden opacity-80">
            {/* Striped Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
                 style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }}>
            </div>
            
            <div className="relative z-10 flex items-center gap-3">
              <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <span className="material-symbols-outlined text-[20px]">{data.icon}</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">{data.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-500">{data.subtitle}</p>
              </div>
            </div>
          </div>
        )}

        {/* --- OPEN SLOT TYPE --- */}
        {data.type === 'open' && (
          <div className="p-3 rounded-xl border-2 border-dashed border-primary/30 dark:border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors flex items-center justify-between group/slot cursor-pointer">
            <div className="flex items-center gap-2 text-primary-dark dark:text-primary">
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              <span className="text-sm font-bold">Available Slot</span>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#1a2c2c] text-xs font-bold text-secondary dark:text-gray-400 shadow-sm opacity-0 group-hover/slot:opacity-100 transition-opacity">
              Close Slot
            </button>
          </div>
        )}

        {/* --- BREAK TYPE --- */}
        {data.type === 'break' && (
          <div className="flex items-center gap-2 py-4 opacity-60">
             <div className="h-px flex-1 bg-gray-200 dark:bg-[#2a3c3c]"></div>
             <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
               <span className="material-symbols-outlined text-[16px]">{data.icon}</span>
               {data.title}
             </div>
             <div className="h-px flex-1 bg-gray-200 dark:bg-[#2a3c3c]"></div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TimelineSlot;