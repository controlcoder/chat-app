import { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const [isLoginState, setIsLoginState] = useState(true);

  const { login } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    name: "ritik",
    email: "ritik@gmail.com",
    password: "123456",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    login(isLoginState ? "login" : "register", credentials);
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      <img src={assets.logo_big} alt="logo_big" className="min-w-40 w-[24vw]" />

      <form
        onSubmit={onSubmitHandler}
        className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {!isLoginState ? "Signup" : "Login"}
        </h2>
        {!isLoginState && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-2 border border-gray-500 rounded-md focus:outline-none"
            name="name"
            value={credentials.name}
            onChange={onChangeHandler}
            required
          />
        )}
        
        <input
          type="email"
          placeholder="email"
          className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2"
          name="email"
          value={credentials.email}
          onChange={onChangeHandler}
          required
        />
        <input
          type="password"
          placeholder="password"
          className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2"
          name="password"
          value={credentials.password}
          onChange={onChangeHandler}
          required
        />

        <button
          className="py-3 bg-linear-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer"
          type="submit"
        >
          {!isLoginState ? "Signup" : "Login"}
        </button>

        {!isLoginState && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <input type="checkbox" required />
            <p>Agree to the terms of use & privacy policy.</p>
          </div>
        )}

        <div className="flex flex-col gap-2 text-center w-full">
          <p className="text-sm text-gray-600">
            {isLoginState ? (
              <>
                Create an account{" "}
                <span
                  className="font-medium text-violet-500 cursor-pointer"
                  onClick={() => setIsLoginState(false)}
                >
                  click here
                </span>{" "}
              </>
            ) : (
              <>
                {" "}
                Already have an account{" "}
                <span
                  className="font-medium text-violet-500 cursor-pointer"
                  onClick={() => {
                    setIsLoginState(true);
                  }}
                >
                  click here
                </span>
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  );
}
