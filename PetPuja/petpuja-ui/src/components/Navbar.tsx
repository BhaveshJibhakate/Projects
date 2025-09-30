import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface JwtPayload {
  role: string;
  email: string;
  name: string;
}
const Title = styled.h3`
  margin: 5px;
  font-size: 24px;
  color: white;
  margin-left: 48px;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode<JwtPayload>(token) : null;
  const handlelogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
   decoded && <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "black",
        padding: "0px 5px",
      }}
    >
      <Title>{decoded ? `Welcome, ${decoded?.name} 👋` : ""}</Title>
        <button
          onClick={handlelogout}
          style={{
            backgroundColor: "red",
            color: "white",
            fontWeight: "bold",
            borderRadius: "6px",
            fontSize: "16px",
            padding: "5px 20px",
            margin: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
    </div>
  );
};

export default Navbar;
