from . import db
from typing import List
from flask_pymongo import pymongo

games_collection = db.get_collection("games")

def create_game(game_code: str, owner_pid: str):
    games_collection.insert_one({
        "_id": game_code,
        "ownerPid": owner_pid,
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
            "$push": 
            {
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

def update_playing_status(game_code: str, is_playing: str):
    games_collection.update({"_id": game_code}, 
        {
            "$set":
            {
                "isPlaying": is_playing
            }
        }
    )

def update_enter_game_count(game_code: str, enter_game_count: int):
    games_collection.update({"_id": game_code},
        {
            "$set":
            {
                "enterGameCount": enter_game_count
            }
        },
        True
    )

def update_artist_index(game_code: str, artist_index: int):
    games_collection.update({"_id": game_code},
        {
            "$set":
            {
                "artistIndex": artist_index
            }
        },
        True
    )

def update_words(game_code: str, words: List[str]):
    games_collection.update({"_id": game_code},
        {
            "$set":
            {
                "words": words
            }
        },
        True
    )

def update_selected_word(game_code: str, selected_word: str):
    games_collection.update({"_id": game_code},
        {
            "$set":
            {
                "selectedWord": selected_word
            }
        },
        True
    )
