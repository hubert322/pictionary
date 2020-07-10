from . import db
from flask_pymongo import pymongo

clients_collection = db.get_collection("clients")


def create_client(data):
    clients_collection.insert_one(data)


def get_client(sid: str):
    if clients_collection.count_documents({"_id": sid}, limit=1) == 0:
        return {}
    return clients_collection.find_one({"_id": sid})

def update_client(sid: str, data):
    clients_collection.update_one({"_id": sid},
        {
            "$set": data
        }
    )


def delete_client(sid: str):
    clients_collection.delete_one({"_id": sid})
