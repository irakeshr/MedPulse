import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-med-dark dark:text-white font-display overflow-x-hidden transition-colors duration-200 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="w-full border-t border-[#e5e7eb] dark:border-gray-800 bg-[#f7f9fb] dark:bg-[#0f172a]">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-6 max-w-7xl mx-auto">
          <div className="flex flex-col gap-2">
            <div className="text-lg font-bold text-med-dark dark:text-white">MedPulse</div>
            <p className="text-xs text-med-text-secondary dark:text-gray-400">© 2024 MedPulse Clinical Sanctuary. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-8">
            <a className="text-xs text-med-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white underline-offset-4 hover:underline transition-all duration-150" href="#">Privacy Policy</a>
            <a className="text-xs text-med-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white underline-offset-4 hover:underline transition-all duration-150" href="#">Terms of Service</a>
            <a className="text-xs text-med-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white underline-offset-4 hover:underline transition-all duration-150" href="#">Cookie Settings</a>
            <a className="text-xs text-med-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white underline-offset-4 hover:underline transition-all duration-150" href="#">Accessibility</a>
          </div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-med-text-secondary dark:text-gray-400 cursor-pointer hover:text-primary transition-colors">public</span>
            <span className="material-symbols-outlined text-med-text-secondary dark:text-gray-400 cursor-pointer hover:text-primary transition-colors">verified_user</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
