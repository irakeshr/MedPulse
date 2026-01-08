import React from 'react';
import { useState,useEffect } from 'react';

const AdminHeader = () => {

     
    
      // Dark Mode Logic
      const [isDarkMode, setIsDarkMode] = useState(false);
    
      useEffect(() => {
        // Check system preference or localStorage on mount
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          setIsDarkMode(true);
          document.documentElement.classList.add('dark');
        } else {
          setIsDarkMode(false);
          document.documentElement.classList.remove('dark');
        }
      }, []);
    
      const toggleDarkMode = () => {
        if (isDarkMode) {
          document.documentElement.classList.remove('dark');
          localStorage.theme = 'light';
          setIsDarkMode(false);
        } else {
          document.documentElement.classList.add('dark');
          localStorage.theme = 'dark';
          setIsDarkMode(true);
        }
      };
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e5e7eb] dark:border-[#2a3838] bg-white dark:bg-background-dark  px-6 lg:px-10 py-3 shadow-sm">
      <div className="flex items-center gap-8 w-full">
        {/* Logo */}
        <div className="flex items-center gap-4 text-med-dark dark:text-white shrink-0">
          <div className="size-8 text-primary">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fillRule="evenodd"></path>
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">MedPulse</h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-med-dark text-white dark:bg-white dark:text-med-dark">Admin</span>
          </div>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-[600px] mx-auto">
          <label className="flex w-full items-center">
            <div className="flex w-full items-center rounded-xl bg-med-gray dark:bg-[#253636] h-10 px-4 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
              <span className="material-symbols-outlined text-med-text-secondary dark:text-gray-400">search</span>
              <input className="w-full bg-transparent border-none focus:ring-0 text-sm ml-2 placeholder:text-med-text-secondary dark:placeholder:text-gray-500 text-med-dark dark:text-white h-full" placeholder="Search users, reports, or logs..." />
            </div>
          </label>
        </div>

        {/* User Menu */}
        <div className="flex items-center justify-end gap-4 shrink-0">
          <button className="p-2 text-med-dark dark:text-white rounded-full hover:bg-med-gray dark:hover:bg-[#253636] relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-white dark:border-[#1a2c2c]"></span>
          </button>
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-med-dark dark:text-white hover:bg-med-gray dark:hover:bg-[#253636] transition-colors"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <span className="material-symbols-outlined text-[22px] fill">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <div className="flex items-center gap-3 pl-2 border-l border-gray-200 dark:border-gray-700">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-med-dark dark:text-white">Admin User</p>
              <p className="text-xs text-med-text-secondary">Super Admin</p>
            </div>
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-primary cursor-pointer" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCOLCviMOpASErCHhTQmvY6k34iYjPPoNBtTcXTevn6qvSVudTEwgQtFPiNSM2fdDYS95FtRj0VMuJZ2MhrCv7Je5qakn_Yo9VwsJIEKLLds3-whsOamhqUK47VWjCFw35W61E_-AWBjonf9A9fdwikxOiALd27cPTkB7PAhHRgG7d4ltlHxF__DTRS_15qNAHrVAhOQk3p2mBzmH7Uum18DB5Z6Ck4VDoIjknvWcW0y9wVdlHYF1a23BsjBnqQBRNl__52tiym3xU")' }}></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;