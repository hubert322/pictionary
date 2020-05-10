import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { socket } from "../../utils/socket";
import "./Room.css";

function Room() {
  useEffect(() => {
    socket.on("join_room_announcement", name => {
      console.log(`${name} has joined the room.`);
    });
  });

  return (
    <div className="Room">
      <Link to="/">BACK</Link>
    </div>
  );
}

export default Room;
