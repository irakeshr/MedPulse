import React, { useRef } from 'react';

const NewAppointmentModal = ({ isOpen, onClose }) => {
    useRef
  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#111818]/60 backdrop-blur-sm transition-all">
      {/* Modal Container */}
      <div onClick={(e)=>e.stopPropagation()} className="w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 relative 
        bg-white dark:bg-[#1a2c2c] transition-colors duration-200">
        
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="size-8 flex items-center justify-center rounded-full transition-colors
            hover:bg-gray-100 text-gray-400 dark:hover:bg-[#253636] dark:text-gray-500"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Form Content */}
        <form className="p-8 pt-12 md:p-10 md:pt-16 space-y-5">
          
          <h2 className="text-xl font-black text-center mb-6 text-[#111818] dark:text-white">
            New Appointment
          </h2>

          {/* Date Input */}
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-[20px] pointer-events-none transition-colors
              text-gray-400 dark:text-gray-500 group-focus-within:text-[#00e0d0]">
              calendar_today
            </span>
            <input
              className="w-full pl-14 pr-6 py-4 rounded-full focus:text-[#252525] font-medium outline-none transition-all shadow-sm
              bg-gray-50 text-[#111818] placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[#00e0d0]/50
              dark:bg-[#111818] dark:text-white dark:placeholder-gray-600 dark:focus:ring-[#00e0d0]"
              id="appt-date"
              required
              type="date"
              placeholder="dd-mm-yyyy"
            />
          </div>

          {/* Time Inputs Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-[20px] pointer-events-none transition-colors
                text-gray-400 dark:text-gray-500 group-focus-within:text-[#00e0d0]">
                schedule
              </span>
              <input
                className="w-full focus:text-[#252525] pl-14 pr-6 py-4 rounded-full font-medium outline-none transition-all shadow-sm
                bg-gray-50 text-[#111818] placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[#00e0d0]/50
                dark:bg-[#111818] dark:text-white dark:placeholder-gray-600 dark:focus:ring-[#00e0d0]"
                id="start-time"
                required
                type="time"
              />
            </div>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-[20px] pointer-events-none transition-colors
                text-gray-400 dark:text-gray-500 group-focus-within:text-[#00e0d0]">
                timer
              </span>
              <input
                className="w-full focus:text-[#252525] pl-14 pr-6 py-4 rounded-full font-medium outline-none transition-all shadow-sm
                bg-gray-50 text-[#111818] placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[#00e0d0]/50
                dark:bg-[#111818] dark:text-white dark:placeholder-gray-600 dark:focus:ring-[#00e0d0]"
                id="end-time"
                required
                type="time"
              />
            </div>
          </div>

       
          {/* Consultation Type Select */}
           
          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-6 mt-4">
            <button
              onClick={onClose}
              className="flex-1 py-4 rounded-full font-bold transition-all border
              border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700
              dark:border-[#2a3c3c] dark:text-gray-400 dark:hover:bg-[#253636] dark:hover:text-gray-200"
              type="button"
            >
              Cancel
            </button>
            <button
              className="flex-[2] py-4 rounded-full font-black shadow-lg transition-all
              bg-[#00e0d0] text-[#111818] shadow-[#00e0d0]/20 
              hover:bg-[#00c4b5] hover:scale-[1.02] active:scale-[0.98]"
              type="submit"
            >
              Create Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAppointmentModal;