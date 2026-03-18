import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DiscussionCard from '../components/DiscussionCard';
import CategoryCarousel from '../components/CategoryCarousel';
import { getPost } from '../../server/allApi';
import { formatDistanceToNow } from 'date-fns';

const getCategoryStyle = (category) => {
  const styles = {
    'Mental Health': { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-800' },
    'Nutrition': { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-300', border: 'border-green-200 dark:border-green-800' },
    'Chronic Care': { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-800' },
    'General': { bg: 'bg-teal-50 dark:bg-teal-900/20', text: 'text-teal-600 dark:text-teal-300', border: 'border-teal-200 dark:border-teal-800' },
    'Heart Health': { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-300', border: 'border-red-200 dark:border-red-800' },
    'Respiratory': { bg: 'bg-cyan-50 dark:bg-cyan-900/20', text: 'text-cyan-600 dark:text-cyan-300', border: 'border-cyan-200 dark:border-cyan-800' },
    'Diabetes': { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-800' },
  };
  return styles[category] || styles['General'];
};

export default function CommunityPage() {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Latest');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    try {
      setLoading(true);
      const response = await getPost();
      if (response.data?.modifiedPosts) {
        setDiscussions(response.data.modifiedPosts);
      }
    } catch (error) {
      console.error("Error fetching discussions:", error);
    } finally {
      setLoading(false);
    }
  };

  const transformPostToDiscussion = (post) => {
    const category = post.symptomType || 'General';
    const categoryStyle = getCategoryStyle(category);
    
    return {
      id: post._id,
      userName: post.isAnonymous ? 'Anonymous' : (post.author?.username || 'Anonymous'),
      userImage: post.author?.profilePicture || null,
      isAnonymous: post.isAnonymous,
      timeAgo: post.createdAt ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) : 'Recently',
      category: category,
      categoryColor: `${categoryStyle.bg} ${categoryStyle.text}`,
      categoryBorder: categoryStyle.border,
      title: post.title,
      content: post.content,
      tags: post.tags?.map(tag => `#${tag}`) || [],
      stats: { views: post.views || 0, replies: post.commentCount || 0, likes: post.likesCount || 0 },
    };
  };

  const filteredDiscussions = discussions
    .map(transformPostToDiscussion)
    .filter(discussion => {
      const matchesSearch = searchQuery === '' || 
        discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        discussion.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeFilter === 'Popular') {
        return matchesSearch && discussion.stats.replies > 0;
      } else if (activeFilter === 'Unanswered') {
        return matchesSearch && discussion.stats.replies === 0;
      }
      return matchesSearch;
    })
    .sort((a, b) => {
      if (activeFilter === 'Popular') {
        return b.stats.replies - a.stats.replies;
      }
      return new Date(b.timeAgo) - new Date(a.timeAgo);
    });

  return (
    <div className="flex justify-center items-start gap-6 w-full px-4 lg:px-8 py-6">
      <main className="flex flex-col w-full max-w-[800px] gap-6">
        
        {/* Hero / Header */}
        <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-teal-50 dark:to-[#1f3333] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-primary/20">
          <div>
            <h1 className="text-2xl font-bold text-med-dark dark:text-white mb-2">Community Hub</h1>
            <p className="text-med-text-secondary dark:text-gray-300 max-w-md">Connect with others, share your journey, and find support in our verified community discussions.</p>
          </div>
          <button className="shrink-0 bg-med-dark dark:bg-white text-white dark:text-med-dark px-5 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            Start Discussion
          </button>
        </div>

        {/* Browse Categories Grid */}
        <CategoryCarousel/>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-med-text-secondary dark:text-gray-400">search</span>
            <input 
              className="w-full bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary/50 focus:border-primary/50 text-med-dark dark:text-white" 
              placeholder="Search specific topics in community..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {['Latest', 'Popular', 'Unanswered'].map((filter) => (
               <button 
                 key={filter}
                 onClick={() => setActiveFilter(filter)}
                 className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium shadow-sm whitespace-nowrap transition-colors
                   ${activeFilter === filter 
                     ? "bg-med-dark dark:bg-white text-white dark:text-med-dark" 
                     : "bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] text-med-dark dark:text-gray-300 hover:bg-med-gray dark:hover:bg-[#253636]"}`}
               >
                 {filter}
               </button>
            ))}
          </div>
        </div>

        {/* Discussion List */}
        <div className="flex flex-col gap-4">
          
          {/* Pinned Discussion */}
          <article className="bg-primary/5 dark:bg-[#13ecec]/5 rounded-2xl p-5 border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-1">
                <span className="material-symbols-outlined text-primary fill">campaign</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-med-dark dark:text-white text-base mb-1">Weekly Community Roundup: New Doctor Q&A Schedule</h3>
                  <span className="bg-primary/20 text-teal-800 dark:text-primary text-[10px] uppercase font-bold px-2 py-0.5 rounded">Pinned</span>
                </div>
                <p className="text-med-text-secondary dark:text-gray-300 text-sm mb-3">
                  We're excited to announce a new series of live Q&A sessions with verified specialists. Check out the schedule for the upcoming week and submit your questions early.
                </p>
                <div className="flex items-center gap-4 text-xs text-med-text-secondary dark:text-gray-400">
                  <span className="font-medium text-primary">By MedPulse Team</span>
                  <span>•</span>
                  <span>Updated 2 hours ago</span>
                </div>
              </div>
            </div>
          </article>

          {/* Standard Discussions */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse bg-white dark:bg-[#1a2c2c] h-48 rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838]"></div>
              ))}
            </div>
          ) : filteredDiscussions.length > 0 ? (
            filteredDiscussions.map((item) => (
              <DiscussionCard key={item.id} discussion={item} />
            ))
          ) : (
            <div className="text-center py-12 bg-white dark:bg-[#1a2c2c] rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838]">
              <span className="material-symbols-outlined text-5xl text-gray-300 dark:text-gray-600 mb-4">search_off</span>
              <h3 className="text-lg font-bold text-med-dark dark:text-white mb-2">No discussions found</h3>
              <p className="text-med-text-secondary dark:text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Load More */}
        {filteredDiscussions.length > 0 && (
          <div className="flex justify-center py-4">
            <button className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1">
               Load More Discussions
               <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
          </div>
        )}
      </main>

      {/* RIGHT COLUMN: SIDEBAR */}
      <div className="hidden xl:block w-80 shrink-0 sticky top-4">
         <aside className="flex flex-col gap-6 w-full">
            
            {/* Community Events */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-med-dark dark:text-white">Upcoming Events</h3>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-3 items-start p-3 bg-white dark:bg-[#1a2c2c] rounded-xl border border-[#e5e7eb] dark:border-[#2a3838]">
                  <div className="bg-primary/10 text-teal-800 dark:text-primary rounded-lg h-12 w-12 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold uppercase">{new Date().toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-lg font-bold leading-none">{new Date().getDate() + 7}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-med-dark dark:text-white leading-tight mb-1">Heart Health Webinar</h4>
                    <p className="text-xs text-med-text-secondary dark:text-gray-400 mb-2">Live with our specialist</p>
                    <button className="text-[10px] font-bold text-primary uppercase border border-primary/30 px-2 py-1 rounded hover:bg-primary/10 transition-colors">Register</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Contributors */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-med-dark dark:text-white">Top Contributors</h3>
                <Link to="#" className="text-xs font-semibold text-primary hover:text-primary/80">View All</Link>
              </div>
              <div className="flex flex-col gap-4">
                {loading ? (
                  <div className="space-y-3">
                    {[1, 2].map(i => (
                      <div key={i} className="flex items-center gap-3 animate-pulse">
                        <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 bg-primary/20 flex items-center justify-center text-primary font-bold">
                        <span className="material-symbols-outlined text-primary text-lg">verified</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-semibold text-med-dark dark:text-white">MedPulse Team</span>
                        </div>
                        <p className="text-xs text-med-text-secondary dark:text-gray-400">Community Support</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
                        D
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-semibold text-med-dark dark:text-white">Verified Doctors</span>
                        </div>
                        <p className="text-xs text-med-text-secondary dark:text-gray-400">Medical Experts</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-med-gray dark:bg-[#1f3333] rounded-xl p-4">
              <h5 className="text-xs font-bold text-med-dark dark:text-white mb-2 uppercase tracking-wide">Guidelines</h5>
              <ul className="text-xs text-med-text-secondary dark:text-gray-300 space-y-2 list-disc pl-4">
                <li>Be respectful and kind to others.</li>
                <li>No medical advice; share experiences only.</li>
                <li>Report inappropriate content.</li>
                <li>Respect privacy and anonymity.</li>
              </ul>
            </div>

         </aside>
      </div>
    </div>
  );
}
