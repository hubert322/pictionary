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
        ],
        "isPlaying": False
    })

def get_game(game_code: str):
    if game_collection.count_documents({"gameCode": game_code}, limit=1) == 0:
        return None
    games = game_collection.find({"gameCode": game_code})
    return games[0]

def add_user_to_game(game_code: str, uid: str):
    game_collection.update({"gameCode": game_code},
        {
            "$push": {
                "users": uid
            }
        }
    )
