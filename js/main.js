// Theme Toggle Functionality
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");

// Check for saved theme preference or use system preference
const savedTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");
document.documentElement.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

// Update theme icon based on current theme
function updateThemeIcon(theme) {
  themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
}

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 20,
        behavior: "smooth",
      });
    }
  });
});

// Share functionality
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");

  toastMessage.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function copyToClipboard() {
  const customMessage =
    "Anugrah James, Founder & Software Engineer of College Concierge\n" +
    window.location.href;
  navigator.clipboard
    .writeText(customMessage)
    .then(() => {
      showToast("Link copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
      showToast("Failed to copy link");
    });
}

function shareToPlatform(platform) {
  const url = encodeURIComponent(window.location.href);
  const customMessage =
    "Anugrah James, Founder & Software Engineer of College Concierge\n\n";
  const text = encodeURIComponent(customMessage);
  let shareUrl = "";

  switch (platform) {
    case "whatsapp":
      shareUrl = `https://wa.me/?text=${text}%20${url}`;
      window.open(shareUrl, "_blank", "noopener,noreferrer");
      break;
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
      window.open(shareUrl, "_blank", "noopener,noreferrer");
      break;
    case "copy":
      copyToClipboard();
      break;
  }
}

// Initialize share button
document.addEventListener("DOMContentLoaded", () => {
  const shareButton = document.getElementById("shareButton");
  const shareDropdown = document.getElementById("shareDropdown");

  // Toggle dropdown on button click
  shareButton.addEventListener("click", (e) => {
    e.stopPropagation();
    shareDropdown.classList.toggle("show");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", () => {
    shareDropdown.classList.remove("show");
  });

  // Handle share option clicks
  document.querySelectorAll(".share-option").forEach((option) => {
    option.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const platform = option.getAttribute("data-platform");
      shareToPlatform(platform);
      shareDropdown.classList.remove("show");
    });
  });

  // Add animation class to cards on load
  const cards = document.querySelectorAll(".link-card");
  cards.forEach((card, index) => {
    // Add staggered animation
    card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`;
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
  });
});

// Animation keyframes are now defined in the CSS file
