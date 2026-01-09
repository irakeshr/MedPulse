import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { tokenValidation , getDoctorProfile } from "../server/allApi";
import { loginSuccess, logout } from "../redux/authSlice";
 import MedPulseSplash from "../pages/MedPulseSplash";
 import { clearDoctor, setDoctor, setDoctorState } from "../redux/doctorSlicer";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { profile: user } = useSelector((state) => state.doctor);
  console.log(user)

  const [isValidating, setIsValidating] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token"); 

    if (!token) {
      dispatch(logout());
      dispatch(clearDoctor());
      setIsValidating(false);
      return;
    }

    const validateAuth = async () => {
      try {
        //  Validate token
        const tokenRes = await tokenValidation();
        

        if (!tokenRes?.data?.success) {
          throw new Error("Invalid token");
        }

        dispatch(loginSuccess());
        dispatch(setDoctorState(tokenRes.data.user));

        //  Fetch user profile
        const profileRes = await getDoctorProfile();
         
        dispatch(setDoctor(profileRes.data));
        
       
      } catch (err) {
        
        dispatch(logout());
        dispatch(clearDoctor());
      } finally {
        setIsValidating(false);
      }
    };

    validateAuth();
  }, [dispatch]);

  /* ---------------- SPLASH SCREEN ---------------- */
  if (showSplash) {
    return (
      <MedPulseSplash
        finishLoading={!isValidating}
        onAnimationComplete={() => setShowSplash(false)}
      />
    );
  }

  /* ---------------- AUTH CHECK ---------------- */
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  /* ---------------- ROLE ROUTING ---------------- */
 
  switch (user?.role) {
    case "doctor":
        return <Outlet />;
    case "admin":
      return <Navigate to="/admin" replace />;
    case "patient":
       return <Navigate to="/me" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
