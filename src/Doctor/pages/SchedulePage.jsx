import React from "react";
import TimelineSlot from "../components/TimelineSlot";
const SCHEDULE_ITEMS = [
  {
    time: "08:00 AM",
    type: "blocked",
    title: "Hospital Rounds",
    subtitle: "General Ward • Unavailable for MedPulse",
    icon: "local_hospital"
  },
  {
    time: "09:00 AM",
    type: "appointment",
    patientName: "Sarah Jenkins",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBi8W3-YiMtFpj3gRq16WKGyhQYEL3CHKXPfCYawWvhIMJqnwB1YzgV0YsmO-cs2vV1L7HOxhF6Up4HkG529VthdmlVNOghA-us3fSl3ScynXd8uak9H7twE_3oi8CJnkHcguBRYk735MlE3PQjK47YEUmCIsvoKu8acpN4z7KVWOdxUMLBqq3ddnjnZqqyNqi1NBMcoVPX2cCXrEjpstp263OR4JZeUzqyzdIoyTz1h9i7jqndCsnp3FNnvPxYCMq-Z9Vkc_ZUWw4",
    status: "Paid",
    statusColor: "green",
    note: "New Consultation • Migraine",
    mode: "Video Call",
    modeIcon: "videocam"
  },
  {
    time: "10:00 AM",
    type: "open",
    title: "Open Slot (Defined)",
  },
  {
    time: "11:00 AM",
    type: "appointment",
    patientName: "Michael Torres",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkDHRXUwIu3w0Y5ZUjyTU6uTTi17UxMc4fUqaRCeQc3FT8IA9dRQ9_gvz3RSV-oUWUAnAnVix05uqS5dwVZXed7IKSxa7IicFip6D0F9q8vLUI0y7Rr6hXgToLbA8muwehjl2e7XxNc9eCIo7qsmXzFifFkJl1Xm0FYSDqVdZbFaBR6DdsU8AJ3gRy8Nve9VenuMtQ7DVq4hFNIVUTBYC-JtkPqtOhnxxi7w7q7Aju8RFir6P7CWhzJr8-_6o8LenHypOZOYh6fIo",
    status: "Payment Pending",
    statusColor: "amber",
    note: "Urgent Follow-up • Chest Pain",
    mode: "In-Person",
    modeIcon: "apartment",
    isUrgent: true
  },
  {
    time: "12:00 PM",
    type: "break",
    title: "Personal Time • Lunch",
    icon: "coffee"
  },
  {
    time: "01:00 PM",
    type: "appointment",
    patientName: "Emma Wilson",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBK-jFQBFUOlmC2PaQExtqTgFg9C2HZ8QA2sxgsYj7jLd655ZBUtFGCeyp8jzUButqbEqM-3PnJn6r5muTREW9h72pDht9xQZstW2-ifzyMRBGg7_Sqoe41VdZzEeXFYMX8szwvjWbB7VREaprb-c_Dag0mu2BRO5UCoFR3crU43sWfaiXxva7OLQP-6GjRuNZLbmpnvQ9UsxOHSLahprWaBNHoD3PvBSkU7ZUKy5w7MGydK3zzHpa-kD6KG68h9lXt_TZoLeR9jyw",
    status: "Paid",
    statusColor: "green",
    note: "Routine Checkup",
    mode: "In-Person",
    modeIcon: "apartment"
  },
  {
    time: "02:00 PM",
    type: "open",
    title: "Open Slot (Defined)",
  },
  {
    time: "03:00 PM",
    type: "blocked",
    title: "Hospital Duty - Surgery",
    subtitle: "Operating Theatre • Until 06:00 PM",
    icon: "local_hospital"
  }
];
export default function SchedulePage() {
  return (
    <div className="bg-white dark:bg-[#1a2c2c] text-[#111818] dark:text-white font-display transition-colors duration-200 h-screen w-full flex flex-col">
      
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

      {/* Main Content Layout */}
      <main className="flex-1 flex overflow-hidden bg-white">
        
        {/* --- LEFT SCROLLABLE AREA (Schedule) --- */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-6 lg:py-6   dark:bg-[#1a2c2c]  scrollbar-hide bg-white">
          <div className="mx-auto max-w-7xl flex flex-col gap-6">
            
            {/* Header Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-[#111818] dark:text-white text-3xl font-black tracking-tight">Schedule</h1>
                <p className="text-secondary dark:text-gray-400 text-sm mt-1">Manage availability, appointments, and hospital shifts.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center bg-white dark:bg-[#152626] rounded-xl border border-[#dbe6e6] dark:border-[#2a3c3c] p-1 shadow-sm">
                  <button className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-[#f0f4f4] dark:bg-[#2a3c3c] text-[#111818] dark:text-white">Day</button>
                  <button className="px-3 py-1.5 rounded-lg text-sm font-medium text-secondary dark:text-gray-400 hover:text-[#111818] dark:hover:text-white transition-colors">Week</button>
                  <button className="px-3 py-1.5 rounded-lg text-sm font-medium text-secondary dark:text-gray-400 hover:text-[#111818] dark:hover:text-white transition-colors">Month</button>
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#dbe6e6] bg-white text-secondary dark:bg-[#1f3333] dark:border-[#2a3c3c] dark:text-gray-300 font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-[#2a3c3c] transition-all">
                  <span className="material-symbols-outlined text-[20px]">edit_calendar</span>
                  Define Availability
                </button>
                <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-[#085555] font-bold shadow-md shadow-primary/20 hover:bg-[#0ebdbd] hover:text-white transition-all">
                  <span className="material-symbols-outlined">add</span>
                  New Appointment
                </button>
              </div>
            </div>

            {/* Split Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-full items-start">
              
              {/* Timeline Column */}
              <div className="xl:col-span-8 flex flex-col gap-4">
                
                {/* Date Navigator */}
                <div className="flex items-center justify-between bg-surface-light dark:bg-surface-dark p-4 rounded-2xl border border-[#dbe6e6] dark:border-[#2a3c3c] shadow-sm">
                  <div className="flex items-center gap-2">
                    <button className="size-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a3c3c] text-secondary dark:text-gray-400 transition-colors">
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <div className="flex items-center gap-2 px-2">
                      <span className="material-symbols-outlined text-primary">calendar_today</span>
                      <span className="text-lg font-bold text-[#111818] dark:text-white">October 24, 2023</span>
                      <span className="text-sm font-medium text-secondary dark:text-gray-500 bg-gray-100 dark:bg-[#2a3c3c] px-2 py-0.5 rounded text-center">Today</span>
                    </div>
                    <button className="size-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a3c3c] text-secondary dark:text-gray-400 transition-colors">
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                      <span className="text-xs font-medium text-secondary dark:text-gray-400">Hospital</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-primary"></span>
                      <span className="text-xs font-medium text-secondary dark:text-gray-400">MedPulse</span>
                    </div>
                  </div>
                </div>

                {/* Timeline Container */}
                <div className="flex flex-col bg-surface-light dark:bg-surface-dark rounded-2xl border border-[#dbe6e6] dark:border-[#2a3c3c] shadow-card relative overflow-hidden min-h-[600px]">
                  {/* Subtle Grid Lines Background */}
                   
                  <div className="p-6 flex flex-col gap-0 relative z-10">
                    {/* Render Timeline Items */}
                    {SCHEDULE_ITEMS.map((item, index) => (
                      <TimelineSlot key={index} data={item} />
                    ))}
                  </div>
                </div>
              </div>

              {/* --- RIGHT SIDEBAR (Fixed/Sticky) --- */}
              <div className="xl:col-span-4 flex flex-col gap-6 xl:sticky xl:top-4 xl:h-fit xl:max-h-[calc(100vh-2rem)] xl:overflow-y-auto [&::-webkit-scrollbar]:hidden">
                
                {/* 1. Mini Calendar Widget */}
                <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl border border-[#dbe6e6] dark:border-[#2a3c3c] shadow-soft">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-[#111818] dark:text-white">October 2023</h3>
                    <div className="flex gap-1">
                      <button className="p-1 hover:bg-gray-100 dark:hover:bg-[#2a3c3c] rounded text-secondary"><span className="material-symbols-outlined text-[20px]">chevron_left</span></button>
                      <button className="p-1 hover:bg-gray-100 dark:hover:bg-[#2a3c3c] rounded text-secondary"><span className="material-symbols-outlined text-[20px]">chevron_right</span></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                      <span key={d} className="text-xs font-medium text-secondary/50 dark:text-gray-500">{d}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    <span className="p-2 text-gray-300 dark:text-gray-600">29</span>
                    <span className="p-2 text-gray-300 dark:text-gray-600">30</span>
                    {[...Array(23)].map((_, i) => (
                      <span key={i} className="p-2 hover:bg-gray-50 dark:hover:bg-[#2a3c3c] rounded-lg cursor-pointer text-[#111818] dark:text-white">{i + 1}</span>
                    ))}
                    {/* Selected Date */}
                    <span className="p-2 bg-primary text-[#085555] font-bold rounded-lg shadow-sm">24</span>
                    {/* Active Date */}
                    <span className="p-2 hover:bg-gray-50 dark:hover:bg-[#2a3c3c] rounded-lg cursor-pointer text-[#111818] dark:text-white relative">
                      25
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 size-1 bg-green-400 rounded-full"></span>
                    </span>
                    <span className="p-2 hover:bg-gray-50 dark:hover:bg-[#2a3c3c] rounded-lg cursor-pointer text-[#111818] dark:text-white">26</span>
                    <span className="p-2 hover:bg-gray-50 dark:hover:bg-[#2a3c3c] rounded-lg cursor-pointer text-[#111818] dark:text-white">27</span>
                    <span className="p-2 hover:bg-gray-50 dark:hover:bg-[#2a3c3c] rounded-lg cursor-pointer text-[#111818] dark:text-white">28</span>
                  </div>
                </div>

      

                {/* 3. Recent Payments */}
                <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl border border-[#dbe6e6] dark:border-[#2a3c3c] shadow-soft">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-[#111818] dark:text-white">Recent Payments</h3>
                    <button className="text-xs text-primary-dark font-bold hover:underline">View All</button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="p-3 rounded-xl bg-[#f0f4f4] dark:bg-[#1f3333]">
                      <p className="text-xs text-secondary dark:text-gray-400 font-medium">Pending</p>
                      <p className="text-lg font-black text-[#111818] dark:text-white">$150</p>
                    </div>
                    <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/10">
                      <p className="text-xs text-green-700 dark:text-green-400 font-medium">Cleared</p>
                      <p className="text-lg font-black text-green-700 dark:text-green-400">$840</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-[#eff4f4] dark:border-[#2a3c3c] hover:bg-gray-50 dark:hover:bg-[#1f3333] transition-all">
                      <div className="size-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 font-bold text-xs">AJ</div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-[#111818] dark:text-white">Alice Johnson</p>
                        <p className="text-xs text-secondary dark:text-gray-400">Oct 23 • Consultation</p>
                      </div>
                      <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-md">+$80</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-[#eff4f4] dark:border-[#2a3c3c] hover:bg-gray-50 dark:hover:bg-[#1f3333] transition-all">
                      <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-xs">RK</div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-[#111818] dark:text-white">Raj Kumar</p>
                        <p className="text-xs text-secondary dark:text-gray-400">Oct 22 • Follow-up</p>
                      </div>
                      <span className="text-xs font-bold text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-1 rounded-md">Pending</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#dbe6e6] bg-transparent text-[#111818] dark:text-white dark:border-[#2a3c3c] text-sm font-bold hover:bg-gray-50 dark:hover:bg-[#1f3333] transition-colors">
                    <span className="material-symbols-outlined text-[18px]">credit_card</span>
                    Billing Settings
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}