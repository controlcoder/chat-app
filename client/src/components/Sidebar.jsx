import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { FriendContext } from "../context/FriendContext";

export default function Sidebar() {
  const navigate = useNavigate();

  const [input, setInput] = useState("");

  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [showRequestsModal, setShowRequestsModal] = useState(false);

  const { logout, onlineUsers } = useContext(AuthContext);

  const [newFriendInput, setNewFriendInput] = useState("");

  const {
    users,
    getUsersList,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  } = useContext(ChatContext);

  const {
    sendFriendRequest,
    friendRequests,
    acceptFriendRequest,
    rejectFriendRequest,
    // friends,
  } = useContext(FriendContext);

  const filteredUsers = input
    ? users.filter(
        (user) => user.name.toLowerCase().search(input.toLowerCase()) === 0,
      )
    : users;

  useEffect(() => {
    getUsersList();
  }, [onlineUsers]);

  return (
    <div
      className={`bg-[#8185b2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser ? "max-md:hidden" : ""}`}
    >
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={assets.logo_icon} alt="logo" className="max-w-8" />
            <p>SnapTalk</p>
          </div>
          <div className="relative py-2 flex gap-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVrq_rCmtoOcbI210LPQVEP-iHC9QYP2ztzg&s"
              alt="friend-request"
              className="w-6 rounded-full cursor-pointer"
              onClick={() => setShowRequestsModal(true)}
            />
            <div className="group">
              <img
                src={assets.menu_icon}
                alt="menu_icon"
                className="max-h-5 cursor-pointer"
              />
              <div className="absolute top-[80%] right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block">
                <p
                  onClick={() => setShowAddFriendModal(true)}
                  className="cursor-pointer text-sm"
                >
                  Add a Friend
                </p>
                <hr className="my-2 border-t border-gray-500" />
                <p
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer text-sm"
                >
                  Edit Profile
                </p>
                <hr className="my-2 border-t border-gray-500" />
                <p onClick={() => logout()} className="cursor-pointer text-sm">
                  Logout
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5">
          <img src={assets.search_icon} alt="search_icon" className="w-3" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1"
            placeholder="Search User..."
          />
        </div>
      </div>

      {showAddFriendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-[#282142] p-6 rounded-lg w-[90%] max-w-md text-white relative">
            {/* Close button */}
            <button
              onClick={() => setShowAddFriendModal(false)}
              className="absolute cursor-pointer top-2 right-3 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-lg mb-4">Add Friend</h2>

            {/* Input */}
            <input
              type="text"
              placeholder="Enter email"
              value={newFriendInput}
              onChange={(e) => setNewFriendInput(e.target.value)}
              required={true}
              className="w-full p-2 rounded bg-[#1f1a36] outline-none text-sm"
            />

            {/* Action button */}
            <button
              className="mt-4 w-full bg-violet-600 py-2 rounded text-sm cursor-pointer"
              onClick={() => {
                if (newFriendInput && newFriendInput.trim()) {
                  sendFriendRequest(newFriendInput);
                  setNewFriendInput("");
                  setShowAddFriendModal(false);
                }
              }}
            >
              Send Request
            </button>
          </div>
        </div>
      )}

      {showRequestsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-[#282142] p-6 rounded-lg w-[90%] max-w-md text-white relative max-h-[80vh] overflow-y-auto">
            {/* Close */}
            <button
              onClick={() => setShowRequestsModal(false)}
              className="absolute cursor-pointer top-2 right-3 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-lg mb-4">Friend Requests</h2>

            {friendRequests.length === 0 ? (
              <p className="text-sm text-gray-400">No requests</p>
            ) : (
              <div className="flex flex-col gap-3">
                {friendRequests.map((user) => {
                  return (
                    <div
                      key={user.email}
                      className="flex items-center justify-between bg-[#1f1a36] p-3 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={user.profilePic || assets.avatar_icon}
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="text-sm">{user.name}</p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            acceptFriendRequest(user._id);
                            setShowRequestsModal(false);
                          }}
                          className="text-[12px] cursor-pointer px-3 py-1 bg-green-600 rounded"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => {
                            rejectFriendRequest(user._id);
                            setShowRequestsModal(false);
                          }}
                          className="text-[12px] cursor-pointer px-3 py-1 bg-red-600 rounded"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col">
        {filteredUsers && filteredUsers.length === 0 ? (
          <p className="text-center mt-4">
            You don't have any friend, add a friend to chat
          </p>
        ) : (
          filteredUsers.map((user) => {
            return (
              <div
                onClick={() => {
                  setSelectedUser(
                    user?._id === selectedUser?._id ? null : user,
                  );
                  setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }));
                }}
                key={user._id}
                className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id === user._id && "bg-[#282142]/50"}`}
              >
                <img
                  src={user?.profilePic || assets.avatar_icon}
                  alt="profile_pic"
                  className="w-8.75 aspect-square rounded-full"
                />
                <div className="flex flex-col leading-5 text-[14px]">
                  <p>{user.name}</p>
                  {onlineUsers.includes(user._id) ? (
                    <span className="text-green-400 text-[10px]">Online</span>
                  ) : (
                    <span className="text-neutral-400 text-[10px]">
                      Offline
                    </span>
                  )}
                </div>
                {unseenMessages[user._id] > 0 && (
                  <p className="absolute top-4 right-2 text-[10px] h-4 w-4 flex justify-center items-center rounded-full bg-violet-500/50">
                    {unseenMessages[user._id]}
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
