import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StyledInput } from "./Register";
import { useDispatch } from "react-redux";

const Login = () => {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
//   const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlelogin = (e: any) => {
    e.preventDefault();
    const BASE_URL="http://localhost:8080/"
    axios
      .post(`${BASE_URL}auth/login`, credentials)
      .then((response) => {
        dispatch({ type: "LOGIN", payload: response.data });

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
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        background: "linear-gradient(135deg, #FD746C, #6494c8ff)"
 
      }}
    > <div style={{color:"#0c1d5a"}}><h1>PetPuja</h1><h3>Hungry? Let the Puja Begin!</h3></div>
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
