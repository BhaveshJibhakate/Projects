const express = require("express");
const pool = require("../config/db");

const router = express.Router();

router.get("/delivery-track/:id", async (req, resp) => {
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
      WHERE dt.delivery_person_id = ?`,
      [delivery_person_id]
    );
    return resp.json(row);
  } catch (error) {
    console.log(error);
    return resp.json({ error: "Database Error" });
  }
});

module.exports = router;
