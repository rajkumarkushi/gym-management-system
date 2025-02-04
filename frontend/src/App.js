import React from "react";


// import { Dashboard } from "@mui/icons-material";
// import Whyqd from "./components/Whyqd";
// import Workoutwithus from "./components/Workoutwithus";
// import Qdstore from "./components/Qdstore";
// import CRM1 from './components/CRM1'; 
// import CRM2 from './components/CRM2';


import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Announcements from "./components/Announcement/Announcements";
import LandingPage from "./components/Auth/LandingPage";
import Login from "./components/Auth/Login";
import Membership from "./components/Auth/Membership";
import SignUp from "./components/Auth/SignUp";
import Whyqd from "./components/Auth/Whyqd";
import Qdstore from "./components/Auth/Qdstore";
import Workoutwithus from "./components/Auth/Workoutwithus";


import ProtectedRoute from './components/Auth/protectedroutes';
import DietitianDashboard from "./components/Dietitian/DietitianDashboard";
import GymAssistantDashboard from "./components/GymAssistant/GymAssistantDashboard";
import TrainerDashboard from "./components/Trainer/TrainerDashboard";
import UserDashboard from "./components/User/UserDashboard";


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/login" element={<Login />} />
          <Route path="/membership" element={<Membership/>} />
          <Route path="/whyqd" element={<Whyqd/>} />
          <Route path="/workoutwithus" element={<Workoutwithus/>} />
          <Route path="/qdstore" element={<Qdstore/>} />
          {/* <Route path="/crm1" element={<CRM1 />} /> 
        <Route path="/crm2" element={<CRM2 />} />  */}


          <Route path="/admin" element={<AdminDashboard/>}/>
          <Route path="/signup" element={<SignUp />} />
          <Route
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['member']}>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/trainer" 
          element={
            <ProtectedRoute allowedRoles={['trainer']}>
              < TrainerDashboard/>
            </ProtectedRoute>
          } 
          
        />
        <Route 
          path="/dietitian" 
          element={
            <ProtectedRoute allowedRoles={['dietitian']}>
              <DietitianDashboard />
            </ProtectedRoute>
          } 
        />
         <Route 
          path="/assistant" 
          element={
            <ProtectedRoute allowedRoles={['gym-assistant']}>
              <GymAssistantDashboard />
            </ProtectedRoute>
          } 
        />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;

