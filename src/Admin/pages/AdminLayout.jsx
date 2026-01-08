import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
     
 import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 function AdminLayout() {
  return (
    // MAIN WRAPPER
    <div className=" flex flex-col h-screen w-full bg-[#F2F4F7] overflow-hidden text-gray-800  bg-white dark:bg-background-dark ">

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
  toastClassName={() => "relative flex p-0 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"}
  bodyClassName={() => "flex text-sm font-white font-med block"}
  style={{ width: "auto", background: "none", boxShadow: "none" }} 
/>
      
      {/* 1. HEADER */}
      <div className="w-full h-[72px] shrink-0 bg-white border-b border-gray-200 z-50">
         <AdminHeader/>
      </div>

      {/* 2. CONTENT AREA */}
      <div className="flex flex-1 overflow-hidden w-full max-w-[1600px] mx-auto">
        
        {/* LEFT SIDEBAR (Static) */}
        <div className="hidden lg:block w-64 h-full shrink-0 overflow-y-auto scrollbar-hide">
        <AdminSidebar/>
        </div>

        {/* CENTER CONTENT (Dynamic) */}
        <main className="flex-1 h-full overflow-y-auto scrollbar-hide relative">
       
           <div className="w-full max-w-[1200px] mx-auto py-6 px-4 lg:px-2">
              <Outlet />
           </div>
        </main>

        {/* REMOVED: Right Sidebar Layout Block */}

      </div>
    </div>
  );
}

export default AdminLayout;