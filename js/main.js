// Theme Toggle Functionality
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");

// Theme management with dark mode as default
function getInitialTheme() {
  // First check if user has explicitly set a preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme;
  }

  // If no user preference, check system preference
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  return systemPrefersDark ? "dark" : "dark"; // Default to dark mode regardless of system preference
}

// Initialize theme
let currentTheme = getInitialTheme();
document.documentElement.setAttribute("data-theme", currentTheme);
updateThemeIcon(currentTheme);

// Listen for system preference changes
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
mediaQuery.addEventListener("change", (e) => {
  // Only update if user hasn't set a preference
  if (!localStorage.getItem("theme")) {
    // Even if system changes, we default to dark mode
    const newTheme = "dark";
    currentTheme = newTheme;
    document.documentElement.setAttribute("data-theme", newTheme);
    updateThemeIcon(newTheme);
  }
});

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  currentTheme = newTheme;

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
  const currentUrl = window.location.href;
  const encodedUrl = encodeURIComponent(currentUrl);
  const title =
    "Anugrah James, Founder & Software Engineer of College Concierge";
  const description = "Connect with Anugrah James :";
  const imageUrl = "https://anugrahjames.github.io/images/profile.jpg";
  const customMessage = `${title} - ${description} ${currentUrl}`;

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
  const currentUrl = window.location.href;
  const encodedUrl = encodeURIComponent(currentUrl);
  const title =
    "Anugrah James - Founder & Software Engineer of College Concierge";
  const description = "Connect with Anugrah James :";
  const imageUrl = "https://anugrahjames.github.io/images/profile.jpg";
  let shareUrl = "";
  let shareText = "";

  // Format text for different platforms
  const formatText = (platform) => {
    const platformFormats = {
      whatsapp: `*${title}*\n\n${description}\n\n${currentUrl}`,
      telegram: `*${title}*\n\n${description}\n\n${currentUrl}`,
      twitter: `${title} - ${description}\n\n${currentUrl}\n\n#AnugrahJames #Founder #SoftwareEngineer #CollegeConcierge`,
      threads: `${title}\n\n${description}\n\n${currentUrl}\n\n#AnugrahJames #Founder #SoftwareEngineer #CollegeConcierge`,
      default: `${title} - ${description} ${currentUrl}`,
    };
    return platformFormats[platform] || platformFormats.default;
  };

  switch (platform) {
    case "whatsapp":
      shareText = formatText("whatsapp");
      shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(shareUrl, "_blank", "noopener,noreferrer");
      break;

    case "telegram":
      // For Telegram, we only need to include the URL once
      const telegramText =
        "Connect with Anugrah James - Founder & Software Engineer of College Concierge";
      shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(
        telegramText
      )}`;
      window.open(shareUrl, "_blank", "noopener,noreferrer");
      break;

    case "twitter":
      shareText = formatText("twitter");
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}`;
      window.open(shareUrl, "_blank", "noopener,noreferrer");
      break;

    case "threads":
      shareText = formatText("threads");
      // Threads uses the same sharing endpoint as Instagram
      shareUrl = `https://www.threads.net/intent/post?text=${encodeURIComponent(
        shareText
      )}`;
      window.open(shareUrl, "_blank", "noopener,noreferrer");
      break;

    case "qrcode":
      showQRCodeModal();
      return; // Don't track as a share event

    case "copy":
      const shareData = {
        title: title,
        text: description,
        url: currentUrl,
      };

      if (navigator.share) {
        navigator
          .share(shareData)
          .then(() => showToast("Link shared successfully!"))
          .catch((err) => console.error("Error sharing:", err));
      } else {
        copyToClipboard();
      }
      break;
  }

  // Track share event
  if (window.gtag) {
    gtag("event", "share", {
      method: platform,
      content_type: "link",
      item_id: "share_" + platform,
    });
  }

  // Close the dropdown after selection
  const shareDropdown = document.getElementById("shareDropdown");
  if (shareDropdown) {
    shareDropdown.classList.remove("show");
  }
}

// QR Code Modal Functions
function showQRCodeModal() {
  const modal = document.getElementById("qrcodeModal");
  if (modal) {
    modal.style.display = "flex";
    // Trigger reflow to enable the fade-in animation
    void modal.offsetWidth;
    modal.classList.add("show");
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  }
}

function closeQRCodeModal() {
  const modal = document.getElementById("qrcodeModal");
  if (modal) {
    modal.classList.remove("show");
    // Wait for the fade-out animation to complete before hiding
    setTimeout(() => {
      modal.style.display = "none";
      document.body.style.overflow = ""; // Re-enable scrolling
    }, 300);
  }
}

// Initialize download QR code button
document.addEventListener("DOMContentLoaded", () => {
  const downloadBtn = document.getElementById("downloadQR");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      const qrImage = document.querySelector(".qrcode-image");
      if (qrImage) {
        const link = document.createElement("a");
        link.download = "anugrahjames-qrcode.png";
        link.href = qrImage.src;
        link.click();
        showToast("QR Code downloaded!");
      }
    });
  }

  // Close modal when clicking the close button
  const closeModalBtn = document.querySelector(".close-modal");
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeQRCodeModal);
  }

  // Close modal when clicking outside the modal content
  const modal = document.getElementById("qrcodeModal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeQRCodeModal();
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeQRCodeModal();
    }
  });
});

// Initialize share button
document.addEventListener("DOMContentLoaded", () => {
  const shareButton = document.getElementById("shareButton");
  const shareDropdown = document.getElementById("shareDropdown");
  let isDropdownVisible = false;

  // Toggle dropdown on button click
  const handleShareClick = (e) => {
    e.stopImmediatePropagation();
    isDropdownVisible = !isDropdownVisible;
    shareDropdown.classList.toggle("show", isDropdownVisible);
  };

  // Close dropdown when clicking outside
  const handleDocumentClick = () => {
    if (isDropdownVisible) {
      isDropdownVisible = false;
      shareDropdown.classList.remove("show");
    }
  };

  // Handle share option clicks
  const handleOptionClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const platform = e.currentTarget.getAttribute("data-platform");
    shareToPlatform(platform);
    isDropdownVisible = false;
    shareDropdown.classList.remove("show");
  };

  // Add event listeners with passive: true for better performance
  shareButton.addEventListener("click", handleShareClick, { passive: false });
  document.addEventListener("click", handleDocumentClick, { passive: true });

  // Cache the share options to prevent requerying the DOM
  const shareOptions = document.querySelectorAll(".share-option");
  shareOptions.forEach((option) => {
    option.addEventListener("click", handleOptionClick, { passive: false });
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
