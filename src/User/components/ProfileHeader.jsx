import { useSelector } from "react-redux";

const ProfileHeader = ({ isUpdate,user, onOpen }) => {

const patientProfile = useSelector(
  (state) => state.userDetail.profile?.patientProfile
);
  

if (!patientProfile) return null;

const {
  bio,
  createdAt,
  displayName,
  level,
  location,
  profileImage,
  username
} = patientProfile;

console.log(patientProfile)

  return (
  <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl shadow-sm border border-[#e5e7eb] dark:border-[#2a3838] overflow-hidden">
    {/* Cover Image */}
    <div className="h-32 bg-gradient-to-r from-teal-400 to-[#13ecec] w-full relative">
      <button className="absolute top-4 right-4 bg-black/20 hover:bg-black/30 text-white p-1.5 rounded-full backdrop-blur-sm transition-colors" onClick={onOpen}>
        <span className="material-symbols-outlined text-[18px]">photo_camera</span>
      </button>
    </div>
    
    <div className="px-6 pb-6 relative">
      {/* Profile Pic & Actions */}
      <div className="flex justify-between items-end -mt-12 mb-4">
        <div className="relative">
          <div className="size-28 rounded-full border-[4px] border-white dark:border-[#1a2c2c] bg-cover bg-center shadow-md" style={{ backgroundImage: `url('${profileImage}')` }}></div>
          <div className="absolute bottom-1 right-1 bg-white dark:bg-[#1a2c2c] rounded-full p-1 border border-gray-100 dark:border-gray-700 shadow-sm cursor-pointer hover:bg-gray-50" onClick={onOpen}>
            <span className="material-symbols-outlined text-med-text-secondary text-[16px]">edit</span>
          </div>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button className="px-4 py-2 bg-white dark:bg-[#253636] border border-med-gray dark:border-[#2a3838] rounded-xl text-med-dark dark:text-white text-sm font-semibold hover:bg-med-gray dark:hover:bg-[#2f4242] transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">settings</span>
            Settings
          </button>
          <button onClick={onOpen} className=" px-4 py-2 bg-primary hover:bg-primary/90 text-med-dark text-sm font-bold rounded-xl transition-colors shadow-sm shadow-primary/20">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-med-dark dark:text-white">{displayName}</h1>
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-teal-700 dark:text-primary text-[10px] font-bold uppercase tracking-wide border border-primary/20">level {level} member</span>
        </div>
        <p className="text-med-text-secondary dark:text-gray-400 text-sm mt-0.5 font-medium">@{username}</p>
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-med-text-secondary dark:text-gray-400">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">location_on</span>
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            <span>Joined {new Date(createdAt?.split("T")[0]).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long'
})}</span>
          </div>
           
        </div>
        
        <p className="mt-4 text-sm leading-relaxed text-med-dark dark:text-gray-300 max-w-2xl">
          {bio}
        </p>
      </div>
    </div>
   
  </div>
);
}
export default ProfileHeader;