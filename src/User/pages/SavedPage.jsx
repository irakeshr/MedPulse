// src/pages/SavedPage.jsx
import React, { useState } from 'react';
import SavedItemCard from '../components/SavedItemCard';

export default function SavedPage() {
  // --- MOCK DATA ---
  const SAVED_ITEMS_DATA = [
    {
      id: 1,
      type: "post", // 'post' | 'article' | 'doctor'
      savedAt: "Saved 2 days ago",
      title: "Recurring migraines in the morning",
      description: "I've been waking up with a sharp pain on the left side of my head for the past few days...",
      author: { name: "Sarah J.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-_2UAAMg1UV2tqMyib86h_ZrmLXiDC6WkPLsmouH83WqtQYg8cUzhxadVz39pPEIUWoNlH-6qr_bn7rnnglyqL6gd0dLAvww3oEdDInQYW8LEVYNfb5c-_5rWL5XB62KTEnNugLfmYR5oA-JBMEPXsmETagNQwEXsbFqIoPsSaOUFQUxO-JsIpcbAzG47GLsWt-IrSQlXhZ7Ddda1z9SDAIRHvbF7cPXrCHQ4tPT0pgXtuoQjz01jiP_2jcj323LZDQvrusZ7Abg" },
      stats: { responses: 8 },
    },
    {
      id: 2,
      type: "article",
      savedAt: "Saved 1 week ago",
      title: "Understanding Seasonal Allergies: Triggers & Management",
      description: "Seasonal allergies can significantly impact daily life. Learn about common triggers...",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3RBunYcULCkNQ2vVphR4aEMqrqMVsMIVJxBi_RuFyxymqFYGTX7wICAFwOM9kbJLTF6LANbVXAXFSc-n6TbjIMQO9Ar7Y2fwZsEI9UfuCJSPt4p8wNezh52yVUyMyBHHjTJqe4mlZwVqWQh5Oh1BaeaO-Zu7nEbTBYiRruWL8lVBoQcnV0Cuf45qAewwsNCWRgTERkDn_BCtVlnhATiupofNCtAsMDLKJDiNmMSnTrm4wL_fdDqMlDQm7HiqEmYyqyNhtu7pFvXc",
      author: { name: "MedPulse Editorial Team", isVerified: true },
      readTime: "5 min read",
    },
    {
      id: 3,
      type: "doctor",
      name: "Dr. Sarah Lee",
      specialty: "Dermatologist • 12 Years Experience",
      description: "Specializes in treating eczema, acne, and skin cancer screenings.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdRB0fWy8d3kiKhg17-Cg5W8KXvVqNBLxLTlAYmeOw4hDvzBgIlkmPvtblsDqqj5YVFetFqH-Zk7wsFZzrQgj34CiNH8u5WSIQ55W_5ZKqmDBM2qvOea_VJxlq0mPYhN5WhZ64yxP6tNBfbkOwvluO2n_Bv19pC1CxJRCsZ9cFr4VC1Cg4EdjlkWJstHVPGSiQYtACglNF5Eh0IFa6ek9vQ70Pb34T_HEh4NbUm4UVC7ZLjejoWWj9C2a0DThGITI-qIzp__BqN0E",
      isVerified: true,
    },
  ];

  const [activeFilter, setActiveFilter] = useState('All Items');
  const [items, setItems] = useState(SAVED_ITEMS_DATA);

  // Simple filter logic
  const filteredItems = items.filter(item => {
    if (activeFilter === 'All Items') return true;
    if (activeFilter === 'Symptom Posts') return item.type === 'post';
    if (activeFilter === 'Articles') return item.type === 'article';
    if (activeFilter === 'Doctor Profiles') return item.type === 'doctor';
    return true;
  });

  const handleRemove = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    // MAIN LAYOUT CONTAINER: Flex Grid (Left Content + Right Sidebar)
    <div className="flex justify-center items-start gap-6 w-full px-4 lg:px-8 py-8">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: MAIN CONTENT (Saved Items)   */}
      {/* ========================================= */}
      <main className="flex-1 flex flex-col w-full max-w-[800px] gap-6">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Saved Items</h1>
              <p className="text-sm text-med-text-secondary mt-1">Manage your bookmarked posts, articles, and profiles.</p>
            </div>
            <div className="flex bg-white dark:bg-[#1a2c2c] p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <button className="p-2 rounded-lg bg-med-gray dark:bg-[#253636] text-med-dark dark:text-white shadow-sm transition-all" title="List View">
                <span className="material-symbols-outlined text-[20px]">view_list</span>
              </button>
              <button className="p-2 rounded-lg text-med-text-secondary hover:text-primary hover:bg-slate-50 dark:hover:bg-[#253636] transition-colors" title="Card View">
                <span className="material-symbols-outlined text-[20px]">grid_view</span>
              </button>
            </div>
          </div>

          {/* --- FILTERS --- */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
            {['All Items', 'Symptom Posts', 'Articles', 'Doctor Profiles'].map((filter) => (
               <button 
                 key={filter}
                 onClick={() => setActiveFilter(filter)}
                 className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all
                 ${activeFilter === filter 
                   ? "bg-med-dark dark:bg-white text-white dark:text-med-dark shadow-md active:scale-95" 
                   : "bg-white dark:bg-[#1a2c2c] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-[#253636] hover:border-slate-300 shadow-sm"}`}
               >
                 {filter}
               </button>
            ))}
          </div>
        </div>

        {/* --- LIST --- */}
        <div className="flex flex-col gap-4">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <SavedItemCard 
                key={item.id} 
                item={item} 
                onRemove={handleRemove} 
              />
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">No saved items found.</div>
          )}
        </div>

        {/* --- LOAD MORE --- */}
        <div className="flex justify-center mt-6">
          <button className="px-6 py-2.5 text-sm font-medium text-slate-500 dark:text-gray-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-[#253636] rounded-xl transition-all flex items-center gap-1 border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
            Load More Saved Items
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
        </div>

      </main>

      {/* ========================================= */}
      {/* RIGHT COLUMN: SIDEBAR                     */}
      {/* ========================================= */}
      <div className="hidden xl:block w-80 shrink-0 sticky top-4">
         <SavedRightSidebar />
      </div>

    </div>
  );
}

// --- SUB-COMPONENT: RIGHT SIDEBAR ---
const SavedRightSidebar = () => {
  return (
    <aside className="flex flex-col gap-6">
      
      {/* Organize Card */}
      <div className="bg-gradient-to-br from-teal-50 to-white dark:from-teal-900/20 dark:to-[#1a2c2c] rounded-xl p-5 border border-teal-100 dark:border-teal-900/30 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-primary/10 rounded-full blur-xl"></div>
        <div className="flex items-start gap-3 relative z-10">
          <div className="bg-white dark:bg-[#253636] p-2 rounded-lg shadow-sm border border-teal-50 dark:border-transparent shrink-0">
            <span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span>
          </div>
          <div>
            <h5 className="text-sm font-bold text-slate-800 dark:text-teal-300 mb-1">Organize Your Health</h5>
            <p className="text-xs text-slate-600 dark:text-teal-200 leading-snug">
              You can categorize saved items into collections to keep track of related symptoms easily.
            </p>
          </div>
        </div>
      </div>

      {/* Recently Viewed */}
      <div>
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="font-bold text-slate-800 dark:text-white text-sm">Recently Viewed</h3>
          <a className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors" href="#">History</a>
        </div>
        <div className="flex flex-col gap-3">
          
          {/* Recent Item 1 */}
          <div className="group flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#1a2c2c] border border-slate-100 dark:border-slate-700 hover:border-primary/30 hover:shadow-soft cursor-pointer transition-all">
            <div className="bg-center bg-no-repeat bg-cover rounded-lg size-10 shrink-0 bg-gray-100" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAsq-xwLqoWyGo2ge5WIamgs9HY4_eG5Yz84kZ1m8xfOSflCAK1RSmdnh5OAouN5UV-qbWNV_OKeTdGOzyIIQocs57nwkIAXS8UvWXVdsFCW0ZCEfa6jqbxJq8n8KVM9OjqWsEmt8EyHctip7P66noK3d78kU0vCPFxnQE-MiqgOmuEsLb_6Gad67wi3DosEu3K_MkzU8JxV6zY_daldy_QXBRLx2BJYwBDa_5oqWpTP3O8lON64yx-yXlhrFEbmLDE630RPeBif80')" }}></div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-slate-800 dark:text-white line-clamp-1 block group-hover:text-primary transition-colors">New Research on Vitamin D</span>
              <span className="text-[10px] text-slate-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                <span className="size-1.5 rounded-full bg-sky-400"></span> Article • 10m ago
              </span>
            </div>
          </div>

          {/* Recent Item 2 */}
          <div className="group flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#1a2c2c] border border-slate-100 dark:border-slate-700 hover:border-primary/30 hover:shadow-soft cursor-pointer transition-all">
            <div className="bg-center bg-no-repeat bg-cover rounded-lg size-10 shrink-0 border border-slate-200" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBWka30KoK367JQLZVMGdVbRloQfwH54LWzQpR8XuUISpovvc4TGsUdWkqMNdlPcyXzkSRDksS1QZnoqTwchBrE3N4k4x4JWlsBEW9ALwqmVe1RzD7PuHa-0nFDQNLjONwtnit_rvvo8vd8xYPDX2jJfm7UpXkHdLjjwZi0Zqqyt5nDCq76QETXKZ61uD-5WlZZAEzemKC4YwrYlf9CjpjxskyMfmhJ8W1I4bApEl04XkOXpFYIHWxz15F8__4KBdlm8msNwiWdvZc')" }}></div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-slate-800 dark:text-white line-clamp-1 block group-hover:text-primary transition-colors">Dr. A. Patel</span>
              <span className="text-[10px] text-slate-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                <span className="size-1.5 rounded-full bg-emerald-400"></span> Profile • 1h ago
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};