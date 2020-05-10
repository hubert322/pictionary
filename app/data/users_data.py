from . import db
from flask_pymongo import pymongo

users_collection = pymongo.collection.Collection(db, "users")

def create_user(uid: str):
    users_collection.insert_one({
        "uid": uid
    })

def get_user(uid: str):
    if users_collection.count_documents({"uid": uid}, limit=1) == 0:
        return None
    users = users_collection.find({"gameCode": uid})
    return users[0]
