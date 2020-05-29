from . import socketio, game_logic_socket

class Timer:
    def __init__(self, game_code, draw_time):
        self.is_running = True
        self.game_code = game_code
        self.draw_time = draw_time
        self.time_count = draw_time

    def start_timer(self):
        def start_timer_helper():
            self.time_count = self.draw_time
            self.is_running = True
            while self.time_count > 0 and self.is_running:
                print(self.time_count)
                socketio.emit("timer_announcement", {
                    "time": self.time_count
                }, broadcast=True, room=self.game_code)
                self.time_count -= 1
                socketio.sleep(1)

            if self.is_running:
                socketio.emit("timer_announcement", {
                    "time": 0
                }, broadcast=True, room=self.game_code)
                game_logic_socket._finished_guessing(self.game_code)
        
        socketio.start_background_task(target=start_timer_helper)

    def stop_timer(self):
        self.is_running = False

    def get_timer(self):
        return self.time_count
