import secrets
import string
from typing import List
from ..data import games_data


def get_game_code() -> str:
    GAME_CODE_LENGTH = 4
    GAME_CODE_STR_RANGE = string.ascii_lowercase + string.digits
    GAME_CODE_GENERATE_LIMIT = 10
    for counter in range(0, GAME_CODE_GENERATE_LIMIT):
        game_code = "".join(secrets.choice(GAME_CODE_STR_RANGE)
                            for i in range(0, GAME_CODE_LENGTH))
        if not _game_code_exists(games_data.get_game(game_code)):
            return game_code
    return ""


def register_game_code(game_code: str, pid: str) -> None:
    games_data.create_game(game_code, pid)


def can_join_game(game_code: str, pid: str) -> bool:
    game = games_data.get_game(game_code)
    # disabling joining mid game for now
    return _game_code_exists(game) and not game["isPlaying"]


def join_game(game_code: str, pid: str) -> None:
    game = games_data.get_game(game_code)
    index = get_index_of_player(game["players"], pid)
    if index == -1:
        games_data.add_player_to_game(game_code, pid)
    else:
            game["players"].append(game["players"].pop(index))
            games_data.update(game_code, {
                "players": game["players"]
            })


def get_all_players_in_game(game_code: str) -> List:
    return games_data.get_all_players_in_game(game_code)


def get_game_owner_pid(game_code: str) -> str:
    game = games_data.get_game(game_code)
    return game["ownerPid"]


def get_game_is_playing(game_code):
    game = games_data.get_game(game_code)
    return game["isPlaying"]


def _game_code_exists(game) -> bool:
    return game is not None


def get_index_of_player(players, pid):
    for i, player in enumerate(players):
        if player["_id"] == pid:
            return i
    return -1
