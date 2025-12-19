import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Key for dynamic routing
import CommunityPostCard from '../components/CommunityPostCard'; // Imported separate component

// --- 1. THE "DATABASE" (MOCK DATA) ---
const COMMUNITY_DB = {
  "mental-health": {
    title: "Mental Health Community",
    description: "A safe, supportive space to discuss mental well-being, share personal experiences, and find resources for anxiety, depression, and mindfulness.",
    stats: { members: "2.4k", online: "150" },
    icon: "psychology",
    theme: {
      gradient: "from-blue-100 to-teal-100 dark:from-blue-900/40 dark:to-teal-900/40",
      iconBg: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      tagBorder: "border-blue-100 dark:border-blue-900/30",
      tagText: "text-blue-600 dark:text-blue-300",
      tagBg: "bg-blue-50 dark:bg-blue-900/20"
    },
    tags: ["#AnxietySupport", "#Depression", "#Mindfulness"],
    sidebar: {
      created: "Jan 12, 2023",
      moderator: { name: "Dr. Sarah Lee", role: "Psychiatrist", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdRB0fWy8d3kiKhg17-Cg5W8KXvVqNBLxLTlAYmeOw4hDvzBgIlkmPvtblsDqqj5YVFetFqH-Zk7wsFZzrQgj34CiNH8u5WSIQ55W_5ZKqmDBM2qvOea_VJxlq0mPYhN5WhZ64yxP6tNBfbkOwvluO2n_Bv19pC1CxJRCsZ9cFr4VC1Cg4EdjlkWJstHVPGSiQYtACglNF5Eh0IFa6ek9vQ70Pb34T_HEh4NbUm4UVC7ZLjejoWWj9C2a0DThGITI-qIzp__BqN0E" }
    },
    posts: [
      {
        id: 1, votes: 342, userName: "Sarah J.", userImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-_2UAAMg1UV2tqMyib86h_ZrmLXiDC6WkPLsmouH83WqtQYg8cUzhxadVz39pPEIUWoNlH-6qr_bn7rnnglyqL6gd0dLAvww3oEdDInQYW8LEVYNfb5c-_5rWL5XB62KTEnNugLfmYR5oA-JBMEPXsmETagNQwEXsbFqIoPsSaOUFQUxO-JsIpcbAzG47GLsWt-IrSQlXhZ7Ddda1z9SDAIRHvbF7cPXrCHQ4tPT0pgXtuoQjz01jiP_2jcj323LZDQvrusZ7Abg",
        timeAgo: "4 hours ago", title: "Managing anxiety without medication?",
        content: "I've been dealing with mild anxiety for a few years and want to explore lifestyle changes...",
        tags: ["#Anxiety", "#Wellness"], comments: 34, hasDoctorReply: true, isAnonymous: false
      },
      {
        id: 2, votes: 156, userName: "Anonymous", isAnonymous: true,
        timeAgo: "1 day ago", title: "Feeling isolated after diagnosis",
        content: "It's been hard to talk to my friends and family about what I'm going through...",
        tags: ["#Support", "#Relationships"], comments: 42, hasDoctorReply: false
      }
    ]
  },
  "nutrition": {
    title: "Nutrition & Diet",
    description: "Share recipes, discuss dietary plans, and get advice on healthy eating habits from experts and peers.",
    stats: { members: "1.8k", online: "85" },
    icon: "nutrition",
    theme: {
      gradient: "from-green-100 to-lime-100 dark:from-green-900/40 dark:to-lime-900/40",
      iconBg: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-600 dark:text-green-400",
      tagBorder: "border-green-100 dark:border-green-900/30",
      tagText: "text-green-600 dark:text-green-300",
      tagBg: "bg-green-50 dark:bg-green-900/20"
    },
    tags: ["#Keto", "#Vegan", "#MealPrep"],
    sidebar: {
      created: "Mar 05, 2023",
      moderator: { name: "Marcus T.", role: "Nutritionist", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpLguAw3wbgL1x-w01MbrTIwagEcoEkGAP9uI66Z-n58v6VDfEFTpXYBckHoWNZwEiWUUN_eaPbcA14qa0FFRDrUn3T6hxXk7j12NgDvEQtzyHSHUwRnu0f55LkDtRCbyWaOy0Zgy8yF_7pGDWee9cjURqyiIHFVt1SBLuytJzgQeIZamdQvgE8m3re1fl-YVGOeBo1AF_-Uq6m34FYtNNxWGS-ITU3KdXpM2FFGrNTSgAfk0QCxKenM6l3MWgKRvbe9ubm_vRpDw" }
    },
    posts: [
      {
        id: 101, votes: 89, userName: "David K.", userImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpLguAw3wbgL1x-w01MbrTIwagEcoEkGAP9uI66Z-n58v6VDfEFTpXYBckHoWNZwEiWUUN_eaPbcA14qa0FFRDrUn3T6hxXk7j12NgDvEQtzyHSHUwRnu0f55LkDtRCbyWaOy0Zgy8yF_7pGDWee9cjURqyiIHFVt1SBLuytJzgQeIZamdQvgE8m3re1fl-YVGOeBo1AF_-Uq6m34FYtNNxWGS-ITU3KdXpM2FFGrNTSgAfk0QCxKenM6l3MWgKRvbe9ubm_vRpDw",
        timeAgo: "2 hours ago", title: "Best anti-inflammatory foods?",
        content: "Looking for recommendations on foods that help reduce joint inflammation naturally.",
        tags: ["#Diet", "#Health"], comments: 12, hasDoctorReply: false, isAnonymous: false
      }
    ]
  }
};

export default function CommunityDetailFeed() {
  // 2. GET CATEGORY FROM URL (e.g., /community/nutrition)
  const { categoryId } = useParams();
  
  // 3. LOAD DATA (Fallback to mental-health if ID not found)
  const activeCommunity = COMMUNITY_DB[categoryId] || COMMUNITY_DB["mental-health"];
  const theme = activeCommunity.theme;

  return (
    <div className="flex justify-center items-start gap-6 w-full px-4 lg:px-8 py-6">
      
      {/* ================= LEFT COLUMN: FEED ================= */}
      <main className="flex flex-col w-full max-w-[800px] gap-6">
        
        {/* --- Dynamic Header Card --- */}
        <div className="rounded-2xl bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] overflow-hidden shadow-sm">
          {/* Dynamic Gradient Banner */}
          <div className={`h-32 bg-gradient-to-r ${theme.gradient} relative`}>
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="bg-white/80 dark:bg-black/40 backdrop-blur-sm p-2 rounded-lg text-med-text-secondary dark:text-gray-300 hover:text-med-dark dark:hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>
              <button className="bg-white/80 dark:bg-black/40 backdrop-blur-sm p-2 rounded-lg text-med-text-secondary dark:text-gray-300 hover:text-med-dark dark:hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
              </button>
            </div>
          </div>
          
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-end -mt-10 mb-4">
              {/* Dynamic Icon Box */}
              <div className="w-24 h-24 rounded-2xl bg-white dark:bg-[#1a2c2c] p-1.5 shadow-md">
                <div className={`w-full h-full rounded-xl ${theme.iconBg} flex items-center justify-center`}>
                  <span className={`material-symbols-outlined ${theme.iconColor} text-4xl`}>{activeCommunity.icon}</span>
                </div>
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-med-dark dark:text-white mb-1">{activeCommunity.title}</h1>
                <div className="flex items-center gap-4 text-sm text-med-text-secondary dark:text-gray-400">
                  <span>{activeCommunity.stats.members} Members</span>
                  <span>•</span>
                  <span>{activeCommunity.stats.online} Online</span>
                </div>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none bg-med-gray dark:bg-[#253636] text-med-dark dark:text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity border border-transparent hover:border-med-text-secondary/20">
                  Following
                </button>
                <button className="flex-1 md:flex-none bg-primary text-med-dark px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  Create Post
                </button>
              </div>
            </div>
            
            <p className="text-med-text-secondary dark:text-gray-300 text-sm leading-relaxed max-w-2xl">
              {activeCommunity.description}
            </p>
            
            <div className="mt-6 flex flex-wrap gap-2">
              {activeCommunity.tags.map((tag, idx) => (
                <span key={idx} className={`inline-flex items-center px-3 py-1 rounded-full ${theme.tagBg} ${theme.tagText} text-xs font-medium border ${theme.tagBorder}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* --- Filters & Search --- */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {['Trending', 'Newest', 'Expert Answers'].map((filter, idx) => (
               <button key={idx} className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium shadow-sm whitespace-nowrap transition-colors ${idx === 0 ? 'bg-med-dark dark:bg-white text-white dark:text-med-dark' : 'bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] text-med-dark dark:text-gray-300 hover:bg-med-gray dark:hover:bg-[#253636]'}`}>
                 {filter}
               </button>
            ))}
          </div>
          <div className="flex-1 flex justify-end">
            <div className="relative w-full sm:w-64">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-med-text-secondary dark:text-gray-400">search</span>
              <input className="w-full bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary/50 text-med-dark dark:text-white" placeholder="Search discussions..." type="text"/>
            </div>
          </div>
        </div>

        {/* --- Pinned Post --- */}
        <div className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl p-5 border border-amber-200 dark:border-amber-800/30">
          <div className="flex items-start gap-3">
            <div className="shrink-0 mt-1 text-amber-500">
              <span className="material-symbols-outlined fill">push_pin</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-med-dark dark:text-white text-base mb-1">Community Guidelines & Crisis Resources</h3>
              </div>
              <p className="text-med-text-secondary dark:text-gray-300 text-sm mb-3">
                Please read our updated community guidelines before posting. If you or someone you know is in immediate crisis, please view our list of emergency resources.
              </p>
              <div className="flex items-center gap-4 text-xs text-med-text-secondary dark:text-gray-400">
                <span className="font-medium text-med-dark dark:text-gray-200">Moderator Team</span>
                <span>•</span>
                <span>Pinned 2 weeks ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Dynamic Posts List --- */}
        <div className="flex flex-col gap-4">
          {activeCommunity.posts.map((post) => (
             <CommunityPostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="flex justify-center py-4">
          <button className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1">
             Load More Discussions
             <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
        </div>
      </main>

      {/* ================= RIGHT COLUMN: SIDEBAR (Merged & Dynamic) ================= */}
      <div className="hidden xl:block w-80 shrink-0 sticky top-4 h-full overflow-y-auto scrollbar-hide">
         <aside className="flex flex-col gap-6 w-full">
            
            {/* About Community Card */}
            <div className="bg-white dark:bg-[#1a2c2c] rounded-xl border border-[#e5e7eb] dark:border-[#2a3838] p-5 shadow-sm">
              <h3 className="font-bold text-med-dark dark:text-white mb-3">About Community</h3>
              <p className="text-xs text-med-text-secondary dark:text-gray-300 mb-4 leading-relaxed">
                {activeCommunity.description}
              </p>
              <div className="flex flex-col gap-3 border-t border-[#e5e7eb] dark:border-[#2a3838] pt-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-med-text-secondary dark:text-gray-400">Created</span>
                  <span className="font-medium text-med-dark dark:text-white">{activeCommunity.sidebar.created}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-med-text-secondary dark:text-gray-400">Language</span>
                  <span className="font-medium text-med-dark dark:text-white">English</span>
                </div>
              </div>
              <button className="w-full mt-4 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 text-xs font-semibold transition-colors">
                Leave Community
              </button>
            </div>

            {/* Moderators (Dynamic) */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-med-dark dark:text-white">Moderators</h3>
                <Link to="#" className="text-xs font-semibold text-primary hover:text-primary/80">View All</Link>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="bg-center bg-no-repeat bg-cover rounded-full size-10" style={{ backgroundImage: `url('${activeCommunity.sidebar.moderator.img}')` }}></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-med-dark dark:text-white">{activeCommunity.sidebar.moderator.name}</span>
                      <span className="material-symbols-outlined text-primary text-[14px] fill">verified</span>
                    </div>
                    <p className="text-xs text-med-text-secondary dark:text-gray-400">{activeCommunity.sidebar.moderator.role}</p>
                  </div>
                  <button className="text-xs bg-med-gray dark:bg-[#253636] px-2 py-1 rounded text-med-dark dark:text-white hover:opacity-80">Profile</button>
                </div>
              </div>
            </div>

            {/* Rules (Static) */}
            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-800/20">
              <div className="flex items-center gap-2 mb-2 text-blue-800 dark:text-blue-300">
                <span className="material-symbols-outlined text-[18px]">gavel</span>
                <h5 className="text-xs font-bold uppercase tracking-wide">Community Rules</h5>
              </div>
              <ul className="text-xs text-med-text-secondary dark:text-gray-300 space-y-2.5 list-disc pl-4">
                <li><span className="font-medium text-med-dark dark:text-white">Trigger Warnings (TW):</span> Please use TW tags for sensitive content.</li>
                <li><span className="font-medium text-med-dark dark:text-white">No Self-Harm Promotion:</span> Zero tolerance.</li>
                <li><span className="font-medium text-med-dark dark:text-white">Respect Privacy:</span> Do not share personal info.</li>
                <li><span className="font-medium text-med-dark dark:text-white">Crisis?</span> Call 988.</li>
              </ul>
            </div>

            {/* Related Topics */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-med-dark dark:text-white text-sm">Related Topics</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <a className="px-3 py-1.5 rounded-lg bg-med-gray dark:bg-[#253636] text-xs font-medium text-med-dark dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#344646] transition-colors" href="#">Psychology</a>
                <a className="px-3 py-1.5 rounded-lg bg-med-gray dark:bg-[#253636] text-xs font-medium text-med-dark dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#344646] transition-colors" href="#">Wellness</a>
                <a className="px-3 py-1.5 rounded-lg bg-med-gray dark:bg-[#253636] text-xs font-medium text-med-dark dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#344646] transition-colors" href="#">Meditation</a>
              </div>
            </div>
         </aside>
      </div>

    </div>
  );
}