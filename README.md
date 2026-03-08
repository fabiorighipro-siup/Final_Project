# Tic-Tac-Toe — CS50x Final Project

## Video Demo

> https://youtu.be/kOZWAygqG3A

---

## Description

**Tic-Tac-Toe** is a classic two-player strategy game implemented as a browser-based web application. Two players share the same device: **Player 1** places **X** marks and **Player 2** places **O** marks, taking turns on a 3 x 3 grid. The first player to align three of their marks horizontally, vertically, or diagonally wins the round.

---

## How to Play

1. Open `index.html` in any modern web browser — no installation or server required.
2. Players take turns clicking an empty cell on the board.
3. The status bar at the top always shows whose turn it is.
4. When a player wins, their three cells are highlighted in gold and a result modal appears.
5. Click **Play Again** (or **New Round**) to start a fresh round. Scores accumulate across rounds.
6. Click **Reset Scores** to zero out all scores and start completely fresh.

---

## Project Structure

```
final-project/
├── index.html   — HTML structure: board, scoreboard, modal
├── styles.css   — Visual design: layout, colours, animations
├── script.js    — Game logic: state, rules, DOM rendering
└── README.md    — This file
```

---

## Design Choices

I chose pure **HTML, CSS, and JavaScript** — the web stack taught in CS50x Week 8 — because no back-end or database is needed for a two-player local game. The board is a 9-element JavaScript array where each index maps to a cell (0 = top-left to 8 = bottom-right). Win detection loops over all 8 winning combinations — a direct application of loops and conditionals from CS50.

- `index.html` — structure only
- `styles.css` — all visual decisions including animations
- `script.js` — all game logic and DOM updates

---

## What I Learned

| CS50x Topic | Applied Here |
|---|---|
| Week 3 – Algorithms | Win-detection loop over all 8 winning combinations |
| Week 5 – Data Structures | Board state as an array; scores as an object |
| Week 8 – HTML | Semantic markup, ARIA attributes |
| Week 8 – CSS | Flexbox, CSS Grid, custom properties, keyframe animations |
| Week 8 – JavaScript | DOM manipulation, event listeners, module-free functions |

---

*This project was created as the CS50x 2026 Final Project.*
