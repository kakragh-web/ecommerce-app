import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useStorage';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [storedToken, setStoredToken] = useLocalStorage('token', null);
  const [storedUser, setStoredUser] = useLocalStorage('user', null);

  const [state, dispatch] = useReducer(authReducer, {
    user: storedUser,
    token: storedToken,
    isAuthenticated: !!storedToken
  });

  const login = (userData) => {
    setStoredToken(userData.token);
    setStoredUser(userData.user);
    dispatch({ type: 'LOGIN', payload: userData });
  };

  const logout = () => {
    setStoredToken(null);
    setStoredUser(null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};