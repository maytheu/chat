const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const passport=require('passport')
const cookieSession = require('cookie-session')

const pool = require('./config/query')
const authRoute = require("./routes/auth");
const chat = require('./config/socket');
const roomRoute = require('./routes/room')
require('./config/passport')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.port || 3003;

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: ['cookieKey']
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize())
app.use(passport.session())

// connect the created pool
pool.getConnection((err, connection) => {
  if (err) throw err; // not connected!
  console.log(`connection id ${connection.threadId}`);
});

 chat(io)

app.get("/", (req, res) => {
  res.send("Server started successfully");
});

app.use("/auth", authRoute);
app.use('/api/room', roomRoute)

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
