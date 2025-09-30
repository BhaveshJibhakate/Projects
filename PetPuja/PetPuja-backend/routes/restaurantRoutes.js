const express = require("express");

const router = express.Router();
const pool = require("../config/db"); // using mysql2/promise pool

// 📌 List all restaurants
router.get("/all", async (req, resp) => {
  try {
    const [results] = await pool.execute("SELECT * FROM restaurants");
    return resp.json(results);
  } catch (err) {
    console.error("Database error:", err);
    return resp.status(500).json({ error: "Database error" });
  }
});

// 📌 View menu items of a restaurant
router.get("/:id/menu", async (req, resp) => {
  const id = req.params.id;

  try {
    const [results] = await pool.execute(
      "SELECT * FROM menu_items WHERE rest_id = ? AND available = true",
      [id]
    );
    return resp.json(results);
  } catch (err) {
    console.error("Database error:", err);
    return resp.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
