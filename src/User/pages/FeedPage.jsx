import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import DoctorModal from "../components/DoctorModal";
import { useSelector, useDispatch } from "react-redux";
import CreatePostForm from "../components/CreatePostForm";
import { getDoctorProfile, getPost, userPost, editPostApi, deletePostApi, fetchAllDoctors } from "../../server/allApi";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CustomToast from "../../components/CustomToast";
import { setPosts } from "../../redux/postSlice";

const FeedPage = () => {
  const dispatch = useDispatch();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const post = useSelector((state) => state.post.posts);
  const searchKey = useSelector((state) => state.post.searchKey);
  const { profile, stats } = useSelector((state) => state.userDetail);
  const [posted, setPosted] = useState(true);

  // --- EDIT STATE ---
  const [editingPost, setEditingPost] = useState(null);

  const handlePostSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("stream", data.stream);
      formData.append("isAnonymous", String(data.isAnonymous));
      formData.append("includeLocation", data.includeLocation);
      formData.append("timestamp", data.timestamp);

      data.tags.forEach((tag) => formData.append("tags[]", tag));

      if (data.image) {
        formData.append("image", data.image);
      }

      const res = await userPost(formData);

      if (res?.status === 201) {
        setPosted(!posted);
        toast(
          <CustomToast
            title="Post Created Successfully"
            message="Your symptom post is now live in the feed"
            type="success"
          />,
          { position: "bottom-right", bodyClassName: "p-5 m-0", closeButton: false }
        );
      }
    } catch (error) {
      if (error.response) {
        toast(
          <CustomToast
            title={error.response.data.message}
            message={error.response.data.message}
            type="error"
          />,
          { position: "bottom-right", bodyClassName: "p-5 m-0", closeButton: false }
        );
      } else {
        toast.error("Server not reachable. Try again later.");
      }
    }
  };

  // --- DELETE HANDLER ---
  const handleDeletePost = async (postId) => {
      try {
          const res = await deletePostApi(postId);
          if (res.status === 200 || res.status === 204) {
             toast(<CustomToast title="Post Deleted" message="Your post has been removed." type="success" />, { closeButton: false });
             const updatedPosts = post.filter(p => p._id !== postId);
             dispatch(setPosts(updatedPosts));
          }
      } catch (error) {
         console.error("Delete failed:", error);
         toast.error("Failed to delete post.");
      }
  };

  // --- EDIT HANDLER (Opens Modal) ---
  const handleEditPost = (postToEdit) => {
      setEditingPost(postToEdit);
  };

  // --- EDIT SUBMIT (API Call) ---
  const handleEditSubmit = async (data) => {
      if (!editingPost) return;

      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("stream", data.stream);
        formData.append("isAnonymous", String(data.isAnonymous));
        formData.append("includeLocation", data.includeLocation);

        data.tags.forEach((tag) => formData.append("tags[]", tag));

        if (data.image) {
             formData.append("image", data.image);
        }

        const res = await editPostApi(editingPost._id, formData);

        if (res.status === 200) {
            toast(<CustomToast title="Post Updated" message="Your changes have been saved." type="success" />, { closeButton: false });
            
            if(res.data && res.data.post){
                 const updatedPosts = post.map(p => p._id === editingPost._id ? res.data.post : p);
                 dispatch(setPosts(updatedPosts));
            } else {
                 setPosted(!posted);
            }
            
            setEditingPost(null);
        }

      } catch (error) {
          console.error("Edit failed:", error);
          toast.error("Failed to update post.");
      }
  };
  
  const closeEditModal = () => setEditingPost(null);

  const fetchDoctors = async () => {
    try {
      setLoadingDoctors(true);
      const response = await fetchAllDoctors('?limit=5');
      if (response.data?.doctors) {
        setDoctors(response.data.doctors.slice(0, 5));
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoadingDoctors(false);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const Post = await getPost(searchKey);
        dispatch(setPosts(Post.data.modifiedPosts));
      } catch (error) {
        toast.error("Server not reachable. Try again later.");
      }
    };

    fetchPosts();
    fetchDoctors();
  }, [posted, dispatch, searchKey]);

  return (
    // MAIN LAYOUT CONTAINER
    <div className="flex justify-center items-start gap-6 w-full px-4 lg:px-8 py-6 relative">
     
      {/* LEFT COLUMN: MAIN FEED (Composer + Posts) */}

      <main className="flex flex-col w-full max-w-[720px] gap-6">
        {/* --- Composer Section --- */}
        <CreatePostForm onSubmit={handlePostSubmit}  />

        {/* --- Filters Section --- */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <button className="shrink-0 flex items-center gap-2 px-4 py-2 bg-med-dark dark:bg-white text-white dark:text-med-dark rounded-xl text-sm font-medium shadow-sm">
            <span>All Posts</span>
          </button>
          <button className="shrink-0 flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] text-med-dark dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-med-gray dark:hover:bg-[#253636] transition-colors">
            <span>Symptom Type</span>
            <span className="material-symbols-outlined text-[18px]">
              expand_more
            </span>
          </button>
          <button className="shrink-0 flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] text-med-dark dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-med-gray dark:hover:bg-[#253636] transition-colors">
            <span>Severity</span>
            <span className="material-symbols-outlined text-[18px]">
              expand_more
            </span>
          </button>
          <button className="shrink-0 flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] text-med-dark dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-med-gray dark:hover:bg-[#253636] transition-colors">
            <span>Location</span>
            <span className="material-symbols-outlined text-[18px]">
              expand_more
            </span>
          </button>
        </div>

        {/* --- Feed Posts List --- */}
        <div className="flex flex-col gap-6">
          {post.map((post) => (
            <PostCard 
                key={post._id} 
                post={post} 
                isOwnPost={stats._id === post.author._id} 
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
            />
          ))}
        </div>

        {/* --- Loading Spinner --- */}
        <div className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </main>

       
      {/* RIGHT COLUMN: SIDEBAR (Merged Inline)     */}
      
      <div className="hidden xl:block w-80 shrink-0 sticky top-4 h-full overflow-y-auto scrollbar-hide">
        <aside className="flex flex-col gap-6 w-full">
          {/* 1. Disclaimer Card */}
          <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">
                info
              </span>
              <div>
                <h5 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">
                  Not Emergency Advice
                </h5>
                <p className="text-xs text-blue-700 dark:text-blue-200 leading-snug">
                  MedPulse is for informational purposes only. In case of a
                  medical emergency, contact emergency services.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Trending Topics */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-med-dark dark:text-white">
                Trending Health Topics
              </h3>
              <Link
                to="/trending"
                className="text-xs font-semibold text-primary hover:text-primary/80"
              >
                View All
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {/* Trending Item 1 */}
              <div className="group flex flex-col p-3 rounded-xl bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] hover:border-primary/50 cursor-pointer transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-semibold text-med-dark dark:text-white">
                    Seasonal Allergies
                  </span>
                  <span className="text-[10px] bg-med-gray dark:bg-[#253636] px-1.5 py-0.5 rounded text-med-text-secondary">
                    Trending
                  </span>
                </div>
                <p className="text-xs text-med-text-secondary dark:text-gray-400">
                  High pollen count reported in Northeast region.
                </p>
                <span className="text-xs text-primary font-medium mt-2">
                  1.2k Posts
                </span>
              </div>
              {/* Trending Item 2 */}
              <div className="group flex flex-col p-3 rounded-xl bg-white dark:bg-[#1a2c2c] border border-[#e5e7eb] dark:border-[#2a3838] hover:border-primary/50 cursor-pointer transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-semibold text-med-dark dark:text-white">
                    Flu Season Prep
                  </span>
                </div>
                <p className="text-xs text-med-text-secondary dark:text-gray-400">
                  Discussions on vaccines and early prevention.
                </p>
                <span className="text-xs text-primary font-medium mt-2">
                  850 Posts
                </span>
              </div>
            </div>
          </div>

          {/* 3. Verified Doctors */}

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-med-dark dark:text-white">
                Verified Doctors
              </h3>
              <Link
                to="/doctors"
                className="text-xs font-semibold text-primary hover:text-primary/80"
              >
                View All
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {loadingDoctors ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-3 p-2 animate-pulse">
                    <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : doctors.length > 0 ? (
              doctors.map((doc) => (
                <div
                  key={doc._id}
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2a3838] p-2 rounded-lg transition-colors"
                  onClick={() => setSelectedDoctor({
                    id: doc._id,
                    name: doc.displayName,
                    specialty: doc.specialization,
                    image: doc.profileImage,
                    about: doc.bio || ''
                  })}
                >
                  <div
                    className="bg-center bg-no-repeat bg-cover rounded-full size-10"
                    style={{ backgroundImage: doc.profileImage ? `url('${doc.profileImage}')` : 'none' }}
                  >
                    {!doc.profileImage && (
                      <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                        {doc.displayName?.charAt(0) || 'D'}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-med-dark dark:text-white block">
                      {doc.displayName}
                    </span>
                    <span className="text-xs text-med-text-secondary dark:text-gray-400">
                      {doc.specialization}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-med-text-secondary dark:text-gray-400 text-center py-4">
                No doctors available
              </p>
            )}
          </div>
        </aside>

        <DoctorModal
          isOpen={!!selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          doctor={selectedDoctor}
        />
      </div>

      {/* --- EDIT POST MODAL OVERLAY --- */}
      {editingPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
              <div 
                  className="relative w-full max-w-2xl bg-white dark:bg-[#1a2c2c] rounded-2xl shadow-2xl p-6 border border-gray-100 dark:border-[#2a3838] max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
              >
                  <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-med-dark dark:text-white">Edit Post</h2>
                      <button 
                          onClick={closeEditModal}
                          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#253636] text-gray-500"
                      >
                          <span className="material-symbols-outlined">close</span>
                      </button>
                  </div>
                  
                  <CreatePostForm 
                      initialData={editingPost}
                      onSubmit={handleEditSubmit}
                  />
              </div>
          </div>
      )}

    </div>
  );
};

export default FeedPage;
