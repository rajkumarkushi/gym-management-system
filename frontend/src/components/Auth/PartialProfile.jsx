import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import '../styles/PartialProfile.css'; // Optional for styling

const PartialProfile = () => {
  const [userData, setUserData] = useState({});
  const [workingHours, setWorkingHours] = useState("00:00");
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [auth, db]);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar">
          <span>{userData.name?.charAt(0).toUpperCase()}</span>
        </div>
        <div>
          <h3>{userData.name || "User Name"}</h3>
          <p>Email: {userData.email || "example@mail.com"}</p>
          <p>Last Login: {userData.lastLogin || "Not Available"}</p>
        </div>
      </div>

      <div className="working-hours">
        <p>Today's Working Hours: {workingHours}</p>
      </div>

      <div className="actions">
        <button>Manage Your Profile</button>
        <button>Mail Setting</button>
      </div>

      <div className="details">
        <p>Total Remaining: {userData.totalDays || "N/A"} Days</p>
        <p>Expiry Date: {userData.expiryDate || "N/A"}</p>
      </div>

      <button className="logout-button">Logout of my account</button>
    </div>
  );
};

export default PartialProfile;
