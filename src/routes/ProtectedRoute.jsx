import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { tokenValidation, getUserProfile, getPost } from "../server/allApi";
import { loginSuccess, logout } from "../redux/authSlice";
import { setUser, clearUser, setStats } from "../redux/userSlice";
import MedPulseSplash from "../pages/MedPulseSplash";
import { setPosts } from "../redux/postSlice";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { profile: user } = useSelector((state) => state.userDetail);
  console.log(user)

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
        dispatch(setStats(tokenRes.data.user))

        //  Fetch user profile
        const profileRes = await getUserProfile();
        const Post = await getPost();
        console.log(Post)

         
        dispatch(setPosts(Post.data.modifiedPosts));
       
        
        dispatch(setUser(profileRes.data));
        
       
      } catch (err) {
        
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
