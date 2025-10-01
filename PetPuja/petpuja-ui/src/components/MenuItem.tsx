import axios from "axios";
import { useState } from "react";
import { StyledInput } from "./Register";
import { useSelector } from "react-redux";

interface MenuItemsProps {
  menu: any;
  setflag: Function;
}

const MenuItems: React.FC<MenuItemsProps> = ({ menu, setflag }) => {
 const {token,user}=useSelector((state:any)=>state) 

  const [cart, setcart] = useState<any[]>([]);
  const [message, setmessage] = useState("");
  const [address, setaddress] = useState<string>();
  let totalAmount = 0;

  if (cart.length !== 0) {
    totalAmount = cart.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0);
  }

  const updateQty = (item: any, qty: number) => {
    if (qty <= 0) {
      setcart(cart.filter((c) => c.item_id !== item.item_id));
    } else {
      const exist = cart.find((c) => c.item_id === item.item_id);
      if (exist) {
        setcart(
          cart.map((c) => (c.item_id === item.item_id ? { ...c, qty: qty } : c))
        );
      } else {
        setcart([
          ...cart,
          { item_id: item.item_id, qty: qty, price: item.price },
        ]);
      }
    }
  };

  const placeOrder = (rest_id: number, e: any) => {
    e.preventDefault();
    if (cart.length === 0) {
      setmessage("⚠️ Cart is empty");
      return;
    }
    if (!address || address.trim() === "") {
      setmessage("Please enter delivery address");
      return;
    }
    axios
      .post("http://localhost:5000/user/order", {
        rest_id: rest_id,
        cust_id: user.id,
        items: cart,
        address: address,
      },{
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setmessage("✅ Order placed successfully!");
        setcart([]);
        setaddress("");
      })
      .catch((err) => {
        console.log(err);
        setmessage("Something Went Wrong!");
        setcart([]);
        setaddress("");
      });
  };

  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "500px",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#057e47",
          }}
        >
          🍴 Restaurant Menu
        </h2>

        {menu.map((item: any) => (
          <div
            key={item.item_id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px",
              marginBottom: "10px",
              border: "1px solid #eee",
              borderRadius: "8px",
              background: "#fafafa",
            }}
          >
            <span style={{ fontWeight: "500" }}>
              {item.name} - ₹{item.price}
            </span>
            <input
              type="number"
              min="0"
              placeholder="Qty"
              style={{
                width: "70px",
                padding: "6px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                textAlign: "center",
              }}
              value={cart.find((c) => c.item_id === item.item_id)?.qty || ""}
              onChange={(e) => {
                updateQty(item, parseInt(e.target.value) || 0);
                setmessage("");
              }}
            />
          </div>
        ))}
        <form onSubmit={(e) => placeOrder(menu[0].rest_id, e)}>
          <div>
            <StyledInput
              type="text"
              placeholder="Enter address for delivery"
              value={address}
              onChange={(e) => {
                setaddress(e.target.value);
                setmessage("")
              }}
            />
          </div>

          {cart.length > 0 && (
            <p
              style={{
                marginTop: "20px",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "16px",
              }}
            >
              💰 Total Billing Amount: ₹{totalAmount}
            </p>
          )}
          {message && (
            <p
              style={{
                textAlign: "center",
                marginTop: "15px",
                color: "#e63946",
              }}
            >
              {message}
            </p>
          )}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              style={{
                background: "#057e47",
                color: "#fff",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
                marginRight: "10px",
                fontWeight: "bold",
                transition: "0.3s",
              }}
            >
              Place Order
            </button>
            <button
              onClick={() => setflag(false)}
              style={{
                background: "#ccc",
                color: "#333",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "0.3s",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuItems;
