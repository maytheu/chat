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

router.get("/join/:rooms", user, (req, res) => {
  const { rooms } = req.params;
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
    console.log(`connection id ${connection.threadId}`);
    connection.query(
      "SELECT * FROM room WHERE room_name = ? AND isAdmin ='1'",
      [rooms],
      (err, member) => {
        if (err)
          return res.json({ success: false, error: "Error joining room" });
        connection.release();

        if (member[0].members < member[0].max_member) {
          let reg = member[0].members + 1;

          // create anew room member in db
          connection.query(
            "INSERT INTO room SET user_name = ?, isAdmin = ?, members = ?, room_name = ?, message = ?",
            [req.session.passport.user[0].name, false, 1, rooms, ""],
            (err, room) => {
              if (err)
                return res.json({
                  success: false,
                  error: "Error joining room",
                });
              connection.release();

              // update admin room
              connection.query(
                "UPDATE room SET members = ? WHERE room_name = ? AND isAdmin = ?",
                [reg, rooms, 1],
                (err, adroo) => {
                  if (err)
                    return res.json({
                      success: false,
                      error: "Error synchronising member to room",
                    });
                  connection.release();

                  return res.status(200).json({ success: true, room });
                }
              );
            }
          );
        } else {
          return res.json({ success: false, error: "The room is full" });
        }
      }
    );
  });
});

router.get("/check/:room", user, (req, res) => {
  const { room } = req.params;
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
    console.log(`connection id ${connection.threadId}`);

    // query for admin
    connection.query(
      "SELECT * FROM room WHERE room_name = ? AND isAdmin ='1'",
      [room],
      (err, admin) => {
        if (err)
          return res.json({ success: false, error: "Error fetching admin" });
        connection.release();

        connection.query(
          "SELECT * FROM room WHERE room_name = ? AND user_name = ?",
          [room, req.session.passport.user[0].name],
          (err, room) => {
            if (err)
              return res.json({ success: false, error: "Error fetching room" });
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
