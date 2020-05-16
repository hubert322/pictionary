from typing import List, Dict, Tuple
from ..services import player_service, word_service
from ..data import games_data

def game_init(game_code: str, rounds: int) -> None:
    game = games_data.get_game(game_code)
    for player in game["players"]:
        player["score"] = 0
    game["isPlaying"] = True
    game["selectedWord"] = ""
    game["artistIndex"] = -1
    game["words"] = []
    game["guessedCorrectPlayers"] = []
    game["nextTurnCount"] = 0
    game["rounds"] = rounds
    games_data.update_game(game_code, game)

def can_next_turn(game_code: str) -> bool:
    game = games_data.update_and_get_next_turn_count(game_code)
    print(f"NEXT TURN: {game['nextTurnCount']}")
    return game["nextTurnCount"] == len(game["players"])

def get_next_turn(game_code: str) -> Tuple:
    game = games_data.get_game(game_code)
    for player in game["players"]:
        player["earnedScore"] = 0
    game["selectedWord"] = ""
    game["guessedCorrectPlayers"] = []
    game["artistIndex"] = (game["artistIndex"] + 1) % len(game["players"])
    next_artist = _get_next_artist(game)
    next_words = _get_next_words(game)
    game["words"] += next_words
    game["nextTurnCount"] = 0
    games_data.update_game(game_code, game)

    return next_artist, next_words

def register_selected_word(game_code: str, selected_word: str) -> None:
    games_data.update_selected_word(game_code, selected_word)


def _get_next_artist(game) -> Dict:
    artist_index = game["artistIndex"]
    pid = game["players"][artist_index]["_id"]
    
    return player_service.get_player(pid)

def _get_next_words(game) -> List:
    prev_words = game["words"]

    GET_WORDS_LIMIT = 10
    for i in range(0, GET_WORDS_LIMIT):
        next_words = [word["_id"] for word in word_service.get_words()]
        if _are_valid_words(next_words, prev_words):
            return next_words
    return []

def _are_valid_words(next_words: List[str], prev_words: List) -> bool:
    for word in next_words:
        if word in prev_words:
            return False
    return True
