import axios from "axios";
import { useState } from "react";

interface RegisterProps {
  setactiveForm: Function;
}

const Register: React.FC<RegisterProps> = ({ setactiveForm }) => {
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
        alert("Registered Successfully");
        setuser({ name: "", email: "", password: "", phone: "" });
      })
      .catch((err) => console.log(err));
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
        width: "350px",
        backdropFilter: "blur(4px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        color: "white",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Create Account</h2>

      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleRegister}>

        {/* Name */}
        <label style={{ marginBottom: "5px",textAlign:"left" }}>Name</label>
        <input
          required
          type="text"
          placeholder="Enter name"
          value={user.name}
          onChange={(e) => setuser({ ...user, name: e.target.value })}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            marginBottom: "15px",
            fontSize: "15px",
            outline: "none",
          }}
        />

        {/* Email */}
        <label style={{ marginBottom: "5px",textAlign:"left"}}>Email</label>
        <input
          required
          type="email"
          placeholder="Enter email"
          value={user.email}
          onChange={(e) => setuser({ ...user, email: e.target.value })}
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
        <label style={{ marginBottom: "5px",textAlign:"left" }}>Password</label>
        <input
          required
          type="password"
          placeholder="Enter password"
          value={user.password}
          onChange={(e) => setuser({ ...user, password: e.target.value })}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            marginBottom: "15px",
            fontSize: "15px",
            outline: "none",
          }}
        />

        {/* Phone */}
        <label style={{ marginBottom: "5px",textAlign:"left" }}>Phone</label>
        <input
          required
          type="text"
          placeholder="Enter phone"
          value={user.phone}
          onChange={(e) => setuser({ ...user, phone: e.target.value })}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            marginBottom: "20px",
            fontSize: "15px",
            outline: "none",
          }}
        />

        {/* Register Button */}
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
          onMouseOver={(e: any) => (e.target.style.background = "#08895d")}
          onMouseOut={(e: any) => (e.target.style.background = "#0aa06e")}
        >
          Register
        </button>

        <p style={{ textAlign: "center", fontSize: "14px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#4fdfff", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => setactiveForm("login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
