const express = require("express");
const pool = require("../config/db");
const { getIO } = require("../socket");
const io = getIO();
const router = express.Router();

router.get("/track-order/:id", async (req, resp) => {
  try {
    const delivery_person_id = parseInt(req.params.id);
    const [row] = await pool.execute(
      `SELECT 
        dt.tracking_id,
        o.order_id,
        o.amount,
        o.order_status,
        o.address,
        r.name,
        u.name ,
        u.phone,
        dt.status,
        dt.updated_at
      FROM delivery_tracking dt
      JOIN orders o ON dt.order_id = o.order_id
      JOIN restaurants r ON o.rest_id = r.rest_id
      join users u on o.cust_id=u.id
      WHERE dt.delivery_person_id = ? 
      order by dt.tracking_id desc
      `,
      [delivery_person_id]
    );
    return resp.json(row);
  } catch (error) {
    console.log(error);
    return resp.json({ error: "Database Error" });
  }
});
// api to change the status of delivery from picked up/ on way to delivered in delivery table
// and in order table changing status of order

router.put("/change-status/:tracking_id", async (req, resp) => {
  const { tracking_id } = req.params;
  const { order_id } = req.body;
  try {
    const [result] = await pool.execute(
      "update delivery_tracking set status='Delivered' where tracking_id=?",
      [tracking_id]
    );
    const [row] = await pool.execute(
      "update orders set order_status='Completed' where order_id=?",
      [order_id]
    );

    const [rest] = await pool.execute(
      "select r.owner_id from orders o join restaurants r on o.rest_id=r.rest_id where o.order_id=?",
      [order_id]
    );
    const ownerId = rest[0].owner_id;
    io.to(`owner_${ownerId}`).emit("OrderStatusChanged", order_id);
    return resp.status(200).json({ msg: "changed status successfully" });
  } catch (error) {
    console.log(error);
    return resp.json("failed to change the status")
  }
});

module.exports = router;
