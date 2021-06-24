import React, { useEffect, useState } from "react";

import Header from "./layout/Header";
import Input from "./layout/Input";

const ChatRoom = (props) => {
  let member = true;
  const [room, setRoom] = useState("");
  useEffect(() => {
    const room = props.match.params.room;
    setRoom(room);
    //load room info from the db
  }, []);
  return (
    <div>
      <Header page />
      <section>
        <div className="chatroom">
          <div className="infoBar">
            <div className="chatroom_title">
              <h3>{room}</h3>
            </div>
          </div>
          fkdkkk
          {member ? (
            <form>
              <Input type="text" value="" placeholder="Type a message" className='input'/>
              <button className="sendButton">Send</button>
            </form>
          ) : (
            ""
          )}
        </div>
      </section>
    </div>
  );
};
export default ChatRoom;
