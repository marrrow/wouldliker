/**************************************************************
 * 1. Счётчики (Views, Likes) with slight randomness
 **************************************************************/
let tiktokViews = 43060000;
let lastTimeTV = Date.now();
const VIEWS_PER_DAY = 400000; // ~300-400k

let tiktokLikes = 2130000;
let lastTimeTL = Date.now();
const LIKES_PER_DAY = 25000;  // ~20-30k

function updateTiktokViews() {
  const now = Date.now();
  const elapsed = now - lastTimeTV;
  lastTimeTV = now;
  const msInDay = 86400000;

  // Random factor (0.8 to 1.2)
  const randomFactor = 0.8 + Math.random() * 0.4;
  const inc = (VIEWS_PER_DAY * randomFactor / msInDay) * elapsed;
  tiktokViews += inc;

  const elem = document.getElementById("tiktok-views");
  if (elem) {
    elem.innerText = Math.floor(tiktokViews).toLocaleString();
  }
}

function updateTiktokLikes() {
  const now = Date.now();
  const elapsed = now - lastTimeTL;
  lastTimeTL = now;
  const msInDay = 86400000;

  const randomFactor = 0.8 + Math.random() * 0.4;
  const inc = (LIKES_PER_DAY * randomFactor / msInDay) * elapsed;
  tiktokLikes += inc;

  const elem = document.getElementById("tiktok-likes");
  if (elem) {
    elem.innerText = Math.floor(tiktokLikes).toLocaleString();
  }
}

setInterval(updateTiktokViews, 1000);
setInterval(updateTiktokLikes, 1000);

/**************************************************************
 * 2. Chart.js: "TikTok Uses Over Time"
 **************************************************************/
window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("analyticsChart");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    
    // Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(255, 54, 54, 0.4)");
    gradient.addColorStop(1, "rgba(255, 54, 54, 0)");

    // Example data
    const labels = ["Неделя 1", "Неделя 2", "Неделя 3", "Неделя 4"];
    const dataUsage = [200, 400, 700, 1200];

    new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "TikTok uses over time",
            data: dataUsage,
            borderColor: "#ff3636",
            backgroundColor: gradient,
            pointRadius: 4,
            pointBackgroundColor: "#ff3636",
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            ticks: { color: "#fff" },
            grid: { display: false }
          },
          y: {
            ticks: { color: "#fff" },
            grid: { color: "rgba(255,255,255,0.1)" }
          }
        },
        plugins: {
          legend: {
            labels: { color: "#fff", font: { size: 14 } }
          },
          tooltip: {
            titleFont: { size: 14 },
            bodyFont: { size: 12 },
            backgroundColor: "rgba(0,0,0,0.8)"
          }
        }
      }
    });
  }

  // Also load the first track for the radio if we’re on radio.html:
  loadTrack(0);
});

/**************************************************************
 * 3. Modals: "Вступить" & "Донат"
 **************************************************************/
const joinCultBtn = document.getElementById("joinCultBtn");
const joinModal = document.getElementById("joinModal");
const modalClose = document.getElementById("modalClose");

const donateBtn = document.getElementById("donateBtn");
const donateModal = document.getElementById("donateModal");
const donateClose = document.getElementById("donateClose");

if (joinCultBtn) {
  joinCultBtn.addEventListener("click", () => {
    joinModal.style.display = "block";
  });
}
if (modalClose) {
  modalClose.addEventListener("click", () => {
    joinModal.style.display = "none";
  });
}
if (donateBtn) {
  donateBtn.addEventListener("click", () => {
    // Hide "Вступить" modal
    if (joinModal) joinModal.style.display = "none";
    // Show "Донат" modal
    donateModal.style.display = "block";
  });
}
if (donateClose) {
  donateClose.addEventListener("click", () => {
    donateModal.style.display = "none";
  });
}

// Click outside the modal
window.addEventListener("click", (e) => {
  if (e.target === joinModal) {
    joinModal.style.display = "none";
  }
  if (e.target === donateModal) {
    donateModal.style.display = "none";
  }
});

// Subscription & Follow
const subscribeBtn = document.getElementById("subscribeBtn");
if (subscribeBtn) {
  subscribeBtn.addEventListener("click", () => {
    // Example PayPal subscription link
    window.open("https://www.paypal.com/.../YOUR_SUBSCRIPTION_LINK", "_blank");
  });
}

const followBtn = document.getElementById("followBtn");
if (followBtn) {
  followBtn.addEventListener("click", () => {
    window.open("https://www.tiktok.com/@yourprofile", "_blank");
  });
}

/**************************************************************
 * 4. Radio Player Logic
 **************************************************************/
// We'll assume the elements exist only on radio.html
const playlist = [
  { title: "Мой супертрек #1", src: "audio/track1.mp3" },
  { title: "Мой супертрек #2", src: "audio/track2.mp3" }
];

let currentTrackIndex = 0;
const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const trackTitle = document.getElementById("currentTrackTitle");
const progressBar = document.getElementById("progressBar");

function loadTrack(index) {
  if (!audio) return; // Means we're not on radio.html
  currentTrackIndex = index;
  audio.src = playlist[index].src;
  if (trackTitle) trackTitle.textContent = playlist[index].title;
}

function playTrack() {
  if (audio) {
    audio.play();
    if (playBtn) playBtn.textContent = "Pause";
  }
}

function pauseTrack() {
  if (audio) {
    audio.pause();
    if (playBtn) playBtn.textContent = "Play";
  }
}

if (playBtn) {
  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      playTrack();
    } else {
      pauseTrack();
    }
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    playTrack();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    playTrack();
  });
}

// Auto move to next track
if (audio) {
  audio.addEventListener("ended", () => {
    if (nextBtn) nextBtn.click();
  });

  // Update progress bar
  audio.addEventListener("timeupdate", () => {
    if (!audio.duration || !progressBar) return;
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progressPercent + "%";
  });
}
