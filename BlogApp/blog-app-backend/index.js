// server.js
const express = require("express");
const connectDB = require("./config/db");
const sessionMiddleware = require("./config/session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// CORS - allow frontend (adjust origin in production)
app.use(cors({
  origin: "http://localhost:5173", // React dev server
  credentials: true,
  allowedHeaders: ["Content-Type"],

}));

app.use(express.json());

app.use(cookieParser());

// session
app.use(sessionMiddleware);

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));

app.get("/", (req, res) => res.send("Blog API is running"));

app.listen(PORT, () => console.log("Server listening on", PORT));
