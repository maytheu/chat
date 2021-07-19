import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

let socket;

const Header = ({ page }) => {
  const [user, setUser] = useState({});
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ENDPOINT = "http://localhost:3003/";
    socket = io(ENDPOINT, { transports: ["websocket"] });

    axios.get("/auth").then((res) => {
      if (res.data.isUserAuth) setUser(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`/api/room/check/${page}`).then((res) => {
      if (res.data.success) {
        setRoom(res.data);
        setLoading(true);
      }
    });
  }, [page]);

  const join = (e) => {
    e.preventDefault();
    //push new room to the user db
    axios.get(`/api/room/join/${page}`).then((res) => {
      if (res.data.success) {
        socket.emit(
          "join",
          {
            name: user.name,
            room,
            admin: room.admin[0].user_name,
          },
          () => {}
        );
      }
    });
  };

  return (
    <header>
      <div className="title">
        <Link to="/">ChatList</Link>
      </div>
      <div className="account">
        {user.isUserAuth ? (
          <div className="account">
            {user.name}

            {page ? (
              user.isUserAuth && loading && room.room.length > 0 ? (
                ""
              ) : (
                <div className="user" onClick={(e) => join(e)}>
                  join
                </div>
              )
            ) : (
              ""
            )}
            <div className="user">
              <Link to="/create">reate a new room</Link>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="user">
          {user.isUserAuth ? (
            <a href="auth/logout">signout</a>
          ) : (
            <a href="auth/google">signin</a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
