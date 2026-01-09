import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// --- CONFIGURATION: Navigation Menu Items ---
const NAV_LINKS = [
  { 
    path: "/doctor/dashboard", 
    label: "Dashboard", 
    icon: "dashboard",
    requiresVerification: false // Everyone can see dashboard (usually)
  },
  { 
    path: "/doctor/reviews", 
    label: "My Reviews", 
    icon: "forum", 
    requiresVerification: true // LOCKED
  },
  { 
    path: "/doctor/saved", 
    label: "Saved Cases", 
    icon: "bookmark", 
    requiresVerification: true // LOCKED
  },
  { 
    path: "/doctor/schedule", 
    label: "Schedule", 
    icon: "calendar_month", 
    requiresVerification: true // LOCKED
  },
  { 
    path: "/doctor/settings", 
    label: "Settings", 
    icon: "settings",
    requiresVerification: false // Settings usually open to edit profile
  },
];

const DoctorSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get verification status from Redux
  const { verified } = useSelector((state) => state.doctor);
  const  {profile} =  useSelector((state)=>state.doctor) 
   const isVerified = verified?.isVerified;

  // Helper: Check if link is active
  const isActive = (path) => location.pathname === path;

  // Handler: Sign Out Logic
  const handleSignOut = () => {
    console.log("Signing out...");
    navigate("/login");
  };

  return (
    <aside className="hidden w-72 flex-col border-r border-[#dbe6e6] bg-surface-light dark:bg-surface-dark dark:border-[#2a3c3c] lg:flex flex-shrink-0 z-20 h-screen sticky top-0">
      <div className="flex h-full flex-col justify-between p-6">
        <div className="flex flex-col gap-8">
          
          {/* --- User Profile Snippet --- */}
          <div className="flex items-center gap-4 rounded-2xl bg-background-light p-4 border border-[#eff4f4] dark:bg-[#152626] dark:border-[#2a3c3c]">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 shadow-sm border-2 border-white dark:border-[#2a3c3c]"
              aria-label="Portrait of a smiling male doctor in a white coat"
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBaiLmrJHNaQy9G159MMy-qukkpz4uk6IOL9tuwFpUhsZ7KdhjcKDo_m_mz4s4ZzokcKg0MWa7QfAXKKdJxyrhPP-s0SA_KyYwFqm9Un_cLnUBK73HU30pczBcxd_fP2Lsg9JhRLVHbClvVKMBt_pVYGLaW9pOldbgi44o_Bs_QEov5FM5dLo4LO7o3VzusqXQ8ipYNEl_su5wckhc2gQbTwM1R0IcjdlS2EH4yKViS2GlTA0-802DlYrRXbnGhd2fog3l8zA1RARo")',
              }}
            ></div>
            <div className="flex flex-col">
              <h3 className="text-[#111818] dark:text-white text-sm font-bold">
                {isVerified ? `${profile.DoctorProfile.displayName}`:"MedPulse Dr."}
              </h3>
              <div className="flex items-center gap-1">
                <span
                  className={`material-symbols-outlined text-[14px] ${isVerified ? "text-primary" : "text-gray-400"}`}
                  style={isVerified ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {isVerified ? "verified" : "hourglass_empty"}
                </span>
                <p className="text-secondary dark:text-gray-400 text-xs font-medium">
                  {isVerified ? `${profile.DoctorProfile.specialization}` : "Pending Verification"}
                </p>
              </div>
            </div>
          </div>

          {/* --- Navigation Logic --- */}
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const activeState = isActive(link.path);
              
              // Check if link should be disabled
              const isDisabled = link.requiresVerification && !isVerified;

              // Base classes shared by both Link and Div
              const baseClasses = `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200`;
              
              // Conditional Styling
              const stateClasses = isDisabled 
                ? "opacity-50 cursor-not-allowed bg-gray-50 dark:bg-[#1a2c2c] text-gray-400" // Disabled Style
                : activeState 
                  ? "bg-primary/10 text-[#0e7c7c] dark:text-primary dark:bg-primary/20 shadow-sm" // Active Style
                  : "hover:bg-[#f0f4f4] text-secondary dark:text-gray-400 dark:hover:bg-[#1f3333]"; // Default Hover Style

              // Render Content Inside (Icon + Label + Lock)
              const LinkContent = (
                <>
                  <span
                    className={`material-symbols-outlined ${activeState ? "filled-icon" : ""}`}
                    style={activeState ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {link.icon}
                  </span>
                  <span className="text-sm font-semibold flex-1">{link.label}</span>
                  
                  {/* Lock Icon for Disabled State */}
                  {isDisabled && (
                    <span className="material-symbols-outlined text-[16px] text-gray-400">
                      lock
                    </span>
                  )}

                  {/* Badge (Only show if not disabled) */}
                  {!isDisabled && link.badge && (
                    <span className="ml-auto bg-primary text-[#085555] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </>
              );

              // Render Logic: If disabled, render <div>, else render <Link>
              if (isDisabled) {
                return (
                  <div key={link.path} className={`${baseClasses} ${stateClasses}`} title="Complete verification to unlock">
                    {LinkContent}
                  </div>
                );
              }

              return (
                <Link 
                  key={link.path}
                  to={link.path}
                  className={`${baseClasses} ${stateClasses}`}
                >
                  {LinkContent}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* --- Footer / Sign Out --- */}
        <button 
          onClick={handleSignOut}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl h-11 border border-[#dbe6e6] bg-white text-[#111818] text-sm font-bold shadow-sm hover:bg-gray-50 dark:bg-[#1f3333] dark:border-[#2a3c3c] dark:text-white dark:hover:bg-[#253d3d] transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default DoctorSidebar;