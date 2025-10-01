const express = require("express");
const router = express.Router();

const pool = require("../config/db"); // this should be mysql2/promise pool
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, resp) => {
  const { name, email, password, phone } = req.body;

  try {
    // check if user exists
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length > 0) {
      return resp.json({ error: "User already registered" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert new user
    const [result] = await pool.execute(
      "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, phone]
    );

    return resp.json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (err) {
    console.error("Database error", err);
    return resp.status(500).json({ error: "Database error" });
  }
});

// LOGIN
router.post("/login", async (req, resp) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return resp.status(401).json({ error: "Invalid email or password" });
    }

    const user = rows[0];

    // compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return resp.status(401).json({ error: "Invalid email or password" });
    }

    // generate token (best practice: use user.id + email, not name)
    const token = jwt.sign(
      { id: user.id, email: user.email,role:user.role,name:user.name },
      "SECRET_KEY", // move to env variable in production
      { expiresIn: "1h" }
    );

    return resp.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role:user.role
      },
    });
  } catch (err) {
    console.error("Error during login", err);
    return resp.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
