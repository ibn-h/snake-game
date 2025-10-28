import { URL } from "../config.js";

export async function fetchLeaderboard() {
  const response = await fetch(`${URL}/leaderboard`);

  if (!response.ok) {
    console.error("Failed to fetch leaderboard");
    return [];
  }

  return response.json();
}

export function submitScore(score) {
  const userID = localStorage.getItem("userID");

  fetch(`${URL}/submit-score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: userID, score: score }),
  }).then((response) => {
    if (!response.ok) {
      console.error("Failed to submit score");
      return;
    }

    console.log("Score submitted successfully");
  });
}
