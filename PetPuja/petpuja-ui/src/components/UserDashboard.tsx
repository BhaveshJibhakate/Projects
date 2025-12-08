import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MenuItems from "./MenuItem";
import { useSelector } from "react-redux";

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  padding: 20px;
  background-color: beige;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 12px;
  background: #f0f0f0;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 1.4rem;
  color: #333;
`;

const Address = styled.p`
  margin: 5px 0;
  color: #666;
  font-size: 0.95rem;
`;

const Rating = styled.p`
  font-weight: bold;
  color: #ff9800;
  margin: 6px 0;
`;

const Button = styled.button`
  background: #0077ff;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 0.95rem;
  margin-top: 10px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #005fcc;
  }
`;

const UserDashboard = () => {
  const [resto, setresto] = useState<any[]>([]);
  const [flag, setflag] = useState(false);
  const [menu, setmenu] = useState<any[]>([]);
  const token=localStorage.getItem("token")
  useEffect(() => {
    axios
      .get("http://localhost:5000/user/all-restaurants", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setresto(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleclick = (rest_id: number) => {
    axios
      .get(`http://localhost:5000/user/${rest_id}/menu`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setmenu(response.data);
        setflag(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <DashboardContainer>
        {resto.map((item, index) => (
          <Card key={index}>
            <Image src={item.image} alt={item.name} />
            <Name>{item.name}</Name>
            <Address>{item.address}</Address>
            <Rating>⭐ {item.rating}</Rating>
            <Button onClick={() => handleclick(item.rest_id)}>
              Show Dishes
            </Button>
          </Card>
        ))}
      </DashboardContainer>
      {flag && <MenuItems menu={menu} setflag={setflag} />}
    </>
  );
};

export default UserDashboard;
