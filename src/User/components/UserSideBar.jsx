import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const UserSideBar = () => {
  const location = useLocation();
  const [upcomingCount, setUpcomingCount] = useState(0);

  useEffect(() => {
    const fetchUpcomingCount = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/user/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setUpcomingCount(res.data.upcoming?.length || 0);
        }
      } catch (err) {
        console.error("Error fetching appointment count:", err);
      }
    };
    fetchUpcomingCount();
  }, [location.pathname]);

  const active = (path) =>
    location.pathname === path
      ? "bg-primary/10 text-med-dark dark:text-white font-medium"
      : "text-med-text-secondary dark:text-gray-400 hover:bg-med-gray dark:hover:bg-[#253636] font-medium transition-colors";

  const activeIcon = (path) =>
    location.pathname === path ? "text-primary fill" : "";

  return (
    <aside className="hidden lg:flex w-64 flex-col gap-4 p-4 sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto scrollbar-hide">
      
      {/* --- NAVIGATION LINKS --- */}
      <div className="flex flex-col gap-2">
        <Link to="/me" className={`flex items-center gap-3 px-4 py-3 rounded-xl ${active("/me")}`}>
          <span className={`material-symbols-outlined ${activeIcon("/me")}`}>home</span>
          <span>Home Feed</span>
        </Link>

        <Link to="/my-appointments" className={`flex items-center gap-3 px-4 py-3 rounded-xl ${active("/my-appointments")}`}>
          <span className={`material-symbols-outlined ${activeIcon("/my-appointments")}`}>calendar_month</span>
          <span>My Appointments</span>
          {upcomingCount > 0 && (
            <span className="ml-auto bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {upcomingCount}
            </span>
          )}
        </Link>

        <Link to="/doctors" className={`flex items-center gap-3 px-4 py-3 rounded-xl ${active("/doctors")}`}>
          <span className={`material-symbols-outlined ${activeIcon("/doctors")}`}>stethoscope</span>
          <span>Find Doctors</span>
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
      </div>

      {/* --- APPOINTMENTS QUICK CARD --- */}
      

      {/* --- HEALTH TAGS SECTION --- */}
      <div className="mt-4 px-4 pb-4">
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