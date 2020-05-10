from app import create_app
from app.handlers import socketio

if __name__ == "__main__":
    app = create_app()
    socketio.run(app, host="0.0.0.0", debug=True)
