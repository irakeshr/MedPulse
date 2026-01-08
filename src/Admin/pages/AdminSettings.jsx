import React from 'react';

export default function AdminSettings() {
  return (
    <div className="flex-1 flex flex-col w-full px-4 lg:px-8 py-8 gap-6 overflow-y-auto h-full bg-background-light dark:text-white dark:bg-background-dark transition-colors duration-200">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-med-dark dark:text-white">Platform Settings</h1>
          <p className="text-med-text-secondary dark:text-gray-400 text-sm mt-1">Configure general options, notifications, and system integrations.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white dark:bg-[#253636] border border-[#e5e7eb] dark:border-[#2a3838] text-med-dark dark:text-white rounded-lg text-sm font-medium hover:bg-med-gray transition-colors">
            Discard
          </button>
          <button className="px-4 py-2 bg-med-dark dark:bg-primary text-white dark:text-med-dark rounded-lg text-sm font-medium hover:bg-med-dark/90 transition-colors shadow-lg shadow-primary/20">
            Save Changes
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 max-w-5xl">
        
        {/* 1. General Settings */}
        <section className="bg-white dark:bg-[#1a2c2c] rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-[#e5e7eb] dark:border-[#2a3838] pb-4">
            <div className="p-2 bg-med-gray dark:bg-[#253636] rounded-lg">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>tune</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-med-dark dark:text-white">General Settings</h2>
              <p className="text-xs text-med-text-secondary">Basic platform configuration and identity.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1">
              <label className="block text-xs font-semibold text-med-dark dark:text-white uppercase tracking-wide mb-2">Platform Name</label>
              <input className="w-full rounded-xl bg-med-gray/50 dark:bg-[#253636] border-gray-200 dark:border-[#2a3838] focus:border-primary focus:ring-primary/50 text-sm py-2.5 px-4" type="text" defaultValue="MedPulse" />
            </div>
            <div className="col-span-1">
              <label className="block text-xs font-semibold text-med-dark dark:text-white uppercase tracking-wide mb-2">Support Email</label>
              <input className="w-full rounded-xl bg-med-gray/50 dark:bg-[#253636] border-gray-200 dark:border-[#2a3838] focus:border-primary focus:ring-primary/50 text-sm py-2.5 px-4" type="email" defaultValue="support@medpulse.io" />
            </div>
            <div className="col-span-1">
              <label className="block text-xs font-semibold text-med-dark dark:text-white uppercase tracking-wide mb-2">Timezone</label>
              <select className="w-full rounded-xl bg-med-gray/50 dark:bg-[#253636] border-gray-200 dark:border-[#2a3838] focus:border-primary focus:ring-primary/50 text-sm py-2.5 px-4" defaultValue="EST (Eastern Standard Time)">
                <option>UTC (Coordinated Universal Time)</option>
                <option>EST (Eastern Standard Time)</option>
                <option>PST (Pacific Standard Time)</option>
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-xs font-semibold text-med-dark dark:text-white uppercase tracking-wide mb-2">Language</label>
              <select className="w-full rounded-xl bg-med-gray/50 dark:bg-[#253636] border-gray-200 dark:border-[#2a3838] focus:border-primary focus:ring-primary/50 text-sm py-2.5 px-4" defaultValue="English (US)">
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex flex-col md:flex-row gap-6">
            <div className="flex items-center justify-between p-4 bg-med-gray/30 dark:bg-[#253636]/30 rounded-xl border border-[#e5e7eb] dark:border-[#2a3838] w-full">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-med-dark dark:text-white">Maintenance Mode</span>
                <span className="text-xs text-med-text-secondary">Temporarily disable access for users.</span>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300" id="toggle-maint" name="toggle" type="checkbox" />
                <label className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer" htmlFor="toggle-maint"></label>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-med-gray/30 dark:bg-[#253636]/30 rounded-xl border border-[#e5e7eb] dark:border-[#2a3838] w-full">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-med-dark dark:text-white">Public Registration</span>
                <span className="text-xs text-med-text-secondary">Allow new users to sign up.</span>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300" id="toggle-reg" name="toggle" type="checkbox" />
                <label className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer" htmlFor="toggle-reg"></label>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Email & Notifications */}
        <section className="bg-white dark:bg-[#1a2c2c] rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-[#e5e7eb] dark:border-[#2a3838] pb-4">
            <div className="p-2 bg-med-gray dark:bg-[#253636] rounded-lg">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>notifications</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-med-dark dark:text-white">Email & Notifications</h2>
              <p className="text-xs text-med-text-secondary">Manage automated communications and alerts.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-med-dark dark:text-white">Daily Digest</p>
                <p className="text-xs text-med-text-secondary">Send admins a daily summary of platform activity.</p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300" id="toggle-digest" name="toggle" type="checkbox" />
                <label className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer" htmlFor="toggle-digest"></label>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-[#e5e7eb] dark:border-[#2a3838]">
              <div>
                <p className="text-sm font-medium text-med-dark dark:text-white">Critical Report Alerts</p>
                <p className="text-xs text-med-text-secondary">Instant email when a "High Severity" post is flagged.</p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300" id="toggle-alerts" name="toggle" type="checkbox" />
                <label className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer" htmlFor="toggle-alerts"></label>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-[#e5e7eb] dark:border-[#2a3838]">
              <div>
                <p className="text-sm font-medium text-med-dark dark:text-white">New Doctor Signups</p>
                <p className="text-xs text-med-text-secondary">Notify when a new medical professional registers.</p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300" id="toggle-doc" name="toggle" type="checkbox" />
                <label className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer" htmlFor="toggle-doc"></label>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Integrations */}
        <section className="bg-white dark:bg-[#1a2c2c] rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-[#e5e7eb] dark:border-[#2a3838] pb-4">
            <div className="p-2 bg-med-gray dark:bg-[#253636] rounded-lg">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>extension</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-med-dark dark:text-white">Integrations</h2>
              <p className="text-xs text-med-text-secondary">External services and API configurations.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="flex justify-between text-xs font-semibold text-med-dark dark:text-white uppercase tracking-wide mb-2">
                <span>Google Maps API Key</span>
                <span className="text-green-500 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">check_circle</span> Active</span>
              </label>
              <div className="relative">
                <input className="w-full rounded-xl bg-med-gray/50 dark:bg-[#253636] border-gray-200 dark:border-[#2a3838] focus:border-primary focus:ring-primary/50 text-sm py-2.5 pl-4 pr-24" type="password" defaultValue="AIzaSyBgK...9s8d7f" />
                <button className="absolute right-2 top-1.5 px-3 py-1 text-xs font-bold text-med-text-secondary bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] rounded-md hover:bg-gray-50">Reveal</button>
              </div>
              <p className="text-xs text-med-text-secondary mt-1">Used for doctor location services.</p>
            </div>
            <div>
              <label className="flex justify-between text-xs font-semibold text-med-dark dark:text-white uppercase tracking-wide mb-2">
                <span>Analytics ID (GA4)</span>
                <span className="text-med-text-secondary">Optional</span>
              </label>
              <input className="w-full rounded-xl bg-med-gray/50 dark:bg-[#253636] border-gray-200 dark:border-[#2a3838] focus:border-primary focus:ring-primary/50 text-sm py-2.5 px-4" placeholder="G-XXXXXXXXXX" type="text" />
            </div>
          </div>
        </section>

        {/* 4. Analytics Settings */}
        <section className="bg-white dark:bg-[#1a2c2c] rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] p-6 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-6 border-b border-[#e5e7eb] dark:border-[#2a3838] pb-4">
            <div className="p-2 bg-med-gray dark:bg-[#253636] rounded-lg">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>bar_chart</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-med-dark dark:text-white">Analytics Settings</h2>
              <p className="text-xs text-med-text-secondary">Configure data retention and reporting metrics.</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="w-full md:w-1/2">
                <label className="block text-xs font-semibold text-med-dark dark:text-white uppercase tracking-wide mb-2">Data Retention Period</label>
                <select className="w-full rounded-xl bg-med-gray/50 dark:bg-[#253636] border-gray-200 dark:border-[#2a3838] focus:border-primary focus:ring-primary/50 text-sm py-2.5 px-4" defaultValue="90 Days">
                  <option>30 Days</option>
                  <option>90 Days</option>
                  <option>1 Year</option>
                  <option>Indefinite</option>
                </select>
              </div>
              <div className="w-full md:w-1/2">
                <label className="block text-xs font-semibold text-med-dark dark:text-white uppercase tracking-wide mb-2">Reporting Frequency</label>
                <select className="w-full rounded-xl bg-med-gray/50 dark:bg-[#253636] border-gray-200 dark:border-[#2a3838] focus:border-primary focus:ring-primary/50 text-sm py-2.5 px-4" defaultValue="Daily Batch">
                  <option>Real-time</option>
                  <option>Daily Batch</option>
                  <option>Weekly Batch</option>
                </select>
              </div>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30 flex items-start gap-3 mt-2">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 mt-0.5">info</span>
              <div>
                <p className="text-sm font-bold text-blue-800 dark:text-blue-300">HIPAA Compliance Notice</p>
                <p className="text-xs text-blue-700 dark:text-blue-200 mt-1">
                  Ensuring analytics data is anonymized is critical for compliance. Please verify that "Anonymize IP" is enabled in your connected analytics provider dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}