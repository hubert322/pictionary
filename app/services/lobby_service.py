import secrets
import string
from ..data import game_data

def get_game_code() -> str:
    GAME_CODE_LENGTH = 4
    GAME_CODE_STR_RANGE = string.ascii_lowercase + string.digits
    GAME_CODE_GENERATE_LIMIT = 1
    for counter in range(0, GAME_CODE_GENERATE_LIMIT):
        game_code = "".join(secrets.choice(GAME_CODE_STR_RANGE) for i in range(0, GAME_CODE_LENGTH))
        if not _game_code_exists(game_data.get_game(game_code)):
            return game_code
    return ""

def register_game_code(game_code: str, uid: str) -> None:
    game_data.create_game(game_code, uid)

def _game_code_exists(game):
    return len(game) >= 1

