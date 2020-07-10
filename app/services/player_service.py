import secrets
import string
from typing import Dict
from ..data import players_data


def get_pid() -> str:
    PID_LENGTH = 20
    PID_STR_RANGE = string.ascii_letters + string.digits
    PID_GENERATE_LIMIT = 10
    for counter in range(0, PID_GENERATE_LIMIT):
        pid = "".join(secrets.choice(PID_STR_RANGE)
                      for i in range(0, PID_LENGTH))
        if not _pid_exists(players_data.get_player(pid)):
            return pid
    return ""


def get_player(pid: str) -> Dict:
    return players_data.get_player(pid)


def register_player(pid: str) -> None:
    players_data.create_player(pid)


def update_player_name(pid: str, player_name: str) -> None:
    players_data.update_player_name(pid, player_name)


def delete_player(pid: str) -> None:
    players_data.delete_player(pid)


def _pid_exists(player) -> bool:
    return player != {}
