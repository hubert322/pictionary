from flask import Blueprint, request, jsonify
from ..services import user_service

user_api = Blueprint("user_api", __name__)

@user_api.route("/api/user/new", methods=["POST"])
def new_user():
    uid = user_service.get_uid()
    if uid == "":
        return "Failed to generate uid.", 400

    user_service.register_user(uid)
    return jsonify({"uid": uid})
