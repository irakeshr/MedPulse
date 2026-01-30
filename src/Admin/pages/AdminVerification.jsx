import React from 'react';
import { useState,useEffect } from 'react';
import { getAllDoctorsProfile, VerifyDoctor } from '../../server/allApi';
import { formatDistanceToNow, isValid } from "date-fns";
import { toast } from 'react-toastify';
import CustomToast from '../../components/CustomToast';


// --- MOCK DATA ---
const STATS = [
  { label: "Pending Review", value: 14, icon: "pending_actions", color: "blue" },
  { label: "Approved This Week", value: 42, icon: "verified", color: "green" },
  { label: "Rejected Requests", value: 5, icon: "block", color: "red" }
];
 

export default function AdminVerification() {
    const [doctorProfile, setDoctorProfile] = useState([]);
  
    
      const fetchDoctorProfile=async()=>{
   try {
          const respond = await getAllDoctorsProfile();
          console.log(respond)
   setDoctorProfile(respond.data.doctors); // Assuming the doctors array is in respond.data.doctors
   } catch (error) {
   console.error("Error fetching doctor profiles:", error);
   }
      };
      useEffect(()=>{
      fetchDoctorProfile();
    },[])

  // Helper: Status Badge Styles



  // Doctor Verification 

  const handleVerification = async (doctorId,status)=>{

    try {
      console.log(doctorId,status);
      
      const respond = await  VerifyDoctor(doctorId,{status:status})

      if(respond.status==200){
         toast(
          <CustomToast
            title={`${status}`}
            message={respond?.data?.message}
            type= {status == "verified" ? "success" :"error"}
          />
        );

        fetchDoctorProfile();
      }
      
    } catch (error) {
      <CustomToast
            title={`${status}`}
            message={error?.respond?.message}
            type= {status == "verified" ? "success" :"error"}
          />
      console.error(error);
      
    }

  }
 

  return (
    <div className="bg-background-light dark:bg-background-dark text-med-dark dark:text-white font-display transition-colors duration-200 min-h-screen w-full flex flex-col">
      
      {/* Mobile Header (Optional placeholder if needed on mobile) */}
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

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col w-full  h-100px-4 lg:px-8 py-8 gap-6 overflow-y-auto">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl font-bold text-med-dark dark:text-white">Doctor Verification</h1>
            <p className="text-med-text-secondary dark:text-gray-400 text-sm mt-1">Review and approve medical professional credentials to maintain platform integrity.</p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#253636] border border-[#e5e7eb] dark:border-[#2a3838] rounded-lg">
              <span className="material-symbols-outlined text-med-text-secondary text-[20px]">filter_list</span>
              <select className="bg-transparent border-none text-sm font-medium text-med-dark dark:text-white p-0 focus:ring-0 cursor-pointer">
                <option>All Statuses</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-med-dark dark:bg-primary text-white dark:text-med-dark rounded-lg text-sm font-medium hover:bg-med-dark/90 transition-colors">
              <span className="material-symbols-outlined text-[20px]">history</span>
              Audit Log
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1  md:grid-cols-3 gap-6 mb-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-[#1a2c2c] p-5 rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm flex items-center gap-4">
              <div className={`p-3 rounded-xl 
                ${stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : ''}
                ${stat.color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : ''}
                ${stat.color === 'red' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : ''}
              `}>
                <span className="material-symbols-outlined text-[28px]">{stat.icon}</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-med-text-secondary uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl font-bold text-med-dark dark:text-white">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Table */}
        <div className="bg-white mb-4 dark:bg-[#1a2c2c] h-[600px] rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm flex flex-col">
          
          {/* Table Header Controls */}
          <div className="p-5 border-b border-[#e5e7eb] dark:border-[#2a3838] flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <h3 className="font-bold text-med-dark dark:text-white text-lg">Verification Requests</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-med-text-secondary">Sort by:</span>
              <select className="bg-med-gray dark:bg-[#253636] border-none rounded-lg text-sm text-med-dark dark:text-white py-1.5 pl-3 pr-8 focus:ring-1 focus:ring-primary cursor-pointer">
                <option>Date Submitted (Newest)</option>
                <option>Date Submitted (Oldest)</option>
                <option>Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Table */}
         <div className="xl:col-span-2 mb-5 bg-white dark:bg-[#1a2c2c] rounded-2xl border border-[#e5e7eb] dark:border-[#2a3838] shadow-sm flex flex-col">
              <div className="p-5 border-b border-[#e5e7eb] dark:border-[#2a3838] flex justify-between items-center">
                <h3 className="font-bold text-med-dark dark:text-white">Pending Doctor Verifications</h3>
                <a className="text-xs font-bold text-primary hover:text-primary-dark uppercase tracking-wide" href="#">View All</a>
              </div>
              <div className="p-0 overflow-x-auto scrollbar-hide">
                <table className="w-full text-left text-sm">
                  <thead className="bg-med-gray dark:bg-[#253636] text-med-text-secondary dark:text-gray-400 text-xs uppercase font-semibold">
                    <tr>
                      <th className="px-6 py-4 rounded-tl-lg">Doctor Name</th>
                      <th className="px-6 py-4">Specialty</th>
                      <th className="px-6 py-4">License ID</th>
                      <th className="px-6 py-4">Submitted</th>
                      <th className="px-6 py-4 rounded-tr-lg text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e7eb] dark:divide-[#2a3838]">
                    {/* Row 1 */}
                    {doctorProfile?.map((value,index)=>{
                      return(
                        value.licenseNumber !=="N/A"?(
 <tr key={index} className="hover:bg-med-gray/30 dark:hover:bg-[#253636]/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-center bg-no-repeat bg-cover rounded-full size-8" style={{ backgroundImage:`url("${value.profileImage}")`}}></div>
                          <div>
                            <div className="font-semibold text-med-dark dark:text-white">{value.fullName}</div>
                            <div className="text-xs text-med-text-secondary"> {value.user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-med-dark dark:text-gray-300">{value.specialization}</td>
                      <td className="px-6 py-4 font-mono text-xs text-med-text-secondary">{value.licenseNumber}</td>
                      <td className="px-6 py-4 text-med-text-secondary">

                        {value.updatedAt && isValid(new Date(value.updatedAt))
                                                                            ? formatDistanceToNow(new Date(value.updatedAt), {
                                                                                addSuffix: true,
                                                                              })
                                                                            : "N/A"} 
                      </td>
<td className="px-6 py-4">
  <div className="flex items-center justify-end gap-2">
    {/* Pending State: Accept or Reject */}
    {value.verificationStatus === "pending" && (
      <>
        <button 
          className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors" 
          title="Accept Doctor" 
          onClick={() => handleVerification(value._id, "verified")}
        >
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
        </button>
        <button 
          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" 
          title="Reject Doctor" 
          onClick={() => handleVerification(value._id, "rejected")}
        >
          <span className="material-symbols-outlined text-[20px]">cancel</span>
        </button>
      </>
    )}
    
    {/* Rejected State: Delete and Request Resubmit */}
    {value.verificationStatus === "rejected" && (
      <>
        <button 
          className="p-1.5 rounded-lg text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
          title="Request Resubmission"
          onClick={() => handleResubmitRequest(value._id)}
        >
          <span className="material-symbols-outlined text-[20px]">refresh</span>
        </button>
        <button
          onClick={() => VerifyDoctor(value._id, value.username)}
          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          title="Delete Doctor"
        >
          <span className="material-symbols-outlined text-[20px]">delete</span>
        </button>
      </>
    )}
    
    {/* Verified State: Show Verified Tick */}
    {value.verificationStatus === "verified" && (
      <div className="p-1.5 text-green-600" title="Verified Doctor">
        <span className="material-symbols-outlined text-[20px]">verified</span>
      </div>
    )}
    
    {/* View Details - Always Visible */}
    <button 
      className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors ml-1" 
      title="View Details"
    >
      <span className="material-symbols-outlined text-[20px]">visibility</span>
    </button>
  </div>
</td>
                    </tr>
                        ):null

                      )
                    })}
                   
                    {/* Row 2 */}
                   
                  </tbody>
                </table>
              </div>
            </div>
          {/* Pagination */}
    
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 mt-5 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-6 flex items-start gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-800/40 rounded-full text-blue-600 dark:text-blue-300 shrink-0">
            <span className="material-symbols-outlined">security</span>
          </div>
          <div>
            <h4 className="font-bold text-med-dark dark:text-white text-lg">Verification Guidelines</h4>
            <p className="text-sm text-med-text-secondary dark:text-gray-400 mt-1 max-w-3xl">
              Ensure all submitted documents match the doctor's profile information. Verify medical license numbers against the national database. For international applicants, follow the specific cross-border verification protocol outlined in the admin handbook.
            </p>
            <button className="mt-3 text-sm font-bold text-primary hover:text-primary-dark hover:underline">Read Admin Handbook</button>
          </div>
        </div>

      </main>
    </div>
  );
}