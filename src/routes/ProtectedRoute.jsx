import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { tokenValidation, getUserProfile } from "../server/allApi";
import { loginSuccess, logout } from "../redux/authSlice";
import { setUser, clearUser } from "../redux/userSlice";
import MedPulseSplash from "../pages/MedPulseSplash";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { profile: user } = useSelector((state) => state.userDetail);

  const [isValidating, setIsValidating] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token"); 

    if (!token) {
      dispatch(logout());
      dispatch(clearUser());
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

        //  Fetch user profile
        const profileRes = await getUserProfile(tokenRes.data.user._id);
        dispatch(setUser(profileRes.data));
        console.log(profileRes.data)
      } catch (err) {
        console.error("Authentication failed:", err);
        dispatch(logout());
        dispatch(clearUser());
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
  console.log(user)
  switch (user?.role) {
    case "doctor":
      return <Navigate to="/doctor/dashboard" replace />;
    case "admin":
      return <Navigate to="/admin" replace />;
    case "patient":
      return <Outlet />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
