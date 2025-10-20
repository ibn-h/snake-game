import { getDirection } from "./input.js";
import { updateSnake } from "./snake.js";
import { getRandomGridPos } from "./utils.js";

const startBtn = document.getElementById("start-btn");
const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

let interval;
let direction = "";

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.log(direction);

  updateSnake(direction);
}

function startGame() {
  interval = setInterval(gameLoop, 100);
}

export function onInput(event) {
  direction = getDirection(event);
}

startBtn.addEventListener("click", startGame);
document.addEventListener("keydown", onInput);
