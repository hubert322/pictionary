from app import create_app
from app.sockets import socketio

if __name__ == "__main__":
    app = create_app(debug=True)
    socketio.run(app, host="0.0.0.0", debug=True)
