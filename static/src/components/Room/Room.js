import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { socket } from "../../utils/socket";
import "./Room.css";

function Room() {
  const state = useLocation().state;
  const [users, setUsers] = useState(state.users);

  useEffect(() => {
    socket.on("join_room_announcement", data => {
      console.log(data);
      console.log(data.user);
      setUsers(users => [...users, data.user]);
    });
  });

  return (
    <div className="Room">
      <Link to="/">BACK</Link>
      <div className="UsersContainer">
        {users.map(user => (
          <div className="user" key={user._id}>
            {user.username}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Room;
