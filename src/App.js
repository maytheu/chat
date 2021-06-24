import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "./component/Homepage";
import "./App.css";
import Protected from "./Protected";
import ChatRoom from "./component/ChatRoom";
import NewRoom from "./component/NewRoom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/create" exact component={NewRoom} />
        <Route path="/:room" exact  component={ChatRoom} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
