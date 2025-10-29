function showComingSoonModal() {
  const modal = document.getElementById("coming-soon-modal");
  modal.style.display = "block";
}

document.querySelectorAll(".close-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    modal.style.display = "none";
  });
});

document.querySelectorAll(".indev").forEach((button) => {
  button.addEventListener("click", showComingSoonModal);
});
