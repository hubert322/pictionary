from flask import Blueprint
from flask_socketio import SocketIO, emit, join_room
from ..services import game_logic_service, game_room_service, game_message_service, timer_service
from . import socketio

game_logic_socket_blueprint = Blueprint("game_logic_socket", __name__)

@socketio.on("send_play_game")
def play_game_handler(data):
    game_code = data["gameCode"]
    rounds = data["rounds"]
    draw_time = data["drawTime"]
    game_logic_service.game_init(game_code, rounds)
    timer_service.timer_init(game_code, draw_time)
    socketio.emit("play_game_announcement", broadcast=True, room=game_code)

@socketio.on("send_next_turn")
def send_next_turn_handler(data):
    game_code = data["gameCode"]
    if game_logic_service.can_next_turn(game_code):
        artist, words, curr_round = game_logic_service.get_next_turn(game_code)
        socketio.emit("next_artist_announcement", {
            "artist": artist,
            "words": words,
            "currRound": curr_round
        }, broadcast=True, room=game_code)

@socketio.on("send_selected_word")
def send_selected_word_handler(data):
    game_code = data["gameCode"]
    word = data["word"]
    game_logic_service.register_selected_word(game_code, word)
    socketio.emit("selected_word_announcement", {
        "selectedWord": word
    }, broadcast=True, room=game_code)

    timer_service.start_timer(game_code)

def _finished_guessing(game_code):
    timer_service.stop_timer(game_code)
    players = game_room_service.get_all_players_in_game(game_code)
    isEndGame = game_logic_service.is_end_game(game_code)
    socketio.emit("end_turn_announcement", {
        "players": players,
        "isEndGame": isEndGame
    }, broadcast=True, room=game_code)
    game_message_service.update_all_players_scores(game_code)
