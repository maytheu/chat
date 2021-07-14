const express = require("express");
const router = express.Router();

const pool = require("../config/query");
const { user } = require("../middleware/user");

router.post("/new", user, (req, res) => {
  const { room_name, max_mem, room_Message } = req.body;
  if (!room_name)
    return res.json({ success: false, error: "Room name is compulsory" });
  pool.query(
    "INSERT INTO room SET room_name = ?, user_name = ?, isAdmin = ?, max_member = ?, message = ?",
    [room_name, req.session.passport.user[0].name, true, max_mem, room_Message],
    (err, room) => {
      if (err)
        return res.json({ success: false, error: "Error creating room" });
      return res.status(200).json({ success: true, room });
    }
  );
});

module.exports = router;
