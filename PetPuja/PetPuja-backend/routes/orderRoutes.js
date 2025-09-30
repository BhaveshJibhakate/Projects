const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // use pool instead of connection

router.post("/order", async (req, resp) => {
  const { rest_id,cust_id,items,address } = req.body;
console.log(rest_id, items)
  try {
    // 1. Check if restaurant is accepting orders
    const [restaurants] = await pool.execute(
      "SELECT * FROM restaurants WHERE rest_id = ? AND is_accepting_orders = true",
      [rest_id]
    );

    if (restaurants.length === 0) {
      return resp.json({ error: "Restaurant is not accepting any orders" });
    }

    let totalAmount = 0;
    for (let item of items) {
      const [row] = await pool.execute(
        "select price from menu_items where item_id=? and rest_id=? and available=true",
        [item.item_id, rest_id]
      );
      if (row.length === 0) {
        return resp.status(400).json({ error: `Invalid item: ${item.item_id}` });
      }
      const price = row[0].price;
      totalAmount += price * item.qty;
      item.price = price; // snapshot store karne ke liye
    }

    const [orderResult] = await pool.query(
      "INSERT INTO orders (rest_id,cust_id,amount,address) VALUES (?,?,?,?)",
      [rest_id,cust_id,totalAmount,address]
    );
    const orderId = orderResult.insertId;

    for (let item of items) {
      await pool.query(
        "INSERT INTO order_items (order_id, item_id, qty, price) VALUES (?, ?, ?, ?)",
        [orderId, item.item_id, item.qty, item.price]
      );
    }  resp.status(201).json(orderResult)
    // resp.status(201).json({
    //   order_id: orderId,
    //   rest_id,
    //   amount: totalAmount,
    //   payment_status: "Pending",
    //   status: "pending",
    // });
  } catch (err) {
    console.error(err);
    resp.status(500).json({ error: "Order placement failed" });
  }
});

module.exports = router;
