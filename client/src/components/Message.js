import React from "react";
import ReactEmoji from 'react-emoji'

import "./css/message.css";

const Message = ({ name, message }) => {
  let isSentByCurrentUser = false;
  const trimedName = name.trim().toLowerCase();
  if (message.user === trimedName) {
    isSentByCurrentUser = true;
  }
  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{trimedName}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{ReactEmoji.emojify(message.text)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{ReactEmoji.emojify(message.text)}</p>
      </div>
      <p className="sentText pl-10">{message.user}</p>
    </div>
  );
};

export default Message;
