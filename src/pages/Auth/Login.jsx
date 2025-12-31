import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { userLogin, userRegister } from "../../server/allApi";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, setUser } from "../../redux/authSlice";

const Login = ({ setRegisterPage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setLoginDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleLogin = async () => {
    const { email, password } = loginDetails;
    if (!email || !password) {
      toast.warning("Please fill in all fields.");
      return;
    }
    try {
      const res = await userLogin(loginDetails);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        toast.success("Login Success!!");
        dispatch(loginSuccess());
        if (res.data.role == "doctor") {
          setTimeout(() => {
            navigate("/doctor/dashboard");
          }, 1500);
        } else if (res.data.role == "patient") {
          setTimeout(() => {
            navigate("/me");
          }, 1500);
        } else {
          toast.error("Unknown role. Please contact support.");
        }
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong during login.";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="relative z-10 w-full max-w-[440px] bg-white dark:bg-[#1a2c2c] rounded-2xl shadow-xl border border-gray-100 dark:border-[#2a3838] overflow-hidden">
        <div className="pt-5 pb-2 px-8 flex flex-col items-center text-center">
          <div className="mb-6 bg-primary/10 p-3 rounded-full text-primary">
            <svg
              className="size-10"
              fill="currentColor"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
                fillRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-med-dark dark:text-white mb-2">
            Welcome to MedPulse
          </h2>
          <p className="text-med-text-secondary dark:text-gray-400 text-sm leading-relaxed">
            Connect with doctors and the community to track symptoms and get
            verified advice.
          </p>
        </div>
        <form className="p-8 pt-6 flex flex-col gap-3">
          <div className="space-y-1.5">
            <label
              className="text-xs font-semibold text-med-text-secondary dark:text-gray-400 uppercase tracking-wider ml-1"
              htmlFor="email"
            >
              Email or Username
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-med-text-secondary group-focus-within:text-primary transition-colors text-[20px]">
                  mail
                </span>
              </div>
              <input
                className="w-full bg-med-gray dark:bg-[#253636] border-transparent focus:border-primary focus:ring-0 rounded-xl py-3 pl-11 pr-4 text-sm text-med-dark dark:text-white placeholder:text-med-text-secondary/70 dark:placeholder:text-gray-500 transition-all shadow-sm"
                id="email"
                placeholder="name@example.com"
                type="email"
                name="email"
                value={loginDetails.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label
              className="text-xs font-semibold text-med-text-secondary dark:text-gray-400 uppercase tracking-wider ml-1"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-med-text-secondary group-focus-within:text-primary transition-colors text-[20px]">
                  lock
                </span>
              </div>
              <input
                className="w-full bg-med-gray dark:bg-[#253636] border-transparent focus:border-primary focus:ring-0 rounded-xl py-3 pl-11 pr-12 text-sm text-med-dark dark:text-white placeholder:text-med-text-secondary/70 dark:placeholder:text-gray-500 transition-all shadow-sm"
                id="password"
                placeholder="••••••••"
                type="password"
                name="password"
                value={loginDetails.password}
                onChange={handleChange}
              />
              <button
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-med-text-secondary hover:text-med-dark dark:hover:text-white transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">
                  visibility_off
                </span>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none group">
              <input
                className="rounded border-gray-300 text-primary focus:ring-primary/20 w-4 h-4 transition-all"
                type="checkbox"
              />
              <span className="text-med-text-secondary dark:text-gray-400 group-hover:text-med-dark dark:group-hover:text-gray-300 transition-colors">
                Remember me
              </span>
            </label>
            <a
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <button
            className="w-full bg-primary hover:bg-[#0fdbdb] text-med-dark font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all duration-200 mt-2"
            onClick={handleLogin}
            type="button"
          >
            Log In
          </button>
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-100 dark:border-gray-700"></div>
            <span className="flex-shrink-0 mx-4 text-xs font-medium text-med-text-secondary dark:text-gray-500">
              OR
            </span>
            <div className="flex-grow border-t border-gray-100 dark:border-gray-700"></div>
          </div>
          <button
            className="w-full bg-white dark:bg-[#253636] border border-gray-200 dark:border-[#2a3838] hover:bg-gray-50 dark:hover:bg-[#2a3838] text-med-dark dark:text-white font-medium text-sm py-3 rounded-xl transition-colors flex items-center justify-center gap-3 group"
            type="button"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
          <p className="text-center text-sm text-med-text-secondary dark:text-gray-400 mt-2">
            Don't have an account yet?
            <a
              className="font-bold text-primary hover:underline decoration-2 cursor-pointer underline-offset-2 transition-all"
              onClick={() => setRegisterPage(true)}
            >
              Sign up here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
