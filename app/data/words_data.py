from . import db
from typing import Dict
from flask_pymongo import pymongo
import json

words_collection = db.get_collection("words")

def get_words():
    return words_collection.aggregate([
        {
            "$sample":
            {
                "size": 3
            }
        }
    ])
