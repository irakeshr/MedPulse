import React from "react";
import { Link, useParams } from "react-router-dom";
import { setUserRole } from "../server/allApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomToast from "./CustomToast";
import { ToastContainer } from "react-toastify";

const RoleSelection = () => {
  const navigate = useNavigate();

  const email = useParams();
  console.log(email);
  const handleRole = async (role) => {
    try {
      const response = await setUserRole({ role }); // API call

      if (response.status === 200) {
        console.log(response.data.token)
        localStorage.setItem("token", response.data.token);
        const userRole = response.data.user.role;

        if (userRole === "patient") {
          navigate("/me");
        } else if (userRole === "doctor") {
          navigate("/doctor/dashboard");
        }
      }
    } catch (error) {
      toast(
        <CustomToast
          title="User role updating Failed"
          message={error.message}
          type="error"
        />,
        {
          position: "bottom-right",
          bodyClassName: "p-5 m-0",
          closeButton: false,
        },
      );

      console.error("Role update failed:", error);
    }
  };
  return (
    <div className="bg-background-light dark:bg-background-dark text-med-dark dark:text-white font-display transition-colors duration-200 min-h-screen relative">
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
        toastClassName={() =>
          "relative flex p-0 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
        }
        bodyClassName={() => "flex text-sm font-white font-med block"}
        style={{ width: "auto", background: "none", boxShadow: "none" }}
      />
      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-teal-200/20 dark:bg-teal-900/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        {/* Header Section */}
        <div className="mb-12 flex flex-col items-center">
          <div className="bg-primary/10 p-4 rounded-full text-primary mb-6">
            <svg
              className="w-12 h-12"
              fill="currentColor"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-med-dark dark:text-white mb-3 text-center">
            Welcome to MedPulse!
          </h1>
          <p className="text-med-text-secondary dark:text-gray-400 text-lg max-w-md text-center">
            Let’s set up your experience. How would you like to use the
            platform?
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Doctor Role */}
          <button onClick={()=> handleRole("doctor")} className="role-card group relative bg-white dark:bg-[#1a2c2c] p-8 rounded-3xl shadow-card border border-white dark:border-[#2a3838] hover:shadow-card-hover hover:border-primary/30 transition-all duration-300 text-left flex flex-col items-center md:items-start">
            <div className="icon-container mb-6 w-20 h-20 rounded-2xl bg-teal-accent dark:bg-[#253636] flex items-center justify-center text-primary transition-all duration-300">
              <span className="material-symbols-outlined !text-4xl">
                stethoscope
              </span>
            </div>
            <h3 className="text-2xl font-bold text-med-dark dark:text-white mb-3">
              MedPulse Doctor
            </h3>
            <p className="text-med-text-secondary dark:text-gray-400 leading-relaxed mb-8 text-center md:text-left">
              Provide expert medical advice, build your reputation, and help
              patients manage their symptoms with verified responses.
            </p>
            <div className="mt-auto w-full flex items-center justify-between group-hover:text-primary transition-colors">
              <span className="text-sm font-bold uppercase tracking-widest">
                Select Role
              </span>
              <span className="material-symbols-outlined !text-xl group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </button>

          {/* User Role */}
        
            <button onClick={()=>handleRole("patient")} className="role-card group relative bg-white dark:bg-[#1a2c2c] p-8 rounded-3xl shadow-card border border-white dark:border-[#2a3838] hover:shadow-card-hover hover:border-primary/30 transition-all duration-300 text-left flex flex-col items-center md:items-start">
              <div className="icon-container mb-6 w-20 h-20 rounded-2xl bg-teal-accent dark:bg-[#253636] flex items-center justify-center text-primary transition-all duration-300">
                <span className="material-symbols-outlined !text-4xl">
                  groups
                </span>
              </div>
              <h3 className="text-2xl font-bold text-med-dark dark:text-white mb-3">
                MedPulse User
              </h3>
              <p className="text-med-text-secondary dark:text-gray-400 leading-relaxed mb-8 text-center md:text-left">
                Track your symptoms, receive community support, and get trusted
                insights from verified healthcare professionals.
              </p>
              <div className="mt-auto w-full flex items-center justify-between group-hover:text-primary transition-colors">
                <span className="text-sm font-bold uppercase tracking-widest">
                  Select Role
                </span>
                <span className="material-symbols-outlined !text-xl group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </button>
          
        </div>

        {/* Footer Links */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="text-sm text-med-text-secondary dark:text-gray-500">
            Wrong account?{" "}
            <Link className="text-primary font-bold hover:underline" to="#">
              Log out
            </Link>
          </p>
          <div className="flex gap-6 text-xs text-med-text-secondary dark:text-gray-500 font-medium">
            <Link
              className="hover:text-med-dark dark:hover:text-gray-300 transition-colors"
              to="#"
            >
              Privacy Policy
            </Link>
            <Link
              className="hover:text-med-dark dark:hover:text-gray-300 transition-colors"
              to="#"
            >
              Terms of Service
            </Link>
            <Link
              className="hover:text-med-dark dark:hover:text-gray-300 transition-colors"
              to="#"
            >
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
