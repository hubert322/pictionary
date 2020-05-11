import secrets
import string
from typing import List
from ..data import games_data

def update_playing_status(game_code: str, is_playing: bool) -> None:
    games_data.update_playing_status(game_code, is_playing)
