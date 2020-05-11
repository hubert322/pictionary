from flask import Blueprint
from flask_socketio import SocketIO, emit, join_room
from ..services import room_service, user_service
from . import socketio

room_socket = Blueprint("room_socket", __name__)

@socketio.on("join_room")
def join_room_handler(data):
    game_code = data["gameCode"]
    uid = data["uid"]
    username = data["username"]

    if not room_service.can_join_game(game_code):
        return {"users": {}}
    
    room_service.join_game(game_code, uid)
    users = join_room_helper(game_code, uid, username)
    return {"users": users}


@socketio.on("new_room")
def new_room_handler(data):
    uid = data["uid"]
    username = data["username"]
    game_code = room_service.get_game_code()
    if game_code == "":
        return {"gameCode": ""}

    room_service.register_game_code(game_code, uid)
    users = join_room_helper(game_code, uid, username)
    return {"gameCode": game_code, "users": users}

def join_room_helper(game_code: str, uid: str, username: str):
    join_room(game_code)
    user_service.update_username(uid, username)
    user = user_service.get_user(uid)
    socketio.emit("join_room_announcement", {"user": user}, broadcast=True, room=game_code)
    return room_service.get_all_users_in_game(game_code)
