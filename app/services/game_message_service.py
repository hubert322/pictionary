from ..data import games_data
from . import timer_service

def is_correct_word(game_code: str, pid: str, word: str) -> bool:
    game = games_data.get_game(game_code)
    return (word.lower() == game["selectedWord"].lower() and 
            pid != game["players"][game["artistIndex"]]["_id"] and
            pid not in game["guessedCorrectPlayers"])

def set_player_earned_score(game_code: str, pid: str) -> int:
    BASE_SCORE = 300
    time_left = timer_service.get_timer(game_code)
    earned_score = BASE_SCORE + time_left
    games_data.insert_player_earned_score(game_code, pid, earned_score)

    PERCENT = 0.6
    game = games_data.get_game(game_code)
    artist = game["players"][game["artistIndex"]]
    artist_earned_score = round(artist["earnedScore"] + earned_score * PERCENT)
    games_data.insert_player_earned_score(game_code, artist["_id"], artist_earned_score)

def register_player_guessed_correct(game_code: str, pid: str) -> None:
    games_data.add_payer_to_guessed_correct(game_code, pid)

def has_finished_guessing(game_code: str) -> bool:
    game = games_data.get_game(game_code)
    return len(game["guessedCorrectPlayers"]) == len(game["players"]) - 1

def set_artist_mega_score(game_code: str) -> None:
    game = games_data.get_game(game_code)
    MEGA_SCORE = 300
    artist = game["players"][game["artistIndex"]]
    earned_score = artist["earnedScore"] + MEGA_SCORE
    games_data.insert_player_earned_score(game_code, artist["_id"], earned_score)

def update_all_players_scores(game_code: str) -> None:
    game = games_data.get_game(game_code)
    for player in game["players"]:
        player["score"] += player["earnedScore"]
    games_data.update_players(game_code, game["players"])
