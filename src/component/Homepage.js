import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";

import Header from "./layout/Header";
import Room from "./layout/Room";

let socket;

const Homepage = () => {
  const room = [
    { title: "Code", members: 25, online: 5 },
    { title: "Coders", members: 15, online: 5 },
    { title: "js", members: 25, online: 5 },
    { title: "C", members: 25, online: 15 },
    { title: "fiction", members: 25, online: 5 },
    { title: "movies", members: 25, online: 5 },
    { title: "Codes", members: 25, online: 5 },
  ];
  const ENDPOINT = "http://localhost:3003/";
  useEffect(() => {
    socket = io(ENDPOINT, { transports: ["websocket"] });

    socket.on("online", ({ online }) => {
      console.log("online", { online });
    });
  }, []);

  const showRoom = (rooms) => {
    return rooms.map(({ title, members, online }, i) => (
      <div key={i}>
        <Link to={title}>
          <Room title={title} members={members} online={online} />
        </Link>
      </div>
    ));
  };

  return (
    <div>
      <Header />
      <section>{showRoom(room)}</section>
    </div>
  );
};

export default Homepage;
