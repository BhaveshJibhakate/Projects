import { useState } from "react";
import "./App.css";
import AuthForm from "./components/AuthForm";
import PostList from "./components/PostList";
import Navbar from "./components/Nabar";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import CreatePost from "./components/CreatePost";
export const URL = "https://projects-production-9dc3.up.railway.app";

function App() {
  const [user, setUser] = useState<any | null>(null);
  const navigate=useNavigate()
  const fetchUser = () => {
    axios
      .get(`${URL}/api/auth/me`, { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        navigate("/postlist")
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <>
      {!user ? (
        <AuthForm onLogin={fetchUser} />
      ) : (
        <div>
          <Navbar onLogout={() => setUser(null)} user={user} />
          <Routes>
            <Route path="/postlist" element={<PostList />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
