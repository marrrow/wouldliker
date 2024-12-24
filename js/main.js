// Real-time counters with acceleration
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

// Chart initialization
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
