import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useHistory, useLocation } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { socket } from "../../utils/socket";
import "./ChatRoom.css";
import { sendMessage } from "./ChatRoomApiSocket";

function ChatRoom(props) {
  const { gameCode, pid } = props;
  const [message, setMessage] = useState("");
  const messageArea = useRef(null);
  const messageTextField = useRef(null);

  useEffect(() => {
    socket.on("receive_message", data => {
      console.log("got message");
      console.log(data);
      let messageNode = document.createElement("p");
      messageNode.textContent = `${data.playerName}: ${data.message}`;
      messageArea.current.appendChild(messageNode);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  function onSendMessage() {
    sendMessage(gameCode, pid, message);
    setMessage("");
    messageTextField.current.focus();
  }

  function messageTextFieldOnKey(e) {
    const ENTER_KEY_CODE = 13;
    if (e.keyCode === ENTER_KEY_CODE) {
      onSendMessage();
    }
  }

  return (
    <div className="ChatRoom">
      <h1>Chat Room</h1>
      <div className="MessageArea" ref={messageArea} />
      <TextField
        label="message"
        value={message}
        onChange={e => setMessage(e.target.value)}
        inputRef={messageTextField}
        onKeyUp={e => messageTextFieldOnKey(e)}
        autoFocus
      />
      <button type="button" onClick={() => onSendMessage()}>
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
