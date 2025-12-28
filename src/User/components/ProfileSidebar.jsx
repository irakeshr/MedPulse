import { Link } from "react-router-dom";

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

export default ProfileSidebar;