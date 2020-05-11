import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useHistory, useLocation } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { socket } from "../../utils/socket";
import "./ChatRoom.css";
import { sendMessage } from "./ChatRoomApiSocket";

function ChatRoom(props) {
  const { gameCode, pid } = props;
  const messageArea = useRef(null);

  useEffect(() => {
    socket.on("receive_message", data => {
      let messageNode = document.createElement("p");
      messageNode.textContent = `${data.playerName}: ${data.message}`;
      messageArea.current.appendChild(messageNode);
    });
  });

  return (
    <div className="ChatRoom">
      <h1>Chat Room</h1>
      <div className="MessageArea" ref={messageArea} />
      <TextField label="message" />
      <button type="button" onClick={() => sendMessage(gameCode, pid)}>
        Send
      </button>
    </div>
  );
}

ChatRoom.propTypes = {
  gameCode: PropTypes.string.isRequired,
  pid: PropTypes.string.isRequired
};

export default ChatRoom;
