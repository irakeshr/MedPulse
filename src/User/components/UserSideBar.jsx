import { Link, useLocation } from "react-router-dom";

const UserSideBar = () => {
  const location = useLocation();

  // Helper: Determine active styling for standard nav items
  const active = (path) =>
    location.pathname === path
      ? "bg-primary/10 text-med-dark dark:text-white font-medium"
      : "text-med-text-secondary dark:text-gray-400 hover:bg-med-gray dark:hover:bg-[#253636] font-medium transition-colors";

  // Helper: Determine active icon styling
  const activeIcon = (path) =>
    location.pathname === path ? "text-primary fill" : "";

  return (
    <aside className="hidden lg:flex w-64 flex-col gap-4 p-4 sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto scrollbar-hide">
      
      {/* --- NAVIGATION LINKS --- */}
      <div className="flex flex-col gap-2">
        <Link to="/" className={`flex items-center gap-3 px-4 py-3 rounded-xl ${active("/")}`}>
          <span className={`material-symbols-outlined ${activeIcon("/")}`}>home</span>
          <span>Home Feed</span>
        </Link>

        <Link to="/posts" className={`flex items-center gap-3 px-4 py-3 rounded-xl ${active("/posts")}`}>
          <span className={`material-symbols-outlined ${activeIcon("/posts")}`}>article</span>
          <span>My Posts</span>
        </Link>

        <Link to="/saved" className={`flex items-center gap-3 px-4 py-3 rounded-xl ${active("/saved")}`}>
          <span className={`material-symbols-outlined ${activeIcon("/saved")}`}>bookmark</span>
          <span>Saved</span>
        </Link>

        <Link to="/community" className={`flex items-center gap-3 px-4 py-3 rounded-xl ${active("/community")}`}>
          <span className={`material-symbols-outlined ${activeIcon("/community")}`}>group</span>
          <span>Community</span>
        </Link>

        <Link to="/profile" className={`flex items-center gap-3 px-4 py-3 rounded-xl ${active("/profile")}`}>
          <span className={`material-symbols-outlined ${activeIcon("/profile")}`}>person</span>
          <span>Profile</span>
        </Link>

        {/* Doctors Link (Distinct Style based on HTML) */}
        <Link to="/doctors" className={`flex items-center gap-3 px-4 py-3 rounded-xl ${active("/doctors")}`}>
          <span className={`material-symbols-outlined ${activeIcon("/doctors")}`}>stethoscope</span>
          <span>Doctors</span>
        </Link>
      </div>

      {/* --- QUICK ACCESS SECTION (New Feature) --- */}
      <div className="mt-6 px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-med-text-secondary dark:text-gray-500">Quick Access</h3>
        </div>
        <div className="flex flex-col gap-3">
          {/* Card 1: Appointments */}
          <div className="bg-white dark:bg-[#1a2c2c] p-3 rounded-xl border border-med-gray dark:border-[#2a3838] hover:border-primary/50 cursor-pointer transition-colors shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-full bg-blue-50 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400">
                <span className="material-symbols-outlined">calendar_month</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-med-dark dark:text-white truncate">Appointments</h4>
                <p className="text-xs text-med-text-secondary dark:text-gray-400 truncate">No upcoming visits</p>
              </div>
            </div>
          </div>
          
          {/* Card 2: History */}
          <div className="bg-white dark:bg-[#1a2c2c] p-3 rounded-xl border border-med-gray dark:border-[#2a3838] hover:border-primary/50 cursor-pointer transition-colors shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-full bg-teal-50 text-teal-500 dark:bg-teal-900/20 dark:text-teal-400">
                <span className="material-symbols-outlined">history</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-med-dark dark:text-white truncate">History</h4>
                <p className="text-xs text-med-text-secondary dark:text-gray-400 truncate">View past consultations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- HEALTH TAGS SECTION --- */}
      <div className="mt-8 px-4 pb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-med-text-secondary dark:text-gray-500 mb-4">
          Your Health Tags
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 rounded-md bg-white dark:bg-[#1a2c2c] border border-med-gray dark:border-[#2a3838] text-xs font-medium text-med-dark dark:text-gray-300">
            #Migraine
          </span>
          <span className="px-2 py-1 rounded-md bg-white dark:bg-[#1a2c2c] border border-med-gray dark:border-[#2a3838] text-xs font-medium text-med-dark dark:text-gray-300">
            #Allergy
          </span>
          <button className="px-2 py-1 rounded-md border border-dashed border-med-text-secondary text-xs font-medium text-med-text-secondary cursor-pointer hover:bg-med-gray/50 transition-colors">
            + Add
          </button>
        </div>
      </div>

    </aside>
  );
};

export default UserSideBar;