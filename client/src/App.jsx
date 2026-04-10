import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";

function ProtectedRoute({ children, authUser }) {
  return authUser ? children : <Navigate to="/login" replace />;
}

function App() {
  const { authUser, loading } = useContext(AuthContext);

  return (
    <div className="bg-[url(/bgImage.svg)] bg-contain">
      {loading ? (
        <div className="w-full h-screen">
          <div
            className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl h-full grid grid-cols-1 relative`}
          >
            <div className="text-white p-8 flex flex-col items-start gap-6">
              <p className="text-xl">Loading...</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Toaster />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute authUser={authUser}>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={!authUser ? <LoginPage /> : <Navigate to="/" />}
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute authUser={authUser}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
