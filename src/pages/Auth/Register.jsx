import React, { useState } from "react";
import { userRegister } from "../../server/allApi"; // Ensure this path is correct for your project
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // <--- THIS WAS MISSING

const Register = ({ setLoginPage }) => {
  
  const [registerDetails, setRegisterDetails] = useState({
    username: "",
    email: "",
    password: "",
    role: "patient",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleRegister = async () => {
    const { username, email, password, role } = registerDetails;
    
    // Basic Validation
    if (!username || !email || !password || !role) {
        toast.warning("Please fill in all fields.");
        return;
    }

    try {
      const res = await userRegister(registerDetails);
      
      if (res.status === 200) {
        toast.success("Registration successful!");
        // Optional: Add a slight delay so the user can read the toast before switching screens
        setTimeout(() => {
            setLoginPage(false); 
        }, 1500);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      // Try to get the specific error message from the server, otherwise generic message
      const errorMessage = error.response?.data?.message || "Something went wrong during registration.";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="w-full max-w-md flex-none">
        <div className="bg-white dark:bg-[#1a2c2c] rounded-2xl shadow-sm border border-[#e5e7eb] dark:border-[#2a3838] p-6 sm:p-8">
          <div className="mb-3">
            <h2 className="text-2xl font-bold text-med-dark dark:text-white mb-2">
              Create Account
            </h2>
            <p className="text-med-text-secondary dark:text-gray-400 text-sm">
              Sign up to get started with MedPulse.
            </p>
          </div>
          
          <form className="flex flex-col gap-3">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-med-dark dark:text-gray-200 mb-3">
                I am joining as a
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* PATIENT RADIO OPTION */}
                <div className="relative">
                  <input
                    className="peer sr-only"
                    id="role_patient"
                    name="role"
                    type="radio"
                    value="patient"
                    checked={registerDetails.role === "patient"}
                    onChange={handleChange}
                  />
                  <label
                    className="flex flex-col items-center justify-center p-4 h-full rounded-xl border-2 border-transparent bg-med-gray dark:bg-[#253636] cursor-pointer transition-all hover:bg-[#e2e8e8] dark:hover:bg-[#2f4242] peer-checked:border-primary peer-checked:bg-primary/5 dark:peer-checked:bg-[#1a2c2c] text-med-text-secondary peer-checked:text-primary"
                    htmlFor="role_patient"
                  >
                    <span className="material-symbols-outlined text-3xl mb-1.5">
                      person
                    </span>
                    <span className="text-sm font-semibold text-med-dark dark:text-white">
                      General User
                    </span>
                  </label>
                </div>

                {/* DOCTOR RADIO OPTION */}
                <div className="relative">
                  <input
                    className="peer sr-only"
                    id="role_doctor"
                    name="role"
                    type="radio"
                    value="doctor"
                    checked={registerDetails.role === "doctor"}
                    onChange={handleChange}
                  />
                  <label
                    className="flex flex-col items-center justify-center p-4 h-full rounded-xl border-2 border-transparent bg-med-gray dark:bg-[#253636] cursor-pointer transition-all hover:bg-[#e2e8e8] dark:hover:bg-[#2f4242] peer-checked:border-primary peer-checked:bg-primary/5 dark:peer-checked:bg-[#1a2c2c] text-med-text-secondary peer-checked:text-primary"
                    htmlFor="role_doctor"
                  >
                    <span className="material-symbols-outlined text-3xl mb-1.5">
                      stethoscope
                    </span>
                    <span className="text-sm font-semibold text-med-dark dark:text-white">
                      Doctor
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label
                className="block text-sm font-medium text-med-dark dark:text-gray-200 mb-1.5"
                htmlFor="username"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-med-text-secondary text-[20px]">
                    person
                  </span>
                </div>
                <input
                  className="w-full pl-10 pr-4 py-2.5 bg-med-gray dark:bg-[#253636] border border-transparent focus:bg-white dark:focus:bg-[#1a2c2c] focus:ring-2 focus:ring-primary/50 focus:border-primary rounded-xl text-sm text-med-dark dark:text-white placeholder:text-med-text-secondary dark:placeholder:text-gray-500 transition-all"
                  id="username"
                  placeholder="e.g. Sarah Jenkins"
                  type="text"
                  name="username"
                  value={registerDetails.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-sm font-medium text-med-dark dark:text-gray-200 mb-1.5"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-med-text-secondary text-[20px]">
                    mail
                  </span>
                </div>
                <input
                  className="w-full pl-10 pr-4 py-2.5 bg-med-gray dark:bg-[#253636] border border-transparent focus:bg-white dark:focus:bg-[#1a2c2c] focus:ring-2 focus:ring-primary/50 focus:border-primary rounded-xl text-sm text-med-dark dark:text-white placeholder:text-med-text-secondary dark:placeholder:text-gray-500 transition-all"
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  name="email"
                  value={registerDetails.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium text-med-dark dark:text-gray-200 mb-1.5"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-med-text-secondary text-[20px]">
                      lock
                    </span>
                  </div>
                  <input
                    className="w-full pl-10 pr-4 py-2.5 bg-med-gray dark:bg-[#253636] border border-transparent focus:bg-white dark:focus:bg-[#1a2c2c] focus:ring-2 focus:ring-primary/50 focus:border-primary rounded-xl text-sm text-med-dark dark:text-white placeholder:text-med-text-secondary dark:placeholder:text-gray-500 transition-all"
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    name="password"
                    value={registerDetails.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-med-dark dark:text-gray-200 mb-1.5"
                  htmlFor="confirm-password"
                >
                  Confirm
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-med-text-secondary text-[20px]">
                      lock_reset
                    </span>
                  </div>
                  <input
                    className="w-full pl-10 pr-4 py-2.5 bg-med-gray dark:bg-[#253636] border border-transparent focus:bg-white dark:focus:bg-[#1a2c2c] focus:ring-2 focus:ring-primary/50 focus:border-primary rounded-xl text-sm text-med-dark dark:text-white placeholder:text-med-text-secondary dark:placeholder:text-gray-500 transition-all"
                    id="confirm-password"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 mt-2">
              <input
                className="mt-1 size-4 rounded border-med-text-secondary text-primary focus:ring-primary dark:bg-[#253636] dark:border-gray-600"
                id="terms"
                type="checkbox"
              />
              <label
                className="text-sm text-med-text-secondary dark:text-gray-400 leading-snug"
                htmlFor="terms"
              >
                I agree to the{" "}
                <a
                  className="font-medium text-primary hover:text-primary-dark underline decoration-transparent hover:decoration-primary transition-all"
                  href="#"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  className="font-medium text-primary hover:text-primary-dark underline decoration-transparent hover:decoration-primary transition-all"
                  href="#"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            {/* Submit Button */}
            <button
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-med-dark bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              type="button"
              onClick={handleRegister}
            >
              Sign Up
            </button>
          </form>

          {/* Switch to Login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-med-text-secondary dark:text-gray-400">
              Already have an account?{" "}
              <a
                className="font-semibold text-primary hover:text-primary-dark hover:underline transition-colors cursor-pointer"
                onClick={() => setLoginPage(false)} // Assuming true means show login
              >
                Log in
              </a>
            </p>
          </div>

          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-med-gray dark:border-[#2a3838]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white dark:bg-[#1a2c2c] px-2 text-med-text-secondary dark:text-gray-500 text-xs uppercase tracking-wide">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#e5e7eb] dark:border-[#2a3838] bg-white dark:bg-[#253636] px-3 py-2.5 text-sm font-semibold text-med-dark dark:text-white hover:bg-med-gray dark:hover:bg-[#2f4242] transition-colors focus:ring-2 focus:ring-primary/20">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                  fill="currentColor"
                />
              </svg>
              <span className="sr-only">Google</span>
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#e5e7eb] dark:border-[#2a3838] bg-white dark:bg-[#253636] px-3 py-2.5 text-sm font-semibold text-med-dark dark:text-white hover:bg-med-gray dark:hover:bg-[#2f4242] transition-colors focus:ring-2 focus:ring-primary/20">
              <svg
                className="h-5 w-5 text-[#1877F2]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;