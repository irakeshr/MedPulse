import { Outlet } from "react-router-dom";
import DoctorSidebar from "../components/DoctorSidebar";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import Header from "../components/DoctorHeader";
import DoctorHeader from "../components/DoctorHeader";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkDoctorStatus } from "../../server/allApi";


import CustomToast from "../../components/CustomToast";
import { checkVerification } from "../../redux/doctorSlicer";


export default function DoctorLayout() {
  const dispatch = useDispatch();

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
            message={error.response?.data?.message || "An unexpected error occurred while checking verification status."}
            type="error"
          />
        );
      }
    }
    checkStatus(); // Call the async function
  }, [dispatch]);

  return (
    // MAIN WRAPPER
    <div className="flex flex-col h-screen w-full bg-[#F2F4F7] overflow-hidden text-gray-800  bg-white dark:bg-[#1a2c2c]">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="!bg-transparent !shadow-none !p-0 !min-h-0"
        bodyClassName="!bg-transparent !p-0 !m-0"
      />
      {/* 1. HEADER */}
      <div className="w-full h-[72px] shrink-0 bg-white border-b border-gray-200 z-50">
        <DoctorHeader />
      </div>

      {/* 2. CONTENT AREA */}
      <div className="flex flex-1 overflow-hidden w-full max-w-[1600px] mx-auto">

        {/* LEFT SIDEBAR (Static) */}
        <div className="hidden lg:block w-64 h-full shrink-0 overflow-y-auto scrollbar-hide">
          <DoctorSidebar />
        </div>

        {/* CENTER CONTENT (Dynamic) */}
        <main className="flex-1 h-full overflow-y-auto scrollbar-hide relative">
          {/* UPDATED: Changed max-w from 720px to 1200px (max-w-7xl).
              Since the "Right Side" is now inside the pages, we need 
              more room here to fit both the Feed AND the new Right Sidebar.
           */}
          <div className="w-full max-w-[1200px] mx-auto py-4 px-3 lg:px-8 ">
            <Outlet />
          </div>
        </main>

        {/* REMOVED: Right Sidebar Layout Block */}

      </div>
    </div>
  );
}