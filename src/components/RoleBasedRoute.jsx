import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/auth';
import { db } from '../services/fireBaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const RoleBasedRoute = ({ children, requiredRole }) => {
  const { currentUser } = useAuth();
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>; // Muestra un indicador de carga mientras se obtiene el rol
  }

  if (role !== requiredRole) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RoleBasedRoute;
