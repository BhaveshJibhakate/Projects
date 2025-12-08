// socket/socket.js
const User = require("./models/User");
const Message=require("./models/Message")

module.exports = function (io) {
  io.on("connection", async (socket) => {
    console.log("User connected:", socket.id);

    // When session user logs in
    const userId = socket.handshake.auth.userId;
    if (userId) {
      await User.findByIdAndUpdate(userId, {
        isOnline: true,
        socketId: socket.id
      });
    }
        // -----------------------------------
    // 🔥 REAL-TIME MESSAGE HANDLER
    // -----------------------------------
    socket.on("sendMessage", async ({ chatId, sender, receiver, message }) => {
      try {
        // 1. Save message to DB
        const newMessage = await Message.create({
          chatId,
          sender,
          message,
        });

        // 2. Get receiver information
        const receiverUser = await User.findById(receiver);

        // 3. If receiver is online -> deliver instantly
        if (receiverUser?.socketId) {
          io.to(receiverUser.socketId).emit("receiveMessage", newMessage);
        }

        // 4. Send message back to sender UI also (your chat stays updated)
        io.to(socket.id).emit("messageSent", newMessage);

      } catch (error) {
        console.log("Message error:", error);
      }
    });

    // -----------------------------------
    // User disconnects
    // -----------------------------------

    // On disconnect
    socket.on("disconnect", async () => {
      await User.findOneAndUpdate({ socketId: socket.id }, {
        isOnline: false,
        socketId: null
      });
    });
  });
};
