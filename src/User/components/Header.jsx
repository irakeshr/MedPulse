import React, { useState, useEffect, useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setSearchKey } from "../../redux/postSlice";
import { NotificationBell } from "../../components/Notifications";
import { logout } from "../../redux/authSlice";

export default function Header() {
  const {profile}=useSelector((state)=>state.userDetail)
  const profileImage=profile?.patientProfile?.profileImage;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const displayName = profile?.patientProfile?.displayName;
 
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); 

  // Dark Mode Logic
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference or localStorage on mount
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };
const { searchKey } = useSelector((state) => state.post);

useEffect(() => {
  console.log("Current Search Key:", searchKey);
}, [searchKey]);  

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e5e7eb] dark:border-[#2a3838] bg-white dark:bg-[#1a2c2c] px-4 lg:px-8 py-4 shadow-sm transition-colors duration-200">
      <div className="flex items-center justify-between gap-4 w-full max-w-[1600px] mx-auto">
        
        {/* --- LEFT: Logo Section --- */}
        <div className="flex items-center gap-3 text-med-dark dark:text-white shrink-0">
          <div className="size-8 text-primary">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fillRule="evenodd"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] hidden sm:block">
            MedPulse
          </h2>
        </div>

        {/* --- CENTER: Search Bar (Hidden on mobile) --- */}
        <div className="hidden md:flex flex-1 max-w-[500px] mx-4">
          <label className="flex w-full items-center">
            <div className="flex w-full items-center rounded-xl bg-med-gray dark:bg-[#253636] h-10 px-4 focus-within:ring-2 focus-within:ring-primary/50 transition-all border border-transparent dark:border-[#2a3838]">
              <span className="material-symbols-outlined text-med-text-secondary dark:text-gray-400 text-[20px]">
                search
              </span>
             <input
  className="w-full bg-transparent border-none focus:ring-0 text-sm ml-2 placeholder:text-med-text-secondary dark:placeholder:text-gray-500 text-med-dark dark:text-white h-full outline-none"
  placeholder="Search symptoms, doctors, or topics..."
  type="text"
  value={searchKey || ""}  // <--- ADD THIS LINE
  onChange={(e) => dispatch(setSearchKey(e.target.value))}
/>
            </div>
          </label>
        </div>

        {/* --- RIGHT: Actions --- */}
        <div className="flex items-center justify-end gap-3 shrink-0">
          
          {/* Mobile Search Button */}
          <button className="md:hidden p-2 text-med-dark dark:text-white rounded-full hover:bg-med-gray dark:hover:bg-[#253636] transition-colors">
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-med-dark dark:text-white hover:bg-med-gray dark:hover:bg-[#253636] transition-colors"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <span className="material-symbols-outlined text-[22px] fill">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Notifications (Only if Logged In) */}
          <NotificationBell />

          {/* User Menu with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full size-9 border-2 border-white dark:border-[#1a2c2c] ring-2 ring-primary/20 cursor-pointer ml-1"
              style={{ backgroundImage: `url("${profileImage}")` }}
              onClick={() => setShowDropdown(!showDropdown)}
              title="Account"
            ></div>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1a2c2c] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-semibold text-med-dark dark:text-white">{displayName}</p>
                  <p className="text-xs text-med-text-secondary dark:text-gray-400">Patient</p>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-med-dark dark:text-white hover:bg-gray-50 dark:hover:bg-[#253636] transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  <span className="material-symbols-outlined text-lg">person</span>
                  My Profile
                </Link>
                <Link
                  to="/saved"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-med-dark dark:text-white hover:bg-gray-50 dark:hover:bg-[#253636] transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  <span className="material-symbols-outlined text-lg">bookmark</span>
                  Saved Posts
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">logout</span>
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}