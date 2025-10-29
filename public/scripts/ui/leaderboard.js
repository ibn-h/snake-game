import { fetchLeaderboard } from "../game/leaderboard.js";

async function openLeaderboard() {
  const leaderboard = document.querySelector("#leaderboard-modal");
  const list = leaderboard.querySelector("ul");

  list.innerHTML = "";

  const leaderboardData = await fetchLeaderboard();

  if (!leaderboardData || leaderboardData.length === 0) {
    leaderboard.querySelector("ul").innerHTML =
      "<li>No leaderboard data available.</li>";
    return;
  }

  leaderboardData.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = `${entry.id}: ${entry.score}`;
    list.appendChild(li);
  });

  leaderboard.style.display = "block";
}

document
  .querySelector("#leaderboard-btn")
  .addEventListener("click", openLeaderboard);
