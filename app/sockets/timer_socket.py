from . import socketio, game_logic_socket

class Timer:
    def __init__(self, game_code):
        self.is_running = True
        self.game_code = game_code

    def start_timer(self):
        time_count = 5
        self.is_running = True
        while time_count > 0 and self.is_running:
            print(time_count)
            socketio.emit("timer_announcement", {
                "time": time_count
            }, broadcast=True, room=self.game_code)
            time_count -= 1
            socketio.sleep(1)

        if self.is_running:
            game_logic_socket._finished_guessing(self.game_code)

    def stop_timer(self):
        self.is_running = False
