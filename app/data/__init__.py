from flask_pymongo import pymongo

CONNECTION_STRING = "mongodb+srv://admin:admin@skribbl-tngv7.mongodb.net/test?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database("skribbl")
