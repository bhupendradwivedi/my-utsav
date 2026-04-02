import { createContext, useContext, useEffect, useState } from "react";
import {
  activeUser,
  loginUser,
  registerUser,
  logoutUser,
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem("currentUser");
    return stored ? JSON.parse(stored) : null;
  });

  const [authLoading, setAuthLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // ✅ FIXED: only call backend if user exists locally
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");

    if (!storedUser) {
      setInitialLoading(false);
      return;
    }

    const fetchActiveUser = async () => {
      try {
        const data = await activeUser();

        if (data?.user) {
          setCurrentUser(data.user);
          localStorage.setItem("currentUser", JSON.stringify(data.user));
        } else {
          setCurrentUser(null);
          localStorage.removeItem("currentUser");
        }
      } catch (error) {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchActiveUser();
  }, []);

  const register = async (formData) => {
    setAuthLoading(true);
    try {
      const data = await registerUser(formData);

      if (data?.user) {
        setCurrentUser(data.user);
        localStorage.setItem("currentUser", JSON.stringify(data.user));
      }
      return data;
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async (formData) => {
    setAuthLoading(true);
    try {
      const data = await loginUser(formData);

      if (data?.user) {
        setCurrentUser(data.user);
        localStorage.setItem("currentUser", JSON.stringify(data.user));
      }
      return data;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    setAuthLoading(true);
    try {
      await logoutUser();
      setCurrentUser(null);
      localStorage.removeItem("currentUser");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        register,
        login,
        logout,
        authLoading,
        initialLoading,
      }}
    >
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);