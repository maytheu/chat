import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import ReactEmoji from "react-emoji";
import axios from "axios";

import Header from "./layout/Header";
import Input from "./layout/Input";

let socket;

const ChatRoom = (props) => {
  let admin = "Adetunji";
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomInfo, setRoomInfo] = useState([]);
const name= props.user.name

  useEffect(() => {
    const room = props.match.params.room;
    setRoom(room);

    //load room info from the db
    axios.get(`/api/room/check/${room}`).then((res) => {
      if (res.data.success) console.log(res.data);
    });
    
    const ENDPOINT = "http://localhost:3003/";
    // socket = io(ENDPOINT, { transports: ["websocket"] });
    // if (roomInfo[0].isAdmin === 1) {
    //   socket.emit("create", { name:roomInfo[0].user_name, admin:roomInfo[0].user_name, room:roomInfo[0].room_name }, () => {});
    // } else {
    //   socket.emit("join", { name, room, admin }, () => {});
    // }
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [message]);

  const send = (e) => {
    e.preventDefault();
    if (message) {
      //send message to the db
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const msgs = () => {
    return messages.map((message, i) => (
      <div key={i}>
        {message.user === name ? (
          <div className="messageContainer justifyEnd">
            <p className="sentText pr-10">{name}</p>
            <div className="messageBox backgroundBlue">
              <p className="messageText colorWhite">
                {ReactEmoji.emojify(message.text)}
              </p>
            </div>
          </div>
        ) : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">
                {ReactEmoji.emojify(message.text)}
              </p>
            </div>
            <p className="sentText pl-10">{message.user}</p>
          </div>
        )}
      </div>
    ));
  };

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
          <ScrollToBottom className="messages">{msgs()}</ScrollToBottom>
          <form>
            <Input
              type="text"
              value={message}
              setValue={setMessage}
              placeholder="Type a message"
              className="input"
            />
            <button className="sendButton" onClick={(e) => send(e)}>
              Send
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
export default ChatRoom;
