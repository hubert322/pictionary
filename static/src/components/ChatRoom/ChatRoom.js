import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle
} from "react";
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

const ChatRoom = forwardRef((props, ref) => {
  const classes = useStyles();
  const { gameCode, pid, addGuessedCorrectPid } = props;
  const [message, setMessage] = useState("");
  // const [isFirstTime, setIsFirstTime] = useState(true);
  const [messages, setMessages] = useState([]);
  const messageArea = useRef(null);
  const messageTextField = useRef(null);

  useImperativeHandle(ref, () => ({
    addMessage: addMessage
  }));

  function addMessage(message, status) {
    let newMessage = {
      message: message,
      status: status
    };
    setMessages(messages => [...messages, newMessage]);
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
      let message = `${data.player.playerName}: ${data.message}`;
      let status = "";
      addMessage(message, status);
    });

    return () => {
      socket.off("send_message_announcement");
    };
  }, []);

  useEffect(() => {
    socket.on("correct_word_announcement", data => {
      let message = `${data.player.playerName} has guessed the word!`;
      let status = "Correct";
      addMessage(message, status);
      addGuessedCorrectPid(data.player._id);
    });

    return () => {
      socket.off("correct_word_announcement");
    };
  }, [addGuessedCorrectPid]);

  function onSendMessage() {
    sendMessage(gameCode, pid, message);
    setMessage("");
    messageTextField.current.focus();
  }

  function messageTextFieldOnKey(e) {
    const ENTER_KEY_CODE = 13;
    if (e.keyCode === ENTER_KEY_CODE && message !== "") {
      onSendMessage();
    }
  }

  return (
    <Panel className="ChatRoom" ref={ref}>
      <div className="ChatRoomMessageArea" ref={messageArea}>
        {messages.map((message, index) => (
          <p
            // eslint-disable-next-line react/no-array-index-key
            key={`msg${index}`}
            className={`ChatRoomMessage ChatRoomMessage${message.status}`}
          >
            {message.message}
          </p>
        ))}
      </div>
      <TextField
        className={`${classes.textField} ChatRoomTextField`}
        label="message"
        variant="outlined"
        value={message}
        onChange={e => setMessage(e.target.value)}
        inputRef={messageTextField}
        onKeyDown={e => messageTextFieldOnKey(e)}
      />
    </Panel>
  );
});

ChatRoom.displayName = "ChatRoom";

ChatRoom.propTypes = {
  gameCode: PropTypes.string.isRequired,
  pid: PropTypes.string.isRequired,
  addGuessedCorrectPid: PropTypes.func.isRequired
};

export default ChatRoom;
