 import React from "react";
import { Link } from "react-router-dom";

const RightSideBar = () => {
    return (
        <div>

    <aside className="hidden xl:flex w-80 flex-col gap-6 p-6  h-full overflow-y-auto">
      
      {/* Disclaimer */}
      <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">
            info
          </span>
          <div>
            <h5 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">
              Not Emergency Advice
            </h5>
            <p className="text-xs text-blue-700 dark:text-blue-200 leading-snug">
              MedPulse is for informational purposes only. In case of a medical
              emergency, please contact your local emergency services immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Trending Topics */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-med-dark dark:text-white">
            Trending Health Topics
          </h3>
          <Link
            to="/trending"
            className="text-xs font-semibold text-primary hover:text-primary/80"
          >
            View All
          </Link>
        </div>
        
        <div className="flex flex-col gap-3">
          {/* Card 1 */}
          <div className="group flex flex-col p-3 rounded-xl bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] hover:border-primary/50 cursor-pointer transition-colors">
            <div className="flex justify-between items-start mb-1">
              <span className="text-sm font-semibold text-med-dark dark:text-white">
                Seasonal Allergies
              </span>
              <span className="text-[10px] bg-med-gray dark:bg-[#253636] px-1.5 py-0.5 rounded text-med-text-secondary">
                Trending
              </span>
            </div>
            <p className="text-xs text-med-text-secondary dark:text-gray-400">
              High pollen count reported in Northeast region.
            </p>
            <span className="text-xs text-primary font-medium mt-2">
              1.2k Posts
            </span>
          </div>

          {/* Card 2 */}
          <div className="group flex flex-col p-3 rounded-xl bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] hover:border-primary/50 cursor-pointer transition-colors">
            <div className="flex justify-between items-start mb-1">
              <span className="text-sm font-semibold text-med-dark dark:text-white">
                Flu Season Prep
              </span>
            </div>
            <p className="text-xs text-med-text-secondary dark:text-gray-400">
              Discussions on vaccines and early prevention.
            </p>
            <span className="text-xs text-primary font-medium mt-2">
              850 Posts
            </span>
          </div>

          {/* Card 3 */}
          <div className="group flex flex-col p-3 rounded-xl bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] hover:border-primary/50 cursor-pointer transition-colors">
            <div className="flex justify-between items-start mb-1">
              <span className="text-sm font-semibold text-med-dark dark:text-white">
                Mental Health
              </span>
            </div>
            <p className="text-xs text-med-text-secondary dark:text-gray-400">
              Managing stress and anxiety in daily life.
            </p>
            <span className="text-xs text-primary font-medium mt-2">
              2.4k Posts
            </span>
          </div>
        </div>
      </div>

      {/* Suggested Doctors */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-med-dark dark:text-white">
            Verified Doctors
          </h3>
        </div>
        <div className="flex flex-col gap-4">
          {/* Doctor 1 */}
          <div className="flex items-center gap-3">
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full size-10"
              role="img"
              aria-label="Profile picture of Dr. A. Patel"
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBWka30KoK367JQLZVMGdVbRloQfwH54LWzQpR8XuUISpovvc4TGsUdWkqMNdlPcyXzkSRDksS1QZnoqTwchBrE3N4k4x4JWlsBEW9ALwqmVe1RzD7PuHa-0nFDQNLjONwtnit_rvvo8vd8xYPDX2jJfm7UpXkHdLjjwZi0Zqqyt5nDCq76QETXKZ61uD-5WlZZAEzemKC4YwrYlf9CjpjxskyMfmhJ8W1I4bApEl04XkOXpFYIHWxz15F8__4KBdlm8msNwiWdvZc")',
              }}
            ></div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-med-dark dark:text-white">
                  Dr. A. Patel
                </span>
                <span className="material-symbols-outlined text-primary text-[14px] fill">
                  verified
                </span>
              </div>
              <p className="text-xs text-med-text-secondary dark:text-gray-400">
                Cardiologist
              </p>
            </div>
            <button className="text-primary text-xs font-bold uppercase tracking-wider hover:bg-primary/10 px-2 py-1 rounded">
              Follow
            </button>
          </div>

          {/* Doctor 2 */}
          <div className="flex items-center gap-3">
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full size-10"
              role="img"
              aria-label="Profile picture of Dr. Sarah Lee"
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAdRB0fWy8d3kiKhg17-Cg5W8KXvVqNBLxLTlAYmeOw4hDvzBgIlkmPvtblsDqqj5YVFetFqH-Zk7wsFZzrQgj34CiNH8u5WSIQ55W_5ZKqmDBM2qvOea_VJxlq0mPYhN5WhZ64yxP6tNBfbkOwvluO2n_Bv19pC1CxJRCsZ9cFr4VC1Cg4EdjlkWJstHVPGSiQYtACglNF5Eh0IFa6ek9vQ70Pb34T_HEh4NbUm4UVC7ZLjejoWWj9C2a0DThGITI-qIzp__BqN0E")',
              }}
            ></div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-med-dark dark:text-white">
                  Dr. Sarah Lee
                </span>
                <span className="material-symbols-outlined text-primary text-[14px] fill">
                  verified
                </span>
              </div>
              <p className="text-xs text-med-text-secondary dark:text-gray-400">
                Dermatologist
              </p>
            </div>
            <button className="text-primary text-xs font-bold uppercase tracking-wider hover:bg-primary/10 px-2 py-1 rounded">
              Follow
            </button>
          </div>
        </div>
      </div>
    </aside>
 

            
        </div>
    );
}

export default RightSideBar;
