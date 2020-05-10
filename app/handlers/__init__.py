from flask_socketio import SocketIO

socketio = SocketIO()

from .room_socket import room_socket
blueprints = [
    room_socket
]
