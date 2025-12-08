const express = require("express");
const path=require("path")
const http=require("http")
const cors = require("cors");

const app = express();

const server=http.createServer(app)
const {init}=require('./socket')
const io=init(server)

const authRoutes=require('./routes/authRoutes')
const userRoutes=require('./routes/userRoutes')
const ownerRoutes=require("./routes/ownerRoutes")
const deliveryRoutes=require("./routes/deliveryRoutes")

const PORT = 5000;


const authmiddleware=require("./middleware/authMiddleware")

app.use(cors());

app.get("/", (req, resp) => {
  resp.send("<div><h1>Hello Bhavesh</h1><button>click me</button></div>");
});
app.get("/servefile",(req,resp)=>{
  resp.sendFile(__dirname+"/index.html")
})
app.use(express.json())  // for parsing application/json
app.use(express.urlencoded({extended:true}))
app.use('/auth',authRoutes)
app.use('/uploads',express.static(path.join(process.cwd(),'uploads')))

// app.use(authmiddleware)    this is used when you want to globally mount middleware
app.use('/user',authmiddleware,userRoutes)
app.use('/owner',authmiddleware,ownerRoutes)
app.use('/delivery_person',authmiddleware,deliveryRoutes)

io.on("connection",(socket)=>{
  console.log("User connected",socket.id);
  socket.on("joinOwnerRoom",(ownerId)=>{
    socket.join(`owner_${ownerId}`)
    console.log(`Owner ${ownerId} joined room owner_${ownerId}`);
    
  })
  socket.on("joinDeliveryRoom",(DeliveryPersonId)=>{
     socket.join(`deliveryPerson_${DeliveryPersonId}`)
     console.log(`DeliveryPerson ${DeliveryPersonId} joined room deliveryPerson_${DeliveryPersonId}`)
  })
  
})
server.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});

module.exports=io