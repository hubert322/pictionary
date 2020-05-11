from . import db
from typing import Dict
from flask_pymongo import pymongo

games_collection = db.get_collection("games")

def create_game(game_code: str, owner_pid: str):
    games_collection.insert_one({
        "_id": game_code,
        "owner_pid": owner_pid,
        "players": [
            owner_pid
        ],
        "isPlaying": False
    })

def get_game(game_code: str):
    if games_collection.count_documents({"_id": game_code}, limit=1) == 0:
        return None
    games = games_collection.find({"_id": game_code})
    return games[0]

def add_player_to_game(game_code: str, pid: str):
    games_collection.update({"_id": game_code},
        {
            "$push": {
                "players": pid
            }
        }
    )

def get_all_players_in_game(game_code: str):
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
                "from": "players",
                "localField": "players",
                "foreignField": "_id",
                "as": "players"
            }
        },
        {
            "$project":
            {
                "_id": 0,
                "players": "$players"
            }
        }
    ]).next()["players"]
