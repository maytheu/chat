import React, { useState } from "react";
import axios from "axios";

import Header from "./layout/Header";
import Input from "./layout/Input";

const NewRoom = (props) => {
  const [room, setRoom] = useState("");
  const [member, setMember] = useState("");
  const [msg, setMsg] = useState("");

  const create = (e) => {
    e.preventDefault();
    if (room !== "") {
      const data = { room_name: room, room_Message: msg, max_mem: member };
      axios.post("/api/room/new", { data }).then((res) => {
        if (res.data.success) {
          props.history.push(`/${room}`);
        } else {
          alert("Error creating room");
          props.history.push(`/`);
        }
      });
    } else {
      alert("Add a room title");
    }
  };

  return (
    <div>
      <Header />
      <section>
        <div className="chatroom">
          <div className="infoBar">
            <div className="chatroom_title">
              <h3>Create a new room</h3>
            </div>
          </div>
          <form>
            <div className="newRoom">
              <Input
                type="text"
                value={room}
                setValue={setRoom}
                className="formRoom"
                placeholder="create new room"
              />
              <Input
                type="number"
                value={member}
                setValue={setMember}
                className="formRoom"
                placeholder="Maximum member"
              />
              <Input
                type="text"
                value={msg}
                setValue={setMsg}
                className="formRoom"
                placeholder="Room message"
              />

              <button className="sendButton" onClick={(e) => create(e)}>
                Create
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default NewRoom;
