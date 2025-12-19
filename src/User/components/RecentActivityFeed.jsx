import React, { useState } from 'react';
import PostCard from './PostCard';
import SavedItemCard from './SavedItemCard';

// --- MOCK DATA SPECIFIC TO ACTIVITY ---
const ACTIVITY_DATA = {
  posts: [
    {
      id: 1,
      userName: "Sarah Jenkins (You)",
      userImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOLCviMOpASErCHhTQmvY6k34iYjPPoNBtTcXTevn6qvSVudTEwgQtFPiNSM2fdDYS95FtRj0VMuJZ2MhrCv7Je5qakn_Yo9VwsJIEKLLds3-whsOamhqUK47VWjCFw35W61E_-AWBjonf9A9fdwikxOiALd27cPTkB7PAhHRgG7d4ltlHxF__DTRS_15qNAHrVAhOQk3p2mBzmH7Uum18DB5Z6Ck4VDoIjknvWcW0y9wVdlHYF1a23BsjBnqQBRNl__52tiym3xU",
      timeAgo: "2 days ago",
      title: "Recurring migraines in the morning",
      content: "I've been waking up with a sharp pain on the left side of my head for the past few days...",
      severity: "Medium",
      tags: ["#Migraine"],
      helpfulCount: 24,
      commentCount: 8,
      isAnonymous: false,
    }
  ],
  replies: [
    {
      id: 10,
      userName: "Sarah Jenkins (You)",
      userImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOLCviMOpASErCHhTQmvY6k34iYjPPoNBtTcXTevn6qvSVudTEwgQtFPiNSM2fdDYS95FtRj0VMuJZ2MhrCv7Je5qakn_Yo9VwsJIEKLLds3-whsOamhqUK47VWjCFw35W61E_-AWBjonf9A9fdwikxOiALd27cPTkB7PAhHRgG7d4ltlHxF__DTRS_15qNAHrVAhOQk3p2mBzmH7Uum18DB5Z6Ck4VDoIjknvWcW0y9wVdlHYF1a23BsjBnqQBRNl__52tiym3xU",
      timeAgo: "1 day ago",
      title: "Reply to: Best tea for soothing a sore throat?",
      content: "I personally find that adding a slice of fresh ginger makes a huge difference compared to just honey alone.",
      helpfulCount: 12,
      commentCount: 0,
      isAnonymous: false,
      // Optional: Add a visual indicator for replies in PostCard if needed
    }
  ],
  saved: [
    {
      id: 101,
      type: "article",
      savedAt: "Saved 1 week ago",
      title: "Understanding Seasonal Allergies",
      description: "Seasonal allergies can significantly impact daily life...",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3RBunYcULCkNQ2vVphR4aEMqrqMVsMIVJxBi_RuFyxymqFYGTX7wICAFwOM9kbJLTF6LANbVXAXFSc-n6TbjIMQO9Ar7Y2fwZsEI9UfuCJSPt4p8wNezh52yVUyMyBHHjTJqe4mlZwVqWQh5Oh1BaeaO-Zu7nEbTBYiRruWL8lVBoQcnV0Cuf45qAewwsNCWRgTERkDn_BCtVlnhATiupofNCtAsMDLKJDiNmMSnTrm4wL_fdDqMlDQm7HiqEmYyqyNhtu7pFvXc",
      author: { name: "MedPulse Team", isVerified: true },
      stats: { responses: 12 }
    }
  ]
};

const RecentActivityFeed = () => {
  const [activeTab, setActiveTab] = useState("posts"); // 'posts' | 'replies' | 'saved'

  return (
    <div className="flex flex-col gap-4">
      {/* --- Header & Tabs --- */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-med-dark dark:text-white text-lg">Recent Activity</h3>
        
        <div className="flex bg-med-gray dark:bg-[#253636] p-1 rounded-xl">
          {['posts', 'replies', 'saved'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all capitalize 
                ${activeTab === tab 
                  ? 'bg-white dark:bg-[#1a2c2c] shadow-sm text-med-dark dark:text-white' 
                  : 'text-med-text-secondary dark:text-gray-400 hover:text-med-dark'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      {/* --- Dynamic List Rendering --- */}
      <div className="flex flex-col gap-6">
        {activeTab === 'saved' ? (
          // Render Saved Cards
          ACTIVITY_DATA.saved.map(item => (
            <SavedItemCard key={item.id} item={item} onRemove={()=>{}} />
          ))
        ) : (
          // Render Post Cards (for Posts and Replies)
          ACTIVITY_DATA[activeTab].map(post => (
            <PostCard key={post.id} post={post} isOwnPost={true} />
          ))
        )}
        
        {/* Empty State Check */}
        {ACTIVITY_DATA[activeTab].length === 0 && (
            <div className="text-center py-8 text-gray-500 text-sm">
                No {activeTab} yet.
            </div>
        )}
      </div>

      {/* --- View All Link --- */}
      <div className="flex justify-center py-4">
        <button className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
          View All {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </button>
      </div>
    </div>
  );
};

export default RecentActivityFeed;