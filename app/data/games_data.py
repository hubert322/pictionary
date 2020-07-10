from . import db
from typing import List
from flask_pymongo import pymongo
from pymongo.collection import ReturnDocument

games_collection = db.get_collection("games")


def create_game(game_code: str, owner_pid: str):
    games_collection.insert_one({
        "_id": game_code,
        "ownerPid": owner_pid,
        "players": [],
        "isPlaying": False,
        "rounds": 3,
        "drawTime": 60
    })


def get_game(game_code: str):
    if games_collection.count_documents({"_id": game_code}, limit=1) == 0:
        return None
    games = games_collection.find({"_id": game_code})
    return games[0]


def add_player_to_game(game_code: str, pid: str):
    games_collection.update_one({"_id": game_code},
                                {
        "$push":
            {
                "players": {
                    "_id": pid,
                    "score": 0,
                    "earnedScore": 0
                }
            }
    }
    )


def get_all_players_in_game(game_code: str):
    docs = games_collection.aggregate([
        {"$match": {"_id": game_code}},
        {"$unwind": {"path": "$players"}},
        {
            "$lookup": {
                "from": "players",
                "localField": "players._id",
                "foreignField": "_id",
                "as": "newPlayers"
            }
        },
        {"$unwind": {"path": "$newPlayers"}},
        {
            "$group": {
                "_id": "$_id",
                "players": {"$push": {"$mergeObjects": ["$players", "$newPlayers"]}}
            }
        },
        {
            "$project": {
                "_id": 0,
                "players": "$players"
            }
        }
    ])

    for doc in docs:
        return doc["players"]
    return []


def update(game_code: str, update_data: list):
    games_collection.update_one({"_id": game_code},
                                {
        "$set": update_data
    }
    )


def update_playing_status(game_code: str, is_playing: str):
    games_collection.update_one({"_id": game_code},
                                {
        "$set":
            {
                "isPlaying": is_playing
            }
    }
    )


def update_and_get_enter_game_count(game_code: str):
    return games_collection.find_one_and_update({"_id": game_code},
                                                {
        "$inc":
            {
                "enterGameCount": 1
            }
    },
        return_document=ReturnDocument.AFTER
    )


def update_artist_index(game_code: str, artist_index: int):
    games_collection.update_one({"_id": game_code},
                                {
        "$set":
            {
                "artistIndex": artist_index
            }
    }
    )


def update_words(game_code: str, words: List[str]):
    games_collection.update_one({"_id": game_code},
                                {
        "$set":
            {
                "words": words
            }
    }
    )


def update_selected_word(game_code: str, selected_word: str):
    games_collection.update_one({"_id": game_code},
                                {
        "$set":
            {
                "selectedWord": selected_word
            }
    }
    )


def insert_player_earned_score(game_code: str, pid: str, earned_score: int):
    games_collection.update_one({"_id": game_code, "players._id": pid},
                                {
        "$set":
            {
                "players.$.earnedScore": earned_score
            }
    },
    )


def add_payer_to_guessed_correct(game_code: str, pid: str):
    games_collection.update({"_id": game_code},
                            {
        "$push":
            {
                "guessedCorrectPlayers": pid
            }
    }
    )


def update_game(game_code: str, game):
    games_collection.replace_one({"_id": game_code}, game)


def update_players(game_code: str, players):
    games_collection.update_one({"_id": game_code},
                                {
        "$set":
            {
                "players": players
            }
    }
    )


def update_curr_round(game_code: str, curr_round: int):
    games_collection.update_one({"_id": game_code},
                                {
        "$set":
            {
                "currRound": curr_round
            }
    }
    )


def delete_game(game_code: str):
    games_collection.delete_one({"_id": game_code})
