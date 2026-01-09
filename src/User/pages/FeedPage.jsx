import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard"; // Adjust path as needed
import DoctorModal from "../components/DoctorModal";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import CreatePostForm from "../components/CreatePostForm";
import { getDoctorProfile, getPost } from "../../server/allApi";
import { userPost } from "../../server/allApi";
import { ToastContainer ,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CustomToast from "../../components/CustomToast";
import { setPosts } from "../../redux/postSlice";
 


// --- MOCK DATA FOR FEED ---
 

const DOCTORS = [
  {
    id: 1,
    name: "Dr. A. Patel",
    specialty: "Cardiologist",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWka30KoK367JQLZVMGdVbRloQfwH54LWzQpR8XuUISpovvc4TGsUdWkqMNdlPcyXzkSRDksS1QZnoqTwchBrE3N4k4x4JWlsBEW9ALwqmVe1RzD7PuHa-0nFDQNLjONwtnit_rvvo8vd8xYPDX2jJfm7UpXkHdLjjwZi0Zqqyt5nDCq76QETXKZ61uD-5WlZZAEzemKC4YwrYlf9CjpjxskyMfmhJ8W1I4bApEl04XkOXpFYIHWxz15F8__4KBdlm8msNwiWdvZc",
    about:
      "Dr. Patel is a leading cardiologist with over 15 years of experience in treating complex heart conditions.",
  },
];

const FeedPage = () => {
const dispatch =useDispatch();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const post = useSelector((state)=>state.post.posts)
  console.log(post)
  const { profile, stats } = useSelector((state) => state.userDetail)
  const [posted,setPosted]=useState(true);
 
  
     
   
  const handlePostSubmit = async (data) => {
 // isAnonymous in false there but it return success with true from db why
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("stream", data.stream);
      formData.append("isAnonymous",String(data.isAnonymous));
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
      message= "Your symptom post is now live in the feed" 
      type="success"
    />, 
    {
      // Optional: specific overrides for just this toast
      position: "bottom-right",
       
      bodyClassName: "p-5 m-0",
      closeButton: false // We are using our own close button inside the component
    }
  );
      }  
    
    } catch (error) {
      if (error.response) {
     
     
 toast(
    <CustomToast 
      title={error.response.data.message} 
      message="title,description,stream" 
      type="error"
    />, 
    {
      // Optional: specific overrides for just this toast
      position: "bottom-right",
       
      bodyClassName: "p-5 m-0",
      closeButton: false // We are using our own close button inside the component
    }
  );
      // Example UI usage:
      // setError(error.response.data.message)
    } else {
      
         toast.error("Server not reachable. Try again later.");
    }
    }
  };
useEffect(() => {
  const fetchPosts = async () => {
    try {
           
         
      const Post = await getPost();
      dispatch(setPosts(Post.data.modifiedPosts));
    } catch (error) {
      
      toast.error("Server not reachable. Try again later.");
    }
  };

  fetchPosts();
}, [posted, dispatch]);

  return (
    // MAIN LAYOUT CONTAINER
    <div className="flex justify-center items-start gap-6 w-full px-4 lg:px-8 py-6">
     
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
            <PostCard key={post._id} post={post} isOwnPost={stats._id===post.author._id} />
          ))}
        </div>

        {/* --- Loading Spinner --- */}
        <div className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </main>

      {/* ========================================= */}
      {/* RIGHT COLUMN: SIDEBAR (Merged Inline)     */}
      {/* ========================================= */}
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
            </div>
          </div>

          {/* KNKN */}

          <div className="flex flex-col gap-4">
            {DOCTORS.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2a3838] p-2 rounded-lg transition-colors"
                onClick={() => setSelectedDoctor(doc)} // <--- CLICK TRIGGER
              >
                <div
                  className="bg-center bg-no-repeat bg-cover rounded-full size-10"
                  style={{ backgroundImage: `url('${doc.image}')` }}
                ></div>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-med-dark dark:text-white block">
                    {doc.name}
                  </span>
                  <span className="text-xs text-med-text-secondary dark:text-gray-400">
                    {doc.specialty}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* KMKN */}
        </aside>

        <DoctorModal
          isOpen={!!selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          doctor={selectedDoctor}
        />
      </div>
    </div>
  );
};

export default FeedPage;
