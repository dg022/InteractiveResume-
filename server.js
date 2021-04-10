const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// var public = path.join(__dirname, "client/demo");

// app.get("/", function (req, res) {
//   res.sendFile(path.join(public, "index.html"));
// });

// app.use("/", express.static(public));

const PORT = process.env.PORT || 8080;

let rooms = new Map();

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", async () => {});

  socket.on("left", (socketID, roomNumber) => {
    socket.to(parseInt(roomNumber)).emit("moveLeft", 1);
  });

  socket.on("stopMovingLeft", (socketID, roomNumber) => {
    socket.to(parseInt(roomNumber)).emit("stopMovingLeft", 1);
  });

  socket.on("right", (socketID, roomNumber) => {
    socket.to(parseInt(roomNumber)).emit("moveRight", 1);
  });

  socket.on("stopMovingRight", (socketID, roomNumber) => {
    socket.to(parseInt(roomNumber)).emit("stopMovingRight", 1);
  });
  socket.on("submitRoomNumber", (roomNumber, socketID) => {
    if (rooms.has(roomNumber)) {
      socket.join(parseInt(roomNumber));
      io.to(socketID).emit("connected");
    } else {
      io.to(socketID).emit("failed");
    }
  });

  socket.on("newRoom", (socketID, roomNumber) => {
    rooms[roomNumber] = roomNumber;
    socket.join(roomNumber);
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
