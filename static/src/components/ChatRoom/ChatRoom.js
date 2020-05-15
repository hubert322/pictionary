import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { socket } from "../../utils/socket";
import { sendMessage } from "./ChatRoomApiSocket";
import Panel from "../Panel/Panel";
import TextField from "../TextField/TextField";
import "./ChatRoom.css";

const useStyles = makeStyles({
  textField: {
    margin: "5px 0px",
    "& .MuiOutlinedInput-root": {
      color: "black"
    },
    "& input": {
      padding: "7px"
    },
    "& label": {
      color: "black",
      transform: "translate(14px, 7px) scale(1)"
    },
    "& label.Mui-focused": {
      color: "black"
    }
  }
});

function ChatRoom(props) {
  const classes = useStyles();
  const { gameCode, pid, addPlayerScore } = props;
  const [message, setMessage] = useState("");
  // const [isFirstTime, setIsFirstTime] = useState(true);
  const messageArea = useRef(null);
  const messageTextField = useRef(null);

  function addMessage(message, isCorrect) {
    let messageNode = document.createElement("p");
    messageNode.textContent = message;
    messageNode.className = "ChatRoomMessage";
    if (isCorrect) {
      messageNode.className += " ChatRoomCorrectMessage";
    }
    messageArea.current.appendChild(messageNode);
    scroll();
  }

  function scroll() {
    messageArea.current.scrollTop = messageArea.current.scrollHeight;
    // if (isFirstTime) {
    //   messageArea.current.scrollTop = messageArea.current.scrollHeight;
    //   setIsFirstTime(false);
    // } else if (
    //   messageArea.current.scrollTop + messageArea.current.clientHeight ===
    //   messageArea.current.scrollHeight
    // ) {
    //   messageArea.current.scrollTop = messageArea.current.scrollHeight;
    // }
  }

  useEffect(() => {
    socket.on("send_message_announcement", data => {
      addMessage(`${data.player.playerName}: ${data.message}`, false);
    });

    return () => {
      socket.off("send_message_announcement");
    };
  }, []);

  useEffect(() => {
    socket.on("correct_word_announcement", data => {
      console.log("correct!");
      console.log(data);
      addMessage(`${data.player.playerName} has guessed the word!`, true);
      addPlayerScore(data.player._id, data.score);
    });

    return () => {
      socket.off("correct_word_announcement");
    };
  }, [addPlayerScore]);

  function onSendMessage() {
    sendMessage(gameCode, pid, message);
    setMessage("");
    messageTextField.current.focus();
  }

  function messageTextFieldOnKey(e) {
    const ENTER_KEY_CODE = 13;
    if (e.keyCode === ENTER_KEY_CODE) {
      onSendMessage();
      // addMessage(message, true);
      // addMessage(message, false);
      // setMessage("");
    }
  }

  return (
    <Panel className="ChatRoom">
      {/* <h2 className="ChatRoomTitle">Chat Room</h2> */}
      <div className="ChatRoomMessageArea" ref={messageArea} />
      <TextField
        className={`${classes.textField} ChatRoomTextField`}
        label="message"
        variant="outlined"
        value={message}
        onChange={e => setMessage(e.target.value)}
        inputRef={messageTextField}
        onKeyDown={e => messageTextFieldOnKey(e)}
      />
      {/* <button type="button" onClick={() => onSendMessage()}>
        Send
      </button> */}
    </Panel>
  );
}

ChatRoom.propTypes = {
  gameCode: PropTypes.string.isRequired,
  pid: PropTypes.string.isRequired,
  addPlayerScore: PropTypes.func.isRequired
};

export default ChatRoom;
