import React from 'react';
import DoctorPostCard from '../components/DoctorPostCard'; // Importing the separate component
import { useState,useEffect } from 'react';
 import CaseCard from '../components/CaseCard';
import { checkDoctorStatus, getDoctorPosts } from '../../server/allApi';
import { useDispatch ,useSelector} from 'react-redux';
import { checkVerification } from '../../redux/doctorSlicer';
import CustomToast from '../../components/CustomToast';
import { toast } from 'react-toastify';
import { setPosts } from '../../redux/postSlice';
// --- MOCK DATA ---
const STATS = [
  { 
    id: 1, 
    label: "Pending Reviews", 
    icon: "pending_actions", 
    trend: "+2 today", 
    trendColor: "text-[#078832] bg-[#e6f4ea]",
    isUrgent: false 
  },
  { 
    id: 2, 
    label: "Cases Needing Action", 
    icon: "warning", 
    trend: "Urgent", 
    trendColor: "text-[#b91c1c] bg-[#fef2f2]",
    isUrgent: true 
  },
  { 
    id: 3, 
    label: "Helped Patients", 
    icon: "thumb_up", 
    trend: "Top 5%", 
    trendColor: "text-secondary dark:text-gray-400 bg-[#f0f4f4] dark:bg-[#1f3333]",
    isUrgent: false 
  },
  { 
    id: 4, 
    label: "Avg. Response Time", 
    icon: "schedule", 
    trend: null, 
    isUrgent: false 
  },
];

const CASES = [
  {
    id: 1,
    title: "Severe chest tightness radiating to left arm",
    desc: "Patient (Male, 58) reports sudden onset pressure in center of chest. History of hypertension. Describes pain as \"elephant sitting on chest\". Started after light exercise...",
    priority: "High Priority",
    specialty: "Cardiology",
    time: "15m ago",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBi8W3-YiMtFpj3gRq16WKGyhQYEL3CHKXPfCYawWvhIMJqnwB1YzgV0YsmO-cs2vV1L7HOxhF6Up4HkG529VthdmlVNOghA-us3fSl3ScynXd8uak9H7twE_3oi8CJnkHcguBRYk735MlE3PQjK47YEUmCIsvoKu8acpN4z7KVWOdxUMLBqq3ddnjnZqqyNqi1NBMcoVPX2cCXrEjpstp263OR4JZeUzqyzdIoyTz1h9i7jqndCsnp3FNnvPxYCMq-Z9Vkc_ZUWw4",
    viewers: 2,
    patientName: "Robert Fox"
  },
  {
    id: 2,
    title: "Recurring migraine with aura",
    desc: "Female, 34. Experiencing visual disturbances followed by intense headache on right side. Sensitivity to light. OTC medication not effective. Duration 3 days.",
    priority: "Medium Priority",
    specialty: "Neurology",
    time: "2h ago",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkDHRXUwIu3w0Y5ZUjyTU6uTTi17UxMc4fUqaRCeQc3FT8IA9dRQ9_gvz3RSV-oUWUAnAnVix05uqS5dwVZXed7IKSxa7IicFip6D0F9q8vLUI0y7Rr6hXgToLbA8muwehjl2e7XxNc9eCIo7qsmXzFifFkJl1Xm0FYSDqVdZbFaBR6DdsU8AJ3gRy8Nve9VenuMtQ7DVq4hFNIVUTBYC-JtkPqtOhnxxi7w7q7Aju8RFir6P7CWhzJr8-_6o8LenHypOZOYh6fIo",
    viewers: 0,
    patientName: "Jenny Wilson"
  },
  {
    id: 3,
    title: "Rash on forearm after hiking",
    desc: "Male, 22. Noticed red, itchy bumps on left forearm yesterday. Suspects poison ivy but wants confirmation before buying cream. No systemic symptoms.",
    priority: "Low Priority",
    specialty: "Dermatology",
    time: "4h ago",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBK-jFQBFUOlmC2PaQExtqTgFg9C2HZ8QA2sxgsYj7jLd655ZBUtFGCeyp8jzUButqbEqM-3PnJn6r5muTREW9h72pDht9xQZstW2-ifzyMRBGg7_Sqoe41VdZzEeXFYMX8szwvjWbB7VREaprb-c_Dag0mu2BRO5UCoFR3crU43sWfaiXxva7OLQP-6GjRuNZLbmpnvQ9UsxOHSLahprWaBNHoD3PvBSkU7ZUKy5w7MGydK3zzHpa-kD6KG68h9lXt_TZoLeR9jyw",
    viewers: 1,
    patientName: "Guy Hawkins"
  }
];

const DISCUSSIONS = [
  { initials: "JD", name: "John Doe - Arrhythmia", status: "Patient replied 5m ago", color: "blue", active: true },
  { initials: "SA", name: "Sarah A. - Follow up", status: "Waiting for your reply", color: "purple", active: false },
  { initials: "MK", name: "Mike K. - Hypertension", status: "Closed yesterday", color: "green", active: false, closed: true },
];

export default function DoctorDashboard() {
  const {verified} =useSelector((state)=>state.doctor)
    const post = useSelector((state)=>state.post.posts)
    console.log("===>",post)
   
  const dispatch = useDispatch()

  const  {profile} =  useSelector((state)=>state.doctor) 
  console.log(profile.DoctorProfile.displayName)//=>>>>>>>>>>..use checking here....!

    useEffect(() => {
    
    const checkStatus=async()=>{

      try{
        const respond =await checkDoctorStatus();
        if(respond.status==200){
          dispatch(checkVerification(respond.data));
        }

      }catch(error){
        toast(
          <CustomToast
            title="Verification Failed"
            message={error.response?.data?.message || "An unexpected error occurred while checking verification status."}
            type="error"
          />
        );
      }
    }
    checkStatus(); // Call the async function
  }, [dispatch]); // Add dispatch to the dependency array

  //Get Post
 
 useEffect(() => {
   const fetchPosts = async () => {
     try {
             
       const Post = await getDoctorPosts();
       dispatch(setPosts(Post.data.posts));
     } catch (error) {
       
       toast.error("Server not reachable. Try again later.");
     }
   };
 
   fetchPosts();
 }, [dispatch]);

 console.log(post)

  return (
    <main className="flex-1 bg-white flex flex-col h-full overflow-hidden relative bg-[#F2F4F7] dark:bg-[#1a2c2c] ">
      
      {/* Mobile Header */}
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

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-5 lg:py-5 scrollbar-hide">
        <div className="mx-auto max-w-7xl flex flex-col gap-8">
          
          {/* Page Heading */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-[#111818] dark:text-white text-3xl md:text-4xl font-black tracking-tight mb-2">
                {verified?.isVerified ? `Welcome Dr. ${profile.DoctorProfile.displayName}` :"Welcome To MedPulse Doctor!"}
              </h1>
              {/* <p className="text-secondary dark:text-gray-400 text-base md:text-lg">
                You have <span className="font-semibold text-primary-dark dark:text-primary">3 urgent cases</span> requiring attention today.
              </p> */}
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#dbe6e6] rounded-xl text-sm font-medium shadow-sm hover:bg-gray-50 dark:bg-[#1f3333] dark:border-[#2a3c3c] dark:text-white dark:hover:bg-[#253d3d] transition-all">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                Alerts
                <span className="bg-red-500 size-2 rounded-full"></span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {STATS.map((stat ,index) => {
    
    const isVerified = verified?.isVerified;
    
    const displayValue = isVerified ? stat.value : (stat.id === 4 ? "N/A" : "0"); // ID 4 is "Avg Response Time", so N/A fits better
    const displayTrend = isVerified ? stat.trend : null;
    const isUrgent = isVerified ? stat.isUrgent : false; // Disable urgent alerts if not verified

    return (
      <div 
        key={index}
        className={`bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-card border flex flex-col gap-3 group transition-colors relative overflow-hidden
          ${isUrgent 
            ? "border-primary/30 dark:border-primary/30" 
            : "border-[#dbe6e6] dark:border-[#2a3c3c] hover:border-primary/50"
          }`}
      >
        {isUrgent && (
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <span className="material-symbols-outlined text-8xl text-primary">warning</span>
          </div>
        )}
        
        <div className="flex justify-between items-start relative z-10">
          <div className={`p-2 rounded-lg ${isUrgent ? "bg-primary/10 text-primary-dark dark:text-primary" : "bg-[#f0f4f4] text-[#111818] dark:bg-[#1f3333] dark:text-white group-hover:bg-primary/20 group-hover:text-primary-dark"} transition-colors`}>
            <span className="material-symbols-outlined" style={isUrgent ? { fontVariationSettings: "'FILL' 1" } : {}}>
              {stat.icon}
            </span>
          </div>
          {displayTrend && (
            <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.trendColor}`}>
              {displayTrend}
            </span>
          )}
        </div>
        <div className="relative z-10">
          <p className="text-3xl font-bold text-[#111818] dark:text-white">{displayValue}</p>
          <p className="text-sm font-medium text-secondary dark:text-gray-400">{stat.label}</p>
        </div>
      </div>
    );
  })}
</div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between bg-surface-light dark:bg-surface-dark p-2 rounded-2xl border border-[#dbe6e6] dark:border-[#2a3c3c] shadow-sm">
            <div className="flex-1 min-w-[300px]">
              <label className="flex w-full items-center h-12 rounded-xl bg-[#f6f8f8] dark:bg-[#152626] px-4 focus-within:ring-2 focus-within:ring-primary/50 transition-shadow">
                <span className="material-symbols-outlined text-secondary dark:text-gray-500 mr-3">search</span>
                <input 
                  className="w-full bg-transparent border-none outline-none text-sm text-[#111818] dark:text-white placeholder:text-secondary dark:placeholder:text-gray-500 focus:ring-0 p-0 font-medium" 
                  placeholder="Search by symptom, patient ID, or keywords..." 
                  type="text"
                />
              </label>
            </div>
            <div className="flex flex-wrap items-center gap-2 px-2">
              <button className="flex items-center gap-2 h-10 px-4 rounded-xl bg-white dark:bg-[#1f3333] border border-[#dbe6e6] dark:border-[#2a3c3c] hover:border-primary text-sm font-medium text-[#111818] dark:text-white transition-all">
                <span className="material-symbols-outlined text-[18px] text-secondary">tune</span>
                Filter
              </button>
              <div className="w-px h-6 bg-[#dbe6e6] dark:bg-[#2a3c3c] mx-1"></div>
              {['Region: NY', 'Specialty: Cardio'].map((filter, i) => (
                <button key={i} className="flex items-center gap-2 h-9 px-3 rounded-lg bg-[#f0f4f4] dark:bg-[#1f3333] hover:bg-[#e0e6e6] dark:hover:bg-[#2a3c3c] text-xs font-medium text-[#111818] dark:text-white transition-all">
                  {filter}
                  <span className="material-symbols-outlined text-[16px]">expand_more</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Grid */}

{/* 1. IF VERIFIED: Show the Dashboard Content */}
{verified?.isVerified ? (
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
    {/* Case Feed (Left 2 Columns) */}
    <div className="xl:col-span-2 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#111818] dark:text-white">Needs Review</h3>
        <button className="text-primary text-sm font-bold hover:underline">View All</button>
      </div>

      {/* --- MAPPING THE DOCTOR POST CARD --- */}
      {post.map((item,index) => (
        <CaseCard key={index} post={item} />
      ))}
    </div>
  </div>
) : verified?.isProfileComplete ? (
  /* 2. IF PROFILE COMPLETE BUT NOT VERIFIED: Show Pending Card */
  <div className="w-full bg-white dark:bg-card-dark rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-700 overflow-hidden mt-2 relative">
    {/* Subtle decorative gradient */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

    <div className="flex flex-col lg:flex-row">
      {/* Left: Visual/Image */}
      <div className="w-full lg:w-2/5 min-h-[300px] bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center relative overflow-hidden group">
        <div
          className="absolute inset-0 bg-center bg-cover opacity-80 mix-blend-multiply"
          data-alt="Abstract soft gradient with medical plus signs pattern"
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAUS0Wq3qC5KFqUppF-Di8bBxNMOfbGCuXttcYlhGpN3OTHtQ-ZljjAz0SIJ9-WVU04YBUv9C7WtpIYPqIsv7vKKnhWVQxZqEC_riKx77m3grtOCKxJUyZ8leRa8mUQ7agUQYbcGQWIM0MtJUdOZzrCKshARkFfFZEzzK8xCncsxAK31k2DEUc7p6rEqIdfGAVpL0ydDqITn_vGq03ZhjXwD9u9D-Gi9QlY4A5CRSXbBvjdXaBZSrTErUlr0QcvVUldXu6OL7ERdZc")' }}
        ></div>
        <div className="relative z-10 p-8 flex items-center justify-center">
          <div className="bg-white/80 dark:bg-black/20 backdrop-blur-sm p-6 rounded-full shadow-lg">
            <span className="material-symbols-outlined text-primary text-6xl">verified_user</span>
          </div>
        </div>
      </div>

      {/* Right: Content */}
      <div className="w-full lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-black text-xs font-bold uppercase tracking-wider border border-yellow-100 dark:border-yellow-800 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">hourglass_empty</span>
            Pending Review
          </span>
        </div>

        <h3 className="text-2xl lg:text-3xl font-bold text-text-main dark:text-white mb-4 tracking-tight">
          Verification in Progress
        </h3>

        <p className="text-text-muted text-lg leading-relaxed mb-8 max-w-2xl">
          Your professional verification is currently being reviewed by our medical board. This typically takes 24-48 hours. We will notify you via email once you have full access to the platform.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-black font-semibold rounded-xl transition-colors shadow-sm shadow-primary/20 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">edit</span>
            Edit Profile
          </button>
          <button className="px-6 py-2.5 bg-white dark:bg-transparent border border-gray-200 dark:border-gray-700  text-black text-text-main dark:text-black hover:bg-gray-50 dark:hover:bg-gray-800 font-medium hover:text-white rounded-xl transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">support_agent</span>
            Contact Support
          </button>
        </div>

        {/* Trust Signal */}
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2 text-text-muted text-sm">
          <span className="material-symbols-outlined text-[18px] text-green-600">lock</span>
          <span>Your data is encrypted and securely stored.</span>
        </div>
      </div>
    </div>
  </div>
) : (
  /* 3. IF INCOMPLETE (Default): Show Start Journey Card */
  <div className="flex-1 bg-card-light dark:bg-card-dark rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-8 md:p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
    <div className="relative mb-6">
      {/* Decorative background circle */}
      <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full transform scale-150"></div>

      {/* Icon/Image */}
      <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-600">
        <img
          alt="Medical Verification"
          className="w-24 h-24 object-cover rounded-xl opacity-90"
          data-alt="Abstract medical stethoscope on a blue background representing healthcare verification"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjkwLBVLa1AsS82tTcJv9p_HWYuPkJ3uQku1erZvbtEvbDZmmqctsWO7x-EpUtSreKRRHsYJGOT5MfWggBRplMuZhmgmqSxU5xjpY5tQXcGjN27PlBLwaAfKdTYIWl-XnPRb2xqRz3c0TyxQfAjlV2wfZCfER7VXZ0vdayznO8EgRoG_tdAn0kNSOdxhIXQG-o5YFfNBvlf9CPLc3z2KxUWTGvV2rxqRpbWzYCQfVphx2v2Vdl3UlMvjhmX-Qv5vIjfbGVH_5GnkU"
        />
      </div>

      {/* Status Badge */}
      <div className="absolute -bottom-2 -right-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs font-bold px-3 py-1 rounded-full border border-white dark:border-gray-800 shadow-sm flex items-center gap-1">
        <span className="material-symbols-outlined text-[14px]">pending</span>
        Verification Pending
      </div>
    </div>

    <h3 className="text-2xl font-bold text-text-main dark:text-white mb-3">
      Start your journey with MedPulse
    </h3>

    <p className="text-text-muted dark:text-gray-400 max-w-lg mb-8 text-base leading-relaxed">
      To ensure patient safety and maintain our community standards, we need to verify your medical license. This process typically takes 24-48 hours. Please complete your profile to unlock full access.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
      <button className="bg-primary hover:bg-primary-hover text-text-main font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
        <span className="material-symbols-outlined">verified_user</span>
        Complete Profile
      </button>
      <button className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-text-main dark:text-white font-medium py-3 px-8 rounded-xl transition-all flex items-center justify-center gap-2">
        <span className="material-symbols-outlined">help</span>
        Learn More
      </button>
    </div>

    <div className="mt-8 flex items-center gap-2 text-xs text-text-muted dark:text-gray-500">
      <span className="material-symbols-outlined text-[16px]">lock</span>
      <span>Your information is encrypted and securely stored.</span>
    </div>
  </div>
)}      
        </div>
      </div>
    </main>
  );
}