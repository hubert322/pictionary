from ..data import games_data

def is_correct_word(game_code: str, pid: str, word: str) -> bool:
    game = games_data.get_game(game_code)
    return (word.lower() == game["selectedWord"].lower() and 
            pid != game["players"][game["artistIndex"]]["_id"] and
            pid not in game["guessedCorrectPlayers"])

def set_player_earned_score(game_code: str, pid: str) -> int:
    earned_score = 30
    games_data.insert_player_earned_score(game_code, pid, earned_score)

def register_player_guessed_correct(game_code: str, pid: str) -> None:
    games_data.add_payer_to_guessed_correct(game_code, pid)

def has_finished_guessing(game_code: str) -> bool:
    game = games_data.get_game(game_code)
    return len(game["guessedCorrectPlayers"]) == len(game["players"]) - 1

def update_all_players_scores(game_code: str) -> None:
    game = games_data.get_game(game_code)
    for player in game["players"]:
        player["score"] += player["earnedScore"]
    games_data.update_players(game_code, game["players"])
