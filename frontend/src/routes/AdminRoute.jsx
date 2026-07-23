import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function AdminRoute({ children }) {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return user?.role === 'admin' ? children : <Navigate to="/unauthorized" replace />;
}
