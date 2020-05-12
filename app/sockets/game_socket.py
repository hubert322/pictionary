from flask import Blueprint
from flask_socketio import SocketIO, emit, join_room
from ..services import game_service, player_service
from . import socketio

game_socket = Blueprint("game_socket", __name__)

@socketio.on("play_game")
def play_game_handler(data):
    game_code = data["gameCode"]
    game_service.update_playing_status(game_code, True)
    socketio.emit("play_game_announcement", broadcast=True, room=game_code)

# Maybe this should be in a chat room socket? not quite sure
@socketio.on("send_message")
def send_message_handler(data):
    print("GOT MSG")
    game_code = data["gameCode"]
    pid = data["pid"]
    message = data["message"]
    player = player_service.get_player(pid)
    socketio.emit("send_message_announcement", {
        "playerName": player["playerName"],
        "message": message
    }, broadcast=True, room=game_code)

@socketio.on("send_draw_line")
def send_draw_line_handler(data):
    game_code = data["gameCode"]
    pid = data["pid"]
    line = data["line"]
    socketio.emit("draw_line_announcement", {
        "pid": pid,
        "line": line
    }, broadcast=True, room=game_code)

@socketio.on("send_draw_dot")
def send_draw_dot_handler(data):
    game_code = data["gameCode"]
    pid = data["pid"]
    dot = data["dot"]
    socketio.emit("draw_dot_announcement", {
        "pid": pid,
        "dot": dot
    }, broadcast=True, room=game_code)
