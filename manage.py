from flask_cors import CORS
from app import create_app
from app.sockets import socketio

if __name__ == "__main__":
    app = create_app()
    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
    socketio.init_app(app, cors_allowed_origins="*", async_handlers=True)
    socketio.run(app, host="0.0.0.0", debug=True)
