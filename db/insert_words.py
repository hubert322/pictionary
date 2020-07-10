from flask_pymongo import pymongo
import json

CONNECTION_STRING = "mongodb+srv://admin:admin@skribbl-tngv7.mongodb.net/test?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database("skribbl")
words_collection = db.get_collection("words")

with open("words.json") as file:
    words = [{"_id": word.strip().strip("\n")}
             for word in json.load(file).keys()]
    words_collection.insert_many(words)
