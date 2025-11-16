import React, { useState } from "react";

const Login: React.FC = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  // const dispatch = useDispatch();
  const handlelogin = () => {
    console.log("function triggered after login button is clicked");
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-cyan-700">
      <div className="bg-white rounded-lg shadow-lg w-[350px] p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Login</h2>
        <input
          className="w-full p-[10px] mb-5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          type="text"
          placeholder="enter username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          className="w-full p-[10px] mb-6 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          type="password"
          placeholder="enter password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          onClick={handlelogin}
          className="w-full py-[10px] bg-green-600 hover:bg-green-700 text-white font-medium text-base rounded-md transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
