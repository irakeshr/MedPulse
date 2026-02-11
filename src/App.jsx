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
import PatientFeedback from './Doctor/pages/PatientFeedback';
import SavedCases from './Doctor/pages/SavedCases';
import SchedulePage from './Doctor/pages/SchedulePage';
import DoctorSettings from './Doctor/pages/DoctorSettings';
import AdminDashboard from './Admin/pages/AdminDashboard';
import AdminLayout from './Admin/pages/AdminLayout';
import UserSideBar from './User/components/UserSideBar';
import AdminUsers from './Admin/pages/AdminUsers';
import AdminVerification from './Admin/pages/AdminVerification';
import AdminModeration from './Admin/pages/AdminModeration';
import AdminTopics from './Admin/pages/AdminTopics';
import AdminSettings from './Admin/pages/AdminSettings';
import ProtectedAdmin from './routes/ProtectedAdmin';
import RoleSelection from './components/RoleSelection';
import AppointmentBooking from './User/pages/AppointmentBooking';
import PaymentSuccess from './User/pages/PaymentSuccess';
import PaymentFailed from './User/pages/PaymentFailed';
const App = () => {
  return (
    <div >
      
      <Routes>

      {/* PUBLIC ROUTE (Login + Register) */}
      <Route path="/" element={<HomePage />} />
      <Route path="/role-selection/:emailID" element={<RoleSelection/>} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed  />} />

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
          <Route path="/AppointmentBooking/:doctorId" element={<AppointmentBooking />} />
        </Route>
      </Route>

      {/* PROTECTED DOCTOR ROUTES */}

      
    
       <Route element={<DoctorRoute/>}>
 <Route element={<DoctorLayout />}>
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/reviews" element={<PatientFeedback />} />
          <Route path="/doctor/saved" element={<SavedCases />} />
          <Route path="/doctor/schedule" element={<SchedulePage />} />
          <Route path="/doctor/settings" element={< DoctorSettings/>} />
        </Route>
        </Route>


{/* Admin Protected Routes */}
<Route element={<ProtectedAdmin/>}>
       <Route element={<AdminLayout/>}>

 <Route path="/admin" element={<AdminDashboard />} />
 <Route path="/admin/users" element={<AdminUsers/>} />
 <Route path="/admin/verify" element={<AdminVerification/>} />
 <Route path="/admin/moderation" element={<AdminModeration/>} />
 <Route path="/admin/topics" element={<AdminTopics/>} />
 <Route path="/admin/settings" element={<AdminSettings/>} />
 
 
 </Route>  
      </Route>


    </Routes>

   

    
      
    </div>
  );
}

export default App;

