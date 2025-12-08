import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { toast, ToastContainer } from "react-toastify";
const socket = io("http://localhost:5000");

interface DeliveryData {
  tracking_id: number;
  order_id: number;
  order_status: string;
  amount: string;
  name: string;
  phone: string;
  status: string;
  updated_at: string;
  address: string;
}

// ---------------- Styled Components ----------------

const Container = styled.div`
  width: 100%;
  padding: 10px;
  background: #f5f7fa;
  min-height: 100vh;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 10px;
  // overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const Th = styled.th`
  padding: 10px;
  background: #0077ff;
  color: white;
  font-weight: 600;
  text-align: center;
  font-size: 0.95rem;
  position:sticky;
  top:0px;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eee;
  font-size: 0.9rem;
  color: #333;
`;

const Row = styled.tr`
  &:hover {
    background-color: #f9f9f9;
  }
`;

const Button = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.2s ease;

  &:hover {
    background: #218838;
  }
`;

const StatusBadge = styled.span<{ type: string }>`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  background: ${({ type }) =>
    type === "Delivered"
      ? "#28a745"
      : type === "In-Process"
      ? "#ff9800"
      : "#dc3545"};
`;

const DeliveryDashboard = () => {
  const { user } = useSelector((state: any) => state);
  const token=localStorage.getItem("token")
  const [Data, setData] = useState<DeliveryData[]>([]);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
      socket.emit("joinDeliveryRoom", user.id);
    });
    socket.on("OrderAssigned", async () => {
      console.log("order assigned is triggered");
      toast.success("New Order Assigned!");
      const audio=new Audio("./ding-sound.mp3")
      audio.play()
      fetchTrackOrder();
    });

    return () => {
    socket.off("OrderAssigned");
    socket.disconnect()
  };
  }, []);

  useEffect(() => {
    fetchTrackOrder();
  }, [user.id]);
  const fetchTrackOrder = () => {
    axios
      .get(`http://localhost:5000/delivery_person/track-order/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  };
  const handleStatus = (tracking_id: number, order_id: number) => {
    axios
      .put(
        `http://localhost:5000/delivery_person/change-status/${tracking_id}`,
        { order_id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setData(
          Data.map((m) =>
            m.tracking_id === tracking_id
              ? { ...m, status: "Delivered", order_status: "Completed" }
              : m
          )
        );
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container>
      {/* <Title>Welcome, {decoded?.email} 👋</Title> */}
      <ToastContainer position="top-center" theme="colored" autoClose={false} />
      <Table>
        <thead>
          <tr>
            <Th>Tracking Id</Th>
            <Th>Order Id</Th>
            <Th>Order Status</Th>
            <Th>Amount</Th>
            <Th>Customer Name</Th>
            <Th>Customer Phone</Th>
            <Th>Customer Address</Th>
            <Th>Delivery Status</Th>
            <Th>Last Updated</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {Data.map((item, index) => (
            <Row key={index}>
              <Td>{item.tracking_id}</Td>
              <Td>{item.order_id}</Td>
              <Td>
                <StatusBadge type={item.order_status}>
                  {item.order_status}
                </StatusBadge>
              </Td>
              <Td>₹{item.amount}</Td>
              <Td>{item.name}</Td>
              <Td>{item.phone}</Td>
              <Td>{item.address}</Td>
              <Td>
                <StatusBadge type={item.status}>{item.status}</StatusBadge>
              </Td>
              <Td>{new Date(item.updated_at).toLocaleString()}</Td>
              <Td>
                {item.status !== "Delivered" && (
                  <Button
                    onClick={() =>
                      handleStatus(item.tracking_id, item.order_id)
                    }
                  >
                    Mark Delivered
                  </Button>
                )}
              </Td>
            </Row>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default DeliveryDashboard;
