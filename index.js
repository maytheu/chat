const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const passport=require('passport')
const mysql = require("mysql2");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.port || 3003;
const authRoute = require("./routes/auth");
const chat = require('./config/socket')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize())


require('./config/passport')

// create the connection to database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  password: "",
});

// connect the created pool
pool.getConnection((err, connection) => {
  if (err) throw err; // not connected!
  console.log(`connection id ${connection.threadId}`);
});


// app.use(passport.session())

 chat(io)

// app.get("/", (req, res) => {
//   res.send("Server started successfully");
// });
app.use("/auth", authRoute);

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
