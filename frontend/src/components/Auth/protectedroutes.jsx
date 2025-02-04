import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem('role');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    // Role not authorized, redirect to home page
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;