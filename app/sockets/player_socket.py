from flask import Blueprint, request
from flask_socketio import SocketIO, emit, join_room
from ..services import player_service, client_service
from . import socketio

player_socket_blueprint = Blueprint("player_socket", __name__)


@socketio.on("send_get_pid")
def get_pid_handler(data):
    pid = player_service.get_pid()
    if pid == "":
        emit("get_pid_error")
    else:
        player_service.register_player(pid)
        data = {
            "_id": request.sid,
            "pid": pid
        }
        client_service.create_client(data)
        emit("get_pid_success", {
            "pid": pid
        })
