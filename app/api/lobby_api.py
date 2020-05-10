from flask import Blueprint, request, jsonify
from ..services import room_service

lobby_api = Blueprint("lobby_api", __name__)

@lobby_api.route("/api/lobby/join", methods=["PATCH"])
def join_game():
    game_code = request.json["gameCode"]
    uid = request.json["uid"]
    if not lobby_service.can_join_game(game_code):
        return "Game Code doesn't exists.", 400

    lobby_service.join_game(game_code, uid)
    return "Joined Game!", 200

@lobby_api.route("/api/lobby/new", methods=["POST"])
def new_game():
    uid = request.json["uid"]
    game_code = lobby_service.get_game_code()
    if game_code == "":
        return "Game Code failed to generate. Try again later.", 500
    
    lobby_service.register_game_code(game_code, uid)
    return jsonify({"gameCode": game_code})
