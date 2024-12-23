// Пример плейлиста (замени на свои реальные файлы)
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
  currentTrackIndex = index;
  audio.src = playlist[index].src;
  trackTitle.textContent = playlist[index].title;
}

function playTrack() {
  audio.play();
  playBtn.textContent = "Pause";
}

function pauseTrack() {
  audio.pause();
  playBtn.textContent = "Play";
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playTrack();
  } else {
    pauseTrack();
  }
});

nextBtn.addEventListener("click", () => {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
  playTrack();
});

prevBtn.addEventListener("click", () => {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex);
  playTrack();
});

// Автопереход к следующему треку
audio.addEventListener("ended", () => {
  nextBtn.click();
});

// Обновляем прогресс-бар
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = progressPercent + "%";
});

// При загрузке страницы
window.addEventListener("DOMContentLoaded", () => {
  loadTrack(0);
});
