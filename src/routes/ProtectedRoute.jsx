import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { tokenValidation } from "../server/allApi";
import { setUser, logout } from "../redux/authSlice";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 🚫 No token → logout immediately
    if (!token) {
      dispatch(logout());
      setIsValidating(false);
      return;
    }

    // ✅ Token exists → validate with backend
    const validateToken = async () => {
      try {
        const res = await tokenValidation();

        if (res?.data?.success) {
          dispatch(setUser(res.data.user)); // restore redux
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

  // ⏳ While checking token
  if (isValidating) {
    return <div>Checking authentication...</div>;
  }

  //  Final decision
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
