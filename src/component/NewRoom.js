import React from "react";

import Header from "./layout/Header";
import Input from "./layout/Input";

const NewRoom = (props) => {
  return (
    <div>
      <Header />
      <section>
        <div className="chatroom">
          <div className="infoBar">
            <div className="chatroom_title">
              <h3>Create a new room</h3>
            </div>
          </div>
          <form>
            <div className="newRoom">
              <Input
                type="text"
                value=""
                className="formRoom"
                placeholder="create new room"
              />
              <Input
                type="number"
                value=""
                className="formRoom"
                placeholder="Maximum member"
              />
              <button className="sendButton">Create</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default NewRoom;
