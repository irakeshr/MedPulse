import React from 'react';
import ModerationCard from '../components/ModerationCard'; // Import the new component

// --- MOCK DATA ---
const STATS = [
  { label: "Urgent Review", value: "5 Items", icon: "priority_high", color: "red" },
  { label: "Average Wait", value: "45 mins", icon: "schedule", color: "blue" },
  { label: "Automated Actions", value: "128 Today", icon: "smart_toy", color: "green" }
];

const MODERATION_QUEUE = [
  {
    id: "MOD-2991",
    type: "Harassment & Abuse",
    severity: "high",
    time: "10m ago",
    reports: 3,
    user: {
      name: "SarahUser123",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdRB0fWy8d3kiKhg17-Cg5W8KXvVqNBLxLTlAYmeOw4hDvzBgIlkmPvtblsDqqj5YVFetFqH-Zk7wsFZzrQgj34CiNH8u5WSIQ55W_5ZKqmDBM2qvOea_VJxlq0mPYhN5WhZ64yxP6tNBfbkOwvluO2n_Bv19pC1CxJRCsZ9cFr4VC1Cg4EdjlkWJstHVPGSiQYtACglNF5Eh0IFa6ek9vQ70Pb34T_HEh4NbUm4UVC7ZLjejoWWj9C2a0DThGITI-qIzp__BqN0E",
      channel: "#GeneralDiscussion"
    },
    content: "You clearly don't know what you're talking about. This advice is stupid and dangerous. Go back to medical school you fraud.",
    context: {
      type: "history",
      text: "User has been warned 2 times previously for similar conduct."
    },
    actions: ["approve", "remove_warn", "ban"]
  },
  {
    id: "MOD-2984",
    type: "Medical Misinformation",
    severity: "medium",
    time: "45m ago",
    reporter: "Dr. Emily Chen",
    user: {
      name: "JohnDoe_Wellness",
      initials: "JD",
      color: "indigo",
      channel: "#HolisticHealth"
    },
    content: "Doctors don't want you to know this, but drinking 3 liters of raw onion juice daily cures all forms of cancer within a week. Stop chemo now!",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNkbTbIBA7a8OKCy-GAmnDMrH91lWz6jLzZ7LKRm8qjet6euYd66VQEtWbjFn_-LoX9j3qmSEa_nfVkIeE-n-rjv-sxpMWYE5P-Gx04IJpV5zbEUTapWis9EMyug9FVzuuUhe8g3_6EBtB3Ve1GiJZ4hdhSa76hsBuw1gy8_74kQ9g-MphrQ7LxXO18qZYkd2U-7f4zYnhg9w5DOHizGvzgTEQLY_qM7FhBJunlDb-kkClkH30Exy5jaZQKPkjWutsRos-QMhzXRE",
    actions: ["approve", "warn", "hide"]
  },
  {
    id: "MOD-2950",
    type: "Spam / Promotion",
    severity: "low",
    time: "2h ago",
    reporter: "Automated Filter",
    user: {
      name: "BestBuyMeds_Official",
      initials: "BB",
      color: "pink",
      channel: "#PainManagement"
    },
    content: "Get 50% OFF all prescriptions today! Visit www.sketchy-meds-site.com for the best deals on painkillers. No prescription needed!",
    isBot: true,
    actions: ["delete_spam"]
  }
];

export default function AdminModeration() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-med-dark dark:text-white font-display transition-colors duration-200 h-screen w-full flex flex-col">
      
      {/* Main Scrollable Content */}
      <main className="flex-1 flex flex-col w-full px-4 lg:px-8 py-8 gap-6 overflow-y-auto scrollbar-hide">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-med-dark dark:text-white flex items-center gap-2">
              Content Moderation
              <span className="text-sm font-normal text-med-text-secondary bg-med-gray dark:bg-[#253636] px-2 py-0.5 rounded-md">23 pending</span>
            </h1>
            <p className="text-med-text-secondary dark:text-gray-400 text-sm mt-1">Review flagged content and reports to maintain community safety.</p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center bg-white dark:bg-[#1a2c2c] rounded-lg border border-[#e5e7eb] dark:border-[#2a3838] p-1">
              <button className="px-3 py-1.5 rounded bg-med-gray dark:bg-[#253636] text-xs font-bold text-med-dark dark:text-white">Pending</button>
              <button className="px-3 py-1.5 rounded hover:bg-med-gray dark:hover:bg-[#253636] text-xs font-medium text-med-text-secondary">Resolved</button>
              <button className="px-3 py-1.5 rounded hover:bg-med-gray dark:hover:bg-[#253636] text-xs font-medium text-med-text-secondary">Archived</button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-med-dark dark:bg-primary text-white dark:text-med-dark rounded-lg text-sm font-medium hover:bg-med-dark/90 transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[20px]">tune</span>
              Filters
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-[#1a2c2c] p-4 rounded-xl border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-med-text-secondary uppercase tracking-wider">{stat.label}</p>
                <h3 className={`text-xl font-bold mt-1 
                  ${stat.color === 'red' ? 'text-red-600 dark:text-red-400' : 'text-med-dark dark:text-white'}`}>
                  {stat.value}
                </h3>
              </div>
              <div className={`p-2 rounded-lg 
                ${stat.color === 'red' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : ''}
                ${stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : ''}
                ${stat.color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : ''}
              `}>
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* --- MODERATION QUEUE --- */}
        <div className="flex flex-col gap-6">
          {MODERATION_QUEUE.map((item) => (
            <ModerationCard key={item.id} data={item} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-[#e5e7eb] dark:border-[#2a3838] pt-6 mt-2">
          <span className="text-sm text-med-text-secondary">Showing 1-3 of 23 pending items</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-[#e5e7eb] dark:border-[#2a3838] text-med-text-secondary hover:bg-med-gray dark:hover:bg-[#253636] disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 rounded-lg border border-[#e5e7eb] dark:border-[#2a3838] text-med-dark dark:text-white hover:bg-med-gray dark:hover:bg-[#253636]">
              Next
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}