import React from 'react';
import ReviewCard from '../components/ReviewCard'; // Adjust path if needed

const PatientFeedback = () => {
  // Mock Data for Reviews
  const reviewsData = [
    {
      id: 1,
      name: "Michael K.",
      initials: "MK",
      consultation: "Hypertension",
      rating: 5,
      time: "2 hours ago",
      content: "Dr. Richards was incredibly thorough and explained my condition in a way that was easy to understand. He took the time to listen to my concerns about medication side effects and adjusted my prescription accordingly. Highly recommended!",
      avatarColor: "bg-blue-100",
      textColor: "text-blue-600",
      doctorReply: null
    },
    {
      id: 2,
      name: "Sarah A.",
      initials: "SA",
      consultation: "Annual Checkup",
      rating: 4,
      time: "Yesterday",
      content: "Great visit overall. The clinic is very clean and the staff is friendly. The wait time was a bit longer than expected, but Dr. Richards was very professional once I got in.",
      avatarColor: "bg-purple-100",
      textColor: "text-purple-600",
      doctorReply: {
        text: "Thank you for your feedback, Sarah. I apologize for the wait time; we had an emergency case earlier that morning. I'm glad to hear you had a positive experience otherwise.",
        time: "1 day ago"
      }
    },
    {
      id: 3,
      name: "Anonymous",
      initials: "",
      consultation: "Urgent Care",
      rating: 5,
      time: "3 days ago",
      content: "Life saver! I was having severe chest pains and Dr. Richards saw me immediately. His calm demeanor really helped me panic less. Turns out it was severe heartburn but he ruled out everything serious very efficiently.",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBi8W3-YiMtFpj3gRq16WKGyhQYEL3CHKXPfCYawWvhIMJqnwB1YzgV0YsmO-cs2vV1L7HOxhF6Up4HkG529VthdmlVNOghA-us3fSl3ScynXd8uak9H7twE_3oi8CJnkHcguBRYk735MlE3PQjK47YEUmCIsvoKu8acpN4z7KVWOdxUMLBqq3ddnjnZqqyNqi1NBMcoVPX2cCXrEjpstp263OR4JZeUzqyzdIoyTz1h9i7jqndCsnp3FNnvPxYCMq-Z9Vkc_ZUWw4",
      doctorReply: null
    },
    {
      id: 4,
      name: "John D.",
      initials: "JD",
      consultation: "General",
      rating: 5,
      time: "4 days ago",
      content: "Excellent service and very professional staff.",
      avatarColor: "bg-green-100",
      textColor: "text-green-600",
      doctorReply: null
    },
    {
      id: 5,
      name: "Emily R.",
      initials: "ER",
      consultation: "Follow-up",
      rating: 4,
      time: "5 days ago",
      content: "The doctor was great but the reception was a bit chaotic.",
      avatarColor: "bg-red-100",
      textColor: "text-red-600",
      doctorReply: null
    }
  ];

  return (
    <div className=" bg-white dark:bg-background-dark text-[#111818] dark:text-white font-display transition-colors duration-200 min-h-screen w-full">
      <div className="flex h-screen w-full overflow-hidden">
        
        <main className="flex-1 flex flex-col h-full overflow-hidden relative ">
          
          {/* Header */}
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

          <div className="flex-1 overflow-y-auto p-4 md:p-5  lg:px-5 lg:py-5 scrollbar-hide">
            <div className="mx-auto max-w-7xl flex flex-col gap-8">
              
              {/* Title Section */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <h1 className="text-[#111818] dark:text-white text-3xl md:text-4xl font-black tracking-tight mb-2">
                    Patient Feedback
                  </h1>
                  <p className="text-secondary dark:text-gray-400 text-base md:text-lg">
                    Manage your reputation and view <span className="font-semibold text-primary-dark dark:text-primary">152 patient reviews</span>.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-surface-light dark:bg-surface-dark border border-[#dbe6e6] dark:border-[#2a3c3c] rounded-xl shadow-sm">
                    <span className="text-sm font-bold text-secondary dark:text-gray-400">Overall Rating:</span>
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-bold text-[#111818] dark:text-white">4.9</span>
                      <span className="material-symbols-outlined text-yellow-400 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Toolbar */}
              <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between bg-surface-light dark:bg-surface-dark p-2 rounded-2xl border border-[#dbe6e6] dark:border-[#2a3c3c] shadow-sm">
                <div className="flex-1 min-w-[300px]">
                  <label className="flex w-full items-center h-12 rounded-xl bg-[#f6f8f8] dark:bg-[#152626] px-4 focus-within:ring-2 focus-within:ring-primary/50 transition-shadow">
                    <span className="material-symbols-outlined text-secondary dark:text-gray-500 mr-3">search</span>
                    <input 
                      className="w-full bg-transparent border-none text-sm text-[#111818] dark:text-white placeholder:text-secondary dark:placeholder:text-gray-500 focus:ring-0 p-0 font-medium" 
                      placeholder="Search reviews by keywords or patient..." 
                      type="text"
                    />
                  </label>
                </div>
                <div className="flex flex-wrap items-center gap-2 px-2">
                  <div className="flex items-center gap-2 h-9 px-3 rounded-lg bg-[#f0f4f4] dark:bg-[#1f3333] hover:bg-[#e0e6e6] dark:hover:bg-[#2a3c3c] cursor-pointer transition-all">
                    <span className="text-xs font-medium text-[#111818] dark:text-white">Sort: Newest First</span>
                    <span className="material-symbols-outlined text-[16px]">expand_more</span>
                  </div>
                  <div className="w-px h-6 bg-[#dbe6e6] dark:bg-[#2a3c3c] mx-1"></div>
                  <button className="flex items-center gap-2 h-9 px-3 rounded-lg bg-white dark:bg-[#1f3333] border border-[#dbe6e6] dark:border-[#2a3c3c] hover:border-primary text-xs font-medium text-[#111818] dark:text-white transition-all">
                    5 Stars
                  </button>
                  <button className="flex items-center gap-2 h-9 px-3 rounded-lg bg-white dark:bg-[#1f3333] border border-[#dbe6e6] dark:border-[#2a3c3c] hover:border-primary text-xs font-medium text-[#111818] dark:text-white transition-all">
                    Unreplied
                  </button>
                </div>
              </div>

              {/* Main Layout Grid */}
              <div className="flex flex-col xl:flex-row gap-8 items-start relative scrollbar-hide">
                
                {/* REVIEWS COLUMN (Left - Grows) */}
                <div className="flex-1 flex flex-col gap-4 w-full">
                  {reviewsData.map((review) => (
                    <ReviewCard key={review.id} data={review} />
                  ))}
                </div>

                {/* ANALYTICS COLUMN (Right - Sticky & Fixed Size) */}
                {/* Note: Added [&::-webkit-scrollbar]:hidden to emulate 'scrollbar-hide' if you don't have the plugin */}
                <div className="hidden xl:block w-80 shrink-0 sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto scrollbar-hide">
                  <aside className="flex flex-col gap-6 w-full pb-8">
                    
                    {/* Rating Breakdown */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-[#dbe6e6] dark:border-[#2a3c3c] shadow-sm p-6">
                      <h3 className="font-bold text-[#111818] dark:text-white mb-4">Rating Breakdown</h3>
                      <div className="flex flex-col gap-3">
                        {[
                          { star: 5, count: 120, pct: "85%" },
                          { star: 4, count: 25, pct: "10%" },
                          { star: 3, count: 4, pct: "3%" },
                          { star: 2, count: 2, pct: "1%" },
                          { star: 1, count: 1, pct: "1%" }
                        ].map((item) => (
                          <div key={item.star} className="flex items-center gap-3">
                            <span className="text-xs font-bold text-secondary dark:text-gray-400 w-3">{item.star}</span>
                            <span className="material-symbols-outlined text-[14px] text-yellow-400" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <div className="flex-1 h-2 bg-[#f0f4f4] dark:bg-[#1f3333] rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: item.pct }}></div>
                            </div>
                            <span className="text-xs font-medium text-secondary dark:text-gray-500 w-6 text-right">{item.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Trend Graph */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-[#dbe6e6] dark:border-[#2a3c3c] shadow-sm p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-[#111818] dark:text-white">Trend</h3>
                        <span className="text-xs font-bold text-accent-green-text bg-accent-green px-2 py-1 rounded-md flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">trending_up</span>
                          +2.4%
                        </span>
                      </div>
                      <p className="text-xs text-secondary dark:text-gray-400 mb-6">Patient satisfaction over last 30 days.</p>
                      <div className="flex items-end gap-2 h-24 w-full">
                        {[60, 40, 55, 75, 65, 85, 95].map((h, i) => (
                          <div key={i} className={`w-full rounded-t-sm`} style={{height: `${h}%`, backgroundColor: i === 6 ? '#0E7C7C' : 'rgba(14, 124, 124, 0.3)'}}></div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-2 text-[10px] text-secondary font-medium uppercase tracking-wider">
                        <span>Wk 1</span><span>Wk 2</span><span>Wk 3</span><span>Wk 4</span>
                      </div>
                    </div>

                    {/* Pro Tip */}
                    <div className="bg-gradient-to-br from-[#102222] to-[#1a3c3c] rounded-2xl p-5 text-white relative overflow-hidden">
                      <div className="absolute -right-4 -top-4 size-24 bg-primary/20 rounded-full blur-xl"></div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="material-symbols-outlined text-primary">lightbulb</span>
                          <h3 className="font-bold">Pro Tip</h3>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-3">Responding to positive reviews increases patient retention by up to 20%.</p>
                        <button className="text-primary text-xs font-bold hover:text-white transition-colors">Learn best practices →</button>
                      </div>
                    </div>

                    {/* Disclaimer (Added from your snippet for completeness) */}
                    <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30">
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">info</span>
                        <div>
                          <h5 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">Confidentiality</h5>
                          <p className="text-xs text-blue-700 dark:text-blue-200 leading-snug">
                            Patient data is encrypted. Do not share screenshots of this dashboard.
                          </p>
                        </div>
                      </div>
                    </div>
                  
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientFeedback;