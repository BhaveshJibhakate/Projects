const {Server}=require("socket.io")
let io;

function init(server){
    io=new Server(server,{
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true
    }
  })
    return io
}

function getIO() {
    if(!io) throw new Error("Socket io is not initialised")
    return io;
}

module.exports={init,getIO}