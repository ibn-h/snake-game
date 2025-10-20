import { snakePos } from "./snake.js";
import { setDirection } from "./main.js";

function onInput(event) {
  switch (event.key) {
    case "ArrowUp":
      setDirection("up");
      break;
    case "ArrowDown":
      setDirection("down");
      break;
    case "ArrowLeft":
      setDirection("left");
      break;
    case "ArrowRight":
      setDirection("right");
      break;
    default:
      break;
  }
}

document.addEventListener("keydown", onInput);
