import React from 'react';
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();

  // Helper: Determine active styling for nav items
  const active = (path) =>
    location.pathname === path
      ? "bg-primary/10 text-med-dark dark:text-white font-medium"
      : "text-med-text-secondary dark:text-gray-400 hover:bg-med-gray dark:hover:bg-[#253636] font-medium transition-colors";

  // Helper: Determine active icon styling
  const activeIcon = (path) =>
    location.pathname === path ? "text-primary fill" : "";

  return (
    <aside className="hidden lg:flex w-64 flex-col gap-4 p-4 sticky top-0 h-full dark:bg-background-dark  overflow-y-auto border-r border-[#e5e7eb] dark:border-[#2a3838] scrollbar-hide">
      
       
      <div className="flex flex-col gap-2">
        <Link to="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-xl ${active("/admin")}`}>
          <span className={`material-symbols-outlined ${activeIcon("/admin")}`} style={location.pathname === '/admin' ? {fontVariationSettings: "'FILL' 1"} : {}}>dashboard</span>
          <span>Dashboard</span>
        </Link>

        <Link to="/admin/users" className={`flex items-center justify-between px-4 py-3 rounded-xl group ${active("/admin/users")}`}>
          <div className="flex items-center gap-3">
            <span className={`material-symbols-outlined ${activeIcon("/admin/users")}`}>people</span>
            <span>User Management</span>
          </div>
        </Link>

        <Link to="/admin/verify" className={`flex items-center justify-between px-4 py-3 rounded-xl group ${active("/admin/verify")}`}>
          <div className="flex items-center gap-3">
            <span className={`material-symbols-outlined ${activeIcon("/admin/verify")}`}>verified_user</span>
            <span>Doctor Verification</span>
          </div>
          <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">14</span>
        </Link>

        <Link to="/admin/moderation" className={`flex items-center justify-between px-4 py-3 rounded-xl group ${active("/admin/moderation")}`}>
          <div className="flex items-center gap-3">
            <span className={`material-symbols-outlined ${activeIcon("/admin/moderation")}`}>report_problem</span>
            <span>Moderation</span>
          </div>
          <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">23</span>
        </Link>

        <Link to="/admin/topics" className={`flex items-center gap-3 px-4 py-3 rounded-xl ${active("/admin/topics")}`}>
          <span className={`material-symbols-outlined ${activeIcon("/admin/topics")}`}>style</span>
          <span>Health Topics</span>
        </Link>

        <Link to="/admin/settings" className={`flex items-center gap-3 px-4 py-3 rounded-xl ${active("/admin/settings")}`}>
          <span className={`material-symbols-outlined ${activeIcon("/admin/settings")}`}>settings</span>
          <span>Platform Settings</span>
        </Link>
      </div>

      {/* --- QUICK STATS WIDGET (New Feature for Admin) --- */}
      <div className="mt-6 px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-med-text-secondary dark:text-gray-500">System Health</h3>
        </div>
        <div className="flex flex-col gap-3">
          
          {/* Card 1: Server Status */}
          <div className="bg-white dark:bg-[#1a2c2c] p-3 rounded-xl border border-med-gray dark:border-[#2a3838] shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-8 rounded-full bg-green-50 text-green-500 dark:bg-green-900/20 dark:text-green-400 relative">
                <span className="material-symbols-outlined text-[18px]">dns</span>
                <span className="absolute top-0 right-0 size-2 bg-green-500 rounded-full border-2 border-white dark:border-[#1a2c2c]"></span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-med-dark dark:text-white truncate">Servers Online</h4>
                <p className="text-[10px] text-med-text-secondary dark:text-gray-400 truncate">Uptime: 99.9%</p>
              </div>
            </div>
          </div>

          {/* Card 2: Report Queue */}
          <div className="bg-white dark:bg-[#1a2c2c] p-3 rounded-xl border border-med-gray dark:border-[#2a3838] shadow-sm cursor-pointer hover:border-red-200 transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-8 rounded-full bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400">
                <span className="material-symbols-outlined text-[18px]">flag</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-med-dark dark:text-white truncate">New Reports</h4>
                <p className="text-[10px] text-red-500 font-medium truncate">+5 since login</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- FOOTER STATUS --- */}
      <div className="mt-auto px-4 py-4">
        <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-3 border border-blue-100 dark:border-blue-900/30">
          <h5 className="text-xs font-bold text-blue-800 dark:text-blue-300 mb-1">Database Sync</h5>
          <div className="w-full bg-blue-200 dark:bg-blue-900/50 rounded-full h-1.5 mt-1">
            <div className="bg-blue-600 h-1.5 rounded-full w-3/4"></div>
          </div>
          <div className="flex justify-between mt-1">
             <span className="text-[10px] text-blue-600 dark:text-blue-400">Syncing...</span>
             <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">75%</span>
          </div>
        </div>
      </div>

    </aside>
  );
};

export default AdminSidebar;