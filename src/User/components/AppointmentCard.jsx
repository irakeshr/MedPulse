import React from 'react';

export default function AppointmentCard ({ 
  name, 
  role, 
  status, 
  statusColor, 
  date, 
  type, 
  icon, 
  imgSrc, 
  actionText, 
  opacityClass = "",
  isUrgent = false,
  onAction
}) {
  const [isConfirming, setIsConfirming] = React.useState(false);

  React.useEffect(() => {
    let timeout;
    if (isConfirming) {
        timeout = setTimeout(() => setIsConfirming(false), 3000); // Reset after 3 seconds
    }
    return () => clearTimeout(timeout);
  }, [isConfirming]);

  const handleActionClick = () => {
      // If it's an urgent "Join Now" button, action happens immediately
      if (isUrgent) {
          onAction();
          return;
      }
      
      // If it's a "Cancel" button, require 2 steps for "Silent UI"
      if (status === 'cancelled' || status === 'completed') return;

      if (!isConfirming) {
          setIsConfirming(true);
      } else {
          onAction();
          setIsConfirming(false);
      }
  };

  const statusColors = {
    amber: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
    green: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    red: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
  };

  const cardBorderClass = isUrgent 
    ? "border-primary shadow-lg shadow-primary/10 ring-1 ring-primary" 
    : "border-slate-200 dark:border-slate-800 hover:border-primary/30";

  // Dynamic Button Styling based on state
  let actionButtonClass = "";
  let buttonContent = actionText;

  if (isUrgent) {
      actionButtonClass = "bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20 animate-pulse";
  } else if (isConfirming) {
      // Confirm State
      actionButtonClass = "bg-red-500 hover:bg-red-600 text-white shadow-md animate-bounce-subtle";
      buttonContent = "Click to Confirm";
  } else {
      // Default Cancel State
      actionButtonClass = "border border-slate-200 dark:border-slate-700 hover:border-red-500 hover:text-red-500 text-slate-500 dark:text-slate-400";
  }

  return (
    <div className={`bg-white dark:bg-[#2d1e16] border rounded-2xl p-6 transition-all shadow-sm ${cardBorderClass} ${opacityClass}`}>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative">
          <img className="w-20 h-20 rounded-xl object-cover" alt={name} src={imgSrc} />
          {isUrgent && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm animate-bounce">
              SOON
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="text-lg font-bold">{name}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{role}</p>
            </div>
            <div className={`${statusColors[statusColor] || statusColors.green} px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1`}>
              <span className="material-symbols-outlined text-sm">
                {status === 'Confirmed' ? 'verified' : status === 'Pending' ? 'pending' : 'event'}
              </span> 
              {status}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-3 mb-4">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <span className="material-symbols-outlined text-slate-400 text-lg">schedule</span>
              <p className="text-sm font-medium">{date}</p>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <span className="material-symbols-outlined text-slate-400 text-lg">{icon || 'videocam'}</span>
              <p className="text-sm font-medium">{type || 'Consultation'}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 hover:text-primary text-slate-700 dark:text-slate-300 font-bold py-2 px-6 rounded-lg text-sm transition-all">
              View Details
            </button>
            {actionText && (
              <button 
                onClick={handleActionClick}
                className={`${actionButtonClass} py-2 px-6 rounded-lg text-sm font-bold transition-all min-w-[140px]`}
              >
                {buttonContent}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};