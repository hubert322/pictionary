from . import socketio

class Timer:
    def __init__(self, game_code):
        self.is_running = True
        self.game_code = game_code

    def start_timer(self):
        time_count = 60
        while time_count >= 0 and self.is_running:
            socketio.emit("timer_announcement", {
                "time": time_count
            }, broadcast=True, room=self.game_code)
            time_count -= 1
            socketio.sleep(1)
    
    def stop_timer(self):
        self.is_running = False
