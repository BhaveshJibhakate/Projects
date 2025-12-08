import { useState } from "react";
import "./App.css";
import AuthForm from "./components/AuthForm";
import PostList from "./components/PostList";
import Navbar from "./components/Nabar";
import axios from "axios";
import { BrowserRouter as Router ,Routes,Route } from "react-router-dom";
import CreatePost from "./components/CreatePost";

function App() {
  const [user, setUser] = useState<any | null>(null);

  const fetchUser = () => {
    axios
      .get("http://localhost:5000/api/auth/me",{withCredentials:true})
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err.message));
  };
  return (
    <Router>
      {!user ? (
        <AuthForm onLogin={fetchUser} />
      ) : (
        <div>
          <Navbar onLogout={()=>setUser(null)} user={user}/>
            <Routes>
              <Route path="/postlist" element={<PostList/>} />
              <Route path="/create-post" element={<CreatePost/>}/>
            </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
