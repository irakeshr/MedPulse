// src/pages/MyPostsPage.jsx
import React, { useState } from 'react';
import PostCard from '../components/PostCard'; // Adjust path if needed

// --- MOCK DATA (Simulating Backend Response) ---
const MY_POSTS_DATA = [
  {
    id: 1,
    isAnonymous: false,
    userImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOLCviMOpASErCHhTQmvY6k34iYjPPoNBtTcXTevn6qvSVudTEwgQtFPiNSM2fdDYS95FtRj0VMuJZ2MhrCv7Je5qakn_Yo9VwsJIEKLLds3-whsOamhqUK47VWjCFw35W61E_-AWBjonf9A9fdwikxOiALd27cPTkB7PAhHRgG7d4ltlHxF__DTRS_15qNAHrVAhOQk3p2mBzmH7Uum18DB5Z6Ck4VDoIjknvWcW0y9wVdlHYF1a23BsjBnqQBRNl__52tiym3xU",
    userName: "You", 
    timeAgo: "2 hours ago",
    title: "Recurring migraines in the morning",
    content: "I've been waking up with a sharp pain on the left side of my head for the past few days. It usually fades by noon but comes back if I look at screens for too long. Has anyone else experienced this specific timing?",
    severity: "Medium",
    duration: "5 days",
    tags: ["#Migraine", "#LightSensitivity"],
    helpfulCount: 5,
    commentCount: 8,
    doctorResponded: true, 
    status: null, 
    doctorResponseData: {
      name: "Dr.Abhirami",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAC_a9H2-3A4RMV8-Nvm03Vor3Mtqezjgw1yRZuZ88hNsrjxWkHnMaQw0TRuJ9Qgf3dxFG90nMFZ5Ep6PLMHEObNEbripg-r2vOWL3qqsNy58MA1FzBYfjaqn8cV9zHAl0bJy5LS1cH29CX-61nru4uTve2Dc3RG6zGx59dse1gPz_poHACgiJsUe5GQkfUEcQiMyfxlv62Q1TezG3dpNJS31vLnShUNGx-ccIzGAOzbHuSeMYL1ul7UYc1e7_8HALsRSgH9k3t5Gw",
      text: "Morning headaches can sometimes be related to sleep posture or even teeth grinding (bruxism). Since you mentioned screen sensitivity..."
    }
  },
  {
    id: 2,
    isAnonymous: true,
    userName: "You (Anonymous)", 
    timeAgo: "Yesterday",
    title: "Sharp pain in lower back after lifting",
    content: "I helped a friend move yesterday and now I can barely stand up straight. It's a sharp shooting pain right above my hips. Heat makes it feel slightly better.",
    severity: "High",
    duration: "1 day",
    tags: ["#BackPain"],
    helpfulCount: 5,
    commentCount: 2,
    doctorResponded: false,
    status: "Unresolved", 
  },
  {
    id: 3,
    isAnonymous: false,
    userImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOLCviMOpASErCHhTQmvY6k34iYjPPoNBtTcXTevn6qvSVudTEwgQtFPiNSM2fdDYS95FtRj0VMuJZ2MhrCv7Je5qakn_Yo9VwsJIEKLLds3-whsOamhqUK47VWjCFw35W61E_-AWBjonf9A9fdwikxOiALd27cPTkB7PAhHRgG7d4ltlHxF__DTRS_15qNAHrVAhOQk3p2mBzmH7Uum18DB5Z6Ck4VDoIjknvWcW0y9wVdlHYF1a23BsjBnqQBRNl__52tiym3xU",
    userName: "You",
    timeAgo: "2 weeks ago",
    title: "Mild fever and scratchy throat",
    content: "Started feeling off yesterday evening. Temperature is around 99.5F. Just looking for some home remedy suggestions to nip this in the bud before the weekend.",
    severity: "Low",
    duration: "2 days",
    tags: ["#Cold", "#HomeRemedy"],
    helpfulCount: 12,
    commentCount: 15,
    doctorResponded: false,
    status: "Resolved", 
  }
];

export default function MyPostsPage() {
  const [activeFilter, setActiveFilter] = useState("All History");

  return (
    // MAIN LAYOUT CONTAINER: Flex Grid
    <div className="flex justify-center items-start gap-6 w-full px-4 lg:px-8 py-6">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: MAIN CONTENT                 */}
      {/* ========================================= */}
      <main className="flex flex-col w-full max-w-[720px] gap-6">
        
        {/* --- Page Header --- */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl font-bold text-med-dark dark:text-white">My Posts</h1>
            <p className="text-med-text-secondary dark:text-gray-400 text-sm mt-1">
              Manage your symptoms and view responses.
            </p>
          </div>
          <button className="shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-med-dark font-semibold text-sm rounded-xl transition-all shadow-sm">
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>New Post</span>
          </button>
        </div>

        {/* --- Filter Tabs --- */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <FilterButton 
            label="All History" 
            active={activeFilter === "All History"} 
            onClick={() => setActiveFilter("All History")} 
          />
          <FilterButton label="Symptom Type" hasDropdown />
          <FilterButton label="Severity" hasDropdown />
          <FilterButton label="Status" hasDropdown />
        </div>

        {/* --- Posts List --- */}
        <div className="flex flex-col gap-6">
          {MY_POSTS_DATA.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              isOwnPost={true} 
            />
          ))}
        </div>

        {/* --- Loading Spinner --- */}
        <div className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>

      </main>

      {/* ========================================= */}
      {/* RIGHT COLUMN: STATS SIDEBAR               */}
      {/* ========================================= */}
      <div className="hidden xl:block w-80 shrink-0 sticky top-4">
        <aside className="flex flex-col gap-6 w-full">
          
          {/* My Activity Stats */}
          <div className="bg-white dark:bg-[#1a2c2c] rounded-xl p-5 border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm">
            <h3 className="font-bold text-med-dark dark:text-white mb-4">My Activity Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-med-dark dark:text-white">12</span>
                <span className="text-xs text-med-text-secondary dark:text-gray-400">Total Posts</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-primary">8</span>
                <span className="text-xs text-med-text-secondary dark:text-gray-400">Resolved</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-med-dark dark:text-white">45</span>
                <span className="text-xs text-med-text-secondary dark:text-gray-400">Responses</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-med-dark dark:text-white">3</span>
                <span className="text-xs text-med-text-secondary dark:text-gray-400">Dr. Replies</span>
              </div>
            </div>
          </div>

          {/* Trending Topics (Specific to My Posts Context) */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-med-dark dark:text-white">Trending Health Topics</h3>
              <a className="text-xs font-semibold text-primary hover:text-primary/80" href="#">View All</a>
            </div>
            <div className="flex flex-col gap-3">
              <div className="group flex flex-col p-3 rounded-xl bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] hover:border-primary/50 cursor-pointer transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-semibold text-med-dark dark:text-white">Seasonal Allergies</span>
                  <span className="text-[10px] bg-med-gray dark:bg-[#253636] px-1.5 py-0.5 rounded text-med-text-secondary">Trending</span>
                </div>
                <p className="text-xs text-med-text-secondary dark:text-gray-400">High pollen count reported in Northeast region.</p>
              </div>
              <div className="group flex flex-col p-3 rounded-xl bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] hover:border-primary/50 cursor-pointer transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-semibold text-med-dark dark:text-white">Flu Season Prep</span>
                </div>
                <p className="text-xs text-med-text-secondary dark:text-gray-400">Discussions on vaccines and early prevention.</p>
              </div>
            </div>
          </div>

          {/* Privacy Reminder */}
          <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">info</span>
              <div>
                <h5 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">Privacy Reminder</h5>
                <p className="text-xs text-blue-700 dark:text-blue-200 leading-snug">
                  You can edit or delete your posts at any time. Anonymous posts are only visible as "You" to you.
                </p>
              </div>
            </div>
          </div>

        </aside>
      </div>

    </div>
  );
}

// --- Helper Component for Filter Buttons ---
const FilterButton = ({ label, active, hasDropdown, onClick }) => (
  <button 
    onClick={onClick}
    className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm
      ${active 
        ? "bg-med-dark dark:bg-white text-white dark:text-med-dark" 
        : "bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] text-med-dark dark:text-gray-300 hover:bg-med-gray dark:hover:bg-[#253636]"
      }`}
  >
    <span>{label}</span>
    {hasDropdown && <span className="material-symbols-outlined text-[18px]">expand_more</span>}
  </button>
);