from flask import Blueprint
from flask_socketio import SocketIO, emit, join_room
from ..services import lobby_service
from . import socketio

room_socket = Blueprint("room_socket", __name__)

@socketio.on("join_room")
def join_room_handler(data):
    game_code = data["gameCode"]
    uid = data["uid"]

#     if not lobby_service.can_join_game(game_code):
#         return "Game Code doesn't exists.", 400

    lobby_service.join_game(game_code, uid)
    join_room(game_code)
    socketio.emit("join_room_announcement")

@socketio.on("new_room")
def new_room_handler(data):
    print(data)
    uid = data["uid"]
    print(uid)
    print(type(uid))
    game_code = lobby_service.get_game_code()
    # if game_code == "":
    #     return "Game Code failed to generate. Try again later.", 500
    
    
    lobby_service.register_game_code(game_code, uid)

    join_room(game_code)
    socketio.emit("join_room_announcement", {"gameCode": game_code})

    # return jsonify({"gameCode": game_code})
