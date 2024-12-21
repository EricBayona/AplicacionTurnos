/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { auth } from './fireBaseConfig';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
