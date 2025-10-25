import { APPLE_COLOR, APPLES_LIMIT } from "./config.js";
import { draw, getRandomGridPos } from "./utils.js";
import { getSnakePositions } from "./snake.js";

const applePositions = [];

export function spawnApple() {
  applePositions.forEach((pos) => draw(APPLE_COLOR, pos));

  if (applePositions.length == APPLES_LIMIT) {
    return;
  }

  let newPos = getRandomGridPos();

  while (
    applePositions.some((pos) => pos.x === newPos.x && pos.y === newPos.y) ||
    getSnakePositions().some((pos) => pos.x === newPos.x && pos.y === newPos.y)
  ) {
    newPos = getRandomGridPos();
  }

  applePositions.push(newPos);
}

export function getApplePositions() {
  return applePositions;
}
