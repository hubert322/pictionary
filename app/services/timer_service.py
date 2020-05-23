from ..sockets import timer_socket

timer_threads = {}

def timer_init(game_code, draw_time):
    timer_threads[game_code] = timer_socket.Timer(game_code, draw_time)

def start_timer(game_code):
    timer_threads[game_code].start_timer()

def stop_timer(game_code):
    timer_threads[game_code].stop_timer()

def get_timer(game_code) -> int:
    return timer_threads[game_code].get_timer()
