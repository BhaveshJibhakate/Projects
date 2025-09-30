import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

interface OrderData {
  order_id: number;
  order_status: string;
  payment_status: string;
  amount: string;
  customer_name: string;
  customer_phone: string;
  restaurant_name: string;
  address:string;
}

interface OrderItem {
  name: string;
  price: string;
  qty: number;
  subtotal: number;
}

interface DeliveryPartner {
  id: number;
  name: string;
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
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const Th = styled.th`
  padding: 12px;
  background: #0077ff;
  color: white;
  font-weight: 600;
  text-align: left;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eee;
  font-size: 0.95rem;
  color: #333;
`;

const ActionButton = styled.button`
  background: #0077ff;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s ease;

  &:hover {
    background: #005fcc;
  }
`;

const InnerTable = styled.table`
  width: 100%;
  margin-top: 12px;
  border-collapse: collapse;
  background: #fafafa;
  border: 1px solid #ddd;
`;

const InnerTh = styled.th`
  padding: 8px;
  background: #e9ecef;
  font-size: 0.9rem;
`;

const InnerTd = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;
  font-size: 0.9rem;
`;

const PartnerBox = styled.div`
  margin-top: 1rem;
  padding: 12px;
  border-radius: 6px;
  background-color: #f0f8ff;
  border: 1px solid #cce5ff;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
`;

const ConfirmButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: 10px;

  &:hover {
    background: #218838;
  }
`;

// ---------------- Component ----------------

const OwnerDashboard = () => {
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode<JwtPayload>(token) : null;

  const [orders, setOrders] = useState<OrderData[]>([]);
  const [detailsData, setDetailsData] = useState<OrderItem[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [deliveryPartners, setDeliveryPartners] = useState<DeliveryPartner[]>([]);
  const [selectedPartnerId, setSelectedPartnerId] = useState<number | null>(null);

  useEffect(() => {
    if (!decoded?.id) return;

    axios
      .get(`http://localhost:5000/owner/order/${decoded.id}`)
      .then((response) => setOrders(response.data))
      .catch((err) => console.error("Error fetching orders", err));

    axios
      .get(`http://localhost:5000/owner/delivery-person`)
      .then((res) => setDeliveryPartners(res.data))
      .catch((err) => console.error("Failed to fetch delivery partners", err));
  }, [decoded?.id]);

  const handleDetails = (order_id: number) => {
    if (selectedOrderId === order_id) {
      setSelectedOrderId(null);
      setDetailsData([]);
      return;
    }

    axios
      .get(`http://localhost:5000/owner/order-details/${order_id}`)
      .then((response) => {
        setDetailsData(response.data);
        setSelectedOrderId(order_id);
      })
      .catch((err) => console.error("Error fetching order details", err));
  };

  const handleConfirmDispatch = (order_id: number) => {
    if (!selectedPartnerId) {
      alert("Please select a delivery partner");
      return;
    }

    axios
      .post(`http://localhost:5000/owner/dispatch-order`, {
        order_id,
        delivery_partner_id: selectedPartnerId,
      })
      .then(() => {
        alert("Order dispatched!");
        setSelectedPartnerId(null);
        setOrders((prev) =>
          prev.map((o) =>
            o.order_id === order_id ? { ...o, order_status: "In-Process" } : o
          )
        );
      })
      .catch((err) => {
        console.error("Failed to dispatch order", err);
        alert("Dispatch failed");
      });
  };

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <Th>Order Id</Th>
            <Th>Order Status</Th>
            <Th>Amount</Th>
            <Th>Payment Status</Th>
            <Th>Customer Name</Th>
            <Th>Customer Phone</Th>
            <Th>Customer Address</Th>
            <Th>Restaurant Name</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((item) => (
            <>
              <tr key={item.order_id}>
                <Td>{item.order_id}</Td>
                <Td>{item.order_status}</Td>
                <Td>₹{item.amount}</Td>
                <Td>{item.payment_status}</Td>
                <Td>{item.customer_name}</Td>
                <Td>{item.customer_phone}</Td>
                <Td>{item.address}</Td>
                <Td>{item.restaurant_name}</Td>
                <Td>
                  <ActionButton onClick={() => handleDetails(item.order_id)}>
                    {selectedOrderId === item.order_id ? "Hide" : "Details"}
                  </ActionButton>
                </Td>
              </tr>

              {selectedOrderId === item.order_id && (
                <tr>
                  <Td colSpan={8}>
                    <InnerTable>
                      <thead>
                        <tr>
                          <InnerTh>Item Name</InnerTh>
                          <InnerTh>Price</InnerTh>
                          <InnerTh>Quantity</InnerTh>
                          <InnerTh>Subtotal</InnerTh>
                        </tr>
                      </thead>
                      <tbody>
                        {detailsData.map((d, index) => (
                          <tr key={index}>
                            <InnerTd>{d.name}</InnerTd>
                            <InnerTd>₹{d.price}</InnerTd>
                            <InnerTd>{d.qty}</InnerTd>
                            <InnerTd>₹{d.subtotal}</InnerTd>
                          </tr>
                        ))}
                      </tbody>
                    </InnerTable>

                    {item.order_status === "Placed" && (
                      <PartnerBox>
                        <h4>Assign Delivery Partner</h4>
                        <Select
                          onChange={(e) =>
                            setSelectedPartnerId(Number(e.target.value))
                          }
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select Partner
                          </option>
                          {deliveryPartners.map((partner) => (
                            <option key={partner.id} value={partner.id}>
                              {partner.name}
                            </option>
                          ))}
                        </Select>
                        <ConfirmButton
                          onClick={() => handleConfirmDispatch(item.order_id)}
                        >
                          Confirm
                        </ConfirmButton>
                      </PartnerBox>
                    )}
                  </Td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default OwnerDashboard;
