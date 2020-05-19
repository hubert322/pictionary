from flask_socketio import SocketIO

socketio = SocketIO(async_mode="eventlet")

from .game_drawing_socket import game_drawing_socket_blueprint
from .game_logic_socket import game_logic_socket_blueprint
from .game_message_socket import game_message_socket_blueprint
from.game_room_socket import game_room_socket_blueprint

blueprints = [
    game_drawing_socket_blueprint,
    game_logic_socket_blueprint,
    game_message_socket_blueprint,
    game_room_socket_blueprint
]
