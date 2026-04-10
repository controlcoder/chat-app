import { useState, createContext, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { api } from "../config/axios.api";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});

  const { socket, authUser } = useContext(AuthContext);


  const getUsersList = async () => {
    try {
      const { data } = await api.get("/api/messages/users");
      if (data.success) {
        setUsers(data.users);
      }
    } catch (err) {}
  };

  const getMessages = async (userId) => {
    try {
      const { data } = await api.get(`/api/messages/${selectedUser._id}`);
      if (data.success) {
        setMessages(data.messages);
      } else {
        // toast.error(data.message);
      }
    } catch (err) {
      // toast.error(err.message);
    }
  };

  const sendMessage = async (messageData) => {
    try {
      const { data } = await api.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData,
      );
      if (data.success) {
        setMessages((prev) => [...prev, data.newMessage]);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const subscribeToMessages = async () => {
    if (!socket) return;
    socket.on("newMessage", async (newMessage) => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessages((prev) => [...prev, newMessage]);
        await api.put(`/api/messages/mark/${newMessage._id}`);
      } else {
        setUnseenMessages((prev) => ({
          ...prev,
          [newMessage.senderId]: prev[newMessage.senderId]
            ? prev[newMessage.senderId]++
            : 1,
        }));
      }
    });
  };

  const unsubscribeFromMessages = async () => {
    if (socket) socket.off("newMessage");
  };

  useEffect(() => {
    if (authUser) {
      subscribeToMessages();
      getUsersList();
    }
    return () => unsubscribeFromMessages();
  }, [socket, selectedUser]);

  const value = {
    messages,
    users,
    selectedUser,
    getUsersList,
    setMessages,
    sendMessage,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
    getMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
