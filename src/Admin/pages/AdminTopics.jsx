import React from 'react';

// --- MOCK DATA ---
const STATS = [
  { label: "Total Active Topics", value: "3,240", icon: "tag", color: "teal" },
  { label: "Pending Review", value: "12", icon: "pending", color: "orange" },
  { label: "Trending Today", value: "8", icon: "trending_up", color: "primary" }
];

const TOPICS = [
  {
    id: 1,
    name: "Migraine",
    category: "Condition",
    categoryColor: "blue",
    posts: "12,402 posts",
    status: "Active",
    updated: "Oct 24, 2023",
    trending: true
  },
  {
    id: 2,
    name: "Ibuprofen",
    category: "Medication",
    categoryColor: "purple",
    posts: "8,110 posts",
    status: "Active",
    updated: "Sep 12, 2023",
    trending: false
  },
  {
    id: 3,
    name: "CovidVariant_XBB",
    category: "Uncategorized",
    categoryColor: "yellow",
    posts: "45 posts",
    status: "Pending Review",
    updated: "2 hours ago",
    trending: false,
    needsReview: true
  },
  {
    id: 4,
    name: "Insomnia",
    category: "Symptom",
    categoryColor: "red",
    posts: "4,230 posts",
    status: "Active",
    updated: "Nov 01, 2023",
    trending: false
  },
  {
    id: 5,
    name: "OutdatedTreatment",
    category: "Procedure",
    categoryColor: "gray",
    posts: "12 posts",
    status: "Disabled",
    updated: "Jan 10, 2022",
    trending: false,
    disabled: true
  }
];

export default function AdminTopics() {

  // Helper: Get Status Badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 border border-green-200 dark:border-green-800">
            <span className="size-1.5 rounded-full bg-green-500"></span>
            Active
          </span>
        );
      case 'Pending Review':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
            <span className="size-1.5 rounded-full bg-orange-500 animate-pulse"></span>
            Pending Review
          </span>
        );
      case 'Disabled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
            <span className="size-1.5 rounded-full bg-gray-400"></span>
            Disabled
          </span>
        );
      default: return null;
    }
  };

  // Helper: Get Category Color Class
  const getCategoryColor = (color) => {
    switch (color) {
      case 'blue': return "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300";
      case 'purple': return "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300";
      case 'yellow': return "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300";
      case 'red': return "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300";
      default: return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-med-dark dark:text-white font-display transition-colors duration-200 h-screen w-full flex flex-col">
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col w-full px-4 lg:px-8 py-8 gap-8 overflow-y-auto scrollbar-hide">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-med-dark dark:text-white">Health Topics Management</h1>
            <p className="text-med-text-secondary dark:text-gray-400 text-sm mt-1">Manage content tags, medical categories, and trending subjects.</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-med-dark dark:bg-primary text-white dark:text-med-dark rounded-xl text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            Create New Topic
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 scrollbar-hide ">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-[#1a2c2c] p-5 rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm flex items-center gap-4 ">
              <div className={`p-3 rounded-xl 
                ${stat.color === 'teal' ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' : ''}
                ${stat.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' : ''}
                ${stat.color === 'primary' ? 'bg-primary/10 text-primary-dark' : ''}
              `}>
                <span className={`material-symbols-outlined text-[28px] ${stat.color === 'primary' ? 'fill' : ''}`}>{stat.icon}</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-med-dark dark:text-white">{stat.value}</h3>
                <p className="text-xs font-medium text-med-text-secondary uppercase tracking-wide">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Topics Table Container */}
        <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm flex flex-col flex-1 min-h-[500px]">
          
          {/* Table Toolbar */}
          <div className="p-5 border-b border-[#e5e7eb] dark:border-[#2a3838] flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-med-text-secondary text-[20px]">search</span>
                <input className="w-full pl-10 pr-4 py-2 bg-med-gray dark:bg-[#253636] border-none rounded-lg text-sm text-med-dark dark:text-white focus:ring-2 focus:ring-primary/50 placeholder:text-med-text-secondary" placeholder="Search topics..." type="text" />
              </div>
              <div className="relative">
                <select className="pl-3 pr-8 py-2 bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] rounded-lg text-sm text-med-dark dark:text-white focus:ring-2 focus:ring-primary/50 cursor-pointer">
                  <option>All Categories</option>
                  <option>Conditions</option>
                  <option>Symptoms</option>
                  <option>Medications</option>
                  <option>Procedures</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <button className="p-2 text-med-text-secondary hover:text-med-dark dark:hover:text-white transition-colors" title="Filter">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
              <button className="p-2 text-med-text-secondary hover:text-med-dark dark:hover:text-white transition-colors" title="Sort">
                <span className="material-symbols-outlined">sort</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto grow scrollbar-hide">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-med-gray/50 dark:bg-[#253636]/50 text-med-text-secondary dark:text-gray-400 text-xs uppercase font-semibold sticky top-0">
                <tr>
                  <th className="px-6 py-4">Topic Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Usage Count</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Last Updated</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e7eb] dark:divide-[#2a3838]">
                {TOPICS.map((topic) => (
                  <tr key={topic.id} className="group hover:bg-med-gray/20 dark:hover:bg-[#253636]/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center justify-center size-8 rounded-lg ${topic.needsReview ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600' : 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'}`}>
                          <span className="font-bold text-xs">#</span>
                        </div>
                        <div>
                          <span className={`font-bold ${topic.disabled ? 'text-gray-400 decoration-slice line-through' : 'text-med-dark dark:text-white'}`}>
                            {topic.name}
                          </span>
                          {topic.trending && (
                            <div className="text-[10px] text-primary font-bold flex items-center gap-1 mt-0.5">
                              <span className="material-symbols-outlined text-[10px]">trending_up</span> Trending
                            </div>
                          )}
                          {topic.needsReview && (
                            <div className="text-[10px] text-orange-500 font-bold flex items-center gap-1 mt-0.5">
                              <span className="material-symbols-outlined text-[10px]">priority_high</span> Review
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${getCategoryColor(topic.categoryColor)}`}>
                        {topic.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-med-dark dark:text-gray-300 font-medium">{topic.posts}</td>
                    <td className="px-6 py-4">
                      {getStatusBadge(topic.status)}
                    </td>
                    <td className="px-6 py-4 text-med-text-secondary text-xs">{topic.updated}</td>
                    <td className="px-6 py-4 text-right">
                      <div className={`flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${topic.needsReview ? 'opacity-100' : ''}`}>
                        {topic.needsReview ? (
                          <>
                            <button className="px-3 py-1 bg-med-dark dark:bg-white text-white dark:text-med-dark text-xs font-bold rounded-lg hover:bg-opacity-90 transition-colors">
                              Approve
                            </button>
                            <button className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                              <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                          </>
                        ) : topic.disabled ? (
                          <>
                            <button className="p-2 rounded-lg text-med-text-secondary hover:bg-med-gray dark:hover:bg-[#253636] hover:text-primary transition-colors">
                              <span className="material-symbols-outlined text-[20px]">restore</span>
                            </button>
                            <button className="p-2 rounded-lg text-med-text-secondary hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors">
                              <span className="material-symbols-outlined text-[20px]">delete_forever</span>
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="p-2 rounded-lg text-med-text-secondary hover:bg-med-gray dark:hover:bg-[#253636] hover:text-primary transition-colors">
                              <span className="material-symbols-outlined text-[20px]">edit</span>
                            </button>
                            <button className="p-2 rounded-lg text-med-text-secondary hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors">
                              <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-5 border-t border-[#e5e7eb] dark:border-[#2a3838] flex items-center justify-between">
            <p className="text-sm text-med-text-secondary">Showing <span className="font-bold text-med-dark dark:text-white">1-5</span> of <span className="font-bold text-med-dark dark:text-white">3,240</span> topics</p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-[#e5e7eb] dark:border-[#2a3838] text-sm font-medium text-med-text-secondary hover:bg-med-gray dark:hover:bg-[#253636] disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-bold shadow-sm">1</button>
              <button className="px-3 py-1.5 rounded-lg border border-[#e5e7eb] dark:border-[#2a3838] text-sm font-medium text-med-text-secondary hover:bg-med-gray dark:hover:bg-[#253636]">2</button>
              <button className="px-3 py-1.5 rounded-lg border border-[#e5e7eb] dark:border-[#2a3838] text-sm font-medium text-med-text-secondary hover:bg-med-gray dark:hover:bg-[#253636]">3</button>
              <span className="px-2 py-1.5 text-med-text-secondary">...</span>
              <button className="px-3 py-1.5 rounded-lg border border-[#e5e7eb] dark:border-[#2a3838] text-sm font-medium text-med-text-secondary hover:bg-med-gray dark:hover:bg-[#253636]">Next</button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}