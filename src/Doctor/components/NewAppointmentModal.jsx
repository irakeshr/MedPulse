import React from 'react';

const NewAppointmentModal = ({ isOpen, onClose }) => {
  // If the modal isn't open, don't render anything
  if (!isOpen) return null;

  return (
    <div  onClick={onClose} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#111818]/40 backdrop-blur-sm">
      {/* Modal Content Wrapper */}
      <div onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-surface-dark w-full max-w-lg rounded-3xl shadow-modal overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#dbe6e6] dark:border-[#2a3c3c]">
          <h2 className="text-xl font-black text-[#111818] dark:text-white">
            Create New Appointment
          </h2>
          <button
            onClick={onClose}
            className="size-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-[#2a3c3c] text-secondary dark:text-gray-400 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form */}
        <form className="p-8 space-y-6">
          <div className="space-y-4">
            
            {/* Date Input */}
            <div>
              <label
                className="block text-sm font-bold text-[#111818] dark:text-white mb-2"
                htmlFor="appt-date"
              >
                Date
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary/60 text-[20px]">
                  calendar_today
                </span>
                <input
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#dbe6e6] dark:border-[#2a3c3c] bg-[#f6f8f8] dark:bg-[#152626] focus:ring-2 focus:ring-primary/20 focus:border-primary dark:text-white transition-all outline-none"
                  id="appt-date"
                  required
                  type="date"
                />
              </div>
            </div>

            {/* Time Inputs Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-bold text-[#111818] dark:text-white mb-2"
                  htmlFor="start-time"
                >
                  Starting Time
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary/60 text-[20px]">
                    schedule
                  </span>
                  <input
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#dbe6e6] dark:border-[#2a3c3c] bg-[#f6f8f8] dark:bg-[#152626] focus:ring-2 focus:ring-primary/20 focus:border-primary dark:text-white transition-all outline-none"
                    id="start-time"
                    required
                    type="time"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-bold text-[#111818] dark:text-white mb-2"
                  htmlFor="end-time"
                >
                  Ending Time
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary/60 text-[20px]">
                    timer
                  </span>
                  <input
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#dbe6e6] dark:border-[#2a3c3c] bg-[#f6f8f8] dark:bg-[#152626] focus:ring-2 focus:ring-primary/20 focus:border-primary dark:text-white transition-all outline-none"
                    id="end-time"
                    required
                    type="time"
                  />
                </div>
              </div>
            </div>

            {/* Patient Name */}
            <div>
              <label
                className="block text-sm font-bold text-[#111818] dark:text-white mb-2"
                htmlFor="patient-name"
              >
                Patient Name <span className="text-secondary/60 font-medium">(Optional)</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary/60 text-[20px]">
                  person
                </span>
                <input
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#dbe6e6] dark:border-[#2a3c3c] bg-[#f6f8f8] dark:bg-[#152626] focus:ring-2 focus:ring-primary/20 focus:border-primary dark:text-white transition-all outline-none"
                  id="patient-name"
                  placeholder="e.g. Sarah Jenkins"
                  type="text"
                />
              </div>
            </div>

            {/* Consultation Type */}
            <div>
              <label
                className="block text-sm font-bold text-[#111818] dark:text-white mb-2"
                htmlFor="consult-type"
              >
                Consultation Type <span className="text-secondary/60 font-medium">(Optional)</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary/60 text-[20px]">
                  medical_services
                </span>
                <select
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#dbe6e6] dark:border-[#2a3c3c] bg-[#f6f8f8] dark:bg-[#152626] focus:ring-2 focus:ring-primary/20 focus:border-primary dark:text-white appearance-none transition-all outline-none"
                  id="consult-type"
                  defaultValue=""
                >
                  <option value="">Select type</option>
                  <option value="video">Video Call</option>
                  <option value="in-person">In-Person</option>
                  <option value="emergency">Emergency</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-secondary/60 pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-[#dbe6e6] dark:border-[#2a3c3c] text-[#111818] dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-[#1f3333] transition-all"
              type="button"
            >
              Cancel
            </button>
            <button
              className="px-6 py-3 rounded-xl bg-primary text-[#085555] font-black shadow-md shadow-primary/20 hover:bg-[#0ebdbd] hover:text-white transition-all"
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