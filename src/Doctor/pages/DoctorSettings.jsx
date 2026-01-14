import React, { useEffect } from "react";
import { useState } from "react";
import { checkDoctorStatus, PostUserDetails } from "../../server/allApi";
import CustomToast from "../../components/CustomToast";
import { useDispatch, useSelector } from "react-redux";
import { checkVerification } from "../../redux/doctorSlicer";
import { toast } from "react-toastify";

export default function DoctorSettings() {
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);
  const { profile } = useSelector((state) => state.doctor);
  const { verified } = useSelector((state) => state.doctor);
  const isVerified = verified?.isVerified; //is true then dont show any button there.
  const isProfileComplete = verified?.isProfileComplete; //if true show edit data else verify
  const {
    displayName,
    specialization,
    qualifications,
    experienceYears,
    licenseNumber,
    contactNumber,
    profileBio,
    profileImage,
  } = profile.DoctorProfile;

  const [formData, setFormData] = useState({
    displayName: displayName,
    specialization: specialization,
    qualifications: qualifications,
    experienceYears: experienceYears,
    licenseNumber: licenseNumber,
    contactNumber: contactNumber,
    profileBio: profileBio,
    profileImage: null, //there is already image but im not change image just change the username
    prevProfileImage: profileImage,
  });


  console.log(profileImage);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
        prevProfileImage: URL.createObjectURL(file),
      }));
    }
  };

  const formChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async () => {
    if (
      !formData.licenseNumber ||
      !formData.qualifications ||
      !formData.specialization
    ) {
      toast(
        <CustomToast
          title="Error"
          message="Please fill all the fields"
          type="error"
        />,
        {
          position: "top-right",
          bodyClassName: "p-5 m-0",
          closeButton: false,
        }
      );
      return;
    }
    setUpdating(true);
    const fd = new FormData();
    for (let key in formData) {
      if (key !== "profileImage") {
        fd.append(key, formData[key]);
      } else {
        fd.append(key, formData[key]);
      }
    }

    try {
      const respond = await PostUserDetails(fd);
      console.log(respond);
      if (respond.status === 200) {
        setUpdating(false);

        return toast(
          <CustomToast
            title="Updated Profile Successfully"
            message=""
            type="success"
          />,
          {
            position: "bottom-right",
            bodyClassName: "p-5 m-0",
            closeButton: false,
          }
        );
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setUpdating(false);
      toast(
        <CustomToast
          title="Error"
          message="Failed to update profile."
          type="error"
        />,
        {
          position: "bottom-right",
          bodyClassName: "p-5 m-0",
          closeButton: false,
        }
      );
    }
  };

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const respond = await checkDoctorStatus();
        if (respond.status == 200) {
          dispatch(checkVerification(respond.data));
        }
      } catch (error) {
        toast(
          <CustomToast
            title="Verification Failed"
            message={
              error.response?.data?.message ||
              "An unexpected error occurred while checking verification status."
            }
            type="error"
          />
        );
      }
    };
    checkStatus(); // Call the async function
  }, [dispatch]);

  return (
    <div className="bg-white dark:bg-background-dark text-[#111818] dark:text-white font-display transition-colors duration-200 h-screen w-full flex flex-col">
      {/* Mobile Header (Visible on small screens) */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-surface-light dark:bg-surface-dark border-b border-[#dbe6e6] dark:border-[#2a3c3c]">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[20px]">
              cardiology
            </span>
          </div>
          <span className="font-bold text-lg dark:text-white">MedPulse</span>
        </div>
        <button className="p-2 text-[#111818] dark:text-white">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-6 lg:py-8 scrollbar-hide">
          <div className="mx-auto max-w-5xl flex flex-col gap-8">
            {/* Page Header & Actions */}
            <div className="flex items-center justify-between c">
              <div>
                <h1 className="text-[#111818] dark:text-white text-3xl font-black tracking-tight mb-1">
                  Account Settings
                </h1>
                <p className="text-secondary dark:text-gray-400">
                  Manage your public profile and account preferences.
                </p>
              </div>
              <div className="flex gap-3">
                <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-[#dbe6e6] rounded-xl text-sm font-bold text-secondary dark:bg-[#1f3333] dark:border-[#2a3c3c] dark:text-white hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button className="flex items-center gap-2 px-6 py-2 bg-primary text-[#085555] rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark hover:text-white transition-all">
                  <span className="material-symbols-outlined text-[20px]">
                    save
                  </span>
                  <button onClick={handleSubmit} disabled={updating}>
                    {updating ? "Updating..." : "Save Changes"}
                  </button>
                </button>
              </div>
            </div>

            {/* Settings Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 ">
              {/* Left Navigation (Sticky) */}
               

              {/* Right Content Forms */}
              <div className="lg:col-span-9 flex  flex-col gap-6">
                {/* SECTION: Profile Info */}

                <section className="bg-white dark:bg-[#1a2c2c] rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] p-6 shadow-sm">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6 border-b border-[#e5e7eb] dark:border-[#2a3838] pb-4">
                    <div className="p-2 bg-med-gray dark:bg-[#253636] rounded-lg">
                      <span
                        className="material-symbols-outlined text-primary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        badge
                      </span>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-med-dark dark:text-white">
                        Professional Information
                      </h2>
                      <p className="text-xs text-med-text-secondary">
                        Manage your public profile and verified medical
                        credentials.
                      </p>
                    </div>
                  </div>

                  {/* Profile Photo */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative w-24 h-24 rounded-full border border-[#e5e7eb] dark:border-[#2a3838] overflow-hidden bg-med-gray/50 dark:bg-[#253636]">
                      {formData.prevProfileImage ? (
                        <img
                          src={formData.prevProfileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-med-text-secondary text-sm">
                          No Photo
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block">
                        <span className="sr-only">Upload profile photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="profilePhoto"
                        />
                        <label
                          htmlFor="profilePhoto"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium cursor-pointer hover:opacity-90 transition"
                        >
                          <span className="material-symbols-outlined text-base">
                            photo_camera
                          </span>
                          Upload Photo
                        </label>
                      </label>
                      <p className="text-[10px] text-med-text-secondary mt-2">
                        JPG or PNG. Recommended square image.
                      </p>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Display Name */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold uppercase mb-2">
                        Display Name
                      </label>
                      <input
                        type="text"
                        name="displayName"
                        value={formData.displayName}
                        onChange={formChange}
                        defaultValue="MedPulse Doctor"
                        className="w-full rounded-xl bg-med-gray/50 dark:bg-[#253636] border-gray-200 dark:border-[#2a3838] text-sm py-2.5 px-4"
                      />
                    </div>

                    {/* Specialization */}
                    <div>
                      <label className="block text-xs font-semibold uppercase mb-2">
                        Specialization
                      </label>
                      <select
                        defaultValue="Cardiology"
                        name="specialization"
                        value={formData.specialization}
                        onChange={formChange}
                        className="w-full rounded-xl bg-med-gray/50 dark:bg-[#253636] border-gray-200 dark:border-[#2a3838] text-sm py-2.5 px-4"
                      >
                        <option>Cardiology</option>
                        <option>Neurology</option>
                        <option>Dermatology</option>
                        <option>Pediatrics</option>
                        <option>General Practice</option>
                      </select>
                    </div>

                    {/* Experience */}
                    <div>
                      <label className="block text-xs font-semibold uppercase mb-2">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        defaultValue="12"
                        min="0"
                        name="experienceYears"
                        value={formData.experienceYears}
                        onChange={formChange}
                        className="w-full rounded-xl bg-med-gray/50 dark:bg-[#253636] border-gray-200 dark:border-[#2a3838] text-sm py-2.5 px-4"
                      />
                    </div>

                    {/* Professional Bio */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold uppercase mb-2">
                        Professional Bio
                      </label>
                      <textarea
                        name="profileBio"
                        value={formData.profileBio}
                        onChange={formChange}
                        rows={3}
                        placeholder="Brief overview of your medical experience and patient-care approach"
                        className="w-full rounded-xl bg-med-gray/50 dark:bg-[#253636] border-gray-200 dark:border-[#2a3838] text-sm py-3 px-4 resize-none"
                      />
                    </div>

                    {/* Qualifications */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold uppercase mb-2">
                        Qualifications
                      </label>
                      <input
                        value={formData.qualifications}
                        name="qualifications"
                        onChange={formChange}
                        type="text"
                        defaultValue="MBBS, MD (Cardiology), FACC"
                        className="w-full rounded-xl bg-med-gray/50 dark:bg-[#253636] border-gray-200 dark:border-[#2a3838] text-sm py-2.5 px-4"
                      />
                    </div>

                    {/* License */}
                    <div>
                      <label className="block text-xs font-semibold uppercase mb-2">
                        License Number
                      </label>
                      <input
                        value={formData.licenseNumber}
                        name="licenseNumber"
                        onChange={formChange}
                        type="text"
                        defaultValue="MED-NY-88421"
                        className="w-full rounded-xl bg-med-gray/50 dark:bg-[#253636] border-gray-200 dark:border-[#2a3838] text-sm py-2.5 px-4"
                      />
                      <p className="text-[10px] text-med-text-secondary mt-1">
                        Private & used for verification only.
                      </p>
                    </div>

                    {/* Contact */}
                    <div>
                      <label className="block text-xs font-semibold uppercase mb-2">
                        Contact Number
                      </label>
                      <input
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={formChange}
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="w-full rounded-xl bg-med-gray/50 dark:bg-[#253636] border-gray-200 dark:border-[#2a3838] text-sm py-2.5 px-4"
                      />
                    </div>
                  </div>

                  {/* --- ACTION BUTTON LOGIC --- */}
                  {!verified?.isVerified && (
                    <div className="mt-8 pt-6 border-t border-[#e5e7eb] dark:border-[#2a3838] flex justify-center">
                      {verified?.isProfileComplete ? (
                        <button
                          onClick={handleSubmit}
                          disabled={updating}
                          
                          className="flex items-center gap-2 px-8 py-3 bg-med-dark dark:bg-white text-white dark:text-med-dark rounded-xl text-sm font-bold shadow-lg hover:opacity-90 transition-all"
                        >
                          <span className="material-symbols-outlined">
                            save
                          </span>
                          {updating ? "Sending..." : "Save Changes"}
                          
                        </button>
                      ) : (
                        <button className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all">
                          <span className="material-symbols-outlined">
                            verified
                          </span>
                          {updating ? "Sending..." : "Send to Verify"}
                          
                        </button>
                      )}
                    </div>
                  )}
                </section>

                {/* SECTION: Availability */}
                <section
                  className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 md:p-8 shadow-card border border-[#dbe6e6] dark:border-[#2a3c3c]"
                  id="availability"
                >
                  <h3 className="text-xl font-bold text-[#111818] dark:text-white mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                      calendar_clock
                    </span>
                    Availability & Scheduling
                  </h3>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#f0f4f4] dark:bg-[#1f3333] mb-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#111818] dark:text-white">
                        Accepting New Patients
                      </span>
                      <span className="text-xs text-secondary dark:text-gray-400">
                        Toggle this off to pause new consultation requests.
                      </span>
                    </div>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                      <input
                        defaultChecked
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-[#dbe6e6]"
                        id="toggle-patients"
                        name="toggle"
                        type="checkbox"
                      />
                      <label
                        className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                        htmlFor="toggle-patients"
                      ></label>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 border border-[#dbe6e6] rounded-xl dark:border-[#2a3c3c]">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-sm text-[#111818] dark:text-white">
                          Monday - Friday
                        </span>
                        <div className="relative inline-block w-8 align-middle select-none">
                          <input
                            defaultChecked
                            className="checked:bg-primary w-4 h-4 rounded text-primary focus:ring-0"
                            type="checkbox"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <input
                          className="rounded-lg border-[#dbe6e6] bg-[#f6f8f8] text-xs font-medium dark:bg-[#152626] dark:border-[#2a3c3c]"
                          type="time"
                          defaultValue="09:00"
                        />
                        <span className="text-secondary">to</span>
                        <input
                          className="rounded-lg border-[#dbe6e6] bg-[#f6f8f8] text-xs font-medium dark:bg-[#152626] dark:border-[#2a3c3c]"
                          type="time"
                          defaultValue="17:00"
                        />
                      </div>
                    </div>
                    <div className="p-4 border border-[#dbe6e6] rounded-xl dark:border-[#2a3c3c] opacity-60">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-sm text-[#111818] dark:text-white">
                          Weekends
                        </span>
                        <div className="relative inline-block w-8 align-middle select-none">
                          <input
                            className="checked:bg-primary w-4 h-4 rounded text-primary focus:ring-0"
                            type="checkbox"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <input
                          className="rounded-lg border-[#dbe6e6] bg-gray-100 text-xs font-medium dark:bg-[#1a2c2c] dark:border-[#2a3c3c]"
                          disabled
                          type="time"
                          defaultValue="10:00"
                        />
                        <span className="text-secondary">to</span>
                        <input
                          className="rounded-lg border-[#dbe6e6] bg-gray-100 text-xs font-medium dark:bg-[#1a2c2c] dark:border-[#2a3c3c]"
                          disabled
                          type="time"
                          defaultValue="14:00"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* SECTION: Notifications */}
                <section
                  className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 md:p-8 shadow-card border border-[#dbe6e6] dark:border-[#2a3c3c]"
                  id="notifications"
                >
                  <h3 className="text-xl font-bold text-[#111818] dark:text-white mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                      notifications_active
                    </span>
                    Notifications
                  </h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between pb-4 border-b border-[#f0f4f4] dark:border-[#2a3c3c]">
                      <div>
                        <p className="font-bold text-sm text-[#111818] dark:text-white">
                          New Case Alerts
                        </p>
                        <p className="text-xs text-secondary dark:text-gray-400">
                          Receive an email when a patient posts a case matching
                          your specialty.
                        </p>
                      </div>
                      <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                        <input
                          defaultChecked
                          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-[#dbe6e6]"
                          id="toggle-cases"
                          name="toggle"
                          type="checkbox"
                        />
                        <label
                          className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                          htmlFor="toggle-cases"
                        ></label>
                      </div>
                    </div>
                    <div className="flex items-start justify-between pb-4 border-b border-[#f0f4f4] dark:border-[#2a3c3c]">
                      <div>
                        <p className="font-bold text-sm text-[#111818] dark:text-white">
                          Direct Messages
                        </p>
                        <p className="text-xs text-secondary dark:text-gray-400">
                          Notifications for direct inquiries from verified
                          patients.
                        </p>
                      </div>
                      <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                        <input
                          defaultChecked
                          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-[#dbe6e6]"
                          id="toggle-dm"
                          name="toggle"
                          type="checkbox"
                        />
                        <label
                          className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                          htmlFor="toggle-dm"
                        ></label>
                      </div>
                    </div>
                    <div className="flex items-start justify-between pb-4 border-b border-[#f0f4f4] dark:border-[#2a3c3c]">
                      <div>
                        <p className="font-bold text-sm text-[#111818] dark:text-white">
                          Weekly Performance Digest
                        </p>
                        <p className="text-xs text-secondary dark:text-gray-400">
                          A summary of your case reviews and patient feedback.
                        </p>
                      </div>
                      <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                        <input
                          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-[#dbe6e6]"
                          id="toggle-digest"
                          name="toggle"
                          type="checkbox"
                        />
                        <label
                          className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                          htmlFor="toggle-digest"
                        ></label>
                      </div>
                    </div>
                  </div>
                </section>

                {/* SECTION: Security */}
                <section
                  className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 md:p-8 shadow-card border border-[#dbe6e6] dark:border-[#2a3c3c]"
                  id="security"
                >
                  <h3 className="text-xl font-bold text-[#111818] dark:text-white mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                      shield_lock
                    </span>
                    Account Security
                  </h3>
                  <div className="mb-6">
                    <div className="space-y-4 max-w-md">
                      <div>
                        <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">
                          Current Password
                        </label>
                        <input
                          className="w-full rounded-xl border-[#dbe6e6] bg-[#f6f8f8] px-4 py-2.5 text-sm font-medium text-[#111818] focus:border-primary focus:ring-primary/20 dark:bg-[#152626] dark:border-[#2a3c3c] dark:text-white dark:focus:border-primary transition-all"
                          type="password"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">
                          New Password
                        </label>
                        <input
                          className="w-full rounded-xl border-[#dbe6e6] bg-[#f6f8f8] px-4 py-2.5 text-sm font-medium text-[#111818] focus:border-primary focus:ring-primary/20 dark:bg-[#152626] dark:border-[#2a3c3c] dark:text-white dark:focus:border-primary transition-all"
                          type="password"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">
                          Confirm New Password
                        </label>
                        <input
                          className="w-full rounded-xl border-[#dbe6e6] bg-[#f6f8f8] px-4 py-2.5 text-sm font-medium text-[#111818] focus:border-primary focus:ring-primary/20 dark:bg-[#152626] dark:border-[#2a3c3c] dark:text-white dark:focus:border-primary transition-all"
                          type="password"
                        />
                      </div>
                      <button className="mt-2 px-4 py-2 bg-white border border-[#dbe6e6] text-[#111818] rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 dark:bg-[#1f3333] dark:border-[#2a3c3c] dark:text-white dark:hover:bg-[#253d3d] transition-all">
                        Update Password
                      </button>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-[#f0f4f4] dark:border-[#2a3c3c]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm text-[#111818] dark:text-white">
                          Two-Factor Authentication (2FA)
                        </p>
                        <p className="text-xs text-secondary dark:text-gray-400">
                          Add an extra layer of security to your account.
                        </p>
                      </div>
                      <button className="text-primary-dark font-bold text-sm hover:underline dark:text-primary">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
