import secrets
import string
from typing import List, Dict
from ..data import games_data
from ..data import players_data

def get_game_code() -> str:
    GAME_CODE_LENGTH = 4
    GAME_CODE_STR_RANGE = string.ascii_lowercase + string.digits
    GAME_CODE_GENERATE_LIMIT = 10
    for counter in range(0, GAME_CODE_GENERATE_LIMIT):
        game_code = "".join(secrets.choice(GAME_CODE_STR_RANGE) for i in range(0, GAME_CODE_LENGTH))
        if not _game_code_exists(games_data.get_game(game_code)):
            return game_code
    return ""

def register_game_code(game_code: str, pid: str) -> None:
    games_data.create_game(game_code, pid)

def can_join_game(game_code: str) -> bool:
    game = games_data.get_game(game_code)
    return _game_code_exists(game) and not game["isPlaying"]

def join_game(game_code: str, pid: str) -> None:
    games_data.add_player_to_game(game_code, pid)

def get_all_players_in_game(game_code: str) -> List:
    return games_data.get_all_players_in_game(game_code)

def update_playing_status(game_code: str, is_playing: bool) -> None:
    games_data.update_playing_status(game_code, is_playing)

def get_players_count(game_code: str) -> int:
    game = games_data.get_game(game_code)
    return len(game["players"])

def can_start_game(game_code: str) -> None:
    game = games_data.get_game(game_code)
    enter_game_count = game["enter_game_count"] if "enter_game_count" in game else 0
    print(f"enter_game_count: {enter_game_count}")
    enter_game_count += 1
    games_data.update_enter_game_count(game_code, enter_game_count)
    return enter_game_count == len(game["players"])

def get_next_artist(game_code: str) -> Dict:
    game = games_data.get_game(game_code)
    artist_index = game["artist_index"] if "artist_index" in game else 0
    games_data.update_artist_index(game_code, artist_index)
    pid = game["players"][artist_index]
    
    return players_data.get_player(pid)
    

def _game_code_exists(game) -> bool:
    return game is not None
