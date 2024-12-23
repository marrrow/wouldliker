/**************************************************************
 * 1. Счётчики (Views, Likes) с небольшим рандомом
 **************************************************************/
let tiktokViews = 43060000;
let lastTimeTV = Date.now();
const VIEWS_PER_DAY = 400000; // или 300-400k, можно усложнить

let tiktokLikes = 2130000;
let lastTimeTL = Date.now();
const LIKES_PER_DAY = 25000;  // или 20-30k

function updateTiktokViews() {
  const now = Date.now();
  const elapsed = now - lastTimeTV;
  lastTimeTV = now;
  const msInDay = 86400000;

  // Рандомный коэффициент (0.8 .. 1.2)
  const randomFactor = 0.8 + Math.random() * 0.4;
  
  const inc = (VIEWS_PER_DAY * randomFactor / msInDay) * elapsed;
  tiktokViews += inc;

  document.getElementById("tiktok-views").innerText =
    Math.floor(tiktokViews).toLocaleString();
}

function updateTiktokLikes() {
  const now = Date.now();
  const elapsed = now - lastTimeTL;
  lastTimeTL = now;
  const msInDay = 86400000;

  const randomFactor = 0.8 + Math.random() * 0.4;
  const inc = (LIKES_PER_DAY * randomFactor / msInDay) * elapsed;
  tiktokLikes += inc;

  document.getElementById("tiktok-likes").innerText =
    Math.floor(tiktokLikes).toLocaleString();
}

// Обновляем каждую секунду
setInterval(updateTiktokViews, 1000);
setInterval(updateTiktokLikes, 1000);

/**************************************************************
 * 2. График (Chart.js)
 **************************************************************/
window.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("analyticsChart").getContext("2d");
  
  // Градиент для фона
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, "rgba(255, 54, 54, 0.4)");
  gradient.addColorStop(1, "rgba(255, 54, 54, 0)");

  // Пример данных (количество «использований» за 4 недели)
  const labels = ["Неделя 1", "Неделя 2", "Неделя 3", "Неделя 4"];
  const dataUsage = [200, 400, 700, 1200]; 
  // Сюда подставь любые нужные числа

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "TikTok uses over time",   // Переименовали
          data: dataUsage,                 // Убрали Likes
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
});
/**************************************************************
 * 3. Модалки ("Вступить" и "Донат")
 **************************************************************/
const joinCultBtn = document.getElementById("joinCultBtn");
const joinModal = document.getElementById("joinModal");
const modalClose = document.getElementById("modalClose");

const donateBtn = document.getElementById("donateBtn");
const donateModal = document.getElementById("donateModal");
const donateClose = document.getElementById("donateClose");

// Открыть модалку "Вступить"
joinCultBtn.addEventListener("click", () => {
  joinModal.style.display = "block";
});

// Закрыть (крестик)
modalClose.addEventListener("click", () => {
  joinModal.style.display = "none";
});

// Открыть модалку "Донат"
donateBtn.addEventListener("click", () => {
  // Закрываем "Вступить" модалку
  joinModal.style.display = "none";
  // Открываем "Донат"
  donateModal.style.display = "block";
});

// Закрыть "Донат"
donateClose.addEventListener("click", () => {
  donateModal.style.display = "none";
});

// Клик вне окна — тоже закрывать
window.addEventListener("click", (e) => {
  if (e.target === joinModal) {
    joinModal.style.display = "none";
  }
  if (e.target === donateModal) {
    donateModal.style.display = "none";
  }
});

// Кнопки подписки и фоллова (заглушки)
const subscribeBtn = document.getElementById("subscribeBtn");
subscribeBtn.addEventListener("click", () => {
  // Перейти на страницу PayPal Subscription или Stripe
  window.open("https://www.paypal.com/.../YOUR_SUBSCRIPTION_LINK", "_blank");
});

const followBtn = document.getElementById("followBtn");
followBtn.addEventListener("click", () => {
  // Ссылка на TikTok
  window.open("https://www.tiktok.com/@yourprofile", "_blank");
});
