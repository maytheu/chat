import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import axios from 'axios'

import Header from "./layout/Header";
import Room from "./layout/Room";

let socket;

const Homepage = ({ ...rest }) => {
  // const room = [
  //   { title: "Code", members: 25, online: 5 },
  //   { title: "Coders", members: 15, online: 5 },
  //   { title: "js", members: 25, online: 5 },
  //   { title: "C", members: 25, online: 15 },
  //   { title: "fiction", members: 25, online: 5 },
  //   { title: "movies", members: 25, online: 5 },
  //   { title: "Codes", members: 25, online: 5 },
  // ];
  const [room, setRoom]=useState([])
  const ENDPOINT = "http://localhost:3003/";



  useEffect(() => {
    axios.get('/api/room').then(res=>{
      setRoom(res.data.rooms)
    })
    socket = io(ENDPOINT, { transports: ["websocket"] });
    socket.on("online", ({ online }) => {
      console.log("online", { online });
    });
  }, []);

  const showRoom = (rooms) => {
    return rooms.map(({ room_name, max_member, online, id }) => (
      <div key={id}>
        <Link to={room_name}>
          <Room title={room_name} members={max_member} online={online} />
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
