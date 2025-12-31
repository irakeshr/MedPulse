import React, { useState, useEffect } from 'react';

const EditProfileModal = ({ onClose, user, onSubmit }) => {

  // Initialize state with user data or defaults
  const [isSubmitting, setIsSubmitting] = useState(false)

   const { allergies,
  bio,
  bloodGroup,
  chronicConditions,
  createdAt,
  dateOfBirth,
  displayName,
  healthTags,
  helpfulVotes,
  joinedCommunities,
  level,
  location,
  profileImage,
  updatedAt,
  username}=user.patientProfile

  
  const existingImage = profileImage;

  const [formData, setFormData] = useState({
    displayName: displayName || "",
    profileImage:null,
    profileImagePreview: profileImage || "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    healthTags: healthTags || [],
  bloodGroup: bloodGroup || "",
  dateOfBirth: dateOfBirth.split("T")[0] || "",
  location: location || "",
  bio: bio || "",
  allergies: allergies || [],
  chronicConditions: chronicConditions || []
  });

  // Handle Text Inputs
  const handleFormChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
        profileImagePreview: URL.createObjectURL(file),
      }));
    }
  };

  // Handle Array Fields (Tags, Allergies, Conditions) - Add
  const handleArrayAdd = (e, field) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = e.target.value.trim();
      if (val && !formData[field].includes(val)) {
        setFormData(prev => ({ ...prev, [field]: [...prev[field], val] }));
        e.target.value = '';
      }
    }
  };

  // Handle Array Fields - Remove
  const handleArrayRemove = (index, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // Submit Handler
  const handleSubmit = async () => {
    setIsSubmitting(true)
   await onSubmit(formData);
    onClose();
  };

  return (
    <div
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-med-dark/60 backdrop-blur-sm scrollbar-hide overflow-auto"
      role="dialog"
    >
      <div
        className="bg-white dark:bg-[#1a2c2c] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#e5e7eb] dark:border-[#2a3838] flex flex-col max-h-[90vh] scrollbar-hide overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#e5e7eb] dark:border-[#2a3838]">
          <h2 className="text-xl font-bold text-med-dark dark:text-white">Edit Profile</h2>
          <button
            className="p-2 text-med-text-secondary dark:text-gray-400 hover:bg-med-gray dark:hover:bg-[#253636] rounded-full transition-colors"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto scrollbar-hide">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Profile Photo */}
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="relative group">
                <div className="w-28 h-28 rounded-full p-1 border-2 border-dashed border-[#e5e7eb] dark:border-[#2a3838] group-hover:border-primary transition-colors">
                  <img
                    src={formData.profileImagePreview}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover bg-gray-100 dark:bg-[#253636]"
                  />
                </div>
                <label className="absolute bottom-1 right-1 p-2 bg-primary hover:bg-primary/90 text-med-dark rounded-full cursor-pointer shadow-lg transition-transform hover:scale-105 border-2 border-white dark:border-[#1a2c2c]">
                  <span className="material-symbols-outlined text-[18px] flex">photo_camera</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Display Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-med-dark dark:text-gray-300">Display Name</label>
                <input
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleFormChanges}
                  className="w-full rounded-xl border-[#e5e7eb] dark:border-[#2a3838] bg-white dark:bg-[#1a2c2c] text-med-dark dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-primary/50 outline-none"
                  placeholder="Your name"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-med-dark dark:text-gray-300">Location</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-med-text-secondary text-[20px]">location_on</span>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleFormChanges}
                    className="w-full rounded-xl border-[#e5e7eb] dark:border-[#2a3838] bg-white dark:bg-[#1a2c2c] text-med-dark dark:text-white pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-primary/50 outline-none"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-med-dark dark:text-gray-300">Date of Birth</label>
                <input
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleFormChanges}
                  className="w-full rounded-xl border-[#e5e7eb] dark:border-[#2a3838] bg-white dark:bg-[#1a2c2c] text-med-dark dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-primary/50 outline-none"
                />
              </div>

              {/* Blood Group */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-med-dark dark:text-gray-300">Blood Group</label>
                <div className="relative">
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleFormChanges}
                    className="w-full rounded-xl border-[#e5e7eb] dark:border-[#2a3838] bg-white dark:bg-[#1a2c2c] text-med-dark dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-primary/50 outline-none appearance-none"
                  >
                    <option value="" disabled>Select Type</option>
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-3 text-med-text-secondary text-[20px] pointer-events-none">expand_more</span>
                </div>
              </div>
            </div>

            {/* Website */}
            

            {/* Bio */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-med-dark dark:text-gray-300">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleFormChanges}
                className="w-full rounded-xl border-[#e5e7eb] dark:border-[#2a3838] bg-white dark:bg-[#1a2c2c] text-med-dark dark:text-white px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none resize-none"
                placeholder="Tell us about yourself..."
                rows={3}
              />
              <p className="text-xs text-med-text-secondary dark:text-gray-500 text-right">{formData.bio.length}/300</p>
            </div>

            {/* Medical Details - Arrays */}
            <div className="border-t border-[#e5e7eb] dark:border-[#2a3838] pt-6 space-y-4">
              <h3 className="text-lg font-bold text-med-dark dark:text-white mb-4">Medical Details</h3>
              
              {/* Allergies */}
              <ArrayField 
                label="Allergies" 
                items={formData.allergies} 
                onAdd={(e) => handleArrayAdd(e, 'allergies')} 
                onRemove={(i) => handleArrayRemove(i, 'allergies')} 
                placeholder="List allergies (Enter to add)"
                icon="lock"
                footerText="Visible only to registered doctors"
              />

              {/* Chronic Conditions */}
              <ArrayField 
                label="Chronic Conditions" 
                items={formData.chronicConditions} 
                onAdd={(e) => handleArrayAdd(e, 'chronicConditions')} 
                onRemove={(i) => handleArrayRemove(i, 'chronicConditions')} 
                placeholder="Add condition (Enter to add)"
              />

               {/* Health Tags */}
               <ArrayField 
                label="Health Tags / Interests" 
                items={formData.healthTags} 
                onAdd={(e) => handleArrayAdd(e, 'healthTags')} 
                onRemove={(i) => handleArrayRemove(i, 'healthTags')} 
                placeholder="Add interest (Enter to add)"
              />
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[#e5e7eb] dark:border-[#2a3838] bg-gray-50 dark:bg-[#162626] rounded-b-2xl flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-[#e5e7eb] dark:border-[#2a3838] bg-white dark:bg-[#253636] text-med-dark dark:text-white font-semibold hover:bg-med-gray dark:hover:bg-[#2f4242] transition-colors">
            Cancel
          </button>
           <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-6 py-2 font-semibold text-sm rounded-lg transition-all 
                ${isSubmitting
                  ? 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary/90 text-med-dark shadow-md hover:shadow-lg' 
                }`}
            >
              {isSubmitting ? 'Saving...' : 'SaveChanges'}
            </button>
        </div>
      </div>
    </div>
  );
};

// Helper Component for Array Fields (Tags)
const ArrayField = ({ label, items, onAdd, onRemove, placeholder, icon, footerText }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-med-dark dark:text-gray-300">{label}</label>
    <div className="flex flex-wrap gap-2 p-2 rounded-xl border border-[#e5e7eb] dark:border-[#2a3838] bg-white dark:bg-[#1a2c2c] min-h-[50px] items-center">
      {items.map((item, index) => item && (
        <span key={index} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/10 text-teal-800 dark:text-white text-sm font-medium border border-primary/20 whitespace-nowrap">
          {item}
          <button type="button" onClick={() => onRemove(index)} className="hover:text-red-500 text-teal-800/60 dark:text-gray-400 dark:hover:text-red-400">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </span>
      ))}
      <input
        className="bg-transparent outline-none flex-1 min-w-[120px] text-sm px-2 py-1 text-med-dark dark:text-white placeholder:text-med-text-secondary"
        placeholder={placeholder}
        onKeyDown={onAdd}
      />
    </div>
    {footerText && (
      <p className="text-xs text-med-text-secondary dark:text-gray-500 flex items-center gap-1">
        {icon && <span className="material-symbols-outlined text-[14px]">{icon}</span>}
        {footerText}
      </p>
    )}
  </div>
);

export default EditProfileModal;