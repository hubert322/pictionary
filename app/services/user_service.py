import secrets
import string
from ..data import users_data

def get_uid() -> str:
    UID_LENGTH = 20
    UID_STR_RANGE = string.ascii_letters + string.digits
    UID_GENERATE_LIMIT = 10
    for counter in range(0, UID_GENERATE_LIMIT):
        uid = "".join(secrets.choice(UID_STR_RANGE) for i in range(0, UID_LENGTH))
        if not _uid_exists(users_data.get_user(uid)):
            return uid
    return ""

def register_user(uid: str) -> None:
    users_data.create_user(uid)

def _uid_exists(user) -> bool:
    return user is not None
