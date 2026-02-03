import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOneDoctor } from '../../server/allApi';

const AppointmentBooking = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const doctorDetails = async () => {
      try {
        const respond = await fetchOneDoctor(doctorId);
        console.log(respond)
        setDoctor(respond.data.doctor);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (doctorId) doctorDetails();
  }, [doctorId]);
  
 

  const calendarDates = [
    { day: "Mon", date: "16", status: "active" },
    { day: "Tue", date: "17", status: "default" },
    { day: "Wed", date: "18", status: "default" },
    { day: "Thu", date: "19", status: "default" },
    { day: "Fri", date: "20", status: "default" },
    { day: "Sat", date: "21", status: "disabled" },
    { day: "Sun", date: "22", status: "disabled" },
  ];

  // Combined Morning & Evening slots into one array
  const timeSlots = [
    { time: "09:00 AM", status: "available" },
    { time: "09:30 AM", status: "hospital_duty" }, // Special status
    { time: "10:00 AM", status: "selected" },      // Currently selected
    { time: "10:30 AM", status: "available" },
    { time: "11:00 AM", status: "available" },
    { time: "01:30 PM", status: "available" },
    { time: "02:00 PM", status: "available" },
    { time: "02:30 PM", status: "hospital_duty" },
    { time: "03:30 PM", status: "unavailable" },
    { time: "04:00 PM", status: "available" },
  ];

  console.log(doctor)

  return (
    <div className="bg-white dark:bg-background-dark text-med-dark dark:text-white font-display overflow-x-hidden transition-colors duration-200">
      <div className="relative flex min-h-screen w-full flex-col">
        
        <main className="layout-container flex grow justify-center w-full max-w-[1200px] mx-auto px-4 lg:px-5     py-8">
          <div className="flex flex-col lg:flex-row gap-8 w-full">
            
            {/* --- Left Sidebar: Doctor Profile --- */}
            <aside className="w-full lg:w-80 shrink-0">
              <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl p-6 shadow-sm border border-[#e5e7eb] dark:border-[#2a3838] sticky top-[100px]">
                
                {/* Profile Header */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative mb-4">
                    <div className="size-24 rounded-full border-4 border-primary/20 overflow-hidden">
                      <div
                        className="w-full h-full bg-center bg-no-repeat bg-cover"
                        style={{ backgroundImage: `url("${doctor.profileImage}")` }}
                      ></div>
                    </div>
                    {doctor.isVerified && (
                      <div className="absolute bottom-1 right-1 bg-white dark:bg-[#1a2c2c] rounded-full p-1 shadow-sm border border-gray-100 dark:border-gray-800">
                        <span className="material-symbols-outlined text-primary fill text-[18px]">verified</span>
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-med-dark dark:text-white">{doctor.displayName}</h2>
                  <p className="text-sm text-med-text-secondary dark:text-gray-400 font-medium">{doctor.role}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="material-symbols-outlined text-yellow-400 fill text-[18px]">star</span>
                    <span className="text-sm font-bold text-med-dark dark:text-white">{doctor.rating}</span>
                    <span className="text-xs text-med-text-secondary dark:text-gray-500">({doctor.reviews} Reviews)</span>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="space-y-4 pt-4 border-t border-med-gray dark:border-[#2a3838]">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-med-text-secondary dark:text-gray-500 mb-1">Experience</h4>
                    <p className="text-sm text-med-dark dark:text-gray-300 font-medium">{doctor.experienceYears}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-med-text-secondary dark:text-gray-500 mb-1">Hospital</h4>
                    <p className="text-sm text-med-dark dark:text-gray-300 font-medium">N/A</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-med-text-secondary dark:text-gray-500 mb-1">Consultation Fee</h4>
                    <p className="text-sm text-med-dark dark:text-gray-300 font-medium font-bold text-primary">{doctor.fee}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <a className="text-xs font-bold text-primary hover:underline flex items-center justify-center gap-1" href="#">
                    <span className="material-symbols-outlined text-sm">visibility</span>
                    View Detailed Profile
                  </a>
                </div>
              </div>
            </aside>

            {/* --- Right Content: Booking Area --- */}
            <div className="flex-1">
              <div className="mb-6">
                <button className="flex items-center text-sm text-med-text-secondary hover:text-primary transition-colors mb-2">
                  <span className="material-symbols-outlined text-lg">chevron_left</span>
                  Back to Profile
                </button>
                <h1 className="text-2xl font-bold text-med-dark dark:text-white">Select Appointment Slots</h1>
                <p className="text-med-text-secondary dark:text-gray-400 mt-1">Available slots based on {doctor.displayName}'s schedule</p>
              </div>

              <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl shadow-sm border border-[#e5e7eb] dark:border-[#2a3838] overflow-hidden mb-8">
                
                {/* Calendar Navigation */}
                <div className="flex items-center justify-between p-4 border-b border-med-gray dark:border-[#2a3838]">
                  <div className="flex items-center gap-3">
                    <button className="p-2 rounded-full hover:bg-med-gray dark:hover:bg-[#253636] transition-colors">
                      <span className="material-symbols-outlined">arrow_back_ios</span>
                    </button>
                    <h3 className="font-bold text-med-dark dark:text-white">October 2023</h3>
                    <button className="p-2 rounded-full hover:bg-med-gray dark:hover:bg-[#253636] transition-colors">
                      <span className="material-symbols-outlined">arrow_forward_ios</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                    <span className="material-symbols-outlined text-primary text-sm">event_note</span>
                    <span className="text-xs font-bold text-med-dark dark:text-primary uppercase tracking-tight">Slots updated weekly</span>
                  </div>
                </div>

                {/* Calendar Days Grid */}
                <div className="grid grid-cols-7 gap-px bg-med-gray dark:bg-[#2a3838] p-4">
                  {calendarDates.map((item, index) => (
                    <div 
                      key={index}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors cursor-pointer
                        ${item.status === 'active' 
                          ? 'bg-primary text-med-dark shadow-md' 
                          : item.status === 'disabled'
                            ? 'opacity-40 cursor-not-allowed'
                            : 'hover:bg-med-gray dark:hover:bg-[#253636] text-med-dark dark:text-white'
                        }`}
                    >
                      <span className={`text-[10px] font-bold uppercase ${item.status === 'active' ? '' : 'text-med-text-secondary'}`}>{item.day}</span>
                      <span className="text-lg font-bold">{item.date}</span>
                      {item.status === 'active' && <span className="size-1 bg-med-dark rounded-full"></span>}
                    </div>
                  ))}
                </div>

                {/* --- SINGLE SLOTS SECTION (Merged) --- */}
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="material-symbols-outlined text-med-text-secondary">schedule</span>
                      <h4 className="font-bold text-med-dark dark:text-white">Available Slots</h4>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {timeSlots.map((slot, index) => {
                        // Logic to render different button styles based on status
                        if (slot.status === 'available') {
                          return (
                            <button key={index} className="py-2.5 px-4 rounded-xl border border-med-gray dark:border-[#2a3838] text-sm font-semibold hover:border-primary hover:bg-primary/5 transition-all text-med-dark dark:text-white">
                              {slot.time}
                            </button>
                          );
                        } else if (slot.status === 'selected') {
                          return (
                            <button key={index} className="py-2.5 px-4 rounded-xl border-2 border-primary bg-primary/10 text-med-dark dark:text-white text-sm font-bold shadow-sm">
                              {slot.time}
                            </button>
                          );
                        } else {
                          // For hospital duty / unavailable
                          const label = slot.status === 'hospital_duty' ? 'Hospital Duty' : 'Not Available';
                          return (
                            <div key={index} className="relative group">
                              <button className="w-full py-2.5 px-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 text-med-text-secondary/50 cursor-not-allowed text-sm font-medium">
                                {slot.time}
                              </button>
                              <span className="absolute -top-2 -right-1 px-1.5 py-0.5 bg-gray-400 dark:bg-gray-600 text-[8px] font-bold text-white rounded-md uppercase">
                                {label}
                              </span>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>

                {/* Footer of Booking Card */}
                <div className="bg-primary/5 dark:bg-primary/10 p-6 border-t border-[#e5e7eb] dark:border-[#2a3838]">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white dark:bg-[#1a2c2c] rounded-xl border border-primary/30">
                        <span className="material-symbols-outlined text-primary">event_available</span>
                      </div>
                      <div>
                        <p className="text-xs text-med-text-secondary dark:text-gray-400 font-medium">Selected Slot</p>
                        <p className="font-bold text-med-dark dark:text-white">Monday, Oct 16 • 10:00 AM</p>
                      </div>
                    </div>
                    <button className="w-full md:w-auto px-10 py-4 bg-primary hover:bg-primary/90 text-med-dark font-bold rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                      Book Appointment
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-dashed border-[#e5e7eb] dark:border-[#2a3838] flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">history_edu</span>
                  <div>
                    <h5 className="text-sm font-bold text-med-dark dark:text-white">Insurance Accepted</h5>
                    <p className="text-xs text-med-text-secondary">BlueShield, UnitedHealth, +5 more</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-dashed border-[#e5e7eb] dark:border-[#2a3838] flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">video_camera_front</span>
                  <div>
                    <h5 className="text-sm font-bold text-med-dark dark:text-white">Video Consult</h5>
                    <p className="text-xs text-med-text-secondary">Secure end-to-end encrypted calls</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppointmentBooking;