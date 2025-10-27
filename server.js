import { promises as fs } from "fs";
import express from "express";
import cors from "cors";

const server = express();
const PORT = process.env.PORT || 3000;

let leaderboard = [];

async function initLeaderboard() {
  try {
    const data = await fs.readFile("data.json", "utf-8");
    leaderboard = JSON.parse(data);
  } catch (error) {
    console.error("Error initializing leaderboard:", error);
  }
}

await initLeaderboard();

server.use(cors());
server.use(express.static("public"));

server.post("/submit-score", async (req, res) => {
  const { id, score } = req.body;

  if (!id || typeof score !== "number") {
    return res.status(400).send("Invalid data");
  }

  const existingEntry = leaderboard.find((entry) => entry.id === id);

  if (existingEntry) {
    existingEntry.score = score;
  } else {
    leaderboard.push({ id, score });
  }

  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 10);
  res.status(200).send("Score submitted successfully");

  await fs.writeFile("data.json", JSON.stringify(leaderboard, null, 2));
});

server.get("/leaderboard", (req, res) => {
  if (leaderboard.length === 0) {
    return res.status(200).send("No scores available.");
  }

  res.json(leaderboard);
});

server.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send("<a href='/leaderboard'>View Leaderboard</a>");
});

server.listen(PORT, (error) => {
  if (error) {
    console.log("Error occurred while starting the server:", error);
    return;
  }

  console.log("Server is running!", `Listening on port ${PORT}`);
});
