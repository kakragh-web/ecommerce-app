import { useAuth } from '../context/AuthContext';

export const useAdmin = () => {
  const { user, isAuthenticated } = useAuth();
  
  const isAdmin = isAuthenticated && user?.role === 'admin';
  
  return {
    isAdmin,
    requireAdmin: () => {
      if (!isAdmin) {
        throw new Error('Admin access required');
      }
    }
  };
};