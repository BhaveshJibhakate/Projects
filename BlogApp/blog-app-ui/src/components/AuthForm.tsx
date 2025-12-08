import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

interface AuthFormProps {
  onLogin: () => void;
}

const AuthForm = (props: AuthFormProps) => {
  const [mode, setMode] = useState("Login");
  const navigate = useNavigate();

  const [formDetail, setFormDetail] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleMode = (e: any) => {
    e.preventDefault();
    setMode(mode === "Login" ? "Register" : "Login");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (mode === "Login") {
      axios
        .post(
          "http://localhost:5000/api/auth/login",
          {
            email: formDetail.email,
            password: formDetail.password,
          },
          { withCredentials: true }
        )
        .then(() => {
          props.onLogin();
          navigate("/postlist");
        })
        .catch((err) => console.log(err.message));
    } else {
      axios
        .post(
          "http://localhost:5000/api/auth/register",
          {
            name: formDetail.name,
            email: formDetail.email,
            password: formDetail.password,
          },
          { withCredentials: true }
        )
        .then(() => {
          props.onLogin();
        })
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-form">
        <h1 className="auth-title">
          {mode === "Login" ? "Login" : "Register"}
        </h1>

        {mode === "Register" && (
          <div className="auth-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) =>
                setFormDetail({ ...formDetail, name: e.target.value })
              }
            />
          </div>
        )}

        <div className="auth-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) =>
              setFormDetail({ ...formDetail, email: e.target.value })
            }
          />
        </div>

        <div className="auth-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) =>
              setFormDetail({ ...formDetail, password: e.target.value })
            }
          />
        </div>

        <button className="auth-button" onClick={handleSubmit}>
          {mode === "Login" ? "Login" : "Register"}
        </button>

        <p className="auth-toggle-text">
          {mode === "Login" ? "Don't have an account? " : "Already have an account? "}
          <button className="auth-toggle-btn" onClick={handleMode}>
            {mode === "Login" ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
