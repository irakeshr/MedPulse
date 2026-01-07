import React from 'react';
 
import DoctorPostCard from '../components/DoctorPostCard';

const SavedCases = () => {
  // Mock Data for Cases
  const casesData =[
  {
    id: 1,
    title: "Severe chest tightness radiating to left arm",
    desc: "Patient (Male, 58) reports sudden onset pressure in center of chest. History of hypertension. Describes pain as \"elephant sitting on chest\". Started after light exercise...",
    priority: "High Priority",
    specialty: "Cardiology",
    time: "15m ago",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBi8W3-YiMtFpj3gRq16WKGyhQYEL3CHKXPfCYawWvhIMJqnwB1YzgV0YsmO-cs2vV1L7HOxhF6Up4HkG529VthdmlVNOghA-us3fSl3ScynXd8uak9H7twE_3oi8CJnkHcguBRYk735MlE3PQjK47YEUmCIsvoKu8acpN4z7KVWOdxUMLBqq3ddnjnZqqyNqi1NBMcoVPX2cCXrEjpstp263OR4JZeUzqyzdIoyTz1h9i7jqndCsnp3FNnvPxYCMq-Z9Vkc_ZUWw4",
    viewers: 2,
    patientName: "Robert Fox"
  },
  {
    id: 2,
    title: "Recurring migraine with aura",
    desc: "Female, 34. Experiencing visual disturbances followed by intense headache on right side. Sensitivity to light. OTC medication not effective. Duration 3 days.",
    priority: "Medium Priority",
    specialty: "Neurology",
    time: "2h ago",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkDHRXUwIu3w0Y5ZUjyTU6uTTi17UxMc4fUqaRCeQc3FT8IA9dRQ9_gvz3RSV-oUWUAnAnVix05uqS5dwVZXed7IKSxa7IicFip6D0F9q8vLUI0y7Rr6hXgToLbA8muwehjl2e7XxNc9eCIo7qsmXzFifFkJl1Xm0FYSDqVdZbFaBR6DdsU8AJ3gRy8Nve9VenuMtQ7DVq4hFNIVUTBYC-JtkPqtOhnxxi7w7q7Aju8RFir6P7CWhzJr8-_6o8LenHypOZOYh6fIo",
    viewers: 0,
    patientName: "Jenny Wilson"
  },
  {
    id: 3,
    title: "Rash on forearm after hiking",
    desc: "Male, 22. Noticed red, itchy bumps on left forearm yesterday. Suspects poison ivy but wants confirmation before buying cream. No systemic symptoms.",
    priority: "Low Priority",
    specialty: "Dermatology",
    time: "4h ago",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBK-jFQBFUOlmC2PaQExtqTgFg9C2HZ8QA2sxgsYj7jLd655ZBUtFGCeyp8jzUButqbEqM-3PnJn6r5muTREW9h72pDht9xQZstW2-ifzyMRBGg7_Sqoe41VdZzEeXFYMX8szwvjWbB7VREaprb-c_Dag0mu2BRO5UCoFR3crU43sWfaiXxva7OLQP-6GjRuNZLbmpnvQ9UsxOHSLahprWaBNHoD3PvBSkU7ZUKy5w7MGydK3zzHpa-kD6KG68h9lXt_TZoLeR9jyw",
    viewers: 1,
    patientName: "Guy Hawkins"
  }
];
  return (
    <div className="  dark:bg-[#1a2c2c]  bg-white text-[#111818] dark:text-white font-display transition-colors duration-200 min-h-screen w-full">
      <div className="flex h-screen w-full overflow-hidden">
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col h-full overflow-hidden relative scrollbar-hide">
          
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
          <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-8 lg:py-10 scrollbar-hide    ">
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
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                
                {/* LEFT COLUMN: Case Cards */}
                <div className="xl:col-span-2 flex flex-col gap-4">
                  {casesData.map((caseItem) => (
                    <DoctorPostCard key={caseItem.id} data={caseItem} />
                  ))}
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