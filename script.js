// CS50x Final Project - Tic-Tac-Toe - script.js
// Two-player browser-based Tic-Tac-Toe. Technologies: HTML, CSS, JavaScript (CS50x Week 8).

const cells        = document.querySelectorAll(".cell");
const boardEl      = document.getElementById("board");
const statusEl     = document.getElementById("status");
const scoreXEl     = document.getElementById("score-x-value");
const scoreOEl     = document.getElementById("score-o-value");
const scoreDrawsEl = document.getElementById("score-draws-value");
const scoreXBlock  = document.getElementById("score-x");
const scoreOBlock  = document.getElementById("score-o");
const btnNewRound  = document.getElementById("btn-new-round");
const btnReset     = document.getElementById("btn-reset");
const modal        = document.getElementById("modal");
const modalIcon    = document.getElementById("modal-icon");
const modalTitle   = document.getElementById("modal-title");
const modalMessage = document.getElementById("modal-message");
const btnModalCont = document.getElementById("btn-modal-continue");

const WINNING_COMBINATIONS = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

const PLAYERS = { X: "X", O: "O" };

let board = Array(9).fill(null);
let currentPlayer = PLAYERS.X;
let gameActive = true;
let scores = { X: 0, O: 0, draws: 0 };

function init() {
  cells.forEach((cell) => cell.addEventListener("click", onCellClick));
  btnNewRound.addEventListener("click", newRound);
  btnReset.addEventListener("click", resetScores);
  btnModalCont.addEventListener("click", () => { hideModal(); newRound(); });
  renderBoard(); updateStatus(); updateScoreboard();
}

function onCellClick(event) {
  const index = parseInt(event.currentTarget.dataset.index, 10);
  if (!gameActive || board[index] !== null) return;
  board[index] = currentPlayer;
  renderCell(event.currentTarget, currentPlayer);
  const winningCombo = getWinningCombo();
  if (winningCombo) { endGame("win", winningCombo); }
  else if (isDraw()) { endGame("draw"); }
  else {
    currentPlayer = currentPlayer === PLAYERS.X ? PLAYERS.O : PLAYERS.X;
    updateStatus(); updateActiveScore();
  }
}

function getWinningCombo() {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) return combo;
  }
  return null;
}

function isDraw() { return board.every((cell) => cell !== null); }

function endGame(result, winningCombo = null) {
  gameActive = false;
  boardEl.classList.add("locked");
  if (result === "win") {
    scores[currentPlayer]++;
    highlightWinningCells(winningCombo);
    updateStatus("win"); updateScoreboard();
    setTimeout(() => showModal("🎉", "Player " + currentPlayer + " wins!", "Score: " + scores.X + " - " + scores.O), 800);
  } else {
    scores.draws++;
    updateStatus("draw"); updateScoreboard();
    setTimeout(() => showModal("🤝", "It's a draw!", "Nobody wins this round. Try again!"), 600);
  }
}

function newRound() {
  board = Array(9).fill(null); gameActive = true; currentPlayer = PLAYERS.X;
  boardEl.classList.remove("locked");
  cells.forEach((cell) => { cell.textContent = ""; cell.className = "cell"; cell.disabled = false; });
  updateStatus(); updateActiveScore();
}

function resetScores() { scores = { X: 0, O: 0, draws: 0 }; updateScoreboard(); newRound(); }

function renderBoard() {
  cells.forEach((cell, index) => { if (board[index]) renderCell(cell, board[index], false); });
}

function renderCell(cell, player, animate = true) {
  cell.textContent = player;
  cell.classList.add(player.toLowerCase());
  cell.disabled = true;
  if (animate) { cell.classList.remove("placed"); void cell.offsetWidth; cell.classList.add("placed"); }
}

function highlightWinningCells(combo) { combo.forEach((i) => cells[i].classList.add("winning")); }

function updateStatus(outcome = "") {
  statusEl.className = "status";
  if (outcome === "win") { statusEl.textContent = "Player " + currentPlayer + " wins! 🎉"; statusEl.classList.add("win"); }
  else if (outcome === "draw") { statusEl.textContent = "It's a draw! 🤝"; statusEl.classList.add("draw"); }
  else { statusEl.textContent = "Player " + currentPlayer + "'s turn"; statusEl.classList.add(currentPlayer === PLAYERS.X ? "x-turn" : "o-turn"); }
}

function updateActiveScore() {
  scoreXBlock.classList.toggle("active", currentPlayer === PLAYERS.X);
  scoreOBlock.classList.toggle("active", currentPlayer === PLAYERS.O);
}

function updateScoreboard() {
  scoreXEl.textContent = scores.X;
  scoreOEl.textContent = scores.O;
  scoreDrawsEl.textContent = scores.draws;
}

function showModal(icon, title, msg) {
  modalIcon.textContent = icon; modalTitle.textContent = title; modalMessage.textContent = msg;
  modal.classList.add("visible"); btnModalCont.focus();
}

function hideModal() { modal.classList.remove("visible"); }

init();
