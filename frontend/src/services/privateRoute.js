import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth); // Check Firebase auth state

  if (loading) {
    // Show a loading spinner or message while checking the user's authentication state
    return <div>Loading...</div>;
  }

  // If the user is authenticated, allow access; otherwise, redirect to the login page
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
