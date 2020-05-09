from . import db
from typing import Dict
from flask_pymongo import pymongo

game_collection = pymongo.collection.Collection(db, "game")

def create_game(game_code: str, owner_uid: str):
    game_collection.insert_one({
        "gameCode": game_code,
        "ownerUid": owner_uid,
        "users": [
            owner_uid
        ]
    })

def get_game(game_code: str):
    game = game_collection.find({"gameCode": game_code})

    return dict(game)
