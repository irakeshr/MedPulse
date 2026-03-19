import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// Simplified list of Streams/Categories
const MEDICAL_STREAMS = [
  "General Medicine",
  "Cardiology",
  "Neurology",
  "Dermatology",
  "Orthopedics",
  "Gastroenterology",
  "Pediatrics",
  "Psychiatry",
];

// Severity levels
const SEVERITY_LEVELS = [
  { value: "Mild", color: "text-green-600", bg: "bg-green-50" },
  { value: "Medium", color: "text-yellow-600", bg: "bg-yellow-50" },
  { value: "High", color: "text-orange-600", bg: "bg-orange-50" },
  { value: "Critical", color: "text-red-600", bg: "bg-red-50" },
];

const CreatePostForm = ({ onSubmit, userAvatar, initialData = null }) => {
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.userDetail);
  

  const {
    allergies,
    bio,
    bloodGroup,
    chronicConditions,
    dateOfBirth,
    healthTags,
    location,
    profileImage
  } = profile.patientProfile || {}; // Add fallback for safety
  
  const isProfileComplete = Boolean(
    allergies &&
      bio &&
      bloodGroup &&
      chronicConditions &&
      dateOfBirth &&
      healthTags &&
      location
  );

  // --- States ---
  const [title, setTitle] = useState(""); // NEW: Title State
  const [description, setDescription] = useState("");
  const [selectedStream, setSelectedStream] = useState("");
  const [tags, setTags] = useState([]); // Array for multiple tags

  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [severity, setSeverity] = useState("Mild");
  const [postLocation, setPostLocation] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [addLocation, setAddLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Effect: Prefill Data if Editing ---
  useEffect(() => {
    if (initialData) {
        setTitle(initialData.title || "");
        setDescription(initialData.content || "");
        setSelectedStream(initialData.symptomType || "");
        setTags(initialData.tags || []);
        setSeverity(initialData.severity || "Mild");
        setPostLocation(initialData.location || "");
        setIsAnonymous(initialData.isAnonymous || false);
        setAddLocation(initialData.includeLocation || false);
        
        if (initialData.images && initialData.images.length > 0) {
            setImagePreviews(initialData.images);
        }
    }
  }, [initialData]);

  // --- Refs ---
  const fileInputRef = useRef(null);

  // --- Handlers ---
  const handleImageClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    // Limit to 5 images
    if (selectedImages.length + files.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }
    
    // Validate file types
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    if (invalidFiles.length > 0) {
      toast.error("Only image files (JPG, PNG, GIF, WebP) are allowed");
      return;
    }
    
    // Validate file size (max 5MB per image)
    const maxSize = 5 * 1024 * 1024;
    const oversizedFiles = files.filter(file => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      toast.error("Each image must be less than 5MB");
      return;
    }
    
    setSelectedImages([...selectedImages, ...files]);
    
    // Create previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
    
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleTagInput = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const newTag = e.target.value.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      e.target.value = ""; // Clear input after adding
      e.preventDefault(); // Prevent form submission
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    // Validation: Require Title + Content
    if (!description.trim() || !title.trim()) {
      toast.error("Title and description cannot be empty.");
      return;
    }

    // Validate location if toggled
    if (addLocation && !postLocation.trim()) {
      toast.error("Please enter your location.");
      return;
    }

    setIsSubmitting(true);

    const postData = {
      title,
      description,
      stream: selectedStream,
      tags,
      images: selectedImages,
      severity,
      location: addLocation ? postLocation : "",
      isAnonymous,
      includeLocation: addLocation,
      timestamp: new Date().toISOString(),
    };

    if (onSubmit) {
      await onSubmit(postData);
    } else {
      console.log("Form Submitted:", postData);
    }
    
    // Only reset if NOT editing (Close modal handles reset in parent usually)
    if (!initialData) {
        setTimeout(() => {
        setTitle("");
        setDescription("");
        setTags([]);
        setSelectedStream("");
        setSelectedImages([]);
        setImagePreviews([]);
        setSeverity("Mild");
        setPostLocation("");
        setIsAnonymous(false);
        setAddLocation(false);
        setIsSubmitting(false);
        }, 1000);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="w-full space-y-4">
      {/* --- 1. NEW: PROFILE COMPLETION NUDGE --- */}
      {/* Logic Tip: You can wrap this div in { !isProfileComplete && (...) } to hide it later */}
      {isProfileComplete ? null : (
        <div className="bg-blue-50/50 dark:bg-[#1f3333] border border-blue-100 dark:border-[#2a3838] rounded-2xl p-4 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 transition-all">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="bg-white dark:bg-[#253636] p-2 rounded-full shadow-sm border border-blue-100 dark:border-gray-700 shrink-0">
              <span className="material-symbols-outlined text-blue-500 text-[20px] block">
                trending_up
              </span>
            </div>

            {/* Text Content */}
            <div className="flex flex-col">
              <h4 className="text-sm font-bold text-med-dark dark:text-gray-100">
                Increase your post visibility
              </h4>
              <p className="text-xs text-med-text-secondary dark:text-gray-400 mt-0.5">
                Complete your medical bio to match with the right specialists
                faster.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => {
              navigate("/profile");
            }}
            className="text-xs whitespace-nowrap bg-white dark:bg-[#253636] hover:bg-gray-50 dark:hover:bg-[#2f4040] text-med-dark dark:text-gray-200 border border-gray-200 dark:border-gray-600 font-semibold px-4 py-2 rounded-lg transition-all shadow-sm"
          >
            Complete Profile
          </button>
        </div>
      )}

      <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl p-4 shadow-sm border border-[#e5e7eb] dark:border-[#2a3838]">
        <div className="flex gap-4">
          {/* User Avatar */}
          <div
            className={`bg-center bg-no-repeat bg-cover rounded-full size-12 shrink-0 border border-gray-100 dark:border-gray-700 transition-opacity ${
              isAnonymous ? "opacity-50 grayscale" : ""
            }`}
            style={{
              backgroundImage: isAnonymous
                ? 'url("https://cdn-icons-png.flaticon.com/512/149/149071.png")'
                : `url("${profileImage}")`,
            }}
          ></div>

          <div className="flex-1 space-y-3">
            {/* Title Input */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent text-lg font-bold text-med-dark dark:text-white placeholder:text-gray-400 border-b border-gray-100 dark:border-gray-700 focus:border-primary outline-none px-1 pb-2 transition-colors"
              placeholder="Title (e.g., Persistent headache for 3 days)"
            />

            {/* Body Textarea */}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-med-gray dark:bg-[#253636] rounded-xl p-3 text-sm min-h-[80px] border-none focus:ring-1 focus:ring-primary/50 resize-none placeholder:text-med-text-secondary dark:placeholder:text-gray-500 text-med-dark dark:text-white transition-all"
              placeholder={
                isAnonymous
                  ? "Describe your symptoms anonymously..."
                  : "Describe your symptoms... What are you feeling?"
              }
            ></textarea>

            {/* Stream & Tag Inputs */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Stream Selector */}
              <select
                value={selectedStream}
                onChange={(e) => setSelectedStream(e.target.value)}
                className="px-3 py-2 bg-med-gray dark:bg-[#253636] rounded-lg text-xs font-medium text-med-dark dark:text-gray-300 border border-transparent focus:border-primary/50 outline-none cursor-pointer w-full sm:w-1/2"
              >
                <option value="">Select Category (Stream)</option>
                {MEDICAL_STREAMS.map((stream) => (
                  <option key={stream} value={stream}>
                    {stream}
                  </option>
                ))}
              </select>

              {/* Tag Input */}
              <input
                type="text"
                onKeyDown={handleTagInput}
                placeholder="Add tags (e.g., #chestpain, press Enter)"
                className="px-3 py-2 bg-med-gray dark:bg-[#253636] rounded-lg text-xs font-medium text-med-dark dark:text-white placeholder:text-med-text-secondary dark:placeholder:text-gray-500 border border-transparent focus:border-primary/50 outline-none w-full sm:w-1/2"
              />
            </div>

            {/* Severity Selector */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-med-text-secondary dark:text-gray-400 font-medium">Severity:</span>
              <div className="flex gap-1">
                {SEVERITY_LEVELS.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setSeverity(level.value)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      severity === level.value
                        ? `${level.color} ${level.bg} border-2 border-current`
                        : "text-med-text-secondary dark:text-gray-400 hover:bg-med-gray dark:hover:bg-[#253636]"
                    }`}
                  >
                    {level.value}
                  </button>
                ))}
              </div>
            </div>

            {/* Location Input (shown when toggled) */}
            {addLocation && (
              <div className="mt-2">
                <input
                  type="text"
                  value={postLocation}
                  onChange={(e) => setPostLocation(e.target.value)}
                  placeholder="Enter your location (city, area, etc.)"
                  className="w-full px-3 py-2 bg-med-gray dark:bg-[#253636] rounded-lg text-xs font-medium text-med-dark dark:text-white placeholder:text-med-text-secondary dark:placeholder:text-gray-500 border border-transparent focus:border-primary/50 outline-none"
                />
              </div>
            )}

            {/* Display Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center bg-primary/10 text-black dark:text-white font-bold text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-primary/70 hover:text-primary"
                    >
                      <span className="material-symbols-outlined text-2xl">
                        close
                      </span>
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Multiple Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Upload preview ${index + 1}`}
                      className="h-20 w-20 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[12px] block">
                        close
                      </span>
                    </button>
                    {index === 0 && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-1 rounded">
                        Cover
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              multiple
              hidden
            />

            {/* Toolbar */}
            <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700/50">
              <div className="flex gap-2">
                <button
                  onClick={handleImageClick}
                  className="p-2 rounded-lg hover:bg-med-gray dark:hover:bg-[#253636] text-med-text-secondary dark:text-gray-400 transition-colors relative"
                  title={selectedImages.length > 0 ? `${selectedImages.length} images selected` : "Add images (up to 5)"}
                >
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      selectedImages.length > 0 ? "text-primary" : ""
                    }`}
                  >
                    image
                  </span>
                  {selectedImages.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                      {selectedImages.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setAddLocation(!addLocation)}
                  className={`p-2 rounded-lg hover:bg-med-gray dark:hover:bg-[#253636] transition-colors ${
                    addLocation
                      ? "text-red-500 bg-red-50 dark:bg-red-900/20"
                      : "text-med-text-secondary dark:text-gray-400"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    location_on
                  </span>
                </button>
                <button
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className={`flex items-center gap-1 px-2 rounded-lg hover:bg-med-gray dark:hover:bg-[#253636] transition-colors text-xs font-medium ${
                    isAnonymous
                      ? "text-primary bg-primary/10"
                      : "text-med-text-secondary dark:text-gray-400"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isAnonymous ? "visibility_off" : "visibility"}
                  </span>
                  {isAnonymous ? "Anonymous On" : "Post Anonymously"}
                </button>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!description.trim() || !title.trim() || isSubmitting}
                className={`px-6 py-2 font-semibold text-sm rounded-lg transition-all 
              ${
                !description.trim() || !title.trim() || isSubmitting
                  ? "bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90 text-med-dark shadow-md hover:shadow-lg"
              }`}
              >
                {isSubmitting 
    ? (initialData ? "Updating..." : "Posting...") 
    : (initialData ? "Update Post" : "Post")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;
