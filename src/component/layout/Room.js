import React from "react";

const Room = ({ title, members, online }) => {
  return (
    <div className="room">
      <div className="room_title">
        <h2>{title}</h2>
      </div>
      <div className="room_member">{`${members} members`}</div>
      <div className="room_online">{`${online} online`}</div>
    </div>
  );
};

export default Room;
