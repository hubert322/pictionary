from . import db
from flask_pymongo import pymongo

users_collection = db.get_collection("users")

def create_user(uid: str):
    users_collection.insert_one({
        "_id": uid
    })

def get_user(uid: str):
    if users_collection.count_documents({"uid": uid}, limit=1) == 0:
        return None
    users = users_collection.find({"_id": uid})
    return users[0]
