from flask import Blueprint
from flask_socketio import SocketIO, emit
from . import socketio

game_drawing_socket_blueprint = Blueprint("game_drawing_socket", __name__)

@socketio.on("send_draw_line")
def send_draw_line_handler(data):
    game_code = data["gameCode"]
    line = data["line"]
    emit("draw_line_announcement", {
        "line": line
    }, room=game_code, include_self=False)

@socketio.on("send_draw_dot")
def send_draw_dot_handler(data):
    game_code = data["gameCode"]
    dot = data["dot"]
    emit("draw_dot_announcement", {
        "dot": dot
    }, room=game_code, include_self=False)

@socketio.on("send_draw_fill")
def send_draw_fill_handler(data):
    game_code = data["gameCode"]
    fill = data["fill"]
    emit("draw_fill_announcement", {
        "fill": fill
    }, room=game_code, include_self=False)

@socketio.on("send_undo_canvas")
def send_undo_canvas_handler(data):
    game_code = data["gameCode"]
    emit("undo_canvas_announcement", {}, room=game_code)

@socketio.on("send_clear_canvas")
def send_clear_canvas_handler(data):
    game_code = data["gameCode"]
    emit("clear_canvas_announcement", {}, room=game_code)
