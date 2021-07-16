const express = require("express");
const router = express.Router();

const pool = require("../config/query");
const { user } = require("../middleware/user");

router.post("/new", user, (req, res) => {
  const { room_name, max_mem, room_Message } = req.body.data;
  if (!room_name)
    return res.json({ success: false, error: "Room name is compulsory" });
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
    console.log(`connection id ${connection.threadId}`);
    connection.query(
      "INSERT INTO room SET room_name = ?, user_name = ?, isAdmin = ?, max_member = ?, message = ?, members = ?",
      [
        room_name,
        req.session.passport.user[0].name,
        true,
        max_mem,
        room_Message,
        1,
      ],
      (err, room) => {
        if (err)
          return res.json({ success: false, error: "Error creating room" });
        connection.release();
        return res.status(200).json({ success: true, room });
      }
    );
  });
});

router.get("/join/:room", user, (req, res) => {
  const { room } = req.params;
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
    console.log(`connection id ${connection.threadId}`);
    connection.query(
      "INSERT INTO room SET user_name = ?, isAdmin = ?, ",
      [req.session.passport.user[0].name, false],
      (err, room) => {
        if (err)
          return res.json({ success: false, error: "Error creating room" });
        connection.release();
        // connection.query('INSERT INTO room SET member')
        return res.status(200).json({ success: true, room });
      }
    );
  });
});

router.get("/check/:room", user, (req, res) => {
  const { room } = req.params;
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
    console.log(`connection id ${connection.threadId}`);
    connection.query(
      "SELECT * FROM room WHERE room_name = ? AND user_name = ?",
      [room, req.session.passport.user[0].name],
      (err, room) => {
        if (err)
          return res.json({ success: false, error: "Error fetching room" });
        connection.release();

        // query for admin
        connection.query(
          "SELECT * FROM room WHERE room_name = ? AND isAdmin = ?",
          [room, 1],
          (err, admin) => {
            console.log(err)
            console.log(admin)
            if (err)
              return res.json({ success: false, error: "Error fetching admin" });
            connection.release();

            return res.status(200).json({ success: true, room, admin });
          }
        );
      }
    );
  });
});

router.get("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
    console.log(`connection id ${connection.threadId}`);
    connection.query("SELECT * FROM room WHERE isAdmin = '1'", (err, rooms) => {
      if (err)
        return res.json({ success: false, error: "Error fetching room" });
      connection.release();
      return res.status(200).json({ success: true, rooms });
    });
  });
});

module.exports = router;
