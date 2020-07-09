from flask import Blueprint, request
from flask_socketio import SocketIO, emit, join_room
from ..services import game_room_service, player_service
from . import socketio, clients

game_room_socket_blueprint = Blueprint("game_room_socket", __name__)


@socketio.on("send_join_room")
def join_room_handler(data):
    game_code = data["gameCode"]
    pid = data["pid"]
    player_name = data["playerName"]

    if not game_room_service.can_join_game(game_code, pid):
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
        socketio.emit("new_room_error")
    else:
        game_room_service.register_game_code(game_code, pid)
        socketio.emit("new_room_success", {
            "gameCode": game_code
        })
        data["gameCode"] = game_code
        join_room_announcement(data)


@socketio.on("send_rounds")
def rounds_handler(data):
    game_code = data["gameCode"]
    rounds = data["rounds"]
    game_room_service.set_rounds(game_code, rounds)
    if rounds in (3, 5, 10):
        socketio.emit("rounds_announcement", {
            "rounds": rounds
        }, brodcast=True, room=game_code)


@socketio.on("send_draw_time")
def rounds_handler(data):
    game_code = data["gameCode"]
    draw_time = data["drawTime"]
    game_room_service.set_draw_time(game_code, draw_time)
    if draw_time in (30, 60, 90):
        socketio.emit("draw_time_announcement", {
            "drawTime": draw_time
        }, brodcast=True, room=game_code)


def join_room_announcement(data):
    game_code = data["gameCode"]
    pid = data["pid"]
    player_name = data["playerName"]
    game_room_service.join_game(game_code, pid)
    join_room(game_code)
    clients[request.sid] = data
    player_service.update_player_name(pid, player_name)
    game = game_room_service.get_game(game_code)
    params = ["players", "ownerPid", "rounds", "drawTime"]
    data = {param: game[param] for param in params}
    socketio.emit("join_room_announcement", data, broadcast=True, room=game_code)

    if game["isPlaying"]:
        print("is playing")
        socketio.emit("play_game_announcement", room=game_code)
