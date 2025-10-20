import { GRID_SIZE, SNAKE_COLOR } from "./config.js";
import { draw } from "./utils.js";

const canvas = document.querySelector("#game-canvas");

let snakePos = { x: 50, y: 50 };

function moveSnake(direction) {
  switch (direction) {
    case "up":
      snakePos.y -= GRID_SIZE;
      break;
    case "down":
      snakePos.y += GRID_SIZE;
      break;
    case "left":
      snakePos.x -= GRID_SIZE;
      break;
    case "right":
      snakePos.x += GRID_SIZE;
      break;
    default:
      break;
  }
}

export function updateSnake(direction) {
  moveSnake(direction);
  console.log(snakePos);

  draw(SNAKE_COLOR, snakePos);
}
