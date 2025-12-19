import React from 'react';
import { Link } from 'react-router-dom';
import RecentActivityFeed from '../components/RecentActivityFeed';

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
  return (
    // MAIN LAYOUT GRID
    <div className="flex justify-center items-start gap-6 w-full px-4 lg:px-8 py-6">
      
   
      {/* LEFT COLUMN: MAIN PROFILE CONTENT         */}
      
      <main className="flex flex-col w-full max-w-[720px] gap-6">
        
        {/* 1. Header Card */}
        <ProfileHeader user={USER_PROFILE} />

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

const ProfileHeader = ({ user }) => (
  <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl shadow-sm border border-[#e5e7eb] dark:border-[#2a3838] overflow-hidden">
    {/* Cover Image */}
    <div className="h-32 bg-gradient-to-r from-teal-400 to-[#13ecec] w-full relative">
      <button className="absolute top-4 right-4 bg-black/20 hover:bg-black/30 text-white p-1.5 rounded-full backdrop-blur-sm transition-colors">
        <span className="material-symbols-outlined text-[18px]">photo_camera</span>
      </button>
    </div>
    
    <div className="px-6 pb-6 relative">
      {/* Profile Pic & Actions */}
      <div className="flex justify-between items-end -mt-12 mb-4">
        <div className="relative">
          <div className="size-28 rounded-full border-[4px] border-white dark:border-[#1a2c2c] bg-cover bg-center shadow-md" style={{ backgroundImage: `url('${user.image}')` }}></div>
          <div className="absolute bottom-1 right-1 bg-white dark:bg-[#1a2c2c] rounded-full p-1 border border-gray-100 dark:border-gray-700 shadow-sm cursor-pointer hover:bg-gray-50">
            <span className="material-symbols-outlined text-med-text-secondary text-[16px]">edit</span>
          </div>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button className="px-4 py-2 bg-white dark:bg-[#253636] border border-med-gray dark:border-[#2a3838] rounded-xl text-med-dark dark:text-white text-sm font-semibold hover:bg-med-gray dark:hover:bg-[#2f4242] transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">settings</span>
            Settings
          </button>
          <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-med-dark text-sm font-bold rounded-xl transition-colors shadow-sm shadow-primary/20">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-med-dark dark:text-white">{user.name}</h1>
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-teal-700 dark:text-primary text-[10px] font-bold uppercase tracking-wide border border-primary/20">{user.level}</span>
        </div>
        <p className="text-med-text-secondary dark:text-gray-400 text-sm mt-0.5 font-medium">{user.handle}</p>
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-med-text-secondary dark:text-gray-400">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">location_on</span>
            <span>{user.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            <span>Joined {user.joined}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">link</span>
            <a className="text-primary hover:underline" href="#">{user.website}</a>
          </div>
        </div>
        
        <p className="mt-4 text-sm leading-relaxed text-med-dark dark:text-gray-300 max-w-2xl">
          {user.bio}
        </p>
      </div>
    </div>
  </div>
);

const ProfileStats = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="bg-white dark:bg-[#1a2c2c] p-4 rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] flex items-center gap-4 shadow-sm">
      <div className="size-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
        <span className="material-symbols-outlined">post_add</span>
      </div>
      <div>
        <div className="text-2xl font-bold text-med-dark dark:text-white">{stats.posts}</div>
        <div className="text-xs text-med-text-secondary dark:text-gray-400 font-semibold uppercase tracking-wide">Total Posts</div>
      </div>
    </div>
    <div className="bg-white dark:bg-[#1a2c2c] p-4 rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] flex items-center gap-4 shadow-sm">
      <div className="size-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
        <span className="material-symbols-outlined">thumb_up</span>
      </div>
      <div>
        <div className="text-2xl font-bold text-med-dark dark:text-white">{stats.helpful}</div>
        <div className="text-xs text-med-text-secondary dark:text-gray-400 font-semibold uppercase tracking-wide">Helpful Votes</div>
      </div>
    </div>
    <div className="bg-white dark:bg-[#1a2c2c] p-4 rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] flex items-center gap-4 shadow-sm">
      <div className="size-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
        <span className="material-symbols-outlined">forum</span>
      </div>
      <div>
        <div className="text-2xl font-bold text-med-dark dark:text-white">{stats.comments}</div>
        <div className="text-xs text-med-text-secondary dark:text-gray-400 font-semibold uppercase tracking-wide">Comments</div>
      </div>
    </div>
  </div>
);

const ProfileSidebar = () => (
  <aside className="flex flex-col gap-6 w-full">
    {/* Medical Disclaimer */}
    <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30">
      <div className="flex items-start gap-3">
        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">info</span>
        <div>
          <h5 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">Medical Disclaimer</h5>
          <p className="text-xs text-blue-700 dark:text-blue-200 leading-snug">
            Your profile information is visible to the community. MedPulse protects your data, but please be mindful of sharing sensitive medical history publicly.
          </p>
        </div>
      </div>
    </div>

    {/* Your Doctors */}
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-med-dark dark:text-white">Your Doctors</h3>
        <Link to="#" className="text-xs font-semibold text-primary hover:text-primary/80">Manage</Link>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-center bg-no-repeat bg-cover rounded-full size-10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBWka30KoK367JQLZVMGdVbRloQfwH54LWzQpR8XuUISpovvc4TGsUdWkqMNdlPcyXzkSRDksS1QZnoqTwchBrE3N4k4x4JWlsBEW9ALwqmVe1RzD7PuHa-0nFDQNLjONwtnit_rvvo8vd8xYPDX2jJfm7UpXkHdLjjwZi0Zqqyt5nDCq76QETXKZ61uD-5WlZZAEzemKC4YwrYlf9CjpjxskyMfmhJ8W1I4bApEl04XkOXpFYIHWxz15F8__4KBdlm8msNwiWdvZc")' }}></div>
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-med-dark dark:text-white">Dr. A. Patel</span>
              <span className="material-symbols-outlined text-primary text-[14px] fill">verified</span>
            </div>
            <p className="text-xs text-med-text-secondary dark:text-gray-400">Following</p>
          </div>
          <button className="text-med-text-secondary text-xs font-bold uppercase tracking-wider hover:bg-med-gray px-2 py-1 rounded">Unfollow</button>
        </div>
      </div>
    </div>

    {/* Trending Topics */}
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-med-dark dark:text-white">Trending Health Topics</h3>
        <Link to="#" className="text-xs font-semibold text-primary hover:text-primary/80">View All</Link>
      </div>
      <div className="flex flex-col gap-3">
        <div className="group flex flex-col p-3 rounded-xl bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] hover:border-primary/50 cursor-pointer transition-colors">
          <div className="flex justify-between items-start mb-1">
            <span className="text-sm font-semibold text-med-dark dark:text-white">Seasonal Allergies</span>
            <span className="text-[10px] bg-med-gray dark:bg-[#253636] px-1.5 py-0.5 rounded text-med-text-secondary">Trending</span>
          </div>
          <p className="text-xs text-med-text-secondary dark:text-gray-400">High pollen count reported in Northeast region.</p>
          <span className="text-xs text-primary font-medium mt-2">1.2k Posts</span>
        </div>
        <div className="group flex flex-col p-3 rounded-xl bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] hover:border-primary/50 cursor-pointer transition-colors">
          <div className="flex justify-between items-start mb-1">
            <span className="text-sm font-semibold text-med-dark dark:text-white">Mental Health</span>
          </div>
          <p className="text-xs text-med-text-secondary dark:text-gray-400">Managing stress and anxiety in daily life.</p>
          <span className="text-xs text-primary font-medium mt-2">2.4k Posts</span>
        </div>
      </div>
    </div>
  </aside>
);