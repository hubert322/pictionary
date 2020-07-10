from . import db
from flask_pymongo import pymongo

players_collection = db.get_collection("players")


def create_player(pid: str):
    players_collection.insert_one({
        "_id": pid
    })


def get_player(pid: str):
    if players_collection.count_documents({"_id": pid}, limit=1) == 0:
        return {}
    return players_collection.find_one({"_id": pid})


def update_player_name(pid: str, player_name: str):
    players_collection.update_one({"_id": pid},
        {
            "$set": {
                "playerName": player_name
            }
        }
    )


def delete_player(pid: str):
    players_collection.delete_one({"_id": pid})
