const express = require("express");
const path=require("path")
const cors = require("cors");
const restaurantRoutes = require("./routes/restaurantRoutes");
const authRoutes=require('./routes/authRoutes')
const orderRoutes=require('./routes/orderRoutes')
const ownerRoutes=require("./routes/ownerRoutes")
const deliveryRoutes=require("./routes/deliveryRoutes")
const PORT = 5000;
const app = express();

app.use(cors());
// app.use(cors({
//   origin: "http://your-frontend-domain.com"        if i want to add specific domain
// }));
app.get("/", (req, resp) => {
  resp.send("<div><h1>Hello Bhavesh</h1><button>click me</button></div>");
});
app.use(express.json())  // for parsing application/json
app.use(express.urlencoded({extended:true}))
app.use('/auth',authRoutes)
app.use('/restaurant',restaurantRoutes)
app.use('/',orderRoutes)
app.use('/owner',ownerRoutes)
app.use('/',deliveryRoutes)
app.use('/uploads',express.static(path.join(process.cwd(),'uploads')))

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
