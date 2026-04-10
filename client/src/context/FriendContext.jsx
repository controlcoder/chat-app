import { createContext } from "react";
import { api, API_URL } from "../config/axios.api";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useState } from "react";
import { useEffect } from "react";

export const FriendContext = createContext(null);

export const FriendProvider = ({ children }) => {
  const { authUser } = useContext(AuthContext);

  const [friendRequests, setFriendRequests] = useState([]);

  const setFriendRequestsList = () => {
    setFriendRequests(authUser.friendRequestsReceived);
  };

  const sendFriendRequest = async (newFriend) => {
    try {
      const { data } = await api.post(`/api/friends/add`, { newFriend });
      if (data.success) {
        toast.success(data.message);
      }
    } catch (err) {
      const { data } = err.response;
      toast.error(data.error);
    }
  };

  useEffect(() => {
    if (authUser) setFriendRequestsList();
  }, [authUser]);

  const value = {
    sendFriendRequest,
    friendRequests
  };

  return (
    <FriendContext.Provider value={value}>{children}</FriendContext.Provider>
  );
};
