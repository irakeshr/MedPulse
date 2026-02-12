// src/pages/MyPostsPage.jsx
import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard'; // Adjust path if needed
import CreatePostForm from '../components/CreatePostForm';
import { getMyPostsApi, deletePostApi, editPostApi } from '../../server/allApi';
import { toast } from 'react-toastify';
import CustomToast from '../../components/CustomToast';

export default function MyPostsPage() {
  const [activeFilter, setActiveFilter] = useState("All History");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Edit Modal State
  const [editingPost, setEditingPost] = useState(null);

  // Helper for Consistent Toasts
  const showToast = (title, message, type = 'success') => {
      toast(
          <CustomToast title={title} message={message} type={type} />,
          { bodyClassName: "p-5 m-0", closeButton: false }
      );
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const res = await getMyPostsApi();
      if (res.status === 200) {
        setPosts(res.data.posts);
      } else {
        showToast("Error", "Failed to fetch your posts", "error");
      }
    } catch (error) {
      console.error("Error fetching my posts:", error);
      showToast("Error", "Something went wrong while fetching posts", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    const loadingToast = toast.loading("Deleting post...");
    try {
        const res = await deletePostApi(postId);
        if (res.status === 200) {
            setPosts(prev => prev.filter(p => p._id !== postId));
            toast.update(loadingToast, { render: "Post deleted successfully", type: "success", isLoading: false, autoClose: 3000 });
        } else {
             toast.update(loadingToast, { render: "Failed to delete post", type: "error", isLoading: false, autoClose: 3000 });
        }
    } catch (error) {
        console.error("Error deleting post:", error);
        toast.update(loadingToast, { render: "Error deleting post", type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
  };

  const handleUpdateSubmit = async (formData) => {
     if (!editingPost) return;
     
     // IMPORTANT: Map form data back to API expected format
     const apiData = new FormData();
     apiData.append('title', formData.title);
     apiData.append('description', formData.description);
     apiData.append('stream', formData.stream);
     apiData.append('isAnonymous', formData.isAnonymous);
     apiData.append('tags', formData.tags); // Arrays appended directly might need JSON.stringify or loop depending on backend, but controller splits string so comma-join or standard append works
     // Note: Backend splits tags by comma if string, so array.join() or loop? FormData handles arrays by appending multiple values with same key or one value.
     // Controller line: post.tags = tags ? (Array.isArray(tags) ? tags : tags.split(',')) : post.tags;
     // Frontend sends array. Let's send as JSON string or comma separated if we can.
     // Safest for FormData with this backend logic:
     // If backend accepts array (Express doesn't auto-parse FormData arrays deeply without explicit handling), sending as comma-separated string is safer if backend supports it.
     
     // But wait, axios + multer handles standard FormData. 
     // Let's just append normally.
     
     if (formData.image) apiData.append('image', formData.image);
     
     // Toast handled in form? No, let's handle here.
    const loadingToast = toast.loading("Updating post...");

     try {
         const res = await editPostApi(editingPost._id, apiData);
         if (res.status === 200) {
             const updatedPost = res.data.post;
             setPosts(prev => prev.map(p => p._id === updatedPost._id ? updatedPost : p));
             setEditingPost(null); // Close Modal
             toast.update(loadingToast, { render: "Post updated successfully", type: "success", isLoading: false, autoClose: 3000 });
         } else {
            toast.update(loadingToast, { render: "Failed to update post", type: "error", isLoading: false, autoClose: 3000 });
         }
     } catch (error) {
         console.error("Error updating post:", error);
         toast.update(loadingToast, { render: "Error updating post", type: "error", isLoading: false, autoClose: 3000 });
     }
  };

  return (
    // MAIN LAYOUT CONTAINER: Flex Grid
    <div className="flex justify-center items-start gap-6 w-full px-4 lg:px-8 py-6 relative">
      
      {/* --- EDIT MODAL OVERLAY --- */}
      {editingPost && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-[#1a2c2c] w-full max-w-2xl rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                <button 
                    onClick={() => setEditingPost(null)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
                <h2 className="text-xl font-bold text-med-dark dark:text-white mb-6">Edit Post</h2>
                
                <CreatePostForm 
                    initialData={editingPost} 
                    onSubmit={handleUpdateSubmit} 
                />
            </div>
         </div>
      )}

      {/* ========================================= */}
      {/* LEFT COLUMN: MAIN CONTENT                 */}
      {/* ========================================= */}
      <main className="flex flex-col w-full max-w-[720px] gap-6">
        
        {/* --- Page Header --- */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl font-bold text-med-dark dark:text-white">My Posts</h1>
            <p className="text-med-text-secondary dark:text-gray-400 text-sm mt-1">
              Manage your symptoms and view responses.
            </p>
          </div>
          <button className="shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-med-dark font-semibold text-sm rounded-xl transition-all shadow-sm">
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>New Post</span>
          </button>
        </div>

        {/* --- Filter Tabs --- */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <FilterButton 
            label="All History" 
            active={activeFilter === "All History"} 
            onClick={() => setActiveFilter("All History")} 
          />
          <FilterButton label="Symptom Type" hasDropdown />
          <FilterButton label="Severity" hasDropdown />
          <FilterButton label="Status" hasDropdown />
        </div>

        {/* --- Posts List --- */}
        <div className="flex flex-col gap-6">
          {loading ? (
             <div className="flex justify-center py-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
             </div>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <PostCard 
                key={post._id} 
                post={post} 
                isOwnPost={true}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <div className="text-center py-10 bg-white dark:bg-[#1a2c2c] rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">post_add</span>
                <p className="text-gray-500 dark:text-gray-400 font-medium">No posts found.</p>
                <p className="text-sm text-gray-400">Share your symptoms to get advice.</p>
            </div>
          )}
        </div>

      </main>
 
      {/* RIGHT COLUMN: STATS SIDEBAR               */}
     
      <div className="hidden xl:block w-80 shrink-0 sticky top-4">
        <aside className="flex flex-col gap-6 w-full">
          
          {/* My Activity Stats */}
          <div className="bg-white dark:bg-[#1a2c2c] rounded-xl p-5 border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm">
            <h3 className="font-bold text-med-dark dark:text-white mb-4">My Activity Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-med-dark dark:text-white">{posts.length}</span>
                <span className="text-xs text-med-text-secondary dark:text-gray-400">Total Posts</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-primary">
                    {posts.filter(p => p.status === 'Resolved').length}
                </span>
                <span className="text-xs text-med-text-secondary dark:text-gray-400">Resolved</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-med-dark dark:text-white">
                     {posts.reduce((acc, curr) => acc + (curr.commentCount || 0), 0)}
                </span>
                <span className="text-xs text-med-text-secondary dark:text-gray-400">Responses</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-med-dark dark:text-white">
                    {posts.filter(p => p.doctorResponded).length}
                </span>
                <span className="text-xs text-med-text-secondary dark:text-gray-400">Dr. Replies</span>
              </div>
            </div>
          </div>

          {/* Trending Topics (Specific to My Posts Context) */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-med-dark dark:text-white">Trending Health Topics</h3>
              <a className="text-xs font-semibold text-primary hover:text-primary/80" href="#">View All</a>
            </div>
            <div className="flex flex-col gap-3">
              <div className="group flex flex-col p-3 rounded-xl bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] hover:border-primary/50 cursor-pointer transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-semibold text-med-dark dark:text-white">Seasonal Allergies</span>
                  <span className="text-[10px] bg-med-gray dark:bg-[#253636] px-1.5 py-0.5 rounded text-med-text-secondary">Trending</span>
                </div>
                <p className="text-xs text-med-text-secondary dark:text-gray-400">High pollen count reported in Northeast region.</p>
              </div>
              <div className="group flex flex-col p-3 rounded-xl bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] hover:border-primary/50 cursor-pointer transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-semibold text-med-dark dark:text-white">Flu Season Prep</span>
                </div>
                <p className="text-xs text-med-text-secondary dark:text-gray-400">Discussions on vaccines and early prevention.</p>
              </div>
            </div>
          </div>

          {/* Privacy Reminder */}
          <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">info</span>
              <div>
                <h5 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">Privacy Reminder</h5>
                <p className="text-xs text-blue-700 dark:text-blue-200 leading-snug">
                  You can edit or delete your posts at any time. Anonymous posts are only visible as "You" to you.
                </p>
              </div>
            </div>
          </div>

        </aside>
      </div>

    </div>
  );
}

// --- Helper Component for Filter Buttons ---
const FilterButton = ({ label, active, hasDropdown, onClick }) => (
  <button 
    onClick={onClick}
    className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm
      ${active 
        ? "bg-med-dark dark:bg-white text-white dark:text-med-dark" 
        : "bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] text-med-dark dark:text-gray-300 hover:bg-med-gray dark:hover:bg-[#253636]"
      }`}
  >
    <span>{label}</span>
    {hasDropdown && <span className="material-symbols-outlined text-[18px]">expand_more</span>}
  </button>
);