import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./App.css";
import { ChatProvider } from "./context/ChatContext.jsx";
import { FriendProvider } from "./context/FriendContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ChatProvider>
        <FriendProvider>
          <App />
        </FriendProvider>
      </ChatProvider>
    </AuthProvider>
  </BrowserRouter>,
);
