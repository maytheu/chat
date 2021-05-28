import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import "./css/chat.css";
import InfoBar from "./InfoBar";
import Input from "./Input";
import Messages from "./Messages";
import UserContainer from "./UserContainer";

let socket;

const Chat = (props) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState("");

  const ENDPOINT = "https://sheltered-escarpment-06649.herokuapp.com/";

  useEffect(() => {
    const { name, room } = queryString.parse(props.location.search);

    socket = io(ENDPOINT, { transports: ["websocket"] });

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, () => {});

  }, [ENDPOINT, props.location.search]);

  useEffect(() => {
    //receive msg from the server from the client
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    // receive the broadcasted user from server
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

  }, [message]);

  //function for sending messages
  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      //send message to the server
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <UserContainer users={users} />
    </div>
  );
};
export default Chat;
