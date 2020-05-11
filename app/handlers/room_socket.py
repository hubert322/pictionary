from flask import Blueprint
from flask_socketio import SocketIO, emit, join_room
from ..services import room_service, player_service
from . import socketio

room_socket = Blueprint("room_socket", __name__)

@socketio.on("join_room")
def join_room_handler(data):
    game_code = data["gameCode"]
    pid = data["pid"]
    player_name = data["playerName"]

    if not room_service.can_join_game(game_code):
        return {"players": {}}
    
    print(game_code, pid, player_name)
    room_service.join_game(game_code, pid)
    players = join_room_helper(game_code, pid, player_name)
    return {"players": players}


@socketio.on("new_room")
def new_room_handler(data):
    pid = data["pid"]
    player_name = data["playerName"]
    game_code = room_service.get_game_code()
    if game_code == "":
        return {"gameCode": ""}

    room_service.register_game_code(game_code, pid)
    players = join_room_helper(game_code, pid, player_name)
    return {"gameCode": game_code, "players": players}

def join_room_helper(game_code: str, pid: str, player_name: str):
    join_room(game_code)
    player_service.update_player_name(pid, player_name)
    player = player_service.get_player(pid)
    socketio.emit("join_room_announcement", {"player": player}, broadcast=True, room=game_code)
    return room_service.get_all_players_in_game(game_code)
