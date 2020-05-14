from flask_socketio import SocketIO

socketio = SocketIO()

from .game_drawing_socket import game_drawing_socket
from .game_logic_socket import game_logic_socket
from .game_message_socket import game_message_socket
from.game_room_socket import game_room_socket

blueprints = [
    game_drawing_socket,
    game_logic_socket,
    game_message_socket,
    game_room_socket
]
