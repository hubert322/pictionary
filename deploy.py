from app.deploy_app import deploy_app
from app.sockets import socketio

if __name__ == "__main__":
    app = deploy_app()
    socketio.run(app, host="0.0.0.0", debug=True)
