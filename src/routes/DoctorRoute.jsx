import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { tokenValidation } from "../server/allApi";
import { setUser } from "../redux/authSlice";
import MedPulseSplash from "../pages/MedPulseSplash";

const DoctorRoute = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const [isValidating, setIsValidating] = useState(true);

      const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("Token");

        if (!token) {
            dispatch(logout());
            setIsValidating(false);
            return;
        }

        const validateToken = async () => {
            try {
                const res = await tokenValidation();
                if (res?.data?.success) {
                    dispatch(setUser(res.data.user));
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                dispatch(logout());
            } finally {
                setIsValidating(false);
            }
        };

        validateToken();
    }, [dispatch]);

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

    if (!isAuthenticated) {
        return <Navigate to={"/"} replace />;
    }

    if (user && user.role === "patient") {
        return <Navigate to={"/me"} replace />;
    }
    if (user && user.role === "admin") {
        return <Navigate to={"/admin"} replace />;
    }

    if (user && user.role === "doctor") {
        return <Outlet />;
    }

    // Fallback for any other unhandled cases (e.g., user exists but role is neither patient nor doctor)
    // This might indicate an issue or an unverified user, so redirect to login.
    return <Navigate to={"/"} replace />;
};

 export default DoctorRoute;