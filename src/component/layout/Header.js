import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = ({ page }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get("/auth").then((res) => {
      if (res.data.isUserAuth) return setUser(res.data);
      return setUser(res.data);
    });
  }, []);

  const join = (e) => {
    e.preventDefault();
    //push new room to the user db
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
              <div className="user" onClick={(e) => join(e)}>
                join
              </div>
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
