import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { tokenValidation } from "../server/allApi";
import { setUser, logout } from "../redux/authSlice";
import MedPulseSplash from "../pages/MedPulseSplash";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // 1. Track if backend is checking
  const [isValidating, setIsValidating] = useState(true);
  
  // 2. Track if Splash UI should still be visible
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("Token");

    // Case: No token found
    if (!token) {
      dispatch(logout());
      setIsValidating(false); // Validation done (failed)
      return;
    }

    // Case: Validate Token
    const validateToken = async () => {
      try {
        const res = await tokenValidation();
        if (res?.data?.success) {
          dispatch(setUser(res.data.user)); 
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        dispatch(logout());
      } finally {
        // Validation logic is complete
        setIsValidating(false);
      }
    };

    validateToken();
  }, [dispatch]);

   

  // 1. Show Splash Screen if we are validating OR if animation hasn't finished
  if (showSplash) {
    return (
      <MedPulseSplash 
        // Tell splash to finish progress bar when validation is done
        finishLoading={!isValidating} 
        // When progress bar hits 100%, hide the splash
        onAnimationComplete={() => setShowSplash(false)} 
      />
    );
  }

  // 2. Security Check (Post-Splash)
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // 3. Role Based Routing
  if (user?.role === "doctor") {
    return <Navigate to="/doctor/dashboard" replace />;
  }
  
  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  if (user?.role === "patient") {
    return <Outlet />;
  }

  // 4. Fallback
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;