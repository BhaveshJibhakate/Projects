import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const Title = styled.h3`
  margin: 5px;
  font-size: 24px;
  color: white;
  margin-left: 12px;
`;

const Navbar = () => {
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handlelogout = () => {
    dispatch({type:"LOGOUT"})
    navigate("/login");
  };
  return (
    user && (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "black",
          padding: "0px 5px",
        }}
      > <Title>PetPuja</Title>
        <Title>{user ? `Welcome, ${user.name} 👋` : ""}</Title>
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
    )
  );
};

export default Navbar;
