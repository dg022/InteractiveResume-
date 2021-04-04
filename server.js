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

var public = path.join(__dirname, "client/demo");

app.get("/", function (req, res) {
  res.sendFile(path.join(public, "index.html"));
});

app.use("/", express.static(public));

const PORT = process.env.PORT || 8080;

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", async () => {});

  socket.on("left", (arg) => {
    io.emit("moveLeft", 1);
  });

  socket.on("stopMovingLeft", (arg) => {
    io.emit("stopMovingLeft", 1);
  });

  socket.on("right", (arg) => {
    io.emit("moveRight", 1);
  });

  socket.on("stopMovingRight", (arg) => {
    io.emit("stopMovingRight", 1);
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
