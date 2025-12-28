import React from 'react';
import { Route,Routes } from 'react-router-dom';
import HomeLayout from './User/pages/HomeLayout';
 import FeedPage from './User/pages/FeedPage';
import MyPostsPage from './User/pages/MyPostsPage';
import SavedPage from './User/pages/SavedPage';
import CommunityPage from './User/pages/CommunityPage';
import ProfilePage from './User/pages/ProfilePage';
import CommunityDetailFeed from './User/pages/CommunityDetailFeed';
import FindDoctorPage from './User/pages/FindDoctorPage';
import DoctorDashboard from './Doctor/pages/DoctorDashboard';
import DoctorLayout from './Doctor/pages/DoctorLayout';
import HomePage from './pages/HomePage';
import ProtectedRoute from './routes/ProtectedRoute';
import DoctorRoute from './routes/DoctorRoute';
 import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div >
      
      <Routes>

      {/* PUBLIC ROUTE (Login + Register) */}
      <Route path="/" element={<HomePage />} />

      {/* PROTECTED USER ROUTES */}
      <Route element={<ProtectedRoute />}>
      

        <Route element={<HomeLayout />}>
        
          <Route path="/me" element={<FeedPage />} />
          <Route path="/posts" element={<MyPostsPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/:categoryId" element={<CommunityDetailFeed />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/doctors" element={<FindDoctorPage />} />
        </Route>
      </Route>

      {/* PROTECTED DOCTOR ROUTES */}
    
       <Route element={<DoctorRoute/>}>
 <Route element={<DoctorLayout />}>
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        </Route>
        </Route>
       

    </Routes>
      
    </div>
  );
}

export default App;

