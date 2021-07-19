import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import ReactEmoji from "react-emoji";
import axios from "axios";

import Header from "./layout/Header";
import Input from "./layout/Input";

let socket;

const ChatRoom = (props) => {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomInfo, setRoomInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const room = props.match.params.room;
    setRoom(room);

    const ENDPOINT = "http://localhost:3003/";
    socket = io(ENDPOINT, { transports: ["websocket"] });

    //load room info from the db
    axios.get(`/api/room/check/${room}`).then((res) => {
      if (res.data.success) {
        // check if the constains msg from db load from db
        setRoomInfo(res.data);
        setLoading(true);
        if (res.data.admin[0].user_name === props.user.name) {
          socket.emit(
            "create",
            {
              name: res.data.admin[0].user_name,
              admin: res.data.admin[0].user_name,
              room: res.data.admin[0].room_name,
            },
            () => {}
          );
        } else {
          socket.emit(
            "join",
            {
              name: props.user.name,
              room,
              admin: res.data.admin[0].user_name,
            },
            () => {}
          );
        }
      } else {
        props.history.push("/");
      }
    });
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
        {message.user === props.user.name ? (
          <div className="messageContainer justifyEnd">
            <p className="sentText pr-10">{roomInfo.room[0].user_name}</p>
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
      <Header page={room} />
      <section>
        {loading ? (
          <div className="chatroom">
            <div className="infoBar">
              <div className="chatroom_title">
                <h3>{room}</h3>
              </div>
            </div>
            <ScrollToBottom className="messages">{msgs()}</ScrollToBottom>
            {roomInfo.room.length === 1 ? (
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
            ) : (
              ""
            )}
          </div>
        ) : (
          "loading room"
        )}
      </section>
    </div>
  );
};
export default ChatRoom;
