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

// QR Code Modal
const qrModal = document.createElement('div');
qrModal.id = 'qrModal';
qrModal.className = 'modal';
qrModal.innerHTML = `
  <div class="modal-content">
    <span class="close">&times;</span>
    <h3>Scan QR Code</h3>
    <div id="qrcode"></div>
    <p>Scan this QR code to open this page on another device</p>
  </div>
`;
document.body.appendChild(qrModal);

// Initialize QR Code modal
const modal = document.getElementById('qrModal');
const closeBtn = document.querySelector('#qrModal .close');

closeBtn.onclick = function() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

// QR Code library loading
const loadQRCodeLibrary = () => {
  return new Promise((resolve, reject) => {
    if (window.QRCode) {
      console.log('QRCode library already loaded');
      return resolve();
    }
    
    // Try loading from unpkg first
    const qrScript = document.createElement('script');
    qrScript.src = 'https://unpkg.com/qrcode@1.5.3/build/qrcode.min.js';
    qrScript.integrity = 'sha384-9a1N8E8zqRU+J3r8WX5X5K5n5l5V5fZ5V5b5v5v5v5v5v5v5v5v5v5v5v5v5v5';
    qrScript.crossOrigin = 'anonymous';
    
    qrScript.onload = () => {
      console.log('QRCode library loaded from unpkg');
      if (window.QRCode) {
        resolve();
      } else {
        reject(new Error('QRCode library loaded but not available'));
      }
    };
    
    qrScript.onerror = (error) => {
      console.error('Failed to load QRCode library from unpkg:', error);
      // Fallback to jsdelivr
      const fallbackScript = document.createElement('script');
      fallbackScript.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js';
      fallbackScript.integrity = 'sha384-9a1N8E8zqRU+J3r8WX5X5K5n5l5V5fZ5V5b5v5v5v5v5v5v5v5v5v5v5v5v5v5';
      fallbackScript.crossOrigin = 'anonymous';
      
      fallbackScript.onload = () => {
        console.log('QRCode library loaded from jsdelivr');
        if (window.QRCode) {
          resolve();
        } else {
          reject(new Error('QRCode library loaded but not available'));
        }
      };
      
      fallbackScript.onerror = (fallbackError) => {
        console.error('Failed to load QRCode library from jsdelivr:', fallbackError);
        reject(new Error('Failed to load QRCode library'));
      };
      
      document.head.appendChild(fallbackScript);
    };
    
    document.head.appendChild(qrScript);
  });
};

// Preload the QR code library when the page loads
document.addEventListener('DOMContentLoaded', () => {
  loadQRCodeLibrary().catch(error => {
    console.error('Error preloading QR code library:', error);
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
  const url = window.location.href;
  const encodedUrl = encodeURIComponent(url);
  const customMessage = "Anugrah James, Founder & Software Engineer of College Concierge\n\n";
  const text = encodeURIComponent(customMessage);
  let shareUrl = "";

  switch (platform) {
    case "whatsapp":
      shareUrl = `https://wa.me/?text=${text}%20${encodedUrl}`;
      window.open(shareUrl, "_blank", "noopener,noreferrer");
      break;
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`;
      window.open(shareUrl, "_blank", "noopener,noreferrer");
      break;
    case "telegram":
      shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${text}`;
      window.open(shareUrl, "_blank", "noopener,noreferrer");
      break;
    case "qrcode":
      generateQRCode(url);
      break;
    case "copy":
      copyToClipboard();
      break;
  }
}

async function generateQRCode(url) {
  const qrElement = document.getElementById('qrcode');
  const modal = document.getElementById('qrModal');
  
  // Show loading state
  qrElement.innerHTML = '<div class="loading">Generating QR Code...</div>';
  modal.style.display = 'block';
  
  try {
    // Clear previous QR code
    qrElement.innerHTML = '';
    
    // Try to load the library
    try {
      await loadQRCodeLibrary();
    } catch (error) {
      console.error('Failed to load QRCode library:', error);
      throw new Error('Could not load QR code generator. Please check your internet connection.');
    }
    
    // Check if QRCode is available
    if (typeof QRCode === 'undefined') {
      console.error('QRCode is not defined after loading');
      throw new Error('QR code generator is not available');
    }
    
    // Create a new div to hold the QR code
    const qrContainer = document.createElement('div');
    qrContainer.id = 'qrcode-container';
    qrElement.appendChild(qrContainer);
    
    // Generate QR code
    try {
      new QRCode(qrContainer, {
        text: url,
        width: 200,
        height: 200,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });
      
      // Make sure the image is properly displayed
      setTimeout(() => {
        const img = qrContainer.querySelector('img');
        if (img) {
          img.style.display = 'block';
          img.style.margin = '0 auto';
        }
      }, 100);
      
    } catch (genError) {
      console.error('Error in QR code generation:', genError);
      throw new Error('Failed to generate QR code');
    }
    
  } catch (error) {
    console.error('Error in generateQRCode:', error);
    qrElement.innerHTML = `
      <div class="error">
        <p>Failed to generate QR code</p>
        <p>${error.message || 'Please try again later.'}</p>
      </div>`;
    
    // Hide the modal after a delay
    setTimeout(() => {
      modal.style.display = 'none';
      showToast('Error: ' + (error.message || 'Failed to generate QR code'));
    }, 3000);
  }
}

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
