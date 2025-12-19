import React from 'react';
import CaseCard from '../components/CaseCard';

// --- MOCK DATA ---
const STATS = [
  { 
    id: 1, 
    value: "12", 
    label: "Pending Reviews", 
    icon: "pending_actions", 
    trend: "+2 today", 
    trendColor: "text-[#078832] bg-[#e6f4ea]",
    isUrgent: false 
  },
  { 
    id: 2, 
    value: "3", 
    label: "Cases Needing Action", 
    icon: "warning", 
    trend: "Urgent", 
    trendColor: "text-[#b91c1c] bg-[#fef2f2]",
    isUrgent: true 
  },
  { 
    id: 3, 
    value: "184", 
    label: "Helped Patients", 
    icon: "thumb_up", 
    trend: "Top 5%", 
    trendColor: "text-secondary dark:text-gray-400 bg-[#f0f4f4] dark:bg-[#1f3333]",
    isUrgent: false 
  },
  { 
    id: 4, 
    value: "2h 15m", 
    label: "Avg. Response Time", 
    icon: "schedule", 
    trend: null, 
    isUrgent: false 
  },
];

const CASES = [
  {
    id: 1,
    title: "Severe chest tightness radiating to left arm",
    desc: "Patient (Male, 58) reports sudden onset pressure in center of chest. History of hypertension. Describes pain as \"elephant sitting on chest\". Started after light exercise...",
    priority: "High Priority",
    priorityStyle: "bg-accent-red dark:bg-red-900/40 text-accent-red-text dark:text-red-200",
    specialty: "Cardiology",
    time: "15m ago",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBi8W3-YiMtFpj3gRq16WKGyhQYEL3CHKXPfCYawWvhIMJqnwB1YzgV0YsmO-cs2vV1L7HOxhF6Up4HkG529VthdmlVNOghA-us3fSl3ScynXd8uak9H7twE_3oi8CJnkHcguBRYk735MlE3PQjK47YEUmCIsvoKu8acpN4z7KVWOdxUMLBqq3ddnjnZqqyNqi1NBMcoVPX2cCXrEjpstp263OR4JZeUzqyzdIoyTz1h9i7jqndCsnp3FNnvPxYCMq-Z9Vkc_ZUWw4",
    viewers: 2,
    isUrgent: true
  },
  {
    id: 2,
    title: "Recurring migraine with aura",
    desc: "Female, 34. Experiencing visual disturbances followed by intense headache on right side. Sensitivity to light. OTC medication not effective. Duration 3 days.",
    priority: "Medium Priority",
    priorityStyle: "bg-accent-yellow dark:bg-yellow-900/30 text-accent-yellow-text dark:text-yellow-200",
    specialty: "General",
    time: "2h ago",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkDHRXUwIu3w0Y5ZUjyTU6uTTi17UxMc4fUqaRCeQc3FT8IA9dRQ9_gvz3RSV-oUWUAnAnVix05uqS5dwVZXed7IKSxa7IicFip6D0F9q8vLUI0y7Rr6hXgToLbA8muwehjl2e7XxNc9eCIo7qsmXzFifFkJl1Xm0FYSDqVdZbFaBR6DdsU8AJ3gRy8Nve9VenuMtQ7DVq4hFNIVUTBYC-JtkPqtOhnxxi7w7q7Aju8RFir6P7CWhzJr8-_6o8LenHypOZOYh6fIo",
    viewers: 0,
    isUrgent: false
  },
  {
    id: 3,
    title: "Rash on forearm after hiking",
    desc: "Male, 22. Noticed red, itchy bumps on left forearm yesterday. Suspects poison ivy but wants confirmation before buying cream. No systemic symptoms.",
    priority: "Low Priority",
    priorityStyle: "bg-accent-green dark:bg-green-900/30 text-accent-green-text dark:text-green-200",
    specialty: "Dermatology",
    time: "4h ago",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBK-jFQBFUOlmC2PaQExtqTgFg9C2HZ8QA2sxgsYj7jLd655ZBUtFGCeyp8jzUButqbEqM-3PnJn6r5muTREW9h72pDht9xQZstW2-ifzyMRBGg7_Sqoe41VdZzEeXFYMX8szwvjWbB7VREaprb-c_Dag0mu2BRO5UCoFR3crU43sWfaiXxva7OLQP-6GjRuNZLbmpnvQ9UsxOHSLahprWaBNHoD3PvBSkU7ZUKy5w7MGydK3zzHpa-kD6KG68h9lXt_TZoLeR9jyw",
    viewers: 0,
    isUrgent: false
  }
];

const DISCUSSIONS = [
  { initials: "JD", name: "John Doe - Arrhythmia", status: "Patient replied 5m ago", color: "blue", active: true },
  { initials: "SA", name: "Sarah A. - Follow up", status: "Waiting for your reply", color: "purple", active: false },
  { initials: "MK", name: "Mike K. - Hypertension", status: "Closed yesterday", color: "green", active: false, closed: true },
];

export default function DoctorDashboard() {
  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#F2F4F7] dark:bg-[#111818]">
      
      {/* Mobile Header */}
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

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-12 lg:py-10 scrollbar-hide">
        <div className="mx-auto max-w-6xl flex flex-col gap-8">
          
          {/* Page Heading */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-[#111818] dark:text-white text-3xl md:text-4xl font-black tracking-tight mb-2">
                Welcome back, Dr. Radhakrishnan
              </h1>
              <p className="text-secondary dark:text-gray-400 text-base md:text-lg">
                You have <span className="font-semibold text-primary-dark dark:text-primary">3 urgent cases</span> requiring attention today.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#dbe6e6] rounded-xl text-sm font-medium shadow-sm hover:bg-gray-50 dark:bg-[#1f3333] dark:border-[#2a3c3c] dark:text-white dark:hover:bg-[#253d3d] transition-all">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                Alerts
                <span className="bg-red-500 size-2 rounded-full"></span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((stat) => (
              <div 
                key={stat.id}
                className={`bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-card border flex flex-col gap-3 group transition-colors relative overflow-hidden
                  ${stat.isUrgent 
                    ? "border-primary/30 dark:border-primary/30" 
                    : "border-[#dbe6e6] dark:border-[#2a3c3c] hover:border-primary/50"
                  }`}
              >
                {stat.isUrgent && (
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <span className="material-symbols-outlined text-8xl text-primary">warning</span>
                  </div>
                )}
                
                <div className="flex justify-between items-start relative z-10">
                  <div className={`p-2 rounded-lg ${stat.isUrgent ? "bg-primary/10 text-primary-dark dark:text-primary" : "bg-[#f0f4f4] text-[#111818] dark:bg-[#1f3333] dark:text-white group-hover:bg-primary/20 group-hover:text-primary-dark"} transition-colors`}>
                    <span className="material-symbols-outlined" style={stat.isUrgent ? { fontVariationSettings: "'FILL' 1" } : {}}>
                      {stat.icon}
                    </span>
                  </div>
                  {stat.trend && (
                    <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.trendColor}`}>
                      {stat.trend}
                    </span>
                  )}
                </div>
                <div className="relative z-10">
                  <p className="text-3xl font-bold text-[#111818] dark:text-white">{stat.value}</p>
                  <p className="text-sm font-medium text-secondary dark:text-gray-400">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between bg-surface-light dark:bg-surface-dark p-2 rounded-2xl border border-[#dbe6e6] dark:border-[#2a3c3c] shadow-sm">
            {/* Search Bar */}
            <div className="flex-1 min-w-[300px]">
              <label className="flex w-full items-center h-12 rounded-xl bg-[#f6f8f8] dark:bg-[#152626] px-4 focus-within:ring-2 focus-within:ring-primary/50 transition-shadow">
                <span className="material-symbols-outlined text-secondary dark:text-gray-500 mr-3">search</span>
                <input 
                  className="w-full bg-transparent border-none text-sm text-[#111818] dark:text-white placeholder:text-secondary dark:placeholder:text-gray-500 focus:ring-0 p-0 font-medium" 
                  placeholder="Search by symptom, patient ID, or keywords..." 
                  type="text"
                />
              </label>
            </div>
            {/* Filter Chips */}
            <div className="flex flex-wrap items-center gap-2 px-2">
              <button className="flex items-center gap-2 h-10 px-4 rounded-xl bg-white dark:bg-[#1f3333] border border-[#dbe6e6] dark:border-[#2a3c3c] hover:border-primary text-sm font-medium text-[#111818] dark:text-white transition-all">
                <span className="material-symbols-outlined text-[18px] text-secondary">tune</span>
                Filter
              </button>
              <div className="w-px h-6 bg-[#dbe6e6] dark:bg-[#2a3c3c] mx-1"></div>
              {['Region: NY', 'Specialty: Cardio'].map((filter, i) => (
                <button key={i} className="flex items-center gap-2 h-9 px-3 rounded-lg bg-[#f0f4f4] dark:bg-[#1f3333] hover:bg-[#e0e6e6] dark:hover:bg-[#2a3c3c] text-xs font-medium text-[#111818] dark:text-white transition-all">
                  {filter}
                  <span className="material-symbols-outlined text-[16px]">expand_more</span>
                </button>
              ))}
              <button className="flex items-center gap-2 h-9 px-3 rounded-lg bg-accent-red dark:bg-red-900/30 text-accent-red-text dark:text-red-200 hover:brightness-95 text-xs font-bold transition-all border border-transparent hover:border-red-200">
                <span className="material-symbols-outlined text-[16px] filled-icon">warning</span>
                Urgent Only
              </button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Case Feed (Left 2 Columns) */}
            <div className="xl:col-span-2 flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-[#111818] dark:text-white">Needs Review</h3>
                <button className="text-primary text-sm font-bold hover:underline">View All</button>
              </div>
              
              {CASES.map((item) => (
                <CaseCard key={item.id} data={item} />
              ))}
            </div>

            {/* Right Sidebar / Widgets */}
            <div className="flex flex-col gap-6">
              
              {/* Active Discussions Widget */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-[#dbe6e6] dark:border-[#2a3c3c] shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#111818] dark:text-white">Active Discussions</h3>
                  <span className="text-xs bg-primary/10 text-primary-dark dark:text-primary px-2 py-1 rounded-full font-bold">4 Active</span>
                </div>
                <div className="flex flex-col gap-3">
                  {DISCUSSIONS.map((disc, i) => (
                    <a key={i} className="group flex items-center gap-3 p-2 rounded-xl hover:bg-[#f0f4f4] dark:hover:bg-[#1f3333] transition-colors" href="#">
                      <div className={`size-10 rounded-full flex items-center justify-center font-bold text-xs 
                        ${disc.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300' : ''}
                        ${disc.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300' : ''}
                        ${disc.color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300' : ''}
                      `}>
                        {disc.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#111818] dark:text-white truncate">{disc.name}</p>
                        <p className="text-xs text-secondary dark:text-gray-500 truncate">{disc.status}</p>
                      </div>
                      {disc.active && <div className="size-2 rounded-full bg-primary"></div>}
                      {disc.closed && <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>}
                    </a>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 text-sm text-primary-dark dark:text-primary font-bold hover:bg-primary/5 rounded-lg transition-colors">
                  View All History
                </button>
              </div>

              {/* Community Impact Widget */}
              <div className="bg-gradient-to-br from-[#102222] to-[#1a3c3c] rounded-2xl p-5 text-white relative overflow-hidden">
                <div className="absolute -right-4 -top-4 size-24 bg-primary/20 rounded-full blur-xl"></div>
                <div className="relative z-10">
                  <h3 className="font-bold mb-1">Community Impact</h3>
                  <p className="text-gray-300 text-xs mb-4">Your contributions are making a difference.</p>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-3xl font-bold text-primary">4.9</span>
                    <div className="flex pb-1.5 text-yellow-400">
                      {[1,2,3,4,5].map(s => (
                        <span key={s} className="material-symbols-outlined text-[16px] filled-icon" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">Based on 152 patient reviews</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

 
