import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { io } from "socket.io-client";
import { toast, ToastContainer } from "react-toastify";
const socket = io("http://localhost:5000", { autoConnect: false }); // global socket

interface OrderData {
  order_id: number;
  order_status: string;
  payment_status: string;
  amount: string;
  customer_name: string;
  customer_phone: string;
  restaurant_name: string;
  address: string;
  rest_id: number;
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
  padding: 5px 10px;
  background: #f5f7fa;
  min-height: 100vh;
`;

const Table = styled.table`
  width: 100%;
  margin: 0 auto;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
  // overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const Th = styled.th`
  padding: 12px;
  background: #0c6efd;
  color: white;
  font-weight: 600;
  text-align: center;
  position: sticky;
  top: 0px;
  z-index: 10;
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
 const Span=styled.span<{type:string}>`
 border-radius:12px;
 background:${({type})=>type==="Completed"?"green":"orange"};
 font-weight:600;
 color:white;
 padding:4px 10px;
 width:100%
 `
 
// ---------------- Component ----------------

const OwnerDashboard = () => {
  const { user} = useSelector((state: any) => state);
  const token = localStorage.getItem("token");
  const [activeTab, setactiveTab] = useState<string>("orders");

  const [orders, setOrders] = useState<OrderData[]>([]);
  const [detailsData, setDetailsData] = useState<OrderItem[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [deliveryPartners, setDeliveryPartners] = useState<DeliveryPartner[]>(
    []
  );
  const [selectedPartnerId, setSelectedPartnerId] = useState<number | null>(
    null
  );

  const fetchOrders = () => {
    if (!user.id) return;
    axios
      .get(`http://localhost:5000/owner/order/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setOrders(response.data))
      .catch((err) => console.error("Error fetching orders", err));
  };
  // useeffect for all socket related work
  useEffect(() => {
    socket.connect()

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
      socket.emit("joinOwnerRoom", user.id);
    });
    // socket listener
    socket.on("newOrder", async () => {
      toast.success(`New order received!`);
      const audio = new Audio("./ding-sound.mp3");
      audio.play();
      try {
        fetchOrders();
      } catch (err) {
        console.error("Failed to fetch latest orders", err);
      }
    });

    socket.on("OrderStatusChanged", async (orderId) => {
      toast.success(`Order No. ${orderId} is Delivered!`);
      const audio=new Audio('./ding-sound.mp3')
      audio.play()
      fetchOrders();
    });

    return () => {
      socket.off("newOrder");
      socket.off("OrderStatusChanged");
    };
  }, []);

  useEffect(() => {
    fetchOrders();
    axios
      .get(`http://localhost:5000/owner/delivery-person`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDeliveryPartners(res.data))
      .catch((err) => console.error("Failed to fetch delivery partners", err));
  }, [user.id]);

  const handleDetails = (order_id: number) => {
    if (selectedOrderId === order_id) {
      setSelectedOrderId(null);
      setDetailsData([]);
      return;
    }

    axios
      .get(`http://localhost:5000/owner/order-details/${order_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
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
      .post(
        `http://localhost:5000/owner/dispatch-order`,
        {
          order_id,
          delivery_partner_id: selectedPartnerId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
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
      <div className="d-flex align-items-center justify-content-center gap-3 mb-1">
        <button
          onClick={() => setactiveTab("orders")}
          className="btn btn-info py-0 font-weight-bold text-white"
        >
          Orders
        </button>
        <button
          onClick={() => setactiveTab("manage-menu")}
          className="btn btn-info py-0 font-weight-bold text-white"
        >
          Menu
        </button>
      </div>
      <ToastContainer
        pauseOnHover
        closeOnClick
        autoClose={false}
        position="top-center"
        theme="colored"
      />
      {activeTab === "orders" ? (
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
                  <Td><Span type={item.order_status}>{item.order_status}</Span></Td>
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
                    <Td colSpan={9}>
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
      ) : (
        <MenuTable rest_id={orders[0].rest_id} token={token} />
      )}
    </Container>
  );
};

export default OwnerDashboard;

interface MenuTableProps {
  rest_id: number;
  token: string | null;
}
const MenuTable: React.FC<MenuTableProps> = ({ rest_id, token }) => {
  const [menuItems, setmenuItems] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/owner/menu-items/${rest_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setmenuItems(response.data))
      .catch((err) => console.log(err));
  }, [rest_id, token]);

  const toggleAvailability = (item_id: number, available: number) => {
    axios
      .put(
        "http://localhost:5000/owner/toggle-menu",
        { item_id, available },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setmenuItems((prev) =>
          prev.map((m) => (m.item_id === item_id ? { ...m, available } : m))
        );
      })
      .catch((err) => console.log(err));
  };
  return (
    <Table>
      <thead style={{ backgroundColor: "#0077ff" }}>
        <tr>
          <Th>Sr. No</Th>
          <Th>Item</Th>
          <Th>Price</Th>
          <Th>Available</Th>
        </tr>
      </thead>
      <tbody>
        {menuItems.map((item, index) => (
          <tr key={item.item_id}>
            <Td>{index + 1}</Td>
            <Td>{item.name}</Td>
            <Td>{item.price}</Td>
            <Td className="d-flex justify-content-center gap-2">
              <label>
                <input
                  type="radio"
                  checked={item.available == 1}
                  name={`available-${item.item_id}`}
                  value={1}
                  onChange={() => toggleAvailability(item.item_id, 1)}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  checked={item.available == 0}
                  name={`available-${item.item_id}`}
                  value={0}
                  onChange={() => toggleAvailability(item.item_id, 0)}
                />
                No
              </label>
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
