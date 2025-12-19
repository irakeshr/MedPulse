import React from 'react';

const DoctorModal = ({ isOpen, onClose, doctor }) => {
  // If modal is closed or no doctor selected, return nothing
  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-[#1a2c2c] rounded-2xl shadow-2xl overflow-hidden border border-[#e5e7eb] dark:border-[#2a3838] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()} // Prevent clicking inside modal from closing it
      >
        
        {/* --- Header Gradient --- */}
        <div className="h-24 bg-gradient-to-r from-teal-500/20 to-primary/20 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/10 hover:bg-black/20 text-med-dark dark:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-lg font-bold">close</span>
          </button>
        </div>

        {/* --- Content Section --- */}
        <div className="px-6 pb-6 -mt-12 relative">
          
          {/* Top Row: Avatar & Actions */}
          <div className="flex justify-between items-end mb-4">
            <div className="relative">
              <div className="size-24 rounded-full border-4 border-white dark:border-[#1a2c2c] bg-white dark:bg-[#1a2c2c] overflow-hidden shadow-sm">
                <div 
                  className="w-full h-full bg-center bg-no-repeat bg-cover" 
                  style={{ backgroundImage: `url('${doctor.image}')` }}
                ></div>
              </div>
              <div className="absolute bottom-1 right-1 bg-white dark:bg-[#1a2c2c] rounded-full p-1 shadow-sm border border-gray-100 dark:border-gray-800">
                <span className="material-symbols-outlined text-primary fill text-[20px]">verified</span>
              </div>
            </div>
            <div className="flex gap-2 mb-2">
              <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#253636] text-med-text-secondary dark:text-gray-400 transition-colors" title="Message">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </button>
              <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#253636] text-med-text-secondary dark:text-gray-400 transition-colors" title="Share Profile">
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>
            </div>
          </div>

          {/* Name & Stats */}
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-med-dark dark:text-white mb-1">{doctor.name}</h2>
            <p className="text-med-text-secondary dark:text-gray-400 font-medium">{doctor.specialty || "Specialist"}</p>
            
            <div className="flex items-center gap-4 mt-3 text-sm">
              <div className="flex items-center gap-1 text-med-dark dark:text-gray-200">
                <span className="material-symbols-outlined text-yellow-400 fill text-[18px]">star</span>
                <span className="font-bold">4.9</span>
                <span className="text-med-text-secondary dark:text-gray-500">(128 Reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-med-dark dark:text-gray-200">
                <span className="material-symbols-outlined text-med-text-secondary dark:text-gray-500 text-[18px]">work_history</span>
                <span>12 Years Exp.</span>
              </div>
              <div className="flex items-center gap-1 text-med-dark dark:text-gray-200">
                <span className="material-symbols-outlined text-med-text-secondary dark:text-gray-500 text-[18px]">language</span>
                <span>English, Mandarin</span>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-med-text-secondary dark:text-gray-500 mb-2">About</h3>
            <p className="text-sm text-med-dark dark:text-gray-300 leading-relaxed">
              {doctor.about || "Specializes in preventative care and believes in a holistic approach to health, combining modern medicine with lifestyle adjustments."}
            </p>
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-3 mt-2">
            <button className="flex-1 py-3 bg-primary hover:bg-primary/90 text-med-dark font-bold rounded-xl transition-colors shadow-sm shadow-primary/20 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">calendar_month</span>
              Book Appointment
            </button>
            <button className="flex-1 py-3 bg-white dark:bg-[#253636] border border-gray-200 dark:border-gray-700 hover:border-primary/50 text-med-dark dark:text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
              View Full Profile
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorModal;