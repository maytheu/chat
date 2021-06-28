import React from "react";
import { Link } from "react-router-dom";

const Header = ({ page }) => {
  let success = true;

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
        {success ? (
          <div className="account">
            {page ? (
              <div className="user" onClick={(e) => join(e)}>
                join
              </div>
            ) : (
              "Adetunji"
            )}
            <div className="user">
              <Link to="/create">reate a new room</Link>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="user">{success ? "signout" : "signin"}</div>
      </div>
    </header>
  );
};

export default Header;
