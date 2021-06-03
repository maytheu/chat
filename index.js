const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.port || 3003;
const authRoute = require("./routes/auth");

io.on("connection", (socket) => {
  console.log("A new user is connected");

  socket.on("disconnect", () => {
    console.log("Usser disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Server started successfully");
});
app.use("/auth", authRoute);

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
