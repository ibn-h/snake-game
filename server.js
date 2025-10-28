import { createClient } from "@supabase/supabase-js";
import { promises as fs } from "fs";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const server = express();
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function submitScores(id, score) {
  const { data, error } = await supabase
    .from("leaderboard")
    .upsert([{ id, score }]);

  if (error) {
    console.error("Error submitting score to Supabase:", error);
  } else {
    console.log("Score submitted to Supabase:", data);
  }
}

async function getLeaderboard() {
  const { data, error } = await supabase
    .from("leaderboard")
    .select("*")
    .order("score", { ascending: false })
    .limit(10);

  if (error) console.error("Error fetching leaderboard:", error);

  return data || [];
}

server.use(cors());
server.use(express.static("public"));

console.log("Running server!");

server.post("/submit-score", async (req, res) => {
  console.log("Post attempt", req);

  try {
    console.log(req.body);

    const { id, score } = req.body;

    if (!id || typeof score !== "number") {
      return res.status(400).send("Invalid data");
    }

    await submitScores(id, score);
    res.status(200).send("Score submitted successfully");
  } catch (error) {
    console.error("Error in submit-score endpoint:", error);
    res.status(500).send("Internal server error");
  }
});

server.get("/leaderboard", async (req, res) => {
  let leaderboard = await getLeaderboard();

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
