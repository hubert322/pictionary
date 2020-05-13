import secrets
import string
from typing import List, Dict
from ..services import word_service
from ..services import player_service
from ..data import games_data

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
    enter_game_count = game["enterGameCount"] if "enterGameCount" in game else 0
    print(f"enter_game_count: {enter_game_count}")
    enter_game_count += 1
    games_data.update_enter_game_count(game_code, enter_game_count)
    return enter_game_count == len(game["players"])

def get_next_artist(game_code: str) -> Dict:
    game = games_data.get_game(game_code)
    artist_index = game["artistIndex"] if "artistIndex" in game else 0
    games_data.update_artist_index(game_code, artist_index)
    pid = game["players"][artist_index]
    
    return player_service.get_player(pid)

def get_next_words(game_code: str) -> List:
    game = games_data.get_game(game_code)
    prev_words = game["words"] if "words" in game else []

    GET_WORDS_LIMIT = 10
    for i in range(0, GET_WORDS_LIMIT):
        next_words = [word["_id"] for word in word_service.get_words()]
        if _are_valid_words(next_words, prev_words):
            games_data.update_words(game_code, prev_words + next_words)
            return next_words
    return []

def register_selected_word(game_code: str, selected_word: str) -> None:
    games_data.update_selected_word(game_code, selected_word)

def _game_code_exists(game) -> bool:
    return game is not None

def _are_valid_words(next_words: List[str], prev_words: List) -> bool:
    for word in next_words:
        if word in prev_words:
            return False
    return True
