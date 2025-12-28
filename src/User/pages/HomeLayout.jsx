import { Outlet } from "react-router-dom";
import Header from "../components/Header"; 
import UserSideBar from "../components/UserSideBar"; 
 import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AdminLayout() {
  return (
    // MAIN WRAPPER
    <div className=" flex flex-col h-screen w-full bg-[#F2F4F7] overflow-hidden text-gray-800  bg-white dark:bg-[#1a2c2c]">

      <ToastContainer position="bottom-right" autoClose={3000}  
      className="!z-[9999]" // Force it to be on top of everything
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
      
      {/* 1. HEADER */}
      <div className="w-full h-[72px] shrink-0 bg-white border-b border-gray-200 z-50">
        <Header />
      </div>

      {/* 2. CONTENT AREA */}
      <div className="flex flex-1 overflow-hidden w-full max-w-[1600px] mx-auto">
        
        {/* LEFT SIDEBAR (Static) */}
        <div className="hidden lg:block w-64 h-full shrink-0 overflow-y-auto scrollbar-hide">
          <UserSideBar />
        </div>

        {/* CENTER CONTENT (Dynamic) */}
        <main className="flex-1 h-full overflow-y-auto scrollbar-hide relative">
       
           <div className="w-full max-w-[1200px] mx-auto py-6 px-4 lg:px-8">
              <Outlet />
           </div>
        </main>

        {/* REMOVED: Right Sidebar Layout Block */}

      </div>
    </div>
  );
}