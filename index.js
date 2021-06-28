const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const mysql = require("mysql2");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.port || 3003;
const authRoute = require("./routes/auth");
const chat = require('./config/socket')

// create the connection to database
// const connection = mysql.createConnection({
//   host: "",
//   user: "maytheu",
//   database: "information_schema",password:''
// });

// connection.execute('SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
// ['Rick C-137', 53],
// function(err, results, fields) {
//   console.log(err)
//   console.log(results); // results contains rows returned by server
//   console.log(fields); // fields contains extra meta data about results, if available

//   // If you execute same statement again, it will be picked from a LRU cache
//   // which will save query preparation time and give better performance
// })

 chat(io)

app.get("/", (req, res) => {
  res.send("Server started successfully");
});
app.use("/auth", authRoute);

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
