import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const Title = styled.h3`
  margin: 5px;
  font-size: 16px;
  color: white;
  margin-left: 12px;
`;

interface NavbarProps {
  user:any
}
const Navbar:React.FC<NavbarProps> = ({user}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handlelogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    dispatch({type:"LOGOUT"})
    navigate("/");
  };
  return (
    (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#de1313fd",
          padding: "0px 5px",
        }}
      > <Title>PetPuja</Title>
        <Title>{`Welcome, ${user.name}`}</Title>
        <button
          onClick={handlelogout}
          style={{
            backgroundColor: "rgba(0,0,0,0.9)",
            color: "white",
            fontWeight: "bold",
            borderRadius: "6px",
            fontSize: "16px",
            padding: "2px 15px",
            margin: "3px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    )
  );
};

export default Navbar;
