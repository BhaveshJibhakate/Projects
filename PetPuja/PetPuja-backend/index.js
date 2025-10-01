const express = require("express");
const path=require("path")
const cors = require("cors");
const authRoutes=require('./routes/authRoutes')
const userRoutes=require('./routes/userRoutes')
const ownerRoutes=require("./routes/ownerRoutes")
const deliveryRoutes=require("./routes/deliveryRoutes")
const PORT = 5000;
const app = express();
const authmiddleware=require("./middleware/authMiddleware")

app.use(cors());

app.get("/", (req, resp) => {
  resp.send("<div><h1>Hello Bhavesh</h1><button>click me</button></div>");
});
app.use(express.json())  // for parsing application/json
app.use(express.urlencoded({extended:true}))
app.use('/auth',authRoutes)
// app.use(authmiddleware)
app.use('/user',userRoutes)
app.use('/owner',ownerRoutes)
app.use('/delivery-person',deliveryRoutes)
app.use('/uploads',express.static(path.join(process.cwd(),'uploads')))

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
