from flask_cors import CORS
from app import create_app
from app.sockets import socketio

app = create_app()

if __name__ == "__main__":
    cors = CORS(app, resources={
                r"/api/*": {"origins": "https://pictionary.live"}})
    socketio.init_app(
        app, cors_allowed_origins="https://pictionary.live", async_handlers=True)
    socketio.run(app)
