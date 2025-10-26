import { getApplePositions, spawnApple } from "./apple.js";
import { getDirection } from "./input.js";
import { setupUser, submitScore } from "./leaderboard.js";
import {
  updateSnake,
  detectCollision,
  checkForApple,
  growSnake,
  resetSnake,
} from "./snake.js";

const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highscore");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

let interval;
let gameRunning = false;
let direction = "";

let score = 0;
let highScore = 0;

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updateSnake(direction);

  // Spawn apple if needed

  spawnApple();

  // Check for apple consumption

  getApplePositions().forEach((pos) => {
    if (checkForApple(pos)) {
      getApplePositions().splice(getApplePositions().indexOf(pos), 1);
      growSnake();
      score++;
    }
  });

  // Update score display

  scoreDisplay.textContent = score;

  // Check for collisions

  if (detectCollision()) {
    if (score > highScore) {
      highScore = score;
      submitScore(highScore);
    }

    alert("Game Over!");
    endGame();
  }
}

function endGame() {
  clearInterval(interval);
  resetSnake();

  gameRunning = false;
  direction = "";
  score = 0;

  // Reset UI

  scoreDisplay.textContent = score;
  highScoreDisplay.textContent = highScore;
}

function startGame() {
  if (gameRunning) {
    alert("Game is already running!");
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  gameRunning = true;
  interval = setInterval(gameLoop, 100);
}

export function onInput(event) {
  direction = getDirection(event);
}

function onRestart() {
  endGame();
  startGame();
}

setupUser();
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", onRestart);
document.addEventListener("keydown", onInput);
