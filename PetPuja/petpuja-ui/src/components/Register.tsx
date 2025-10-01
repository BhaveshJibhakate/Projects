import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
`;
const Register = () => {
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleRegister = (e: any) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/auth/register", user)
      .then(() => {
        console.log("User registered successfully");
        alert("Registered Successfully");
        setuser({
          name: "",
          email: "",
          password: "",
          phone: "",
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setuser({ name: "", email: "", password: "", phone: "" }));
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #659bd4ff, #FD746C)"
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px 30px",
          borderRadius: "12px",
          width: "400px",
          boxShadow: "0px 6px 18px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "25px", color: "#057e47" }}>📝 Register</h1>
        <form onSubmit={handleRegister}>
          <StyledInput
            required
            type="text"
            placeholder="Enter name"
            value={user.name}
            onChange={(e) => setuser({ ...user, name: e.target.value })}
          />

          <StyledInput
            required
            type="email"
            placeholder="Enter email"
            value={user.email}
            onChange={(e) => setuser({ ...user, email: e.target.value })}
          />

          <StyledInput
            required
            type="password"
            placeholder="Enter password"
            value={user.password}
            onChange={(e) => setuser({ ...user, password: e.target.value })}
          />

          <StyledInput
            required
            type="text"
            placeholder="Enter phone"
            value={user.phone}
            onChange={(e) => setuser({ ...user, phone: e.target.value })}
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
            Register
          </button>
          <p>
            already registered ? <Link to={"/login"}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
