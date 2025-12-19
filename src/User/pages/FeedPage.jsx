import React from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard'; // Adjust path as needed
import DoctorModal from '../components/DoctorModal';
import { useState } from 'react';

// --- MOCK DATA FOR FEED ---
const POSTS_DATA = [
  {
    id: 1,
    userName: "Sarah J.",
    userImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-_2UAAMg1UV2tqMyib86h_ZrmLXiDC6WkPLsmouH83WqtQYg8cUzhxadVz39pPEIUWoNlH-6qr_bn7rnnglyqL6gd0dLAvww3oEdDInQYW8LEVYNfb5c-_5rWL5XB62KTEnNugLfmYR5oA-JBMEPXsmETagNQwEXsbFqIoPsSaOUFQUxO-JsIpcbAzG47GLsWt-IrSQlXhZ7Ddda1z9SDAIRHvbF7cPXrCHQ4tPT0pgXtuoQjz01jiP_2jcj323LZDQvrusZ7Abg",
    timeAgo: "2 hours ago",
    location: "KERALA, kkd",
    title: "Recurring migraines in the morning",
    content: "I've been waking up with a sharp pain on the left side of my head for the past few days. It usually fades by noon but comes back if I look at screens for too long. Has anyone else experienced this specific timing?",
    severity: "Medium",
    duration: "5 days",
    tags: ["#Migraine", "#LightSensitivity"],
    helpfulCount: 24,
    commentCount: 2,
    isAnonymous: false,
    comments: [
      { id: 101, user: "Alex M.", avatar: "https://i.pravatar.cc/150?u=1", text: "Have you checked your pillow height? That was my issue.", timeAgo: "1h ago" },
      { id: 102, user: "Dr. A. Patel", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWka30KoK367JQLZVMGdVbRloQfwH54LWzQpR8XuUISpovvc4TGsUdWkqMNdlPcyXzkSRDksS1QZnoqTwchBrE3N4k4x4JWlsBEW9ALwqmVe1RzD7PuHa-0nFDQNLjONwtnit_rvvo8vd8xYPDX2jJfm7UpXkHdLjjwZi0Zqqyt5nDCq76QETXKZ61uD-5WlZZAEzemKC4YwrYlf9CjpjxskyMfmhJ8W1I4bApEl04XkOXpFYIHWxz15F8__4KBdlm8msNwiWdvZc", text: "Please monitor your water intake as well.", timeAgo: "45m ago" }
    ],
    doctorResponse: {
      name: "Dr.Dhanas",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAC_a9H2-3A4RMV8-Nvm03Vor3Mtqezjgw1yRZuZ88hNsrjxWkHnMaQw0TRuJ9Qgf3dxFG90nMFZ5Ep6PLMHEObNEbripg-r2vOWL3qqsNy58MA1FzBYfjaqn8cV9zHAl0bJy5LS1cH29CX-61nru4uTve2Dc3RG6zGx59dse1gPz_poHACgiJsUe5GQkfUEcQiMyfxlv62Q1TezG3dpNJS31vLnShUNGx-ccIzGAOzbHuSeMYL1ul7UYc1e7_8HALsRSgH9k3t5Gw",
      text: "Morning headaches can sometimes be related to sleep posture or even teeth grinding (bruxism). Since you mentioned screen sensitivity, eye strain could be a factor. I'd recommend tracking your sleep quality."
    }
  },
  {
    id: 2,
    userName: "Anonymous User",
    timeAgo: "30 mins ago",
    location: "KOCHI, KK",
    title: "Sharp pain in lower back after lifting",
    content: "I helped a friend move yesterday and now I can barely stand up straight. It's a sharp shooting pain right above my hips. Heat makes it feel slightly better.",
    severity: "High",
    duration: "1 day",
    tags: ["#BackPain"],
    helpfulCount: 5,
    commentCount: 0,
    comments: [],
    isAnonymous: true,
  },
  {
    id: 3,
    userName: "sunina.",
    userImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpLguAw3wbgL1x-w01MbrTIwagEcoEkGAP9uI66Z-n58v6VDfEFTpXYBckHoWNZwEiWUUN_eaPbcA14qa0FFRDrUn3T6hxXk7j12NgDvEQtzyHSHUwRnu0f55LkDtRCbyWaOy0Zgy8yF_7pGDWee9cjURqyiIHFVt1SBLuytJzgQeIZamdQvgE8m3re1fl-YVGOeBo1AF_-Uq6m34FYtNNxWGS-ITU3KdXpM2FFGrNTSgAfk0QCxKenM6l3MWgKRvbe9ubm_vRpDw",
    timeAgo: "5 hours ago",
    location: "INDIA, SA",
    title: "Mild fever and scratchy throat",
    content: "Started feeling off yesterday evening. Temperature is around 99.5F. Just looking for some home remedy suggestions to nip this in the bud before the weekend.",
    severity: "Low",
    duration: "2 days",
    tags: ["#Cold", "#HomeRemedy"],
    helpfulCount: 12,
    commentCount: 1,
    comments: [
        { id: 103, user: "Lisa K.", avatar: "https://i.pravatar.cc/150?u=2", text: "Honey and ginger tea always works wonders for me!", timeAgo: "3h ago" }
    ],
    isAnonymous: false,
  }
];

const DOCTORS = [
  { 
    id: 1, 
    name: "Dr. A. Patel", 
    specialty: "Cardiologist", 
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWka30KoK367JQLZVMGdVbRloQfwH54LWzQpR8XuUISpovvc4TGsUdWkqMNdlPcyXzkSRDksS1QZnoqTwchBrE3N4k4x4JWlsBEW9ALwqmVe1RzD7PuHa-0nFDQNLjONwtnit_rvvo8vd8xYPDX2jJfm7UpXkHdLjjwZi0Zqqyt5nDCq76QETXKZ61uD-5WlZZAEzemKC4YwrYlf9CjpjxskyMfmhJ8W1I4bApEl04XkOXpFYIHWxz15F8__4KBdlm8msNwiWdvZc",
    about: "Dr. Patel is a leading cardiologist with over 15 years of experience in treating complex heart conditions."
  }
];

const FeedPage = () => {
const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    // MAIN LAYOUT CONTAINER
    <div className="flex justify-center items-start gap-6 w-full px-4 lg:px-8 py-6">
      
    
      {/* LEFT COLUMN: MAIN FEED (Composer + Posts) */}
      
      <main className="flex flex-col w-full max-w-[720px] gap-6">
        
        {/* --- Composer Section --- */}
        <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl p-4 shadow-sm border border-[#e5e7eb] dark:border-[#2a3838]">
          <div className="flex gap-4">
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-full size-12 shrink-0 border border-gray-100 dark:border-gray-700" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCUyJhcQQkJaNYmDJASe4NALB-H2j15Rr9tCtmyExU4rO5Mw0OXnGKvXlk96HvSgY5I4kFdtsWoQ4r1A5ldq_9NCygmj7kHhapBYTk36dVNvokLY5gxlB3CDAtQpp971jx9K3ihMYcnFS8vkUCH2LsRV6ejDsHJvniI__RZTHjMuc6-QIXDHfzvI07lP31ti8PrcoRWnjkvjZRsmPQGVgxHJOzYn8eJ_jmFjCGmX2rZ91ODUL8i9xfzLUXkEfalwNXtymDLjZUEkWI")' }}
            ></div>
            <div className="flex-1">
              <textarea 
                className="w-full bg-med-gray dark:bg-[#253636] rounded-xl p-3 text-sm min-h-[80px] border-none focus:ring-1 focus:ring-primary/50 resize-none placeholder:text-med-text-secondary dark:placeholder:text-gray-500 text-med-dark dark:text-white" 
                placeholder="Describe your symptoms... What are you feeling?"
              ></textarea>
              <div className="flex justify-between items-center mt-3">
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-med-gray dark:hover:bg-[#253636] text-med-text-secondary dark:text-gray-400 transition-colors" title="Add Image">
                    <span className="material-symbols-outlined text-[20px]">image</span>
                  </button>
                  <button className="p-2 rounded-lg hover:bg-med-gray dark:hover:bg-[#253636] text-med-text-secondary dark:text-gray-400 transition-colors" title="Add Location">
                    <span className="material-symbols-outlined text-[20px]">location_on</span>
                  </button>
                  <button className="flex items-center gap-1 px-2 rounded-lg hover:bg-med-gray dark:hover:bg-[#253636] text-med-text-secondary dark:text-gray-400 transition-colors text-xs font-medium">
                    <span className="material-symbols-outlined text-[18px]">visibility_off</span>
                    Post Anonymously
                  </button>
                </div>
                <button className="px-6 py-2 bg-primary hover:bg-primary/90 text-med-dark font-semibold text-sm rounded-lg transition-colors">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- Filters Section --- */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <button className="shrink-0 flex items-center gap-2 px-4 py-2 bg-med-dark dark:bg-white text-white dark:text-med-dark rounded-xl text-sm font-medium shadow-sm">
            <span>All Posts</span>
          </button>
          <button className="shrink-0 flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] text-med-dark dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-med-gray dark:hover:bg-[#253636] transition-colors">
            <span>Symptom Type</span>
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
          <button className="shrink-0 flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] text-med-dark dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-med-gray dark:hover:bg-[#253636] transition-colors">
            <span>Severity</span>
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
          <button className="shrink-0 flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] text-med-dark dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-med-gray dark:hover:bg-[#253636] transition-colors">
            <span>Location</span>
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
        </div>

        {/* --- Feed Posts List --- */}
        <div className="flex flex-col gap-6">
          {POSTS_DATA.map((post) => (
              <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* --- Loading Spinner --- */}
        <div className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>

      </main>


      {/* ========================================= */}
      {/* RIGHT COLUMN: SIDEBAR (Merged Inline)     */}
      {/* ========================================= */}
      <div className="hidden xl:block w-80 shrink-0 sticky top-4 h-full overflow-y-auto scrollbar-hide">
         <aside className="flex flex-col gap-6 w-full">
            
            {/* 1. Disclaimer Card */}
            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30">
                <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">info</span>
                    <div>
                        <h5 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">Not Emergency Advice</h5>
                        <p className="text-xs text-blue-700 dark:text-blue-200 leading-snug">
                            MedPulse is for informational purposes only. In case of a medical emergency, contact emergency services.
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. Trending Topics */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-med-dark dark:text-white">Trending Health Topics</h3>
                    <Link to="/trending" className="text-xs font-semibold text-primary hover:text-primary/80">View All</Link>
                </div>
                <div className="flex flex-col gap-3">
                    {/* Trending Item 1 */}
                    <div className="group flex flex-col p-3 rounded-xl bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] hover:border-primary/50 cursor-pointer transition-colors">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-sm font-semibold text-med-dark dark:text-white">Seasonal Allergies</span>
                            <span className="text-[10px] bg-med-gray dark:bg-[#253636] px-1.5 py-0.5 rounded text-med-text-secondary">Trending</span>
                        </div>
                        <p className="text-xs text-med-text-secondary dark:text-gray-400">High pollen count reported in Northeast region.</p>
                        <span className="text-xs text-primary font-medium mt-2">1.2k Posts</span>
                    </div>
                    {/* Trending Item 2 */}
                    <div className="group flex flex-col p-3 rounded-xl bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] hover:border-primary/50 cursor-pointer transition-colors">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-sm font-semibold text-med-dark dark:text-white">Flu Season Prep</span>
                        </div>
                        <p className="text-xs text-med-text-secondary dark:text-gray-400">Discussions on vaccines and early prevention.</p>
                        <span className="text-xs text-primary font-medium mt-2">850 Posts</span>
                    </div>
                </div>
            </div>

            {/* 3. Verified Doctors */}


            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-med-dark dark:text-white">Verified Doctors</h3>
                </div>
               
            </div>

            {/* KNKN */}

            <div className="flex flex-col gap-4">
            {DOCTORS.map(doc => (
               <div 
                 key={doc.id} 
                 className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2a3838] p-2 rounded-lg transition-colors"
                 onClick={() => setSelectedDoctor(doc)} // <--- CLICK TRIGGER
               >
                  <div className="bg-center bg-no-repeat bg-cover rounded-full size-10" style={{ backgroundImage: `url('${doc.image}')` }}></div>
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-med-dark dark:text-white block">{doc.name}</span>
                    <span className="text-xs text-med-text-secondary dark:text-gray-400">{doc.specialty}</span>
                  </div>
               </div>
            ))}
         </div>




            {/* KMKN */}

         </aside>

         <DoctorModal 
        isOpen={!!selectedDoctor} 
        onClose={() => setSelectedDoctor(null)} 
        doctor={selectedDoctor} 
      />
      </div>

    </div>
  );
}

export default FeedPage;