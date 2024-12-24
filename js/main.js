/**************************************************************
 * 1. Real-time Counters
 **************************************************************/
let totalTracks = 1287;
let totalPlays = 8943265;
let lastTime = Date.now();

const TRACKS_PER_DAY = 3;  // New AI tracks per day
const PLAYS_PER_SECOND = 4; // Average plays per second

function updateCounters() {
  const now = Date.now();
  const elapsed = (now - lastTime) / 1000; // Convert to seconds
  lastTime = now;

  // Update tracks (slower)
  totalTracks += (TRACKS_PER_DAY / 86400) * elapsed;
  
  // Update plays with random acceleration
  const acceleration = 1 + Math.random() * 0.5; // 1.0 to 1.5
  totalPlays += PLAYS_PER_SECOND * elapsed * acceleration;

  // Update DOM
  document.getElementById("total-tracks").innerText = 
    Math.floor(totalTracks).toLocaleString();
  document.getElementById("total-plays").innerText = 
    Math.floor(totalPlays).toLocaleString();
}

// Update every 100ms for smooth animation
setInterval(updateCounters, 100);

/**************************************************************
 * 2. Chart Initialization
 **************************************************************/
window.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("tracksChart").getContext("2d");
  
  // Create gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, "rgba(255, 54, 54, 0.4)");
  gradient.addColorStop(1, "rgba(255, 54, 54, 0)");

  // Generate realistic growth data
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const trackData = [423, 612, 798, 945, 1124, 1287];

  new Chart(ctx, {
    type: "line",
    data: {
      labels: months,
      datasets: [{
        label: "AI Tracks Created",
        data: trackData,
        borderColor: "#ff3636",
        backgroundColor: gradient,
        pointBackgroundColor: "#ff3636",
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          grid: { color: "rgba(255,255,255,0.1)" },
          ticks: { color: "#fff" }
        },
        y: {
          grid: { color: "rgba(255,255,255,0.1)" },
          ticks: { color: "#fff" }
        }
      },
      plugins: {
        legend: {
          labels: { color: "#fff", font: { size: 14 } }
        },
        tooltip: {
          backgroundColor: "rgba(0,0,0,0.8)",
          titleFont: { size: 16 },
          bodyFont: { size: 14 }
        }
      }
    }
  });
});

/**************************************************************
 * 3. Countdown Timer & FOMO Elements
 **************************************************************/
function updateTimer() {
  const now = new Date();
  const deadline = new Date(now.getTime() + 72 * 60 * 60 * 1000); // 72 hours from now
  const timeLeft = deadline - now;

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.getElementById("timer").innerHTML = 
    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

setInterval(updateTimer, 1000);

// FOMO Spots Counter
let spotsLeft = 288;
function updateSpots() {
  if (Math.random() < 0.3 && spotsLeft > 50) { // 30% chance to decrease
    spotsLeft -= Math.floor(Math.random() * 3) + 1;
    document.getElementById("spots-left").innerText = spotsLeft;
  }
}

setInterval(updateSpots, 5000);

/**************************************************************
 * 4. Payment & Crypto Integration
 **************************************************************/
// Payment Processing
document.getElementById("prophetBtn")?.addEventListener("click", () => {
  window.location.href = "https://buy.stripe.com/your-prophet-tier-link";
});

document.getElementById("oracleBtn")?.addEventListener("click", () => {
  window.location.href = "https://buy.stripe.com/your-oracle-tier-link";
});

// Copy Crypto Addresses
document.querySelectorAll(".crypto-address").forEach(address => {
  address.addEventListener("click", function() {
    navigator.clipboard.writeText(this.innerText);
    
    const original = this.innerText;
    this.innerText = "Copied!";
    setTimeout(() => {
      this.innerText = original;
    }, 1000);
  });
});

/**************************************************************
 * 5. Interactive Elements & Animation
 **************************************************************/
document.querySelectorAll(".stat-card").forEach(card => {
  card.addEventListener("mouseover", function() {
    this.querySelector(".stat-growth").style.opacity = "1";
  });
});

// Add "hurry" animation to timer when under certain thresholds
function checkUrgency() {
  const timer = document.getElementById("timer");
  if (!timer) return;
  
  const [hours] = timer.innerText.split(":");
  
  if (parseInt(hours) < 24) {
    timer.classList.add("urgent");
  }
}

setInterval(checkUrgency, 60000);

/**************************************************************
 * 6. Members Counter
 **************************************************************/
let currentMembers = 8712;
const maxMembers = 9000;

function updateMembers() {
  if (currentMembers < maxMembers) {
    const joinRate = Math.random() * 3;
    if (Math.random() < 0.4) { // 40% chance to increase
      currentMembers += joinRate;
      if (currentMembers > maxMembers) currentMembers = maxMembers;
      
      const memberCounter = document.getElementById("member-count");
      if (memberCounter) {
        memberCounter.innerText = Math.floor(currentMembers).toLocaleString();
      }
      
      const statGrowth = document.querySelector(".stat-growth");
      if (statGrowth) {
        const percentFull = ((currentMembers / maxMembers) * 100).toFixed(1);
        statGrowth.innerText = `${percentFull}% Spots Filled`;
      }
    }
  }
}

setInterval(updateMembers, 3000);

/**************************************************************
 * 7. Modal Handling
 **************************************************************/
const joinModal = document.getElementById("joinModal");
const modalClose = document.getElementById("modalClose");
const joinCultBtn = document.getElementById("joinCultBtn");

if (joinCultBtn && joinModal && modalClose) {
  joinCultBtn.addEventListener("click", () => {
    joinModal.style.display = "flex";
  });

  modalClose.addEventListener("click", () => {
    joinModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === joinModal) {
      joinModal.style.display = "none";
    }
  });
}
