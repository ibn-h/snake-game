import { SNAKE_COLOR } from "./config.js";
import { draw } from "./utils.js";

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

export let snakePos = { x: 50, y: 50 };

export function updateSnake(direction) {
  console.log("test");
  draw(SNAKE_COLOR, snakePos);
}
