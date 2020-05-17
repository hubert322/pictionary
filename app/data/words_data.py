from . import db
from typing import Dict
from flask_pymongo import pymongo

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

# def insert_words():
#     with open("app/data/words.txt") as file:
#         words = []
#         used_words = set()
#         for word in file:
#             if word not in used_words:
#                 words.append({"_id": word.strip().strip("\n")})
#                 used_words.add(word)
#         print(len(used_words))
        # words_collection.insert_many(words)
