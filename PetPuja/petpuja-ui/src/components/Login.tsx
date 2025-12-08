import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
interface LoginProps{
  setactiveForm:Function
}
const Login:React.FC<LoginProps> = ({setactiveForm})=> {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
//   const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlelogin = (e: any) => {
    e.preventDefault();
    const BASE_URL="http://localhost:5000/"
    axios
      .post(`${BASE_URL}auth/login`, credentials)
      .then((response) => {
        dispatch({ type: "LOGIN", payload: response.data });
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("user",JSON.stringify(response.data.user))
        if (response.data.user.role === "user") {
          navigate("/user-dashboard");
        } else if (response.data.user.role === "owner") {
          navigate("/owner-dashboard");
        } else if (response.data.user.role === "delivery_person") {
          navigate("/delivery-dashboard");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setcredentials({ email: "", password: "" }));
  };

  return (
    <div
        style={{
          position: "absolute",
          top: "50%",
          right: "40px",
          transform: "translateY(-50%)",
          background: "rgba(0, 0, 0, 0.55)",
          padding: "25px",
          borderRadius: "12px",
          width: "320px",
          backdropFilter: "blur(4px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handlelogin}
        >
          {/* Email */}
          <label style={{ color: "white", marginBottom: "5px",textAlign:"left" }}>Email</label>
          <input
            required
            type="email"
            placeholder="Enter email"
            value={credentials.email}
            onChange={(e) =>
              setcredentials({ ...credentials, email: e.target.value })
            }
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              marginBottom: "15px",
              fontSize: "15px",
              outline: "none",
            }}
          />

          {/* Password */}
          <label style={{ color: "white", marginBottom: "5px",textAlign:"left" }}>
            Password
          </label>
          <input
            required
            type="password"
            placeholder="Enter password"
            value={credentials.password}
            onChange={(e) =>
              setcredentials({ ...credentials, password: e.target.value })
            }
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              marginBottom: "20px",
              fontSize: "15px",
              outline: "none",
            }}
          />

          {/* Login Button */}
          <button
            style={{
              padding: "12px",
              background: "#0aa06e",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
              marginBottom: "15px",
              transition: "0.3s",
            }}
            onMouseOver={(e:any) => (e.target.style.background = "#08895d")}
            onMouseOut={(e:any) => (e.target.style.background = "#0aa06e")}
          >
            Login
          </button>

          {/* Register Link */}
          <p style={{ color: "white", fontSize: "14px", textAlign: "center" }}>
            Don't have an account?{" "}
            <span
              style={{ color: "#4fdfff", fontWeight: "bold" ,cursor:"pointer"}}
              onClick={()=>setactiveForm("register")}
            >
              Register
            </span>
          </p>
        </form>
      </div>
  );
};

export default Login;
