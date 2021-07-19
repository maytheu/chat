const users = [];
const socket = (io) => {
  io.on("connection", (socket) => {
    console.log("A new user is connected");

    //create a new room
    socket.on("join", ({ room, msg, admin, name }, cb) => {
      console.log(`${name} join the room`);

      users.push({ id: socket.id, name, room, admin });
      //add to db

      //emits to a single user joining the room
      socket.emit("message", {
        user: admin,
        text: msg ? msg : `Welcome to ${room}`,
      });

      //broadcastto every room member
      socket.broadcast
        .to(room)
        .emit("message", { user: admin, text: `${name} has joined the room` });

      socket.join(room);

      cb();
    }); 

    socket.on("create", ({ room, msg, admin, name }, cb) => {
      users.push({ id: socket.id, name, room, admin });

      //if the room is just created by the admin
      console.log(`${admin} created the room`);
      socket.emit("message", {
        user: admin,
        text: msg
          ? msg
          : "You just created a new room, you can invite people to join your room by sharing the room lik with them",
      });

      socket.join(room);

      cb();
    });

    //receive message from the client
    socket.on("sendMessage", (message, cb) => {
      console.log("Message is sent");
      const user = users.find((user) => user.id === socket.id);

      //query the db for users

      io.to(user.room).emit("message", { user: user.name, text: message });
      //save message
      cb();
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

module.exports = socket;
