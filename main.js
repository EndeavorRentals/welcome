// Footer year
window.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// SMS booking — opens the user's SMS app prefilled
const form = document.getElementById("requestForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const vehicleClass = document.getElementById("class").value;
    const weeks = document.getElementById("weeks").value;
    const notes = document.getElementById("notes").value.trim();

    const msg =
`Request from ${name}
Phone: ${phone}
Vehicle: ${vehicleClass}
Weeks: ${weeks}
${notes ? "Notes: " + notes + "\n" : ""}- Sent from Endeavor Car Rentals`;

    // main number for SMS:
    window.location.href = `sms:+14123390109?&body=${encodeURIComponent(msg)}`;
  });
}

// Email button (optional)
const emailBtn = document.getElementById("emailBtn");
if (emailBtn) {
  emailBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("Endeavor Car Request");
    const body = encodeURIComponent("Hi Endeavor Team,\n\nI’d like to request a car rental.\n\nThanks!");
    window.location.href = `mailto:endeavor@example.com?subject=${subject}&body=${body}`;
  });
}

// Lightbox
function openLightbox(imgElement) {
  const box = document.getElementById("lightbox");
  const boxImg = document.getElementById("lightbox-img");
  if (!box || !boxImg) return;
  boxImg.src = imgElement.src;
  box.style.display = "flex";
}
function closeLightbox() {
  const box = document.getElementById("lightbox");
  if (box) box.style.display = "none";
}
