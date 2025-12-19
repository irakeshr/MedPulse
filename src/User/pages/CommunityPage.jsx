import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DiscussionCard from '../components/DiscussionCard'; // Keeping the card separate for cleaner code
import CategoryCarousel from '../components/CategoryCarousel';

// --- MOCK DATA ---
const DISCUSSIONS_DATA = [
  {
    id: 1,
    userName: "Sarah J.",
    userImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-_2UAAMg1UV2tqMyib86h_ZrmLXiDC6WkPLsmouH83WqtQYg8cUzhxadVz39pPEIUWoNlH-6qr_bn7rnnglyqL6gd0dLAvww3oEdDInQYW8LEVYNfb5c-_5rWL5XB62KTEnNugLfmYR5oA-JBMEPXsmETagNQwEXsbFqIoPsSaOUFQUxO-JsIpcbAzG47GLsWt-IrSQlXhZ7Ddda1z9SDAIRHvbF7cPXrCHQ4tPT0pgXtuoQjz01jiP_2jcj323LZDQvrusZ7Abg",
    timeAgo: "4 hours ago",
    category: "Mental Health",
    categoryColor: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300",
    title: "Managing anxiety without medication?",
    content: "I've been dealing with mild anxiety for a few years and want to explore lifestyle changes before considering medication. Has anyone had success with meditation or specific diet changes?",
    tags: ["#Anxiety", "#Wellness"],
    stats: { views: "1.2k", replies: 34 },
    isAnonymous: false
  },
  {
    id: 2,
    userName: "Marcus L.",
    userImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpLguAw3wbgL1x-w01MbrTIwagEcoEkGAP9uI66Z-n58v6VDfEFTpXYBckHoWNZwEiWUUN_eaPbcA14qa0FFRDrUn3T6hxXk7j12NgDvEQtzyHSHUwRnu0f55LkDtRCbyWaOy0Zgy8yF_7pGDWee9cjURqyiIHFVt1SBLuytJzgQeIZamdQvgE8m3re1fl-YVGOeBo1AF_-Uq6m34FYtNNxWGS-ITU3KdXpM2FFGrNTSgAfk0QCxKenM6l3MWgKRvbe9ubm_vRpDw",
    timeAgo: "1 day ago",
    category: "Nutrition",
    categoryColor: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-300",
    title: "Anti-inflammatory diet recipes for beginners",
    content: "My doctor recommended an anti-inflammatory diet to help with my joint pain. I'm looking for simple, quick dinner recipes that fit this criteria. Any favorites?",
    tags: ["#Diet", "#Recipes"],
    stats: { views: "856", replies: 18 },
    isAnonymous: false
  },
  {
    id: 3,
    userName: "Anonymous",
    isAnonymous: true,
    timeAgo: "2 days ago",
    category: "Chronic Care",
    categoryColor: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300",
    title: "Adjusting to life with Type 2 Diabetes",
    content: "Just got diagnosed last week. Feeling a bit overwhelmed with all the information and monitoring. How did you handle the first few months?",
    tags: ["#Diabetes", "#Support"],
    stats: { views: "3.4k", replies: 82 }
  }
];

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState('Latest');

  return (
    // MAIN LAYOUT GRID
    <div className="flex justify-center items-start gap-6 w-full px-4 lg:px-8 py-6">
      
    
      {/* LEFT COLUMN: MAIN CONTENT                 */}
     
      <main className="flex flex-col w-full max-w-[800px] gap-6">
        
        {/* --- Hero / Header --- */}
        <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-teal-50 dark:to-[#1f3333] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-primary/20">
          <div>
            <h1 className="text-2xl font-bold text-med-dark dark:text-white mb-2">Community Hub</h1>
            <p className="text-med-text-secondary dark:text-gray-300 max-w-md">Connect with others, share your journey, and find support in our verified community discussions.</p>
          </div>
          <button className="shrink-0 bg-med-dark dark:bg-white text-white dark:text-med-dark px-5 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            Start Discussion
          </button>
        </div>

        {/* --- Browse Categories Grid --- */}
        <CategoryCarousel/>

        {/* --- Search & Filters --- */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-med-text-secondary dark:text-gray-400">search</span>
            <input className="w-full bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary/50 focus:border-primary/50 text-med-dark dark:text-white" placeholder="Search specific topics in community..." type="text"/>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {['Latest', 'Popular', 'Unanswered'].map((filter) => (
               <button 
                 key={filter}
                 onClick={() => setActiveFilter(filter)}
                 className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium shadow-sm whitespace-nowrap transition-colors
                   ${activeFilter === filter 
                     ? "bg-med-dark dark:bg-white text-white dark:text-med-dark" 
                     : "bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] text-med-dark dark:text-gray-300 hover:bg-med-gray dark:hover:bg-[#253636]"}`}
               >
                 {filter}
               </button>
            ))}
          </div>
        </div>

        {/* --- DISCUSSION LIST --- */}
        <div className="flex flex-col gap-4">
          
          {/* TOP DISCUSSION CARD (Pinned) */}
          <article className="bg-primary/5 dark:bg-[#13ecec]/5 rounded-2xl p-5 border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-1">
                <span className="material-symbols-outlined text-primary fill">campaign</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-med-dark dark:text-white text-base mb-1">Weekly Community Roundup: New Doctor Q&A Schedule</h3>
                  <span className="bg-primary/20 text-teal-800 dark:text-primary text-[10px] uppercase font-bold px-2 py-0.5 rounded">Pinned</span>
                </div>
                <p className="text-med-text-secondary dark:text-gray-300 text-sm mb-3">
                  We're excited to announce a new series of live Q&A sessions with verified specialists. Check out the schedule for the upcoming week and submit your questions early.
                </p>
                <div className="flex items-center gap-4 text-xs text-med-text-secondary dark:text-gray-400">
                  <span className="font-medium text-primary">By MedPulse Team</span>
                  <span>•</span>
                  <span>Updated 2 hours ago</span>
                </div>
              </div>
            </div>
          </article>

          {/* Standard Discussions (Mapped) */}
          {DISCUSSIONS_DATA.map((item) => (
             <DiscussionCard key={item.id} discussion={item} />
          ))}

        </div>

        {/* --- Load More --- */}
        <div className="flex justify-center py-4">
          <button className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1">
             Load More Discussions
             <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
        </div>

      </main>

   
      {/* RIGHT COLUMN: SIDEBAR (Merged Inline)     */}
     
      <div className="hidden xl:block w-80 shrink-0 sticky top-4">
         <aside className="flex flex-col gap-6 w-full">
            
            {/* 1. Community Events */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-med-dark dark:text-white">Community Events</h3>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-3 items-start p-3 bg-white dark:bg-[#1a2c2c] rounded-xl border border-[#e5e7eb] dark:border-[#2a3838]">
                  <div className="bg-primary/10 text-teal-800 dark:text-primary rounded-lg h-12 w-12 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold uppercase">OCT</span>
                    <span className="text-lg font-bold leading-none">24</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-med-dark dark:text-white leading-tight mb-1">Heart Health Webinar</h4>
                    <p className="text-xs text-med-text-secondary dark:text-gray-400 mb-2">Live with Dr. A. Patel</p>
                    <button className="text-[10px] font-bold text-primary uppercase border border-primary/30 px-2 py-1 rounded hover:bg-primary/10 transition-colors">Register</button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Top Contributors */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-med-dark dark:text-white">Top Contributors</h3>
                <Link to="#" className="text-xs font-semibold text-primary hover:text-primary/80">View All</Link>
              </div>
              <div className="flex flex-col gap-4">
                {/* Contributor 1 */}
                <div className="flex items-center gap-3">
                  <div className="bg-center bg-no-repeat bg-cover rounded-full size-10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAdRB0fWy8d3kiKhg17-Cg5W8KXvVqNBLxLTlAYmeOw4hDvzBgIlkmPvtblsDqqj5YVFetFqH-Zk7wsFZzrQgj34CiNH8u5WSIQ55W_5ZKqmDBM2qvOea_VJxlq0mPYhN5WhZ64yxP6tNBfbkOwvluO2n_Bv19pC1CxJRCsZ9cFr4VC1Cg4EdjlkWJstHVPGSiQYtACglNF5Eh0IFa6ek9vQ70Pb34T_HEh4NbUm4UVC7ZLjejoWWj9C2a0DThGITI-qIzp__BqN0E")' }}></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-med-dark dark:text-white">Dr. Sarah Lee</span>
                      <span className="material-symbols-outlined text-primary text-[14px] fill">verified</span>
                    </div>
                    <p className="text-xs text-med-text-secondary dark:text-gray-400">124 helpful replies</p>
                  </div>
                </div>
                {/* Contributor 2 */}
                <div className="flex items-center gap-3">
                  <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                    J
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-med-dark dark:text-white">Jessica M.</span>
                    </div>
                    <p className="text-xs text-med-text-secondary dark:text-gray-400">Community Guide</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Guidelines */}
            <div className="bg-med-gray dark:bg-[#1f3333] rounded-xl p-4">
              <h5 className="text-xs font-bold text-med-dark dark:text-white mb-2 uppercase tracking-wide">Guidelines</h5>
              <ul className="text-xs text-med-text-secondary dark:text-gray-300 space-y-2 list-disc pl-4">
                <li>Be respectful and kind to others.</li>
                <li>No medical advice; share experiences only.</li>
                <li>Report inappropriate content.</li>
                <li>Respect privacy and anonymity.</li>
              </ul>
            </div>

         </aside>
      </div>

    </div>
  );
}