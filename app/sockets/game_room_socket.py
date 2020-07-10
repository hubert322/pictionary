from flask import Blueprint, request
from flask_socketio import SocketIO, emit, join_room
from ..services import game_room_service, player_service, client_service
from . import socketio

game_room_socket_blueprint = Blueprint("game_room_socket", __name__)


@socketio.on("send_join_room")
def join_room_handler(data):
    game_code = data["gameCode"]

    if not game_room_service.can_join_game(game_code):
        emit("join_room_error")
    else:
        emit("join_room_success")


@socketio.on("send_new_room")
def new_room_handler(data):
    pid = data["pid"]
    game_code = game_room_service.get_game_code()
    if game_code == "":
        emit("new_room_error")
    else:
        game_room_service.register_game_code(game_code, pid)
        emit("new_room_success", {
            "gameCode": game_code
        })
        data["gameCode"] = game_code


@socketio.on("send_enter_room")
def enter_room_handler(data):
    game_code = data["gameCode"]
    pid = data["pid"]
    player_name = data["playerName"]
    game_room_service.join_game(game_code, pid)
    join_room(game_code)
    client_service.update_client(request.sid, data)
    player_service.update_player_name(pid, player_name)
    game = game_room_service.get_game(game_code)
    params = ["players", "ownerPid", "rounds", "drawTime"]
    data = {param: game[param] for param in params}
    emit("join_room_announcement", data, room=game_code)

    # used to join mid-game
    # currently not available
    # if game["isPlaying"]:
    #     print("is playing")
    #     emit("play_game_announcement", room=game_code)


@socketio.on("send_rounds")
def rounds_handler(data):
    game_code = data["gameCode"]
    rounds = data["rounds"]
    game_room_service.set_rounds(game_code, rounds)
    if rounds in (3, 5, 10):
        emit("rounds_announcement", {
            "rounds": rounds
        }, brodcast=True, room=game_code)


@socketio.on("send_draw_time")
def rounds_handler(data):
    game_code = data["gameCode"]
    draw_time = data["drawTime"]
    game_room_service.set_draw_time(game_code, draw_time)
    if draw_time in (30, 60, 90):
        emit("draw_time_announcement", {
            "drawTime": draw_time
        }, brodcast=True, room=game_code)

