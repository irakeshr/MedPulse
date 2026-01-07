import React from 'react';
import SavedCaseCard from './SavedCaseCard'; // Import the new component

const SavedCases = () => {
  // Mock Data for Cases
  const casesData = [
    {
      id: 99281,
      severity: "High Severity",
      severityColor: "bg-accent-red dark:bg-red-900/40 text-accent-red-text dark:text-red-200",
      title: "Acute abdominal pain lower right quadrant",
      description: "Male, 15. Sudden onset severe pain. Nausea and vomiting present. Rebound tenderness observed. Suspect appendicitis. Needs immediate second opinion before transfer.",
      time: "Saved 2 hours ago",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBi8W3-YiMtFpj3gRq16WKGyhQYEL3CHKXPfCYawWvhIMJqnwB1YzgV0YsmO-cs2vV1L7HOxhF6Up4HkG529VthdmlVNOghA-us3fSl3ScynXd8uak9H7twE_3oi8CJnkHcguBRYk735MlE3PQjK47YEUmCIsvoKu8acpN4z7KVWOdxUMLBqq3ddnjnZqqyNqi1NBMcoVPX2cCXrEjpstp263OR4JZeUzqyzdIoyTz1h9i7jqndCsnp3FNnvPxYCMq-Z9Vkc_ZUWw4",
      notesCount: 2
    },
    {
      id: 84402,
      severity: "Medium Severity",
      severityColor: "bg-accent-yellow dark:bg-yellow-900/30 text-accent-yellow-text dark:text-yellow-200",
      title: "Recurring migraine with aura",
      description: "Female, 34. Visual disturbances followed by intense headache on right side. Sensitivity to light. Current medication regimen ineffective. Seeking neurology consult.",
      time: "Saved yesterday",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkDHRXUwIu3w0Y5ZUjyTU6uTTi17UxMc4fUqaRCeQc3FT8IA9dRQ9_gvz3RSV-oUWUAnAnVix05uqS5dwVZXed7IKSxa7IicFip6D0F9q8vLUI0y7Rr6hXgToLbA8muwehjl2e7XxNc9eCIo7qsmXzFifFkJl1Xm0FYSDqVdZbFaBR6DdsU8AJ3gRy8Nve9VenuMtQ7DVq4hFNIVUTBYC-JtkPqtOhnxxi7w7q7Aju8RFir6P7CWhzJr8-_6o8LenHypOZOYh6fIo",
      notesCount: 0
    },
    {
      id: 12933,
      severity: "Low Severity",
      severityColor: "bg-accent-green dark:bg-green-900/30 text-accent-green-text dark:text-green-200",
      title: "Persistent dermatitis on forearm",
      description: "Male, 22. Red, itchy bumps on left forearm. Possible allergic reaction to plant contact. No systemic symptoms. Requested visual confirmation for OTC treatment.",
      time: "Saved 3 days ago",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBK-jFQBFUOlmC2PaQExtqTgFg9C2HZ8QA2sxgsYj7jLd655ZBUtFGCeyp8jzUButqbEqM-3PnJn6r5muTREW9h72pDht9xQZstW2-ifzyMRBGg7_Sqoe41VdZzEeXFYMX8szwvjWbB7VREaprb-c_Dag0mu2BRO5UCoFR3crU43sWfaiXxva7OLQP-6GjRuNZLbmpnvQ9UsxOHSLahprWaBNHoD3PvBSkU7ZUKy5w7MGydK3zzHpa-kD6KG68h9lXt_TZoLeR9jyw",
      notesCount: 0
    },
    {
      id: 55102,
      severity: "Follow-up",
      severityColor: "bg-[#f0f4f4] dark:bg-[#1f3333] text-secondary dark:text-gray-400",
      title: "Hypertension monitoring results",
      description: "Review of 2-week blood pressure log. Adjusted dosage of Lisinopril. Patient reports slight dizziness in mornings.",
      time: "Saved 1 week ago",
      initials: "JD",
      avatarColor: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300",
      notesCount: 1
    }
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111818] dark:text-white font-display transition-colors duration-200 min-h-screen w-full">
      <div className="flex h-screen w-full overflow-hidden">
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          
          {/* Mobile Header */}
          <header className="lg:hidden flex items-center justify-between p-4 bg-surface-light dark:bg-surface-dark border-b border-[#dbe6e6] dark:border-[#2a3c3c]">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[20px]">cardiology</span>
              </div>
              <span className="font-bold text-lg dark:text-white">MedPulse</span>
            </div>
            <button className="p-2 text-[#111818] dark:text-white">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </header>

          {/* Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-12 lg:py-10">
            <div className="mx-auto max-w-6xl flex flex-col gap-6">
              
              {/* Page Title & Actions */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-2">
                <div>
                  <h1 className="text-[#111818] dark:text-white text-3xl md:text-4xl font-black tracking-tight mb-2">Saved Cases</h1>
                  <p className="text-secondary dark:text-gray-400 text-base md:text-lg">You have <span className="font-semibold text-primary-dark dark:text-primary">8 saved cases</span> in your personal library.</p>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#dbe6e6] rounded-xl text-sm font-medium shadow-sm hover:bg-gray-50 dark:bg-[#1f3333] dark:border-[#2a3c3c] dark:text-white dark:hover:bg-[#253d3d] transition-all">
                    <span className="material-symbols-outlined text-[20px]">delete_sweep</span>
                    Clear All
                  </button>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between bg-surface-light dark:bg-surface-dark p-2 rounded-2xl border border-[#dbe6e6] dark:border-[#2a3c3c] shadow-sm mb-2">
                <div className="flex-1 min-w-[300px]">
                  <label className="flex w-full items-center h-12 rounded-xl bg-[#f6f8f8] dark:bg-[#152626] px-4 focus-within:ring-2 focus-within:ring-primary/50 transition-shadow">
                    <span className="material-symbols-outlined text-secondary dark:text-gray-500 mr-3">search</span>
                    <input 
                      className="w-full bg-transparent border-none text-sm text-[#111818] dark:text-white placeholder:text-secondary dark:placeholder:text-gray-500 focus:ring-0 p-0 font-medium" 
                      placeholder="Search saved cases by symptom or ID..." 
                      type="text"
                    />
                  </label>
                </div>
                <div className="flex flex-wrap items-center gap-2 px-2">
                  <button className="flex items-center gap-2 h-10 px-4 rounded-xl bg-white dark:bg-[#1f3333] border border-[#dbe6e6] dark:border-[#2a3c3c] hover:border-primary text-sm font-medium text-[#111818] dark:text-white transition-all">
                    <span className="material-symbols-outlined text-[18px] text-secondary">sort</span>
                    Sort by Date
                  </button>
                  <div className="w-px h-6 bg-[#dbe6e6] dark:bg-[#2a3c3c] mx-1"></div>
                  <button className="flex items-center gap-2 h-9 px-3 rounded-lg bg-[#f0f4f4] dark:bg-[#1f3333] hover:bg-[#e0e6e6] dark:hover:bg-[#2a3c3c] text-xs font-medium text-[#111818] dark:text-white transition-all">
                    All Categories
                    <span className="material-symbols-outlined text-[16px]">expand_more</span>
                  </button>
                </div>
              </div>

              {/* Main Grid Layout */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* LEFT COLUMN: Case Cards */}
                <div className="xl:col-span-2 flex flex-col gap-4">
                  {casesData.map((caseItem) => (
                    <SavedCaseCard key={caseItem.id} data={caseItem} />
                  ))}
                </div>

                {/* RIGHT COLUMN: Categories & Recent (Sticky & Fixed) */}
                <div className="hidden xl:flex flex-col gap-6 sticky top-4 h-fit max-h-[calc(100vh-2rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden">
                  
                  {/* Saved Categories */}
                  <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-[#dbe6e6] dark:border-[#2a3c3c] shadow-sm p-5">
                    <h3 className="font-bold text-[#111818] dark:text-white mb-4">Saved Categories</h3>
                    <div className="flex flex-col gap-2">
                      {[
                        { name: "Cardiology", icon: "cardiology", count: 3 },
                        { name: "Neurology", icon: "neurology", count: 1 },
                        { name: "Dermatology", icon: "dermatology", count: 2 },
                        { name: "Pediatrics", icon: "pediatrics", count: 2 }
                      ].map((cat) => (
                        <label key={cat.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-[#f0f4f4] dark:hover:bg-[#1f3333] cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors">{cat.icon}</span>
                            <span className="text-sm font-medium text-[#111818] dark:text-white">{cat.name}</span>
                          </div>
                          <span className="text-xs font-bold text-secondary bg-[#f0f4f4] dark:bg-[#2a3c3c] px-2 py-1 rounded-md">{cat.count}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Recently Viewed */}
                  <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-[#dbe6e6] dark:border-[#2a3c3c] shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-[#111818] dark:text-white">Recently Viewed</h3>
                    </div>
                    <div className="flex flex-col gap-3">
                      <a className="group flex items-center gap-3 p-2 rounded-xl hover:bg-[#f0f4f4] dark:hover:bg-[#1f3333] transition-colors" href="#">
                        <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-xs">JD</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#111818] dark:text-white truncate">John Doe - Arrhythmia</p>
                          <p className="text-xs text-secondary dark:text-gray-500 truncate">Viewed 5m ago</p>
                        </div>
                      </a>
                      <a className="group flex items-center gap-3 p-2 rounded-xl hover:bg-[#f0f4f4] dark:hover:bg-[#1f3333] transition-colors" href="#">
                        <div className="size-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-300 font-bold text-xs">SA</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#111818] dark:text-white truncate">Sarah A. - Follow up</p>
                          <p className="text-xs text-secondary dark:text-gray-500 truncate">Viewed 1h ago</p>
                        </div>
                      </a>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SavedCases;