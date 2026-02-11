// src/pages/SavedPostsPage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PostCard from '../components/PostCard'; 
import { getSavedPostsApi, deletePostApi, editPostApi } from '../../server/allApi';
import { toast } from 'react-toastify';
import CustomToast from '../../components/CustomToast';
import CreatePostForm from '../components/CreatePostForm';

export default function SavedPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Use Redux for user ID check
  const { stats } = useSelector((state) => state.userDetail);
  const currentUserId = stats?._id;

  const [editingPost, setEditingPost] = useState(null);

  // Sync with Redux Saved Posts (Auto-remove unsaved)
  useEffect(() => {
      if (stats?.savedPosts && posts.length > 0) {
          setPosts(prevPosts => prevPosts.filter(p => stats.savedPosts.includes(p._id)));
      }
  }, [stats?.savedPosts]); // Dependency on savedPosts IDs

  // Helper for Consistent Toasts
  const showToast = (title, message, type = 'success') => {
      toast(
          <CustomToast title={title} message={message} type={type} />,
          { bodyClassName: "p-5 m-0", closeButton: false }
      );
  };

  useEffect(() => {
    fetchSavedPosts();
  }, []);

  const fetchSavedPosts = async () => {
    try {
      const res = await getSavedPostsApi();
      if (res.status === 200) {
        setPosts(res.data.savedPosts);
      } else {
        showToast("Error", "Failed to fetch saved posts", "error");
      }
    } catch (error) {
      console.error("Error fetching saved posts:", error);
      showToast("Error", "Something went wrong", "error");
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
     
     const apiData = new FormData();
     apiData.append('title', formData.title);
     apiData.append('description', formData.description);
     apiData.append('stream', formData.stream);
     apiData.append('isAnonymous', String(formData.isAnonymous));
     apiData.append("includeLocation", formData.includeLocation);

     if (Array.isArray(formData.tags)) {
        formData.tags.forEach((tag) => apiData.append("tags[]", tag));
     }
     
     if (formData.image) apiData.append('image', formData.image);
     
    const loadingToast = toast.loading("Updating post...");

     try {
         const res = await editPostApi(editingPost._id, apiData);
         if (res.status === 200) {
             const updatedPost = res.data.post;
             // Update logic: replace post in list
             setPosts(prev => prev.map(p => p._id === updatedPost._id ? updatedPost : p));
             
             setEditingPost(null); 
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
    <div className="flex justify-center items-start gap-6 w-full px-4 lg:px-8 py-6 relative">
      
       {/* --- EDIT MODAL OVERLAY --- */}
       {editingPost && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setEditingPost(null)}>
            <div 
                className="bg-white dark:bg-[#1a2c2c] w-full max-w-2xl rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-med-dark dark:text-white">Edit Post</h2>
                    <button 
                        onClick={() => setEditingPost(null)}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#253636] text-gray-500"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <CreatePostForm initialData={editingPost} onSubmit={handleUpdateSubmit} />
            </div>
         </div>
      )}

      <main className="flex flex-col w-full max-w-[720px] gap-6">
        
        <div className="flex flex-col gap-1 mb-2">
            <h1 className="text-2xl font-bold text-med-dark dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">bookmark</span>
                Saved Posts
            </h1>
            <p className="text-med-text-secondary dark:text-gray-400 text-sm">
              Collection of posts you have bookmarked for later.
            </p>
        </div>

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
                isOwnPost={currentUserId && post.author && (post.author._id === currentUserId || post.author === currentUserId)}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <div className="text-center py-10 bg-white dark:bg-[#1a2c2c] rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">bookmark_border</span>
                <p className="text-gray-500 dark:text-gray-400 font-medium">No saved posts.</p>
                <p className="text-sm text-gray-400">Bookmark interesting discussions to find them here.</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
