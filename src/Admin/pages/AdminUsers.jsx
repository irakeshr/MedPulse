import React from 'react';
 

// --- MOCK DATA ---
const USERS = [
  {
    id: 1,
    name: "Dr. Sarah Lee",
    email: "sarah.lee@medpulse.com",
    role: "Doctor",
    status: "Active",
    joined: "Oct 24, 2023",
    lastActive: "2 hours ago",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdRB0fWy8d3kiKhg17-Cg5W8KXvVqNBLxLTlAYmeOw4hDvzBgIlkmPvtblsDqqj5YVFetFqH-Zk7wsFZzrQgj34CiNH8u5WSIQ55W_5ZKqmDBM2qvOea_VJxlq0mPYhN5WhZ64yxP6tNBfbkOwvluO2n_Bv19pC1CxJRCsZ9cFr4VC1Cg4EdjlkWJstHVPGSiQYtACglNF5Eh0IFa6ek9vQ70Pb34T_HEh4NbUm4UVC7ZLjejoWWj9C2a0DThGITI-qIzp__BqN0E",
    initials: "SL"
  },
  {
    id: 2,
    name: "Michael Johnson",
    email: "m.johnson@example.com",
    role: "Patient",
    status: "Active",
    joined: "Nov 12, 2023",
    lastActive: "1 day ago",
    avatar: null,
    initials: "MJ",
    color: "purple"
  },
  {
    id: 3,
    name: "James Wilson",
    email: "j.wilson@mail.com",
    role: "Patient",
    status: "Suspended",
    joined: "Sep 01, 2023",
    lastActive: "2 months ago",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWka30KoK367JQLZVMGdVbRloQfwH54LWzQpR8XuUISpovvc4TGsUdWkqMNdlPcyXzkSRDksS1QZnoqTwchBrE3N4k4x4JWlsBEW9ALwqmVe1RzD7PuHa-0nFDQNLjONwtnit_rvvo8vd8xYPDX2jJfm7UpXkHdLjjwZi0Zqqyt5nDCq76QETXKZ61uD-5WlZZAEzemKC4YwrYlf9CjpjxskyMfmhJ8W1I4bApEl04XkOXpFYIHWxz15F8__4KBdlm8msNwiWdvZc",
    initials: "JW"
  },
  {
    id: 4,
    name: "Anita Kumar",
    email: "anita.k@medpulse.com",
    role: "Moderator",
    status: "Active",
    joined: "Jan 15, 2023",
    lastActive: "10 mins ago",
    avatar: null,
    initials: "AK",
    color: "orange"
  },
  {
    id: 5,
    name: "Robert Taylor",
    email: "r.taylor@clinic.com",
    role: "Doctor",
    status: "Pending",
    joined: "Today, 9:00 AM",
    lastActive: "--",
    avatar: null,
    initials: "RT",
    color: "teal"
  }
];

export default function AdminUsers() {

  // Helper for Status Styles
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active': return {
        badge: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
        dot: "bg-green-600"
      };
      case 'Suspended': return {
        badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
        dot: "bg-red-600"
      };
      case 'Pending': return {
        badge: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
        dot: "bg-yellow-500 animate-pulse"
      };
      default: return { badge: "", dot: "" };
    }
  };

  // Helper for Role Icons
  const getRoleIcon = (role) => {
    switch (role) {
      case 'Doctor': return 'stethoscope';
      case 'Moderator': return 'shield';
      default: return 'person';
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-med-dark dark:text-white font-display overflow-x-hidden transition-colors duration-200 min-h-screen flex flex-col">
 
      <div className="flex flex-1 h-[calc(100vh-72px)] overflow-hidden max-w-[1440px] mx-auto w-full">
     
        <main className="flex-1 flex flex-col w-full px-4 lg:px-8 py-8 gap-8 overflow-y-auto">
          
          {/* Page Title & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-med-dark dark:text-white">User Management</h1>
              <p className="text-med-text-secondary dark:text-gray-400 text-sm mt-1">Manage user accounts, permissions, and view status.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#253636] border border-[#e5e7eb] dark:border-[#2a3838] text-med-dark dark:text-white rounded-lg text-sm font-medium hover:bg-med-gray transition-colors">
                <span className="material-symbols-outlined text-[20px]">download</span>
                Export List
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-med-dark dark:bg-primary text-white dark:text-med-dark rounded-lg text-sm font-medium hover:bg-med-dark/90 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[20px]">person_add</span>
                Add New User
              </button>
            </div>
          </div>

          {/* KPI Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#1a2c2c] p-5 rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-med-text-secondary uppercase tracking-wider">Total Users</p>
                <h3 className="text-2xl font-bold text-med-dark dark:text-white mt-1">24,592</h3>
              </div>
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <span className="material-symbols-outlined">groups</span>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1a2c2c] p-5 rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-med-text-secondary uppercase tracking-wider">New This Month</p>
                <h3 className="text-2xl font-bold text-med-dark dark:text-white mt-1">1,204</h3>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-xl text-green-600">
                <span className="material-symbols-outlined">trending_up</span>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1a2c2c] p-5 rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-med-text-secondary uppercase tracking-wider">Suspended</p>
                <h3 className="text-2xl font-bold text-med-dark dark:text-white mt-1">45</h3>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-xl text-red-600">
                <span className="material-symbols-outlined">block</span>
              </div>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="bg-white dark:bg-[#1a2c2c] p-4 rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-6 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-med-text-secondary">search</span>
                </div>
                <input className="block w-full pl-10 pr-3 py-2.5 border border-[#e5e7eb] dark:border-[#2a3838] rounded-xl leading-5 bg-white dark:bg-[#253636] placeholder-med-text-secondary dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm dark:text-white transition duration-150 ease-in-out" placeholder="Search by name, email, or user ID" type="text" />
              </div>
              <div className="lg:col-span-2">
                <select className="block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 dark:border-[#2a3838] focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-xl bg-white dark:bg-[#253636] text-med-dark dark:text-white">
                  <option>Role: All</option>
                  <option>Patient</option>
                  <option>Doctor</option>
                  <option>Moderator</option>
                  <option>Admin</option>
                </select>
              </div>
              <div className="lg:col-span-2">
                <select className="block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 dark:border-[#2a3838] focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-xl bg-white dark:bg-[#253636] text-med-dark dark:text-white">
                  <option>Status: All</option>
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Suspended</option>
                </select>
              </div>
              <div className="lg:col-span-2">
                <button className="w-full flex justify-center items-center gap-2 px-4 py-2.5 border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm text-sm font-medium rounded-xl text-med-dark dark:text-white bg-white dark:bg-[#253636] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                  More Filters
                </button>
              </div>
            </div>
          </div>

          {/* User Table */}
          <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm flex flex-col overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-med-gray dark:bg-[#253636] text-med-text-secondary dark:text-gray-400 text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Joined Date</th>
                    <th className="px-6 py-4">Last Active</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e7eb] dark:divide-[#2a3838]">
                  {USERS.map((user) => (
                    <tr key={user.id} className={`hover:bg-med-gray/30 dark:hover:bg-[#253636]/50 transition-colors ${user.status === 'Suspended' ? 'bg-red-50/30 dark:bg-red-900/5' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {user.avatar ? (
                            <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 border border-gray-100" style={{ backgroundImage: `url(${user.avatar})` }}></div>
                          ) : (
                            <div className={`size-10 rounded-full flex items-center justify-center font-bold text-sm
                              ${user.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300' : ''}
                              ${user.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300' : ''}
                              ${user.color === 'teal' ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-300' : ''}
                            `}>
                              {user.initials}
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-med-dark dark:text-white">{user.name}</div>
                            <div className="text-xs text-med-text-secondary">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium 
                          ${user.role === 'Moderator' ? 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' : 
                            user.role === 'Doctor' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 
                            'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                          }`}>
                          <span className="material-symbols-outlined text-[14px]">{getRoleIcon(user.role)}</span>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(user.status).badge}`}>
                          <span className={`size-1.5 rounded-full ${getStatusStyle(user.status).dot}`}></span>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-med-text-secondary">{user.joined}</td>
                      <td className="px-6 py-4 text-med-dark dark:text-gray-300">{user.lastActive}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {user.status === 'Pending' ? (
                            <button className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors" title="Approve">
                              <span className="material-symbols-outlined text-[20px]">check_circle</span>
                            </button>
                          ) : (
                            <button className="p-1.5 text-med-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Edit User">
                              <span className="material-symbols-outlined text-[20px]">edit</span>
                            </button>
                          )}
                          
                          {user.status === 'Suspended' ? (
                             <button className="p-1.5 text-red-600 hover:text-red-700 bg-red-50 dark:bg-red-900/20 rounded-lg transition-colors" title="Delete User">
                               <span className="material-symbols-outlined text-[20px]">delete</span>
                             </button>
                          ) : (
                             <button className="p-1.5 text-med-text-secondary hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Suspend User">
                               <span className="material-symbols-outlined text-[20px]">block</span>
                             </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Footer */}
            <div className="px-6 py-4 border-t border-[#e5e7eb] dark:border-[#2a3838] flex items-center justify-between bg-white dark:bg-[#1a2c2c]">
              <p className="text-sm text-med-text-secondary">
                Showing <span className="font-medium text-med-dark dark:text-white">1</span> to <span className="font-medium text-med-dark dark:text-white">5</span> of <span className="font-medium text-med-dark dark:text-white">24,592</span> results
              </p>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg border border-[#e5e7eb] dark:border-[#2a3838] text-med-text-secondary hover:bg-med-gray dark:hover:bg-[#253636] disabled:opacity-50" disabled>
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <button className="px-3 py-1 rounded-lg bg-med-dark dark:bg-primary text-white dark:text-med-dark text-sm font-medium">1</button>
                <button className="px-3 py-1 rounded-lg text-med-text-secondary hover:bg-med-gray dark:hover:bg-[#253636] text-sm font-medium">2</button>
                <button className="px-3 py-1 rounded-lg text-med-text-secondary hover:bg-med-gray dark:hover:bg-[#253636] text-sm font-medium">3</button>
                <span className="text-med-text-secondary">...</span>
                <button className="px-3 py-1 rounded-lg text-med-text-secondary hover:bg-med-gray dark:hover:bg-[#253636] text-sm font-medium">12</button>
                <button className="p-2 rounded-lg border border-[#e5e7eb] dark:border-[#2a3838] text-med-text-secondary hover:bg-med-gray dark:hover:bg-[#253636]">
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}