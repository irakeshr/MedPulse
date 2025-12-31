import React, { useState } from 'react';
import RecentActivityFeed from '../components/RecentActivityFeed';
import EditProfileModal from '../components/EditProfileModal';
import ProfileHeader from '../components/ProfileHeader';
import ProfileStats from '../components/ProfileStats';
import ProfileSidebar from '../components/ProfileSidebar';
import { updateProfile } from '../../server/allApi';
import { toast } from 'react-toastify';
import { useSelector,useDispatch } from 'react-redux';
import CustomToast from '../../components/CustomToast';

// --- MOCK DATA ---
 

export default function ProfilePage() {
    const  {profile} =useSelector((state)=>state.userDetail);
 const dispatch=useDispatch()

  const [user, setUser] = useState(profile);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open Modal
  const handleClickEditProfile = () => {
    setIsModalOpen(true);
  };

  // Close Modal
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Handle Update from Modal
  const handleProfileUpdate = async (updatedData) => {
    try {
      const fd = new FormData();

      fd.append("displayName", updatedData.displayName);
      if (updatedData.profileImage) {
        fd.append("profileImage", updatedData.profileImage); // 👈 FILE
      }
      fd.append("bloodGroup", updatedData.bloodGroup);
      fd.append("dateOfBirth", updatedData.dateOfBirth);
      fd.append("location", updatedData.location);
      fd.append("website", updatedData.website);
      fd.append("bio", updatedData.bio);
      updatedData.healthTags.forEach(tag => fd.append("healthTags[]", tag));
      updatedData.allergies.forEach(allergy => fd.append("allergies[]", allergy));
      updatedData.chronicConditions.forEach(condition => fd.append("chronicConditions[]", condition));
      const res = await updateProfile(fd); // Pass FormData
      
      if (res.status === 200) { // Assuming 200 for successful update
        setUser(prev => ({
          ...prev,
          name: updatedData.displayName,
          location: updatedData.location,
          website: updatedData.website,
          bio: updatedData.bio,
          tags: updatedData.healthTags,
          image: updatedData.profileImagePreview, // Use the preview URL for immediate feedback
          bloodGroup: updatedData.bloodGroup,
          allergies: updatedData.allergies,
          chronicConditions: updatedData.chronicConditions
        }));
        toast(
          <CustomToast
            title="Profile Updated Successfully"
            message="Your profile has been updated."
            type="success"
          />
        );
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast(
        <CustomToast
          title="Profile Update Failed"
          message={error.response?.data?.message || "An unexpected error occurred."}
          type="error"
        />
      );
    }
  };

  return (
    // MAIN LAYOUT GRID
    <div className="flex justify-center items-start gap-6 w-full px-4 lg:px-8 py-6">
      
      {isModalOpen && (
        <EditProfileModal 
          onClose={handleModalClose} 
          user={user} 
          onSubmit={handleProfileUpdate} 
        />
      )}

      {/* LEFT COLUMN: MAIN PROFILE CONTENT */}
      <main className="flex flex-col w-full max-w-[720px] gap-6">
        
        {/* 1. Header Card */}
        <ProfileHeader user={user} onOpen={handleClickEditProfile} />

        {/* 2. Stats Grid */}
        <ProfileStats stats={user.stats} />

        {/* 3. Health Tags Card */}
        <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl p-6 shadow-sm border border-[#e5e7eb] dark:border-[#2a3838]">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">sell</span>
              <h3 className="font-bold text-med-dark dark:text-white text-lg">My Health Tags</h3>
            </div>
            <button onClick={handleClickEditProfile} className="text-xs font-semibold text-primary hover:bg-primary/10 px-2 py-1 rounded transition-colors uppercase tracking-wide">
              Edit Tags
            </button>
          </div>
          <p className="text-sm text-med-text-secondary dark:text-gray-400 mb-4">Topics I'm following and experienced in.</p>
          <div className="flex flex-wrap gap-2">
            {user.tags && user.tags.length > 0 ? (
              user.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-lg bg-med-gray dark:bg-[#253636] border border-[#e5e7eb] dark:border-[#2a3838] text-sm font-medium text-med-dark dark:text-gray-300">
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-400 italic">No tags added yet.</span>
            )}
            <button onClick={handleClickEditProfile} className="px-3 py-1.5 rounded-lg border border-dashed border-med-text-secondary text-med-text-secondary hover:bg-med-gray/50 text-sm font-medium flex items-center gap-1 transition-colors">
              <span className="material-symbols-outlined text-[16px]">add</span> Add Tag
            </button>
          </div>
        </div>

        {/* 4. Recent Activity Feed */}
        <div className="flex flex-col gap-4">
          <RecentActivityFeed />
        </div>

      </main>

      {/* RIGHT COLUMN: SIDEBAR */}
      <div className="hidden xl:block w-80 shrink-0 sticky top-4">
         <ProfileSidebar />
      </div>

    </div>
  );
}