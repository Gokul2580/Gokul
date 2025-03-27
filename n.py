import random
import time
import sys
import threading
import os
import math

# 🎵 Play sound (Linux only)
def play_sound(sound):
    os.system(f"aplay {sound} >/dev/null 2>&1 &")

# 🏏 AI-Generated Maths Questions
def generate_math_question(difficulty="medium"):
    if difficulty == "easy":
        a, b = random.randint(1, 10), random.randint(1, 10)
        return (f"{a} + {b}", a + b)
    elif difficulty == "medium":
        a, b = random.randint(10, 20), random.randint(1, 10)
        return (f"{a} × {b}", a * b)
    else:  # Hard Level
        a, b = random.randint(10, 30), random.randint(1, 10)
        return (f"{a}² + {b}²", a**2 + b**2)

# 🎙️ AI-Based Commentary
def cricket_commentary(event):
    commentary = {
        "four": ["🔥 That’s a beautiful shot! Four runs!", "🏏 What a cover drive! 4 runs!", "💥 Smashed to the boundary!"],
        "six": ["💥 Huge hit! That’s a SIX!", "🚀 It’s out of the park! Six runs!", "🎯 Straight into the stands!"],
        "wicket": ["🚨 Clean bowled! What a delivery!", "😱 Caught behind! Wicket!", "🔥 That’s OUT! Amazing bowling!"],
        "dot": ["😐 A dot ball. Good bowling.", "🔵 No runs. Pressure building!", "😬 Batsman missed it completely!"]
    }
    return random.choice(commentary[event])

# 🏏 Match Setup
team1 = input("🏏 Enter Team 1 Name: ")
team2 = input("🏏 Enter Team 2 Name: ")
teams = [team1, team2]

total_balls = int(input("🎯 Enter total balls per innings: "))
wickets_per_team = int(input("🔥 Enter total wickets per team: "))

scoreboard = {team1: 0, team2: 0}
wickets = {team1: 0, team2: 0}
match_history = []

# 🏆 Toss Function
def toss():
    print("\n🪙 Toss Time!")
    choice = input(f"{team1}, choose Heads or Tails: ").capitalize()
    result = random.choice(["Heads", "Tails"])
    print(f"🎲 Coin landed on: {result}")

    if choice == result:
        print(f"✅ {team1} won the toss!")
        return input("Choose to Bat or Bowl (B/Bowling): ").strip().lower() == 'b'
    else:
        print(f"✅ {team2} won the toss!")
        return input("Choose to Bat or Bowl (B/Bowling): ").strip().lower() != 'b'

# ⏳ Countdown Timer
class CountdownTimer:
    def __init__(self, duration):
        self.duration = duration
        self.time_up = False

    def start(self):
        for i in range(self.duration, 0, -1):
            sys.stdout.write(f"\r⏳ {i} sec remaining... ")
            sys.stdout.flush()
            time.sleep(1)
        self.time_up = True
        print("\n⏳ Time Up!")

# 🏏 Batting Function
def bat(team):
    print(f"\n🏏 {team} is batting!")
    for ball in range(1, total_balls + 1):
        if wickets[team] >= wickets_per_team:
            print(f"🚨 {team} All Out!")
            play_sound("out.wav")
            break

        difficulty = random.choice(["easy", "medium", "hard"])
        question, correct_answer = generate_math_question(difficulty)
        
        print(f"\n🔴 Ball {ball}/{total_balls} - {team} Batting")
        print(f"🧠 Solve: {question}")

        timer = CountdownTimer(5)
        timer_thread = threading.Thread(target=timer.start)
        timer_thread.start()

        user_answer = input("\n💬 Your Answer: ").strip()

        if timer.time_up or not user_answer:
            print("❌ Too slow! Wicket lost!")
            play_sound("wicket.wav")
            wickets[team] += 1
        elif user_answer.isdigit() and int(user_answer) == correct_answer:
            runs = random.choice([1, 2, 3, 4, 6])
            print(cricket_commentary("six" if runs == 6 else "four" if runs == 4 else "dot"))
            scoreboard[team] += runs
            play_sound("hit.wav")
        else:
            print("❌ Wrong answer! Wicket lost!")
            play_sound("wicket.wav")
            wickets[team] += 1

        print(f"📊 Score: {scoreboard[team]}/{wickets[team]} wickets")

    print(f"\n🏁 Innings Over! {team} scored {scoreboard[team]} runs.")

# 🎯 Bowling Function
def bowl(bowling_team):
    batting_team = team1 if bowling_team == team2 else team2
    print(f"\n🎯 {bowling_team} is now bowling!")

    for ball in range(1, total_balls + 1):
        if wickets[batting_team] >= wickets_per_team:
            print(f"🚨 {batting_team} All Out!")
            break

        difficulty = random.choice(["easy", "medium", "hard"])
        question, correct_answer = generate_math_question(difficulty)
        
        print(f"\n⚡ Ball {ball}/{total_balls} - {bowling_team} Bowling")
        print(f"🎳 Bowling Challenge: {question}")

        timer = CountdownTimer(5)
        timer_thread = threading.Thread(target=timer.start)
        timer_thread.start()

        user_answer = input("\n💬 Your Answer: ").strip()

        if timer.time_up or not user_answer:
            print("❌ Too slow! Batsman survives.")
        elif user_answer.isdigit() and int(user_answer) == correct_answer:
            print("🔥 WICKET! Great Bowling!")
            play_sound("wicket.wav")
            wickets[batting_team] += 1
        else:
            runs_given = random.choice([1, 2, 3, 4, 6])
            print(f"❌ Wrong answer! {runs_given} runs given.")
            play_sound("hit.wav")
            scoreboard[batting_team] += runs_given

        print(f"📊 {batting_team} Score: {scoreboard[batting_team]}/{wickets[batting_team]} wickets")

    print(f"\n🏁 Bowling Over! {batting_team}'s final score: {scoreboard[batting_team]}")

# 🏆 Declare Winner
def declare_winner():
    print("\n📊 Final Scores:")
    print(f"🏏 {team1}: {scoreboard[team1]}/{wickets[team1]} wickets")
    print(f"🏏 {team2}: {scoreboard[team2]}/{wickets[team2]} wickets")

    if scoreboard[team1] > scoreboard[team2]:
        print(f"\n🏆 {team1} WINS! 🎉🎉🎉")
    elif scoreboard[team1] < scoreboard[team2]:
        print(f"\n🏆 {team2} WINS! 🎉🎉🎉")
    else:
        print("\n🔄 Match Tied! No Super Over Yet 😆")

# 🎮 Start Game
def start_game():
    print("\n🏏 Welcome to **AI Maths Cricket Game!**\n")
    
    toss_winner_bats = toss()
    batting_team = team1 if toss_winner_bats else team2
    bowling_team = team2 if toss_winner_bats else team1

    bat(batting_team)
    bowl(bowling_team)

    print("\n🏏 Second innings begins!\n")

    bat(bowling_team)
    bowl(batting_team)

    declare_winner()

# 🔥 Run the game
start_game()::