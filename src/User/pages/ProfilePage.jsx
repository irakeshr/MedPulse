import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecentActivityFeed from '../components/RecentActivityFeed';
import EditProfileModal from '../components/EditProfileModal';
import ProfileHeader from '../components/ProfileHeader';
import ProfileStats from '../components/ProfileStats';
import ProfileSidebar from '../components/ProfileSidebar';

// --- MOCK DATA ---
const USER_PROFILE = {
  name: "Rakesh R.",
  handle: "@irakesh.r",
  level: "Level 4 Member",
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOLCviMOpASErCHhTQmvY6k34iYjPPoNBtTcXTevn6qvSVudTEwgQtFPiNSM2fdDYS95FtRj0VMuJZ2MhrCv7Je5qakn_Yo9VwsJIEKLLds3-whsOamhqUK47VWjCFw35W61E_-AWBjonf9A9fdwikxOiALd27cPTkB7PAhHRgG7d4ltlHxF__DTRS_15qNAHrVAhOQk3p2mBzmH7Uum18DB5Z6Ck4VDoIjknvWcW0y9wVdlHYF1a23BsjBnqQBRNl__52tiym3xU",
  location: "KERALA, PKD",
  joined: "April 2026",
  website: "irakesh.r_here.com",
  bio: "Health enthusiast focused on holistic wellness and migraine management. I believe in a balanced approach combining modern medicine and lifestyle changes. Always happy to share advice on natural remedies! 🌱",
  stats: { posts: 28, helpful: 142, comments: 56 },
  tags: ["#Migraine", "#AllergyRelief", "#HealthySleep", "#Mindfulness", "#Nutrition"]
};

 

export default function ProfilePage() {
  const [isModalOpen,setIsModalOpen] = useState(false)
   //open this modal while click the edit profile button
  const handleClickEditProfile=()=>{
    setIsModalOpen(true)

   }
   const handleModalClose=()=>{
    setIsModalOpen(false)
   }
  return (
    // MAIN LAYOUT GRID
    <div className="flex justify-center items-start gap-6 w-full px-4 lg:px-8 py-6">
      { isModalOpen ? <EditProfileModal onClose={handleModalClose}/>: null}
   
      {/* LEFT COLUMN: MAIN PROFILE CONTENT         */}
      
      <main className="flex flex-col w-full max-w-[720px] gap-6">
        
        {/* 1. Header Card */}
        <ProfileHeader user={USER_PROFILE} onOpen={handleClickEditProfile} />

        {/* 2. Stats Grid */}
        <ProfileStats stats={USER_PROFILE.stats} />

        {/* 3. Health Tags Card */}
        <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl p-6 shadow-sm border border-[#e5e7eb] dark:border-[#2a3838]">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">sell</span>
              <h3 className="font-bold text-med-dark dark:text-white text-lg">My Health Tags</h3>
            </div>
            <button className="text-xs font-semibold text-primary hover:bg-primary/10 px-2 py-1 rounded transition-colors uppercase tracking-wide">Edit Tags</button>
          </div>
          <p className="text-sm text-med-text-secondary dark:text-gray-400 mb-4">Topics I'm following and experienced in.</p>
          <div className="flex flex-wrap gap-2">
            {USER_PROFILE.tags.map((tag, idx) => (
               <span key={idx} className="px-3 py-1.5 rounded-lg bg-med-gray dark:bg-[#253636] border border-[#e5e7eb] dark:border-[#2a3838] text-sm font-medium text-med-dark dark:text-gray-300">
                 {tag}
               </span>
            ))}
            <button className="px-3 py-1.5 rounded-lg border border-dashed border-med-text-secondary text-med-text-secondary hover:bg-med-gray/50 text-sm font-medium flex items-center gap-1 transition-colors">
              <span className="material-symbols-outlined text-[16px]">add</span> Add Tag
            </button>
          </div>
        </div>

        {/* 4. Recent Activity Feed */}
        <div className="flex flex-col gap-4">
         <RecentActivityFeed/>
        </div>

      </main>

   
  
      <div className="hidden xl:block w-80 shrink-0 sticky top-4">
         <ProfileSidebar />
      </div>
      


    </div>
  );
}

// --- SUB-COMPONENTS ---
 


