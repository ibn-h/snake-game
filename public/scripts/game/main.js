import { getApplePositions, spawnApple } from "./apple.js";
import { getDirection } from "./input.js";
import { submitScore, fetchLeaderboard } from "./leaderboard.js";
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

let touchStartX = null;
let touchStartY = null;

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

async function setupUser() {
  if (!localStorage.getItem("userID")) {
    const id = crypto.randomUUID();
    localStorage.setItem("userID", id);
  }

  const data = await fetchLeaderboard().catch((error) => {
    console.error("Error fetching leaderboard during setup:", error);
    return [];
  });

  const userData = data.find(
    (entry) => entry.id === localStorage.getItem("userID")
  );

  highScore = userData ? userData.score : 0;
  highScoreDisplay.textContent = highScore;
}

function setupTouchControls() {
  let touchStartX = null;
  let touchStartY = null;

  window.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  });

  window.addEventListener("touchend", (event) => {
    if (touchStartX === null || touchStartY === null) {
      return;
    }

    if (!gameRunning) {
      return;
    }

    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      direction = deltaX > 0 ? "right" : "left";
    } else {
      direction = deltaY > 0 ? "down" : "up";
    }

    touchStartX = null;
    touchStartY = null;

    console.log(direction);
  });

  window.addEventListener(
    "touchmove",
    (event) => {
      event.preventDefault();
    },
    { passive: false }
  );
}

setupTouchControls();
setupUser();
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", onRestart);
document.addEventListener("keydown", onInput);
