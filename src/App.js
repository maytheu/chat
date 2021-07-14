import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";

import Homepage from "./component/Homepage";
import "./App.css";
import Protected from "./Protected";
import ChatRoom from "./component/ChatRoom";
import NewRoom from "./component/NewRoom";

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    axios.get("/auth").then((res) => {
      if (res.data.isUserAuth) return setUser(res.data);
      return setUser(res.data);
    });
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Protected path="/create" exact user={user} component={NewRoom} />
        <Protected path="/:room" exact user={user} component={ChatRoom} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
