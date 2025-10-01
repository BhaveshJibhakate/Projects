const express = require("express");

const router = express.Router();
const pool = require("../config/db");

// api to get order received by owner for his restaurants
router.get("/order/:id", async (req, resp) => {
  const owner_id = parseInt(req.params.id);
  try {
    const [row] = await pool.execute(
      `SELECT 
          o.order_id, o.amount, o.order_status, o.payment_status,o.address,o.created_at,
          r.rest_id, r.name AS restaurant_name,
          u.id AS customer_id, u.name AS customer_name, u.phone AS customer_phone
      FROM orders o
      JOIN restaurants r ON o.rest_id = r.rest_id
      JOIN users u ON o.cust_id = u.id
      WHERE r.owner_id = ?
      ORDER BY o.created_at DESC`,
      [owner_id]
    );
    return resp.json(row);
  } catch (error) {
    console.log("Error fetching orders", error);
    resp.status(500).json({ error: "Database error" });
  }
});

// api to fetch completed order
router.get("/order/completed/:id", async (req, resp) => {
  const owner_id = parseInt(req.params.id);
  try {
    const [row] = await pool.execute(
      `SELECT 
          o.order_id, o.amount, o.order_status, o.payment_status, o.created_at,
          r.rest_id, r.name AS restaurant_name,
          u.id AS customer_id, u.name AS customer_name, u.phone AS customer_phone
      FROM orders o
      JOIN restaurants r ON o.rest_id = r.rest_id
      JOIN users u ON o.cust_id = u.id
      WHERE r.owner_id = ? and o.order_status="Completed"
      ORDER BY o.created_at DESC`,
      [owner_id]
    );
    return resp.json(row);
  } catch (error) {
    console.log("Error fetching orders", error);
    resp.status(500).json({ error: "Database error" });
  }
});

// order details for particular order
router.get("/order-details/:order_id", async (req, resp) => {
  try {
    const order_id = parseInt(req.params.order_id);
    const [rows] = await pool.execute(
      " select mi.name,oi.price,oi.qty,oi.price*oi.qty as subtotal from order_items oi join orders o on o.order_id=oi.order_id join menu_items mi on oi.item_id=mi.item_id where o.order_id=?",
      [order_id]
    );
    resp.json(rows);
  } catch (error) {
    console.log(error);
  }
});

// get all delivery-person
router.get("/delivery-person", async (req, resp) => {
  try {
    const [rows] = await pool.execute(
      `select * from users where role="delivery_person"`
    );
    return resp.json(rows);
  } catch (error) {
    console.log(error);
  }
});

// order processing api it will change the status of order as processing
// into orders table and insert data into delivery-tracking
router.post("/dispatch-order", async (req, res) => {
  const { order_id, delivery_partner_id } = req.body;

  try {
    // Insert into delivery tracking
    await pool.execute(
      `INSERT INTO delivery_tracking (order_id, delivery_person_id) VALUES (?, ?)`,
      [order_id, delivery_partner_id]
    );
    // Update the order status
    await pool.execute(
      `UPDATE orders SET order_status = ? WHERE order_id = ?`,
      ["In-Process", order_id]
    );
    // Send success response
    res.status(200).json({ message: "Order dispatched successfully" });
  } catch (error) {
    console.error("Dispatch failed:", error);
    res.status(500).json({ message: "Failed to dispatch order" });
  }
});

module.exports = router;
