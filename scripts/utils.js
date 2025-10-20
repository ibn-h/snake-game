import { GRID_SIZE } from "./config.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

export function getRandomGridPos() {
  return {
    x: Math.floor(Math.random() * (canvas.width / GRID_SIZE)) * GRID_SIZE,
    y: Math.floor(Math.random() * (canvas.height / GRID_SIZE)) * GRID_SIZE,
  };
}

export function draw(color, position) {
  ctx.fillStyle = color;
  ctx.fillRect(position.x, position.y, GRID_SIZE, GRID_SIZE);
}
