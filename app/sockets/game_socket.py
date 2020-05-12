from flask import Blueprint
from flask_socketio import SocketIO, emit, join_room
from ..services import game_service, player_service
from . import socketio

game_socket = Blueprint("game_socket", __name__)

@socketio.on("play_game")
def play_game_handler(data):
    game_code = data["gameCode"]
    game_service.update_playing_status(game_code, True)
    # players_count = game_service.get_players_count(game_code)
    socketio.emit("play_game_announcement", broadcast=True, room=game_code)

    # def ack(pid):
    #     nonlocal players_count
    #     print(pid)
    #     players_count -= 1
    #     if players_count == 0:
    #         send_next_artist_handler({"gameCode": game_code})

    # socketio.emit("in_game_ack", broadcast=True, room=game_code, callback=ack)

# Maybe this should be in a chat room socket? not quite sure
@socketio.on("send_message")
def send_message_handler(data):
    print("GOT MSG")
    game_code = data["gameCode"]
    pid = data["pid"]
    message = data["message"]
    player = player_service.get_player(pid)
    socketio.emit("send_message_announcement", {
        "playerName": player["playerName"],
        "message": message
    }, broadcast=True, room=game_code)

@socketio.on("send_draw_line")
def send_draw_line_handler(data):
    game_code = data["gameCode"]
    line = data["line"]
    socketio.emit("draw_line_announcement", {
        "line": line
    }, broadcast=True, room=game_code)

@socketio.on("send_draw_dot")
def send_draw_dot_handler(data):
    game_code = data["gameCode"]
    dot = data["dot"]
    socketio.emit("draw_dot_announcement", {
        "dot": dot
    }, broadcast=True, room=game_code)

@socketio.on("send_undo_canvas")
def send_undo_canvas_handler(data):
    game_code = data["gameCode"]
    socketio.emit("undo_canvas_announcement", {}, broadcast=True, room=game_code)

@socketio.on("send_clear_canvas")
def send_clear_canvas_handler(data):
    game_code = data["gameCode"]
    socketio.emit("clear_canvas_announcement", {}, broadcast=True, room=game_code)

@socketio.on("send_enter_game")
def send_enter_game_handler(data):
    game_code = data["gameCode"]
    if game_service.can_start_game(game_code):
        send_next_artist_handler(data)

@socketio.on("send_next_artist")
def send_next_artist_handler(data):
    game_code = data["gameCode"]
    artist = game_service.get_next_artist(game_code)
    print("artist!!!")
    socketio.emit("next_artist_announcement", {
        "artist": artist
    }, broadcast=True, room=game_code)
