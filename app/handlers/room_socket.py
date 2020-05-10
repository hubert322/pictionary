from flask import Blueprint
from flask_socketio import SocketIO, emit, join_room
from ..services import room_service
from . import socketio

room_socket = Blueprint("room_socket", __name__)

@socketio.on("join_room")
def join_room_handler(data):
    game_code = data["gameCode"]
    uid = data["uid"]
    name = data["name"]

    if not room_service.can_join_game(game_code):
        return False
    
    room_service.join_game(game_code, uid)
    join_room_helper(game_code, name)
    return True


@socketio.on("new_room")
def new_room_handler(data):
    uid = data["uid"]
    name = data["name"]
    game_code = room_service.get_game_code()
    if game_code == "":
        return ""

    room_service.register_game_code(game_code, uid)
    join_room_helper(game_code, name)
    return game_code

def join_room_helper(game_code: str, name: str):
    join_room(game_code)
    socketio.emit("join_room_announcement", name, broadcast=True, room=game_code)
