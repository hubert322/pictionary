from flask import Blueprint
from flask_socketio import SocketIO, emit, join_room
from ..services import game_room_service, player_service
from . import socketio

game_room_socket = Blueprint("game_room_socket", __name__)

@socketio.on("send_join_room")
def join_room_handler(data):
    game_code = data["gameCode"]
    pid = data["pid"]
    player_name = data["playerName"]

    if not game_room_service.can_join_game(game_code):
        socketio.emit("join_room_error")
    else:
        socketio.emit("join_room_success")
        join_room_announcement(data)

@socketio.on("send_new_room")
def new_room_handler(data):
    pid = data["pid"]
    player_name = data["playerName"]
    game_code = game_room_service.get_game_code()
    if game_code == "":
        socketio.emit("new_room_error");
    else:
        game_room_service.register_game_code(game_code, pid)
        socketio.emit("new_room_success", {
            "gameCode": game_code
        })
        data["gameCode"] = game_code
        join_room_announcement(data)


def join_room_announcement(data):
    game_code = data["gameCode"]
    pid = data["pid"]
    player_name = data["playerName"]
    game_room_service.join_game(game_code, pid)
    join_room(game_code)
    player_service.update_player_name(pid, player_name)
    players = game_room_service.get_all_players_in_game(game_code)
    owner_pid = game_room_service.get_game_owner_pid(game_code)
    socketio.emit("join_room_announcement", {
        "players": players,
        "ownerPid": owner_pid
    }, broadcast=True, room=game_code)
