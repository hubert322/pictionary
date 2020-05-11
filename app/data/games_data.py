from . import db
from typing import Dict
from flask_pymongo import pymongo

games_collection = db.get_collection("games")

def create_game(game_code: str, owner_uid: str):
    games_collection.insert_one({
        "_id": game_code,
        "ownerUid": owner_uid,
        "users": [
            owner_uid
        ],
        "isPlaying": False
    })

def get_game(game_code: str):
    if games_collection.count_documents({"_id": game_code}, limit=1) == 0:
        return None
    games = games_collection.find({"_id": game_code})
    return games[0]

def add_user_to_game(game_code: str, uid: str):
    games_collection.update({"_id": game_code},
        {
            "$push": {
                "users": uid
            }
        }
    )

def get_all_users_in_game(game_code: str):
    return games_collection.aggregate([
        {
            "$match": 
            {
                "_id": game_code
            }
        },
        {
            "$lookup": 
            {
                "from": "users",
                "localField": "users",
                "foreignField": "_id",
                "as": "users"
            }
        },
        {
            "$project":
            {
                "_id": 0,
                "users": "$users"
            }
        }
    ]).next()["users"]
