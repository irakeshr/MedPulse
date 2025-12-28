const EditProfileModal = ({onClose}) => {
  return (
    <div
      aria-modal="true" onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-med-dark/60 backdrop-blur-sm scrollbar-hide overflow-auto"
      role="dialog"
    >
      <div className="bg-white dark:bg-[#1a2c2c] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#e5e7eb] dark:border-[#2a3838] flex flex-col max-h-[90vh] scrollbar-hide overflow-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#e5e7eb] dark:border-[#2a3838]">
          <h2 className="text-xl font-bold text-med-dark dark:text-white">
            Edit Profile
          </h2>
          <button className="p-2 text-med-text-secondary dark:text-gray-400 hover:bg-med-gray dark:hover:bg-[#253636] rounded-full transition-colors" onClick={onClose}>
            <span className="material-symbols-outlined" onClick={onClose}>close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto scrollbar-hide">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Display Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-med-dark dark:text-gray-300">
                  Display Name
                </label>
                <input
                  className="w-full rounded-xl border-[#e5e7eb] dark:border-[#2a3838] bg-white dark:bg-[#1a2c2c] text-med-dark dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm outline-none"
                  placeholder="Your name"
                  type="text"
                  defaultValue="Sarah Jenkins"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-med-dark dark:text-gray-300">
                  Location
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-med-text-secondary text-[20px]">
                    location_on
                  </span>
                  <input
                    className="w-full rounded-xl border-[#e5e7eb] dark:border-[#2a3838] bg-white dark:bg-[#1a2c2c] text-med-dark dark:text-white pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm outline-none"
                    placeholder="City, Country"
                    type="text"
                    defaultValue="New York, NY"
                  />
                </div>
              </div>
            </div>

            {/* Website */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-med-dark dark:text-gray-300">
                Website
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-med-text-secondary text-[20px]">
                  link
                </span>
                <input
                  className="w-full rounded-xl border-[#e5e7eb] dark:border-[#2a3838] bg-white dark:bg-[#1a2c2c] text-med-dark dark:text-white pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm outline-none"
                  placeholder="https://example.com"
                  type="url"
                  defaultValue="https://sarah-wellness.com"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-med-dark dark:text-gray-300">
                Bio
              </label>
              <textarea
                className="w-full rounded-xl border-[#e5e7eb] dark:border-[#2a3838] bg-white dark:bg-[#1a2c2c] text-med-dark dark:text-white px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm outline-none resize-none"
                placeholder="Tell us about yourself..."
                rows={3}
                defaultValue="Health enthusiast focused on holistic wellness and migraine management. I believe in a balanced approach combining modern medicine and lifestyle changes. Always happy to share advice on natural remedies! 🌱"
              />
              <p className="text-xs text-med-text-secondary dark:text-gray-500 text-right">
                180/300 characters
              </p>
            </div>

            {/* Medical Details Section */}
            <div className="border-t border-[#e5e7eb] dark:border-[#2a3838] pt-6">
              <h3 className="text-lg font-bold text-med-dark dark:text-white mb-4">
                Medical Details
              </h3>
              <div className="space-y-4">
                {/* Allergies */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-med-dark dark:text-gray-300">
                    Allergies
                  </label>
                  <input
                    className="w-full rounded-xl border-[#e5e7eb] dark:border-[#2a3838] bg-white dark:bg-[#1a2c2c] text-med-dark dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm outline-none"
                    placeholder="List any allergies"
                    type="text"
                    defaultValue="Penicillin, Peanuts"
                  />
                  <p className="text-xs text-med-text-secondary dark:text-gray-500 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      lock
                    </span>
                    Visible only to registered doctors
                  </p>
                </div>

                {/* Chronic Conditions */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-med-dark dark:text-gray-300">
                    Chronic Conditions
                  </label>
                  <div className="flex flex-wrap gap-2 p-2 rounded-xl border border-[#e5e7eb] dark:border-[#2a3838] bg-white dark:bg-[#1a2c2c] min-h-[50px]">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/10 text-teal-800 dark:text-primary text-sm font-medium border border-primary/20">
                      Migraine
                      <button className="hover:text-teal-900" type="button">
                        <span className="material-symbols-outlined text-[14px]">
                          close
                        </span>
                      </button>
                    </span>
                    <input
                      className="bg-transparent outline-none flex-1 min-w-[120px] text-sm px-2 py-1 text-med-dark dark:text-white placeholder:text-med-text-secondary"
                      placeholder="Type and press Enter"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[#e5e7eb] dark:border-[#2a3838] bg-gray-50 dark:bg-[#162626] rounded-b-2xl flex justify-end gap-3">
          <button className="px-5 py-2.5 rounded-xl border border-[#e5e7eb] dark:border-[#2a3838] bg-white dark:bg-[#253636] text-med-dark dark:text-white font-semibold hover:bg-med-gray dark:hover:bg-[#2f4242] transition-colors">
            Cancel
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-primary text-med-dark font-bold hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;