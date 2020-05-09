from flask import Blueprint, request, jsonify
from ..services import lobby_service

lobby_api = Blueprint("lobby_api", __name__)

@lobby_api.route("/api/lobby/join", methods=["POST"])
def join_game():
    game_code = request.json["gameCode"]
    

@lobby_api.route("/api/lobby/new", methods=["POST"])
def new_game():
    uid = request.json["uid"]
    game_code = lobby_service.get_game_code()
    if game_code == "":
        return "Game Code failed to generate. Try again later", 500
    
    lobby_service.register_game_code(game_code, uid)
    return jsonify({"gameCode": game_code})
