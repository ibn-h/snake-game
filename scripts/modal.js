function showComingSoonModal() {
  const modal = document.getElementById("coming-soon-modal");
  modal.style.display = "block";

  const closeBtn = modal.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

document.querySelectorAll(".indev").forEach((button) => {
  button.addEventListener("click", showComingSoonModal);
});
