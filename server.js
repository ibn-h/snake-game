import express from "express";

const server = express();
const PORT = 3000;

let leaderboard = [];

server.use(express.json());

server.post("/submit-score", (req, res) => {
  const { id, score } = req.body;
  leaderboard.push({ id, score });
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 10);
  res.status(200).send("Score submitted successfully");
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
