import os
from flask import Flask, session
from flask_cors import CORS
from flask_socketio import SocketIO
from .api import blueprints
from .sockets import socketio, blueprints

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(SECRET_KEY="dev")
    for blueprint in api.blueprints:
        app.register_blueprint(blueprint)
    for blueprint in sockets.blueprints:
        app.register_blueprint(blueprint)

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile("config.py", silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
    socketio.init_app(app, cors_allowed_origins="*")

    return app
