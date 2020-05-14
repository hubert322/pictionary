from ..data import games_data

def is_correct_word(game_code: str, pid: str, word: str) -> bool:
    game = games_data.get_game(game_code)
    return (word == game["selectedWord"] and 
            pid != game["players"][game["artistIndex"]]["pid"] and
            pid not in game["guessedCorrectPlayers"])

def update_and_get_player_score(game_code: str, pid: str) -> int:
    score_increment_value = 30
    game = games_data.update_and_get_player_score(game_code, pid, score_increment_value)
    for player in game["players"]:
        if player["pid"] == pid:
            return player["score"]
    return -1000

def register_player_guessed_correct(game_code: str, pid: str) -> None:
    games_data.add_payer_to_guessed_correct(game_code, pid)

def has_finished_guessing(game_code: str) -> bool:
    game = games_data.get_game(game_code)
    return len(game["guessedCorrectPlayers"]) == len(game["players"]) - 1
