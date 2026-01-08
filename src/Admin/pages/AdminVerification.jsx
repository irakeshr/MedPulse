import React from 'react';

// --- MOCK DATA ---
const STATS = [
  { label: "Pending Review", value: 14, icon: "pending_actions", color: "blue" },
  { label: "Approved This Week", value: 42, icon: "verified", color: "green" },
  { label: "Rejected Requests", value: 5, icon: "block", color: "red" }
];

const REQUESTS = [
  {
    id: "REQ-2948",
    name: "Dr. Sarah Lee",
    email: "sarah.lee@example.com",
    role: "Dermatologist",
    license: "NY-44821-MD",
    exp: "12 Years",
    docs: ["Medical License.pdf", "Photo ID.jpg"],
    status: "Pending",
    time: "2 hrs ago",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdRB0fWy8d3kiKhg17-Cg5W8KXvVqNBLxLTlAYmeOw4hDvzBgIlkmPvtblsDqqj5YVFetFqH-Zk7wsFZzrQgj34CiNH8u5WSIQ55W_5ZKqmDBM2qvOea_VJxlq0mPYhN5WhZ64yxP6tNBfbkOwvluO2n_Bv19pC1CxJRCsZ9cFr4VC1Cg4EdjlkWJstHVPGSiQYtACglNF5Eh0IFa6ek9vQ70Pb34T_HEh4NbUm4UVC7ZLjejoWWj9C2a0DThGITI-qIzp__BqN0E"
  },
  {
    id: "REQ-2945",
    name: "Dr. A. Patel",
    email: "a.patel@example.com",
    role: "Cardiologist",
    license: "CA-99210-MD",
    exp: "8 Years",
    docs: ["Board Cert.pdf"],
    status: "In Review",
    time: "40m ago",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWka30KoK367JQLZVMGdVbRloQfwH54LWzQpR8XuUISpovvc4TGsUdWkqMNdlPcyXzkSRDksS1QZnoqTwchBrE3N4k4x4JWlsBEW9ALwqmVe1RzD7PuHa-0nFDQNLjONwtnit_rvvo8vd8xYPDX2jJfm7UpXkHdLjjwZi0Zqqyt5nDCq76QETXKZ61uD-5WlZZAEzemKC4YwrYlf9CjpjxskyMfmhJ8W1I4bApEl04XkOXpFYIHWxz15F8__4KBdlm8msNwiWdvZc"
  },
  {
    id: "REQ-2942",
    name: "Dr. John Doe",
    email: "j.doe@example.com",
    role: "General Practice",
    license: "TX-11029-GP",
    exp: "5 Years",
    docs: ["Diploma.pdf"],
    missingDocs: true,
    status: "Needs Info",
    time: "1 day ago",
    avatar: null,
    initials: "JD"
  },
  {
    id: "REQ-2938",
    name: "Dr. Emily Chen",
    email: "e.chen@example.com",
    role: "Pediatrician",
    license: "MA-55291-MD",
    exp: "15 Years",
    docs: ["3 Documents"],
    status: "Verified",
    time: "2 days ago",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdRB0fWy8d3kiKhg17-Cg5W8KXvVqNBLxLTlAYmeOw4hDvzBgIlkmPvtblsDqqj5YVFetFqH-Zk7wsFZzrQgj34CiNH8u5WSIQ55W_5ZKqmDBM2qvOea_VJxlq0mPYhN5WhZ64yxP6tNBfbkOwvluO2n_Bv19pC1CxJRCsZ9cFr4VC1Cg4EdjlkWJstHVPGSiQYtACglNF5Eh0IFa6ek9vQ70Pb34T_HEh4NbUm4UVC7ZLjejoWWj9C2a0DThGITI-qIzp__BqN0E"
  },
  {
    id: "REQ-2930",
    name: "Mark Wilson",
    email: "m.wilson@example.com",
    role: "Therapist",
    license: "--",
    exp: "2 Years",
    docs: ["Invalid Docs"],
    status: "Rejected",
    time: "3 days ago",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWka30KoK367JQLZVMGdVbRloQfwH54LWzQpR8XuUISpovvc4TGsUdWkqMNdlPcyXzkSRDksS1QZnoqTwchBrE3N4k4x4JWlsBEW9ALwqmVe1RzD7PuHa-0nFDQNLjONwtnit_rvvo8vd8xYPDX2jJfm7UpXkHdLjjwZi0Zqqyt5nDCq76QETXKZ61uD-5WlZZAEzemKC4YwrYlf9CjpjxskyMfmhJ8W1I4bApEl04XkOXpFYIHWxz15F8__4KBdlm8msNwiWdvZc"
  }
];

export default function AdminVerification() {

  // Helper: Status Badge Styles
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <span className="size-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            Pending Review
          </span>
        );
      case 'In Review':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
            <span className="material-symbols-outlined text-[12px]">search</span>
            In Review
          </span>
        );
      case 'Needs Info':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800">
            <span className="material-symbols-outlined text-[12px]">info</span>
            Needs Info
          </span>
        );
      case 'Verified':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border border-green-200 dark:border-green-800">
            <span className="material-symbols-outlined text-[12px]">check</span>
            Verified
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border border-red-200 dark:border-red-800">
            <span className="material-symbols-outlined text-[12px]">close</span>
            Rejected
          </span>
        );
      default: return null;
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-med-dark dark:text-white font-display transition-colors duration-200 min-h-screen w-full flex flex-col">
      
      {/* Mobile Header (Optional placeholder if needed on mobile) */}
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

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col w-full  h-100px-4 lg:px-8 py-8 gap-6 overflow-y-auto">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl font-bold text-med-dark dark:text-white">Doctor Verification</h1>
            <p className="text-med-text-secondary dark:text-gray-400 text-sm mt-1">Review and approve medical professional credentials to maintain platform integrity.</p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#253636] border border-[#e5e7eb] dark:border-[#2a3838] rounded-lg">
              <span className="material-symbols-outlined text-med-text-secondary text-[20px]">filter_list</span>
              <select className="bg-transparent border-none text-sm font-medium text-med-dark dark:text-white p-0 focus:ring-0 cursor-pointer">
                <option>All Statuses</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-med-dark dark:bg-primary text-white dark:text-med-dark rounded-lg text-sm font-medium hover:bg-med-dark/90 transition-colors">
              <span className="material-symbols-outlined text-[20px]">history</span>
              Audit Log
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1  md:grid-cols-3 gap-6 mb-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-[#1a2c2c] p-5 rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm flex items-center gap-4">
              <div className={`p-3 rounded-xl 
                ${stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : ''}
                ${stat.color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : ''}
                ${stat.color === 'red' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : ''}
              `}>
                <span className="material-symbols-outlined text-[28px]">{stat.icon}</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-med-text-secondary uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl font-bold text-med-dark dark:text-white">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Table */}
        <div className="bg-white dark:bg-[#1a2c2c] h-[600px] rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm flex flex-col">
          
          {/* Table Header Controls */}
          <div className="p-5 border-b border-[#e5e7eb] dark:border-[#2a3838] flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <h3 className="font-bold text-med-dark dark:text-white text-lg">Verification Requests</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-med-text-secondary">Sort by:</span>
              <select className="bg-med-gray dark:bg-[#253636] border-none rounded-lg text-sm text-med-dark dark:text-white py-1.5 pl-3 pr-8 focus:ring-1 focus:ring-primary cursor-pointer">
                <option>Date Submitted (Newest)</option>
                <option>Date Submitted (Oldest)</option>
                <option>Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left text-sm">
              <thead className="bg-med-gray dark:bg-[#253636] text-med-text-secondary dark:text-gray-400 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap">Doctor Profile</th>
                  <th className="px-6 py-4 whitespace-nowrap">Credentials</th>
                  <th className="px-6 py-4 whitespace-nowrap">Documents</th>
                  <th className="px-6 py-4 whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e7eb] dark:divide-[#2a3838]">
                {REQUESTS.map((req) => (
                  <tr key={req.id} className={`hover:bg-med-gray/30 dark:hover:bg-[#253636]/50 transition-colors ${req.status === 'Pending' ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''} ${req.status === 'Verified' || req.status === 'Rejected' ? 'opacity-75' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {req.avatar ? (
                          <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 shadow-sm" style={{ backgroundImage: `url(${req.avatar})` }}></div>
                        ) : (
                          <div className="bg-gray-200 dark:bg-gray-700 rounded-full size-10 flex items-center justify-center font-bold text-gray-500">{req.initials}</div>
                        )}
                        <div>
                          <div className="font-semibold text-med-dark dark:text-white">{req.name}</div>
                          <div className="text-xs text-med-text-secondary">{req.email}</div>
                          <div className="text-xs text-med-text-secondary mt-0.5">ID: #{req.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-med-dark dark:text-gray-300">{req.role}</div>
                      <div className="text-xs font-mono text-med-text-secondary bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded inline-block mt-1">{req.license}</div>
                      <div className="text-xs text-med-text-secondary mt-1">Exp: {req.exp}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        {req.missingDocs && (
                          <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
                            <span className="material-symbols-outlined text-[16px]">warning</span>
                            <span>Missing ID Scan</span>
                          </div>
                        )}
                        {req.docs.map((doc, i) => (
                          <div key={i} className={`flex items-center gap-2 text-xs ${req.status === 'Rejected' ? 'text-gray-500' : 'text-blue-600 dark:text-blue-400 hover:underline cursor-pointer'}`}>
                            <span className="material-symbols-outlined text-[16px]">{doc === 'Invalid Docs' ? 'folder_off' : 'description'}</span>
                            <span>{doc}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(req.status)}
                      <div className="text-[10px] text-med-text-secondary mt-1 ml-1">{req.status === 'Pending' ? 'Submitted' : req.status === 'Verified' ? 'Approved' : 'Updated'}: {req.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {req.status === 'Pending' || req.status === 'In Review' ? (
                          <>
                            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 transition-colors text-xs font-bold" title="Approve">
                              <span className="material-symbols-outlined text-[18px]">check_circle</span>
                              Approve
                            </button>
                            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 hover:bg-red-200 transition-colors text-xs font-bold" title="Reject">
                              <span className="material-symbols-outlined text-[18px]">cancel</span>
                              Reject
                            </button>
                          </>
                        ) : req.status === 'Needs Info' ? (
                          <>
                            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-[#1a2c2c] border border-gray-200 dark:border-gray-700 text-med-dark dark:text-white hover:bg-gray-50 dark:hover:bg-[#253636] transition-colors text-xs font-bold shadow-sm">
                              <span className="material-symbols-outlined text-[18px]">mail</span>
                              Resend
                            </button>
                            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-[#1a2c2c] border border-gray-200 dark:border-gray-700 text-med-dark dark:text-white hover:bg-gray-50 dark:hover:bg-[#253636] transition-colors text-xs font-bold shadow-sm">
                              <span className="material-symbols-outlined text-[18px]">visibility</span>
                              Details
                            </button>
                          </>
                        ) : (
                          <button className="text-med-text-secondary hover:text-primary transition-colors text-xs font-bold" title="View Details">
                            {req.status === 'Rejected' ? 'View Reason' : 'View Profile'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-[#e5e7eb] dark:border-[#2a3838] bg-med-gray/30 dark:bg-[#1a2c2c] flex items-center justify-between">
            <span className="text-sm text-med-text-secondary">Showing 1 to 5 of 14 entries</span>
            <div className="flex items-center gap-2">
              <button className="size-8 flex items-center justify-center rounded-lg border border-[#e5e7eb] dark:border-[#2a3838] bg-white dark:bg-[#253636] text-med-text-secondary hover:bg-med-gray dark:hover:bg-[#1a2c2c] disabled:opacity-50" disabled>
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              </button>
              <button className="size-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm shadow-sm">1</button>
              <button className="size-8 flex items-center justify-center rounded-lg border border-[#e5e7eb] dark:border-[#2a3838] bg-white dark:bg-[#253636] text-med-text-secondary hover:bg-med-gray dark:hover:bg-[#1a2c2c] font-bold text-sm">2</button>
              <button className="size-8 flex items-center justify-center rounded-lg border border-[#e5e7eb] dark:border-[#2a3838] bg-white dark:bg-[#253636] text-med-text-secondary hover:bg-med-gray dark:hover:bg-[#1a2c2c]">
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-6 flex items-start gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-800/40 rounded-full text-blue-600 dark:text-blue-300 shrink-0">
            <span className="material-symbols-outlined">security</span>
          </div>
          <div>
            <h4 className="font-bold text-med-dark dark:text-white text-lg">Verification Guidelines</h4>
            <p className="text-sm text-med-text-secondary dark:text-gray-400 mt-1 max-w-3xl">
              Ensure all submitted documents match the doctor's profile information. Verify medical license numbers against the national database. For international applicants, follow the specific cross-border verification protocol outlined in the admin handbook.
            </p>
            <button className="mt-3 text-sm font-bold text-primary hover:text-primary-dark hover:underline">Read Admin Handbook</button>
          </div>
        </div>

      </main>
    </div>
  );
}