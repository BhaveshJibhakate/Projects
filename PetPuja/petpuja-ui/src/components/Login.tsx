import axios from "axios";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { StyledInput } from "./Register";

interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

const Login = () => {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handlelogin = (e: any) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/auth/login", credentials)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        const decoded = jwtDecode<JwtPayload>(token);

        if (decoded.role === "user") {
          navigate("/user-dashboard");
        } else if (decoded.role === "owner") {
          navigate("/owner-dashboard");
        } else if (decoded.role === "delivery_person") {
          navigate("/delivery-dashboard");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setcredentials({ email: "", password: "" }));
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #29b978, #057e47)",
        backgroundImage: `url('/login_page_bg.jpg')`,
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px 30px",
          borderRadius: "12px",
          width: "350px",
          boxShadow: "0px 6px 18px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "25px", color: "#057e47" }}>🔑 Login</h1>
        <form onSubmit={handlelogin}>
          <StyledInput
            required={true}
            type="text"
            placeholder="Enter email"
            value={credentials.email}
            onChange={(e) =>
              setcredentials({ ...credentials, email: e.target.value })
            }
          
          />

          <StyledInput
            required={true}
            type="password"
            placeholder="Enter password"
            value={credentials.password}
            onChange={(e) =>
              setcredentials({ ...credentials, password: e.target.value })
            }
         
          />

          <button
            style={{
              width: "100%",
              padding: "12px",
              background: "#057e47",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "15px",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Login
          </button>
          <p>
            Don't have account ? <Link to={"/register"}>Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
