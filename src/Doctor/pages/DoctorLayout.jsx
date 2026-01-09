import { Outlet } from "react-router-dom";
 import Header from "../../User/components/Header";
import DoctorSidebar from "../components/DoctorSidebar";
import { ToastContainer ,toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function DoctorLayout() {

   

  return (
    // MAIN WRAPPER
    <div className="flex flex-col h-screen w-full bg-[#F2F4F7] overflow-hidden text-gray-800  bg-white dark:bg-[#1a2c2c]">
       <ToastContainer
  position="bottom-right"
  autoClose={3000}
  hideProgressBar={true} // Hide default progress bar if you want clean look
  newestOnTop={false}
  closeOnClick={false} // Important: set false because we have a custom close button
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
  // These styles strip away the default white box so ONLY your component shows
  toastClassName={() => "relative flex p-0 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"}
  bodyClassName={() => "flex text-sm font-white font-med block"}
  style={{ width: "auto", background: "none", boxShadow: "none" }} 
/>
      {/* 1. HEADER */}
      <div className="w-full h-[72px] shrink-0 bg-white border-b border-gray-200 z-50">
        <Header />
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