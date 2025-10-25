import { GRID_SIZE, SNAKE_COLOR, SNAKE_HEAD_COLOR } from "./config.js";
import { draw, getRandomGridPos } from "./utils.js";

const canvas = document.querySelector("#game-canvas");

let snake = [getRandomGridPos()];
let currDirection = "";

function moveSnake(direction) {
  const head = snake[0];
  const opposites = {
    up: "down",
    left: "right",
    right: "left",
    down: "up",
  };

  if (opposites[currDirection] == direction) {
    direction = currDirection;
  }

  switch (direction) {
    case "up":
      head.y -= GRID_SIZE;
      break;
    case "down":
      head.y += GRID_SIZE;
      break;
    case "left":
      head.x -= GRID_SIZE;
      break;
    case "right":
      head.x += GRID_SIZE;
      break;
    default:
      break;
  }

  currDirection = direction;
}

export function detectCollision() {
  let collision = false;

  snake.forEach((segment, index) => {
    if (index === 0) return;

    if (segment.x === snake[0].x && segment.y === snake[0].y) {
      collision = true;
    }
  });

  if (
    snake[0].x < 0 ||
    snake[0].x >= canvas.width ||
    snake[0].y < 0 ||
    snake[0].y >= canvas.height
  ) {
    collision = true;
  }

  return collision;
}

export function updateSnake(direction) {
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i] = { ...snake[i - 1] };
  }

  moveSnake(direction);

  snake.forEach((segment) => {
    let color = segment === snake[0] ? SNAKE_HEAD_COLOR : SNAKE_COLOR;
    draw(color, segment);
  });
}

export function resetSnake() {
  snake = [getRandomGridPos()];
  currDirection = "";
}

export function checkForApple(position) {
  const head = snake[0];

  if (head.x === position.x && head.y === position.y) {
    return true;
  } else {
    return false;
  }
}

export function growSnake() {
  console.log(JSON.stringify(snake));

  let newPos = { ...snake[snake.length - 1] };

  if (currDirection === "up") {
    newPos.y += GRID_SIZE;
  } else if (currDirection === "down") {
    newPos.y -= GRID_SIZE;
  } else if (currDirection === "left") {
    newPos.x += GRID_SIZE;
  } else if (currDirection === "right") {
    newPos.x -= GRID_SIZE;
  }

  console.log(`Current position: ${JSON.stringify(snake[snake.length - 1])}`);

  console.log(`Growing snake at position: ${JSON.stringify(newPos)}`);

  snake.push(newPos);
}

export function getSnakePositions() {
  return snake;
}
