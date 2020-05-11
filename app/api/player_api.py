from flask import Blueprint, request, jsonify
from ..services import player_service

player_api = Blueprint("player_api", __name__)

@player_api.route("/api/player/new", methods=["POST"])
def new_player():
    pid = player_service.get_pid()
    if pid == "":
        return "Failed to generate pid.", 400

    player_service.register_player(pid)
    return jsonify({"pid": pid})
