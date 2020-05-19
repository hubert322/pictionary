from flask import Blueprint
from flask_socketio import SocketIO, emit
from . import socketio

game_drawing_socket_blueprint = Blueprint("game_drawing_socket", __name__)

@socketio.on("send_draw_line")
def send_draw_line_handler(data):
    game_code = data["gameCode"]
    line = data["line"]
    socketio.emit("draw_line_announcement", {
        "line": line
    }, broadcast=True, room=game_code, include_self=False)

@socketio.on("send_draw_dot")
def send_draw_dot_handler(data):
    game_code = data["gameCode"]
    dot = data["dot"]
    socketio.emit("draw_dot_announcement", {
        "dot": dot
    }, broadcast=True, room=game_code, include_self=False)

@socketio.on("send_undo_canvas")
def send_undo_canvas_handler(data):
    game_code = data["gameCode"]
    socketio.emit("undo_canvas_announcement", {}, broadcast=True, room=game_code)

@socketio.on("send_clear_canvas")
def send_clear_canvas_handler(data):
    game_code = data["gameCode"]
    socketio.emit("clear_canvas_announcement", {}, broadcast=True, room=game_code)
