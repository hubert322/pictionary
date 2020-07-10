from flask import Blueprint, request
from flask_socketio import SocketIO, emit, join_room
from ..services import player_service
from . import socketio, clients

player_socket_blueprint = Blueprint("player_socket", __name__)


@socketio.on("send_get_pid")
def get_pid_handler(data):
    pid = player_service.get_pid()
    if pid == "":
        emit("get_pid_error")
    else:
        player_service.register_player(pid)
        clients[request.sid] = {"pid": pid}
        emit("get_pid_success", {
            "pid": pid
        })
