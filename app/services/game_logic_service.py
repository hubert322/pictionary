from typing import List, Dict, Tuple
from ..services import player_service, word_service, game_room_service
from ..data import games_data


def game_init(game_code: str, rounds: int) -> None:
    game = games_data.get_game(game_code)
    game["selectedWord"] = ""
    game["artistIndex"] = -1
    game["words"] = []
    game["guessedCorrectPlayers"] = []
    game["enterGameCount"] = 0
    game["maxRounds"] = rounds
    game["currRound"] = 1
    games_data.update_game(game_code, game)


def can_start_game(game_code: str) -> bool:
    game = games_data.update_and_get_enter_game_count(game_code)
    return not game["isPlaying"] and game["enterGameCount"] == len(game["players"])


def set_is_playing(game_code: str, is_playing):
    games_data.update(game_code, {
        "isPlaying": is_playing
    })


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
    games_data.update_game(game_code, game)

    return next_artist, next_words, game["currRound"]


def register_selected_word(game_code: str, selected_word: str) -> None:
    games_data.update_selected_word(game_code, selected_word)


def is_end_game(game_code: str) -> bool:
    game = games_data.get_game(game_code)
    if game["artistIndex"] == len(game["players"]) - 1:
        game["currRound"] += 1
        if game["currRound"] > game["maxRounds"]:
            return True
        games_data.update_curr_round(game_code, game["currRound"])
    return False


def get_players_and_rankings(game_code: str, is_end_game: bool) -> Tuple:
    players = game_room_service.get_all_players_in_game(game_code)
    players.sort(key=lambda player: player["score"], reverse=True)
    rankings = [1 for _ in range(0, len(players))]
    currRanking = 1
    for i in range(1, len(players)):
        if players[i]["score"] < players[i - 1]["score"]:
            currRanking += 1
        rankings[i] = currRanking
    return players, rankings


def get_selected_word(game_code: str) -> str:
    game = games_data.get_game(game_code)
    return game["selectedWord"]


def set_end_game(game_code: str) -> None:
    games_data.update_players(game_code, [])
    games_data.update_playing_status(game_code, False)


def remove_player(game_code: str, pid: str, is_playing: bool) -> bool:
    game = games_data.get_game(game_code)
    player_min = 2 if is_playing else 1
    for i, player in enumerate(game["players"]):
        if player["_id"] == pid:
            if len(game["players"]) <= player_min:
                return True
            game["players"].pop(i)
            break

    update_data = {
        "ownerPid": game["players"][0]["_id"],
        "players": game["players"]
    }
    games_data.update(game_code, update_data)
    return False


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
