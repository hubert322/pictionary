from flask import Blueprint, request
from flask_socketio import SocketIO, emit, join_room
from ..services import game_logic_service, game_room_service, game_message_service, timer_service
from . import socketio, clients

game_logic_socket_blueprint = Blueprint("game_logic_socket", __name__)


@socketio.on("send_play_game")
def play_game_handler(data):
    game_code = data["gameCode"]
    # rounds = data["rounds"]
    # draw_time = data["drawTime"]
    # game_logic_service.game_init(game_code, rounds)
    # timer_service.timer_init(game_code, draw_time)
    socketio.emit("play_game_announcement", broadcast=True, room=game_code)


@socketio.on("send_enter_game")
def send_enter_game_handler(data):
    game_code = data["gameCode"]
    if game_logic_service.can_start_game(game_code):
        game = game_logic_service.game_init(game_code)
        timer_service.timer_init(game_code, game["drawTime"])
        # game_logic_service.set_is_playing(game_code, True)
        next_artist_announcement(data)


@socketio.on("send_selected_word")
def send_selected_word_handler(data):
    game_code = data["gameCode"]
    word = data["word"]
    game_logic_service.register_selected_word(game_code, word)
    socketio.emit("selected_word_announcement", {
        "selectedWord": word
    }, broadcast=True, room=game_code)

    timer_service.start_drawing_timer(game_code)


def next_artist_announcement(data):
    game_code = data["gameCode"]
    artist, words, curr_round = game_logic_service.get_next_turn(game_code)
    players, rankings = game_logic_service.get_players_and_rankings(
        game_code, False)
    socketio.emit("next_artist_announcement", {
        "artist": artist,
        "words": words,
        "currRound": curr_round,
        "players": players,
        "rankings": rankings
    }, broadcast=True, room=game_code)


def end_game_announcement(data):
    game_code = data["gameCode"]
    if "players" not in data or "rankings" not in data:
        players, rankings = game_logic_service.get_players_and_rankings(
            game_code, True)
    else:
        players = data["players"]
        rankings = data["rankings"]
    game_logic_service.set_end_game(game_code)
    socketio.emit("end_game_announcement", {
        "players": players,
        "rankings": rankings
    })


@socketio.on("disconnect")
def disconnect_handler():
    if request.sid in clients:
        client = clients[request.sid]
        game_code = client["gameCode"]
        pid = client["pid"]
        player_name = client["playerName"]
        clients.pop(request.sid)
        is_playing = game_room_service.is_playing(game_code)
        owner_pid = game_room_service.get_owner_pid(game_code)
        no_more_players = game_logic_service.remove_player(game_code, pid, is_playing)
        if is_playing:
            if pid == owner_pid:
                _finished_guessing(game_code)
            players, rankings = game_logic_service.get_players_and_rankings(
                game_code, False)
            owner_pid = game_room_service.get_owner_pid(game_code)
            socketio.emit("game_disconnect_announcement", {
                "players": players,
                "rankings": rankings,
                "ownerPid": owner_pid,
                "playerName": player_name
            }, broadcast=True, room=game_code)
            if no_more_players:
                timer_service.stop_drawing_timer(game_code)
                end_game_announcement({
                    "gameCode": game_code,
                    "players": players,
                    "rankings": rankings
                })
        elif not no_more_players:
            players = game_room_service.get_all_players_in_game(game_code)
            owner_pid = game_room_service.get_owner_pid(game_code)
            socketio.emit("room_disconnect_announcement", {
                "players": players,
                "ownerPid": owner_pid
            }, broadcast=True, room=game_code)


def _finished_guessing(game_code):
    timer_service.stop_drawing_timer(game_code)
    selected_word = game_logic_service.get_selected_word(game_code)
    players = game_room_service.get_all_players_in_game(game_code)
    isEndGame = game_logic_service.is_end_game(game_code)
    socketio.emit("end_turn_announcement", {
        "players": players,
        "selectedWord": selected_word
    }, broadcast=True, room=game_code)
    timer_service.start_next_turn_timer(game_code, isEndGame)
    game_message_service.update_all_players_scores(game_code)
