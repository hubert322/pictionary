from . import socketio, game_logic_socket

class Timer:
    def __init__(self, game_code, draw_time):
        self.is_drawing = True
        self.game_code = game_code
        self.draw_time = draw_time
        self.next_turn_time = 2;
        self.time_count = draw_time

    def start_draw_timer(self):
        def start_draw_timer_helper():
            self.time_count = self.draw_time
            self.is_drawing = True
            while self.time_count > 0 and self.is_drawing:
                socketio.emit("timer_announcement", {
                    "time": self.time_count
                }, broadcast=True, room=self.game_code)
                self.time_count -= 1
                socketio.sleep(1)

            if self.is_drawing:
                socketio.emit("timer_announcement", {
                    "time": 0
                }, broadcast=True, room=self.game_code)
                game_logic_socket._finished_guessing(self.game_code)
        
        socketio.start_background_task(target=start_draw_timer_helper)

    def stop_drawing_timer(self):
        self.is_drawing = False

    def start_next_turn_timer(self, isEndGame):
        def start_next_turn_timer_helper():
            nonlocal isEndGame
            socketio.sleep(self.next_turn_time)
            if isEndGame:
                game_logic_socket.end_game_announcement({
                    "gameCode": self.game_code
                })
            else:
                game_logic_socket.next_artist_announcement({
                    "gameCode": self.game_code
                })
        
        socketio.start_background_task(target=start_next_turn_timer_helper)

    def get_timer(self):
        return self.time_count
