from flask_socketio import SocketIO

socketio = SocketIO()

from .room_socket import room_socket
from .game_socket import game_socket
blueprints = [
    room_socket,
    game_socket
]
