import {
  SNAKE_COLOR,
  SNAKE_HEAD_COLOR,
  APPLE_COLOR,
  APPLES_LIMIT,
} from "../config.js";

async function openSettings() {
  const settingsModal = document.querySelector("#settings-modal");
  const snakeColor = document.querySelector("#snake-color");
  const snakeHeadColor = document.querySelector("#snake-head-color");
  const appleColor = document.querySelector("#apple-color");
  const maxApples = document.querySelector("#max-apples");

  snakeColor.value = SNAKE_COLOR;
  snakeHeadColor.value = SNAKE_HEAD_COLOR;
  appleColor.value = APPLE_COLOR;
  maxApples.value = APPLES_LIMIT;

  localStorage.setItem("snakeColor", SNAKE_COLOR);
  localStorage.setItem("snakeHeadColor", SNAKE_HEAD_COLOR);
  localStorage.setItem("appleColor", APPLE_COLOR);
  localStorage.setItem("maxApples", APPLES_LIMIT);

  snakeColor.addEventListener("input", (e) => {
    localStorage.setItem("snakeColor", e.target.value);
  });

  snakeHeadColor.addEventListener("input", (e) => {
    localStorage.setItem("snakeHeadColor", e.target.value);
  });

  appleColor.addEventListener("input", (e) => {
    localStorage.setItem("appleColor", e.target.value);
  });

  maxApples.addEventListener("input", (e) => {
    localStorage.setItem(
      "maxApples",
      Math.min(Math.max(e.target.value, 1), 10)
    );
  });

  settingsModal.style.display = "block";
}

document.querySelector("#settings-btn").addEventListener("click", openSettings);
