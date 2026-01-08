import React from 'react';
 

export default function AdminDashboard() {
  return (
    <div className="bg-white dark:bg-background-dark text-med-dark dark:text-white font-display transition-colors duration-200 min-h-screen w-full flex flex-col">
 
      <div className="flex flex-1 h-[calc(100vh-72px)] overflow-hidden max-w-[1440px] mx-auto w-full">
    
        <main className="flex-1 flex flex-col w-full px-2 lg:px-4 py-8 gap-8 overflow-y-auto">
          
          {/* Page Title & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 ">
            <div>
              <h1 className="text-2xl font-bold text-med-dark dark:text-white">Dashboard Overview</h1>
              <p className="text-med-text-secondary dark:text-gray-400 text-sm mt-1">Welcome back, here's what's happening on MedPulse today.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#253636] border border-[#e5e7eb] dark:border-[#2a3838] text-med-dark dark:text-white rounded-lg text-sm font-medium hover:bg-med-gray transition-colors">
                <span className="material-symbols-outlined text-[20px]">download</span>
                Export Report
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-med-dark dark:bg-primary text-white dark:text-med-dark rounded-lg text-sm font-medium hover:bg-med-dark/90 transition-colors">
                <span className="material-symbols-outlined text-[20px]">add</span>
                New Announcement
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-[#1a2c2c] p-5 rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm flex flex-col justify-between h-32">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-med-text-secondary uppercase tracking-wider">Total Users</p>
                  <h3 className="text-2xl font-bold text-med-dark dark:text-white mt-1">24,592</h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <span className="material-symbols-outlined">group</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span>+12% from last month</span>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1a2c2c] p-5 rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm flex flex-col justify-between h-32">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-med-text-secondary uppercase tracking-wider">Pending Doctors</p>
                  <h3 className="text-2xl font-bold text-med-dark dark:text-white mt-1">14</h3>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                  <span className="material-symbols-outlined">verified</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-orange-600 dark:text-orange-400">
                <span className="material-symbols-outlined text-[16px]">priority_high</span>
                <span>Requires attention</span>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1a2c2c] p-5 rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm flex flex-col justify-between h-32">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-med-text-secondary uppercase tracking-wider">Flagged Posts</p>
                  <h3 className="text-2xl font-bold text-med-dark dark:text-white mt-1">23</h3>
                </div>
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
                  <span className="material-symbols-outlined">flag</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400">
                <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                <span>+5 new today</span>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1a2c2c] p-5 rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm flex flex-col justify-between h-32">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-med-text-secondary uppercase tracking-wider">Active Topics</p>
                  <h3 className="text-2xl font-bold text-med-dark dark:text-white mt-1">142</h3>
                </div>
                <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg text-teal-600 dark:text-teal-400">
                  <span className="material-symbols-outlined">topic</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-med-text-secondary">
                <span>Most active: #Migraine</span>
              </div>
            </div>
          </div>

          {/* Main Content Split: Table (Left) & Reports (Right) */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
            
            {/* Left Column: Doctor Table (Span 2) */}
            <div className="xl:col-span-2 bg-white dark:bg-[#1a2c2c] rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm flex flex-col">
              <div className="p-5 border-b border-[#e5e7eb] dark:border-[#2a3838] flex justify-between items-center">
                <h3 className="font-bold text-med-dark dark:text-white">Pending Doctor Verifications</h3>
                <a className="text-xs font-bold text-primary hover:text-primary-dark uppercase tracking-wide" href="#">View All</a>
              </div>
              <div className="p-0 overflow-x-auto scrollbar-hide">
                <table className="w-full text-left text-sm">
                  <thead className="bg-med-gray dark:bg-[#253636] text-med-text-secondary dark:text-gray-400 text-xs uppercase font-semibold">
                    <tr>
                      <th className="px-6 py-4 rounded-tl-lg">Doctor Name</th>
                      <th className="px-6 py-4">Specialty</th>
                      <th className="px-6 py-4">License ID</th>
                      <th className="px-6 py-4">Submitted</th>
                      <th className="px-6 py-4 rounded-tr-lg text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e7eb] dark:divide-[#2a3838]">
                    {/* Row 1 */}
                    <tr className="hover:bg-med-gray/30 dark:hover:bg-[#253636]/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-center bg-no-repeat bg-cover rounded-full size-8" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAdRB0fWy8d3kiKhg17-Cg5W8KXvVqNBLxLTlAYmeOw4hDvzBgIlkmPvtblsDqqj5YVFetFqH-Zk7wsFZzrQgj34CiNH8u5WSIQ55W_5ZKqmDBM2qvOea_VJxlq0mPYhN5WhZ64yxP6tNBfbkOwvluO2n_Bv19pC1CxJRCsZ9cFr4VC1Cg4EdjlkWJstHVPGSiQYtACglNF5Eh0IFa6ek9vQ70Pb34T_HEh4NbUm4UVC7ZLjejoWWj9C2a0DThGITI-qIzp__BqN0E")' }}></div>
                          <div>
                            <div className="font-semibold text-med-dark dark:text-white">Dr. Sarah Lee</div>
                            <div className="text-xs text-med-text-secondary">sarah.lee@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-med-dark dark:text-gray-300">Dermatologist</td>
                      <td className="px-6 py-4 font-mono text-xs text-med-text-secondary">NY-44821-MD</td>
                      <td className="px-6 py-4 text-med-text-secondary">2 hours ago</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20" title="Approve"><span className="material-symbols-outlined text-[20px]">check_circle</span></button>
                          <button className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" title="Reject"><span className="material-symbols-outlined text-[20px]">cancel</span></button>
                          <button className="p-1.5 rounded-lg text-med-text-secondary hover:bg-gray-100 dark:hover:bg-gray-800" title="View Details"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                        </div>
                      </td>
                    </tr>
                    {/* Row 2 */}
                    <tr className="hover:bg-med-gray/30 dark:hover:bg-[#253636]/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-center bg-no-repeat bg-cover rounded-full size-8" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBWka30KoK367JQLZVMGdVbRloQfwH54LWzQpR8XuUISpovvc4TGsUdWkqMNdlPcyXzkSRDksS1QZnoqTwchBrE3N4k4x4JWlsBEW9ALwqmVe1RzD7PuHa-0nFDQNLjONwtnit_rvvo8vd8xYPDX2jJfm7UpXkHdLjjwZi0Zqqyt5nDCq76QETXKZ61uD-5WlZZAEzemKC4YwrYlf9CjpjxskyMfmhJ8W1I4bApEl04XkOXpFYIHWxz15F8__4KBdlm8msNwiWdvZc")' }}></div>
                          <div>
                            <div className="font-semibold text-med-dark dark:text-white">Dr. A. Patel</div>
                            <div className="text-xs text-med-text-secondary">a.patel@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-med-dark dark:text-gray-300">Cardiologist</td>
                      <td className="px-6 py-4 font-mono text-xs text-med-text-secondary">CA-99210-MD</td>
                      <td className="px-6 py-4 text-med-text-secondary">5 hours ago</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20" title="Approve"><span className="material-symbols-outlined text-[20px]">check_circle</span></button>
                          <button className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" title="Reject"><span className="material-symbols-outlined text-[20px]">cancel</span></button>
                          <button className="p-1.5 rounded-lg text-med-text-secondary hover:bg-gray-100 dark:hover:bg-gray-800" title="View Details"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                        </div>
                      </td>
                    </tr>
                    {/* Row 3 */}
                    <tr className="hover:bg-med-gray/30 dark:hover:bg-[#253636]/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-center bg-no-repeat bg-cover rounded-full size-8 bg-gray-200 flex items-center justify-center text-gray-500 font-bold">JD</div>
                          <div>
                            <div className="font-semibold text-med-dark dark:text-white">Dr. John Doe</div>
                            <div className="text-xs text-med-text-secondary">j.doe@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-med-dark dark:text-gray-300">General Practice</td>
                      <td className="px-6 py-4 font-mono text-xs text-med-text-secondary">TX-11029-GP</td>
                      <td className="px-6 py-4 text-med-text-secondary">1 day ago</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20" title="Approve"><span className="material-symbols-outlined text-[20px]">check_circle</span></button>
                          <button className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" title="Reject"><span className="material-symbols-outlined text-[20px]">cancel</span></button>
                          <button className="p-1.5 rounded-lg text-med-text-secondary hover:bg-gray-100 dark:hover:bg-gray-800" title="View Details"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                        </div>
                      </td>
                    </tr>
                        <tr className="hover:bg-med-gray/30 dark:hover:bg-[#253636]/50 transition-colors">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                            <div className="bg-center bg-no-repeat bg-cover rounded-full size-8 bg-gray-200 flex items-center justify-center text-gray-500 font-bold">JD</div>
                            <div>
                                <div className="font-semibold text-med-dark dark:text-white">Dr. John Doe</div>
                                <div className="text-xs text-med-text-secondary">j.doe@example.com</div>
                            </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-med-dark dark:text-gray-300">General Practice</td>
                        <td className="px-6 py-4 font-mono text-xs text-med-text-secondary">TX-11029-GP</td>
                        <td className="px-6 py-4 text-med-text-secondary">1 day ago</td>
                        <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                            <button className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20" title="Approve"><span className="material-symbols-outlined text-[20px]">check_circle</span></button>
                            <button className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" title="Reject"><span className="material-symbols-outlined text-[20px]">cancel</span></button>
                            <button className="p-1.5 rounded-lg text-med-text-secondary hover:bg-gray-100 dark:hover:bg-gray-800" title="View Details"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                            </div>
                        </td>
                        </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column: Recent Reports (Span 1, Fixed Height) */}
            <div className="xl:col-span-1 bg-white dark:bg-[#1a2c2c] rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm flex flex-col h-full max-h-[500px]">
              <div className="p-5 border-b border-[#e5e7eb] dark:border-[#2a3838] flex justify-between items-center shrink-0">
                <h3 className="font-bold text-med-dark dark:text-white">Recent Reports</h3>
                <a className="text-xs font-bold text-primary hover:text-primary-dark uppercase tracking-wide" href="#">Moderate</a>
              </div>
              <div className="p-0 overflow-y-auto custom-scrollbar">
                {/* Report Item 1 */}
                <div className="p-4 border-b border-[#e5e7eb] dark:border-[#2a3838] hover:bg-med-gray/20 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">Harassment</span>
                    <span className="text-xs text-med-text-secondary">10m ago</span>
                  </div>
                  <p className="text-sm text-med-dark dark:text-gray-300 font-medium mb-1">"You clearly don't know what..."</p>
                  <p className="text-xs text-med-text-secondary mb-3">Reported by: User_992</p>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-1.5 bg-med-dark dark:bg-white text-white dark:text-med-dark text-xs font-bold rounded-lg hover:bg-opacity-90">Review</button>
                    <button className="px-3 py-1.5 border border-[#e5e7eb] dark:border-[#2a3838] text-med-text-secondary text-xs font-bold rounded-lg hover:bg-med-gray dark:hover:bg-[#253636]">Dismiss</button>
                  </div>
                </div>
                {/* Report Item 2 */}
                <div className="p-4 border-b border-[#e5e7eb] dark:border-[#2a3838] hover:bg-med-gray/20 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">Misinformation</span>
                    <span className="text-xs text-med-text-secondary">45m ago</span>
                  </div>
                  <p className="text-sm text-med-dark dark:text-gray-300 font-medium mb-1">"Drink this herbal tea to cure..."</p>
                  <p className="text-xs text-med-text-secondary mb-3">Reported by: Dr. Emily Chen</p>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-1.5 bg-med-dark dark:bg-white text-white dark:text-med-dark text-xs font-bold rounded-lg hover:bg-opacity-90">Review</button>
                    <button className="px-3 py-1.5 border border-[#e5e7eb] dark:border-[#2a3838] text-med-text-secondary text-xs font-bold rounded-lg hover:bg-med-gray dark:hover:bg-[#253636]">Dismiss</button>
                  </div>
                </div>
                {/* Report Item 3 */}
                <div className="p-4 hover:bg-med-gray/20 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">Spam</span>
                    <span className="text-xs text-med-text-secondary">2h ago</span>
                  </div>
                  <p className="text-sm text-med-dark dark:text-gray-300 font-medium mb-1">"Buy cheap meds now at..."</p>
                  <p className="text-xs text-med-text-secondary mb-3">Reported by: System Bot</p>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-1.5 bg-med-dark dark:bg-white text-white dark:text-med-dark text-xs font-bold rounded-lg hover:bg-opacity-90">Review</button>
                    <button className="px-3 py-1.5 border border-[#e5e7eb] dark:border-[#2a3838] text-med-text-secondary text-xs font-bold rounded-lg hover:bg-med-gray dark:hover:bg-[#253636]">Dismiss</button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Trending Topics Section */}
          <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-med-dark dark:text-white">Trending Health Topics Management</h3>
                <p className="text-xs text-med-text-secondary mt-1">Manage featured tags and monitor rising health trends.</p>
              </div>
              <button className="text-sm text-primary font-bold hover:underline">View Analytics</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center justify-between p-3 rounded-xl border border-primary/30 bg-primary/5">
                <span className="font-medium text-med-dark dark:text-white text-sm">#Migraine</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-primary">Trending</span>
                  <button className="text-med-text-secondary hover:text-red-500"><span className="material-symbols-outlined text-[18px]">close</span></button>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl border border-[#e5e7eb] dark:border-[#2a3838] bg-white dark:bg-[#253636]">
                <span className="font-medium text-med-dark dark:text-white text-sm">#FluSeason</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-med-text-secondary">Rising</span>
                  <button className="text-med-text-secondary hover:text-red-500"><span className="material-symbols-outlined text-[18px]">close</span></button>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl border border-[#e5e7eb] dark:border-[#2a3838] bg-white dark:bg-[#253636]">
                <span className="font-medium text-med-dark dark:text-white text-sm">#MentalHealth</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-med-text-secondary">Stable</span>
                  <button className="text-med-text-secondary hover:text-red-500"><span className="material-symbols-outlined text-[18px]">close</span></button>
                </div>
              </div>
              <button className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-med-text-secondary text-med-text-secondary hover:bg-med-gray dark:hover:bg-[#253636] transition-colors">
                <span className="material-symbols-outlined text-[20px]">add</span>
                <span className="text-sm font-medium">Add Topic</span>
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}