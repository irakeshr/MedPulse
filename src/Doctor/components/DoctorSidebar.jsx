import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// --- CONFIGURATION: Navigation Menu Items ---
const NAV_LINKS = [
  { 
    path: "/doctor/dashboard", 
    label: "Dashboard", 
    icon: "dashboard" 
  },
  { 
    path: "/doctor/reviews", 
    label: "My Reviews", 
    icon: "forum", 
    // badge: ""// Example notification count
  },
  { 
    path: "/doctor/saved", 
    label: "Saved Cases", 
    icon: "bookmark" 
  },
  { 
    path: "/doctor/schedule", 
    label: "Schedule", 
    icon: "calendar_month" 
  },
  { 
    path: "/doctor/settings", 
    label: "Settings", 
    icon: "settings" 
  },
];

const DoctorSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper: Check if link is active
  const isActive = (path) => location.pathname === path;

  // Handler: Sign Out Logic
  const handleSignOut = () => {
    // Add your auth logout logic here (e.g., clear tokens)
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
                Dr. RadhaKrishnan
              </h3>
              <div className="flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-primary text-[14px] fill-current"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <p className="text-secondary dark:text-gray-400 text-xs font-medium">
                  Cardiologist
                </p>
              </div>
            </div>
          </div>

          {/* --- Navigation Logic --- */}
          
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const activeState = isActive(link.path);
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${activeState 
                      ? "bg-primary/10 text-[#0e7c7c] dark:text-primary dark:bg-primary/20 shadow-sm" 
                      : "hover:bg-[#f0f4f4] text-secondary dark:text-gray-400 dark:hover:bg-[#1f3333]"
                    }`}
                >
                  <span
                    className={`material-symbols-outlined ${activeState ? "filled-icon" : ""}`}
                    // Add Fill style only if active
                    style={activeState ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {link.icon}
                  </span>
                  <span className="text-sm font-semibold">{link.label}</span>
                  
                  {/* Optional Badge Counter */}
                  {link.badge && (
                    <span className="ml-auto bg-primary text-[#085555] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
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