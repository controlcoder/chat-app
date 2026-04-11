import { createContext } from "react";
import { api } from "../config/axios.api";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";
import { useState, useEffect, useContext } from "react";

export const FriendContext = createContext(null);

export const FriendProvider = ({ children }) => {
  const { authUser } = useContext(AuthContext);

  const [friendRequests, setFriendRequests] = useState([]);

  // const [friends, setFriends] = useState([]);

  // const setFriendsList = async () => {
  //   try {
  //     setFriends(authUser.friends);
  //   } catch (err) {
  //     setFriends([]);
  //   }
  // };

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

  const acceptFriendRequest = async (newFriendId) => {
    try {
      const { data } = await api.put(`/api/friends/request/accept`, {
        newFriendId,
      });
      toast.success(data.message);
    } catch (err) {
      const { data } = err.response;
      toast.error(data.error);
    }
  };

  const rejectFriendRequest = async (newFriendId) => {
    try {
      const { data } = await api.put(`/api/friends/request/remove`, {
        newFriendId,
      });
      toast.success(data.message);
    } catch (err) {
      const { data } = err.response;
      toast.error(data.error);
    }
  };

  useEffect(() => {
    if (authUser) {
      setFriendRequestsList();
      // setFriendsList();
    }
  }, [authUser]);

  const value = {
    sendFriendRequest,
    friendRequests,
    acceptFriendRequest,
    rejectFriendRequest,
    // friends
  };

  return (
    <FriendContext.Provider value={value}>{children}</FriendContext.Provider>
  );
};
