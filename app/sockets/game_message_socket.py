from flask import Blueprint
from flask_socketio import SocketIO, emit
from ..services import game_message_service, player_service, game_room_service
from . import socketio, game_logic_socket

game_message_socket_blueprint = Blueprint("game_message_socket", __name__)

@socketio.on("send_message")
def send_message_handler(data):
    game_code = data["gameCode"]
    pid = data["pid"]
    message = data["message"]
    player = player_service.get_player(pid)
    if game_message_service.is_correct_word(game_code, pid, message):
        _guessed_correct_word(game_code, pid, player)
    else:
        socketio.emit("send_message_announcement", {
            "player": player,
            "message": message
        }, broadcast=True, room=game_code)

def _guessed_correct_word(game_code, pid, player):
    game_message_service.set_player_earned_score(game_code, pid)
    socketio.emit("correct_word_announcement", {
        "player": player
    }, broadcast=True, room=game_code)
    game_message_service.register_player_guessed_correct(game_code, pid)
    if game_message_service.has_finished_guessing(game_code):
        game_message_service.set_artist_mega_score(game_code)
        game_logic_socket._finished_guessing(game_code)
