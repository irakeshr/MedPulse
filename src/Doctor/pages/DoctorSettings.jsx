import React from 'react';

export default function DoctorSettings() {
  return (
    <div className="bg-white dark:bg-background-dark text-[#111818] dark:text-white font-display transition-colors duration-200 h-screen w-full flex flex-col">
      
      {/* Mobile Header (Visible on small screens) */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-surface-light dark:bg-surface-dark border-b border-[#dbe6e6] dark:border-[#2a3c3c]">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[20px]">cardiology</span>
          </div>
          <span className="font-bold text-lg dark:text-white">MedPulse</span>
        </div>
        <button className="p-2 text-[#111818] dark:text-white">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-6 lg:py-8 scrollbar-hide">
          <div className="mx-auto max-w-5xl flex flex-col gap-8">
            
            {/* Page Header & Actions */}
            <div className="flex items-center justify-between c">
              <div>
                <h1 className="text-[#111818] dark:text-white text-3xl font-black tracking-tight mb-1">Account Settings</h1>
                <p className="text-secondary dark:text-gray-400">Manage your public profile and account preferences.</p>
              </div>
              <div className="flex gap-3">
                <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-[#dbe6e6] rounded-xl text-sm font-bold text-secondary dark:bg-[#1f3333] dark:border-[#2a3c3c] dark:text-white hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button className="flex items-center gap-2 px-6 py-2 bg-primary text-[#085555] rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark hover:text-white transition-all">
                  <span className="material-symbols-outlined text-[20px]">save</span>
                  Save Changes
                </button>
              </div>
            </div>

            {/* Settings Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 ">
              
              {/* Left Navigation (Sticky) */}
              <div className="lg:col-span-3">
                <nav className="flex flex-col gap-1 sticky top-[90px]">
                  <a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white shadow-sm border border-[#dbe6e6] text-[#0e7c7c] font-semibold dark:bg-[#1f3333] dark:border-[#2a3c3c] dark:text-white" href="#profile">
                    <span className="material-symbols-outlined text-[20px]">person</span>
                    Profile Info
                  </a>
                  <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary hover:bg-[#f0f4f4] hover:text-[#111818] transition-colors font-medium dark:text-gray-400 dark:hover:bg-[#1f3333] dark:hover:text-white" href="#availability">
                    <span className="material-symbols-outlined text-[20px]">schedule</span>
                    Availability
                  </a>
                  <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary hover:bg-[#f0f4f4] hover:text-[#111818] transition-colors font-medium dark:text-gray-400 dark:hover:bg-[#1f3333] dark:hover:text-white" href="#notifications">
                    <span className="material-symbols-outlined text-[20px]">notifications</span>
                    Notifications
                  </a>
                  <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary hover:bg-[#f0f4f4] hover:text-[#111818] transition-colors font-medium dark:text-gray-400 dark:hover:bg-[#1f3333] dark:hover:text-white" href="#security">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                    Security
                  </a>
                </nav>
              </div>

              {/* Right Content Forms */}
              <div className="lg:col-span-9 flex flex-col gap-6">
                
                {/* SECTION: Profile Info */}
                <section className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 md:p-8 shadow-card border border-[#dbe6e6] dark:border-[#2a3c3c]" id="profile">
                  <h3 className="text-xl font-bold text-[#111818] dark:text-white mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">id_card</span>
                    Public Profile
                  </h3>
                  <div className="flex flex-col md:flex-row gap-8 mb-8 items-start">
                    <div className="flex flex-col items-center gap-3">
                      <div className="size-28 rounded-full bg-gray-200 dark:bg-gray-700 bg-center bg-cover border-4 border-[#f0f4f4] dark:border-[#1f3333]" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBaiLmrJHNaQy9G159MMy-qukkpz4uk6IOL9tuwFpUhsZ7KdhjcKDo_m_mz4s4ZzokcKg0MWa7QfAXKKdJxyrhPP-s0SA_KyYwFqm9Un_cLnUBK73HU30pczBcxd_fP2Lsg9JhRLVHbClvVKMBt_pVYGLaW9pOldbgi44o_Bs_QEov5FM5dLo4LO7o3VzusqXQ8ipYNEl_su5wckhc2gQbTwM1R0IcjdlS2EH4yKViS2GlTA0-802DlYrRXbnGhd2fog3l8zA1RARo")' }}></div>
                      <button className="text-sm font-bold text-primary-dark dark:text-primary hover:underline">Change Photo</button>
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">Full Name</label>
                        <input className="w-full rounded-xl border-[#dbe6e6] bg-[#f6f8f8] px-4 py-2.5 text-sm font-medium text-[#111818] focus:border-primary focus:ring-primary/20 dark:bg-[#152626] dark:border-[#2a3c3c] dark:text-white dark:focus:border-primary transition-all" type="text" defaultValue="Dr. Richard Henderson" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">Specialization</label>
                        <select className="w-full rounded-xl border-[#dbe6e6] bg-[#f6f8f8] px-4 py-2.5 text-sm font-medium text-[#111818] focus:border-primary focus:ring-primary/20 dark:bg-[#152626] dark:border-[#2a3c3c] dark:text-white dark:focus:border-primary transition-all">
                          <option>Cardiology</option>
                          <option>Dermatology</option>
                          <option>General Practice</option>
                          <option>Neurology</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">License Number</label>
                        <input className="w-full rounded-xl border-[#dbe6e6] bg-[#f6f8f8] px-4 py-2.5 text-sm font-medium text-[#111818] focus:border-primary focus:ring-primary/20 dark:bg-[#152626] dark:border-[#2a3c3c] dark:text-white dark:focus:border-primary transition-all" type="text" defaultValue="MED-9928-NY" />
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">Professional Bio</label>
                    <textarea className="w-full rounded-xl border-[#dbe6e6] bg-[#f6f8f8] px-4 py-3 text-sm font-medium text-[#111818] focus:border-primary focus:ring-primary/20 dark:bg-[#152626] dark:border-[#2a3c3c] dark:text-white dark:focus:border-primary transition-all leading-relaxed" rows="4" defaultValue="Experienced Cardiologist with over 15 years in diagnosing and treating cardiovascular diseases. Passionate about preventive care and patient education. Completed residency at Mount Sinai Hospital."></textarea>
                    <p className="text-xs text-secondary mt-1 text-right">240 characters remaining</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">Contact Email (Public)</label>
                      <input className="w-full rounded-xl border-[#dbe6e6] bg-[#f6f8f8] px-4 py-2.5 text-sm font-medium text-[#111818] focus:border-primary focus:ring-primary/20 dark:bg-[#152626] dark:border-[#2a3c3c] dark:text-white dark:focus:border-primary transition-all" type="email" defaultValue="dr.richards@medpulse.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">Clinic Phone</label>
                      <input className="w-full rounded-xl border-[#dbe6e6] bg-[#f6f8f8] px-4 py-2.5 text-sm font-medium text-[#111818] focus:border-primary focus:ring-primary/20 dark:bg-[#152626] dark:border-[#2a3c3c] dark:text-white dark:focus:border-primary transition-all" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                  </div>
                </section>

                {/* SECTION: Availability */}
                <section className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 md:p-8 shadow-card border border-[#dbe6e6] dark:border-[#2a3c3c]" id="availability">
                  <h3 className="text-xl font-bold text-[#111818] dark:text-white mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">calendar_clock</span>
                    Availability & Scheduling
                  </h3>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#f0f4f4] dark:bg-[#1f3333] mb-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#111818] dark:text-white">Accepting New Patients</span>
                      <span className="text-xs text-secondary dark:text-gray-400">Toggle this off to pause new consultation requests.</span>
                    </div>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                      <input defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-[#dbe6e6]" id="toggle-patients" name="toggle" type="checkbox" />
                      <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer" htmlFor="toggle-patients"></label>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 border border-[#dbe6e6] rounded-xl dark:border-[#2a3c3c]">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-sm text-[#111818] dark:text-white">Monday - Friday</span>
                        <div className="relative inline-block w-8 align-middle select-none">
                          <input defaultChecked className="checked:bg-primary w-4 h-4 rounded text-primary focus:ring-0" type="checkbox" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <input className="rounded-lg border-[#dbe6e6] bg-[#f6f8f8] text-xs font-medium dark:bg-[#152626] dark:border-[#2a3c3c]" type="time" defaultValue="09:00" />
                        <span className="text-secondary">to</span>
                        <input className="rounded-lg border-[#dbe6e6] bg-[#f6f8f8] text-xs font-medium dark:bg-[#152626] dark:border-[#2a3c3c]" type="time" defaultValue="17:00" />
                      </div>
                    </div>
                    <div className="p-4 border border-[#dbe6e6] rounded-xl dark:border-[#2a3c3c] opacity-60">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-sm text-[#111818] dark:text-white">Weekends</span>
                        <div className="relative inline-block w-8 align-middle select-none">
                          <input className="checked:bg-primary w-4 h-4 rounded text-primary focus:ring-0" type="checkbox" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <input className="rounded-lg border-[#dbe6e6] bg-gray-100 text-xs font-medium dark:bg-[#1a2c2c] dark:border-[#2a3c3c]" disabled type="time" defaultValue="10:00" />
                        <span className="text-secondary">to</span>
                        <input className="rounded-lg border-[#dbe6e6] bg-gray-100 text-xs font-medium dark:bg-[#1a2c2c] dark:border-[#2a3c3c]" disabled type="time" defaultValue="14:00" />
                      </div>
                    </div>
                  </div>
                </section>

                {/* SECTION: Notifications */}
                <section className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 md:p-8 shadow-card border border-[#dbe6e6] dark:border-[#2a3c3c]" id="notifications">
                  <h3 className="text-xl font-bold text-[#111818] dark:text-white mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">notifications_active</span>
                    Notifications
                  </h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between pb-4 border-b border-[#f0f4f4] dark:border-[#2a3c3c]">
                      <div>
                        <p className="font-bold text-sm text-[#111818] dark:text-white">New Case Alerts</p>
                        <p className="text-xs text-secondary dark:text-gray-400">Receive an email when a patient posts a case matching your specialty.</p>
                      </div>
                      <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                        <input defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-[#dbe6e6]" id="toggle-cases" name="toggle" type="checkbox" />
                        <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer" htmlFor="toggle-cases"></label>
                      </div>
                    </div>
                    <div className="flex items-start justify-between pb-4 border-b border-[#f0f4f4] dark:border-[#2a3c3c]">
                      <div>
                        <p className="font-bold text-sm text-[#111818] dark:text-white">Direct Messages</p>
                        <p className="text-xs text-secondary dark:text-gray-400">Notifications for direct inquiries from verified patients.</p>
                      </div>
                      <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                        <input defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-[#dbe6e6]" id="toggle-dm" name="toggle" type="checkbox" />
                        <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer" htmlFor="toggle-dm"></label>
                      </div>
                    </div>
                    <div className="flex items-start justify-between pb-4 border-b border-[#f0f4f4] dark:border-[#2a3c3c]">
                      <div>
                        <p className="font-bold text-sm text-[#111818] dark:text-white">Weekly Performance Digest</p>
                        <p className="text-xs text-secondary dark:text-gray-400">A summary of your case reviews and patient feedback.</p>
                      </div>
                      <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                        <input className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-[#dbe6e6]" id="toggle-digest" name="toggle" type="checkbox" />
                        <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer" htmlFor="toggle-digest"></label>
                      </div>
                    </div>
                  </div>
                </section>

                {/* SECTION: Security */}
                <section className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 md:p-8 shadow-card border border-[#dbe6e6] dark:border-[#2a3c3c]" id="security">
                  <h3 className="text-xl font-bold text-[#111818] dark:text-white mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">shield_lock</span>
                    Account Security
                  </h3>
                  <div className="mb-6">
                    
                    <div className="space-y-4 max-w-md">
                      <div>
                        <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">Current Password</label>
                        <input className="w-full rounded-xl border-[#dbe6e6] bg-[#f6f8f8] px-4 py-2.5 text-sm font-medium text-[#111818] focus:border-primary focus:ring-primary/20 dark:bg-[#152626] dark:border-[#2a3c3c] dark:text-white dark:focus:border-primary transition-all" type="password" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">New Password</label>
                        <input className="w-full rounded-xl border-[#dbe6e6] bg-[#f6f8f8] px-4 py-2.5 text-sm font-medium text-[#111818] focus:border-primary focus:ring-primary/20 dark:bg-[#152626] dark:border-[#2a3c3c] dark:text-white dark:focus:border-primary transition-all" type="password" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">Confirm New Password</label>
                        <input className="w-full rounded-xl border-[#dbe6e6] bg-[#f6f8f8] px-4 py-2.5 text-sm font-medium text-[#111818] focus:border-primary focus:ring-primary/20 dark:bg-[#152626] dark:border-[#2a3c3c] dark:text-white dark:focus:border-primary transition-all" type="password" />
                      </div>
                      <button className="mt-2 px-4 py-2 bg-white border border-[#dbe6e6] text-[#111818] rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 dark:bg-[#1f3333] dark:border-[#2a3c3c] dark:text-white dark:hover:bg-[#253d3d] transition-all">Update Password</button>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-[#f0f4f4] dark:border-[#2a3c3c]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm text-[#111818] dark:text-white">Two-Factor Authentication (2FA)</p>
                        <p className="text-xs text-secondary dark:text-gray-400">Add an extra layer of security to your account.</p>
                      </div>
                      <button className="text-primary-dark font-bold text-sm hover:underline dark:text-primary">Enable 2FA</button>
                    </div>
                  </div>
                </section>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}