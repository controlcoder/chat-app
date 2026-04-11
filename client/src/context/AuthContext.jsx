import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { api, API_URL } from "../config/axios.api";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/auth/check");
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      }
    } catch (err) {}
    setLoading(false);
  };

  const updateProfile = async (dataToUpdate) => {
    try {
      const { data } = await api.put("/api/auth/update-profile", dataToUpdate);
      if (data.success) {
        setAuthUser(data.user);
        toast.success(data.message);
      }
    } catch (err) {}
  };

  const login = async (state, credentials) => {
    try {
      const { data } = await api.post(`/api/auth/${state}`, credentials);
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const logout = async () => {
    try {
      const { data } = await api.post(`/api/auth/logout`);
      if (data.success) {
        setAuthUser(null);
        setOnlineUsers([]);
        socket.disconnect();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const connectSocket = (userData) => {
    const newSocket = io(API_URL, {
      auth: { userId: userData._id },
    });
    newSocket.connect();
    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (data) => {
      setOnlineUsers(data);
    });
  };

  useEffect(() => {
    getUser();

    return () => {
      socket.disconnect();
    };
  }, []);

  const value = {
    authUser,
    onlineUsers,
    socket,
    login,
    logout,
    loading,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
