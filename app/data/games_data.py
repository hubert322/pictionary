from . import db
from typing import Dict
from flask_pymongo import pymongo

games_collection = pymongo.collection.Collection(db, "games")

def create_game(game_code: str, owner_uid: str):
    games_collection.insert_one({
        "gameCode": game_code,
        "ownerUid": owner_uid,
        "users": [
            owner_uid
        ],
        "isPlaying": False
    })

def get_game(game_code: str):
    if games_collection.count_documents({"gameCode": game_code}, limit=1) == 0:
        return None
    games = games_collection.find({"gameCode": game_code})
    return games[0]

def add_user_to_game(game_code: str, uid: str):
    games_collection.update({"gameCode": game_code},
        {
            "$push": {
                "users": uid
            }
        }
    )
