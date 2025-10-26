export function setupUser() {
  if (!localStorage.getItem("userID")) {
    const id = crypto.randomUUID();
    localStorage.setItem("userID", id);
  }
}

export function submitScore(score) {
  const userID = localStorage.getItem("userID");

  fetch("http://localhost:3000/submit-score", {
    method: "POST",
    headers: { "Content-Type ": "application/json" },
    body: JSON.stringify({ id: userID, score: score }),
  });
}
