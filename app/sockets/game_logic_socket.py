from flask import Blueprint
from flask_socketio import SocketIO, emit, join_room
from ..services import game_logic_service
from . import socketio

game_logic_socket = Blueprint("game_logic_socket", __name__)

@socketio.on("play_game")
def play_game_handler(data):
    game_code = data["gameCode"]
    game_logic_service.game_init(game_code)
    socketio.emit("play_game_announcement", broadcast=True, room=game_code)

@socketio.on("send_next_turn")
def send_next_turn_handler(data):
    game_code = data["gameCode"]
    if game_logic_service.can_next_turn(game_code):
        artist, words = game_logic_service.get_next_turn(game_code)
        socketio.emit("next_artist_announcement", {
            "artist": artist,
            "words": words
        }, broadcast=True, room=game_code)

@socketio.on("send_selected_word")
def send_selected_word_handler(data):
    game_code = data["gameCode"]
    word = data["word"]
    game_logic_service.register_selected_word(game_code, word)
    socketio.emit("selected_word_announcement", broadcast=True, room=game_code)
