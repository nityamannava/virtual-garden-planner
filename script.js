const garden = document.getElementById('garden');
const plantSelect = document.getElementById('plant-select');
const weatherSelect = document.getElementById('weather-select');
const themeToggle = document.getElementById('theme-toggle');
const waterBtn = document.getElementById('water-mode');
const fertilizerBtn = document.getElementById('fertilizer-mode');
const harvestBtn = document.getElementById('harvest-mode');
const weatherMessage = document.getElementById('weather-message');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const chatLog = document.getElementById('chat-log');
const plantCountText = document.getElementById('plant-count');
const harvestReadyText = document.getElementById('harvest-ready');
const rainEffect = document.getElementById('rainEffect');

let mode = 'plant';
let plantCount = 0;
let harvestReady = 0;

// Create garden grid
for (let i = 0; i < 100; i++) {
  const cell = document.createElement('div');
  cell.classList.add('garden-cell');
  cell.dataset.stage = 0;
  cell.addEventListener('click', () => handleCellClick(cell));
  garden.appendChild(cell);
}

function handleCellClick(cell) {
  const stage = parseInt(cell.dataset.stage);

  if (mode === 'plant' && !cell.textContent) {
    cell.textContent = plantSelect.value;
    cell.dataset.stage = 1;
    plantCount++;
  } else if (mode === 'water' && stage > 0 && stage < 3) {
    cell.dataset.stage = stage + 1;
  } else if (mode === 'fertilize' && stage > 0 && stage < 3) {
    cell.dataset.stage = stage + 1;
  } else if (mode === 'harvest' && stage >= 3) {
    cell.textContent = '';
    cell.dataset.stage = 0;
    plantCount--;
  }

  updateStats();
}

function updateStats() {
  plantCountText.textContent = `Total Plants: ${plantCount}`;
  const cells = document.querySelectorAll('.garden-cell');
  harvestReady = [...cells].filter(c => parseInt(c.dataset.stage) >= 3).length;
  harvestReadyText.textContent = `Ready to Harvest: ${harvestReady}`;
}

waterBtn.addEventListener('click', () => mode = 'water');
fertilizerBtn.addEventListener('click', () => mode = 'fertilize');
harvestBtn.addEventListener('click', () => mode = 'harvest');
plantSelect.addEventListener('change', () => mode = 'plant');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

weatherSelect.addEventListener('change', () => {
  const weather = weatherSelect.value;
  document.body.classList.remove('sunny-bg', 'cloudy-bg', 'rainy-bg');
  rainEffect.style.display = 'none';

  if (weather === 'sunny') {
    weatherMessage.textContent = "It's a sunny day ☀️";
    document.body.classList.add('sunny-bg');
  } else if (weather === 'cloudy') {
    weatherMessage.textContent = "It's a cloudy day ☁️";
    document.body.classList.add('cloudy-bg');
  } else if (weather === 'rainy') {
    weatherMessage.textContent = "It's a rainy day 🌧️";
    document.body.classList.add('rainy-bg');
    rainEffect.style.display = 'block';
  }
});

// AI chatbot replies
sendBtn.addEventListener('click', () => {
  const userMsg = chatInput.value.trim();
  if (!userMsg) return;

  const reply = getAIResponse(userMsg);
  chatLog.innerHTML += `<div><strong>You:</strong> ${userMsg}</div>`;
  chatLog.innerHTML += `<div><strong>AI:</strong> ${reply}</div>`;
  chatInput.value = '';
  chatLog.scrollTop = chatLog.scrollHeight;
});

function getAIResponse(msg) {
  msg = msg.toLowerCase();
  if (msg.includes("carrot")) return "Carrots like full sun and loose soil. Water them regularly!";
  if (msg.includes("flower")) return "Flowers need sun and nutrients. Don't forget to water and fertilize.";
  if (msg.includes("tree")) return "Trees need more space and time. Make sure they grow to stage 3!";
  if (msg.includes("tomato")) return "Tomatoes love warmth and sunshine. Fertilize for better yield!";
  if (msg.includes("water")) return "Water helps plants grow to the next stage.";
  if (msg.includes("harvest")) return "You can harvest plants once they reach stage 3.";
  return "Try watering or fertilizing your plants to help them grow!";
}
function createRain() {
  const rainEffect = document.getElementById('rainEffect');
  rainEffect.innerHTML = '';
  for (let i = 0; i < 100; i++) {
    const drop = document.createElement('div');
    drop.classList.add('raindrop');
    drop.style.left = Math.random() * 100 + 'vw';
    drop.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
    drop.style.animationDelay = Math.random() * 2 + 's';
    rainEffect.appendChild(drop);
  }
}

weatherSelect.addEventListener('change', () => {
  const weather = weatherSelect.value;
  document.body.classList.remove('sunny-bg', 'cloudy-bg', 'rainy-bg');
  rainEffect.style.display = 'none';

  if (weather === 'sunny') {
    weatherMessage.textContent = "It's a sunny day ☀️";
    document.body.classList.add('sunny-bg');
  } else if (weather === 'cloudy') {
    weatherMessage.textContent = "It's a cloudy day ☁️";
    document.body.classList.add('cloudy-bg');
  } else if (weather === 'rainy') {
    weatherMessage.textContent = "It's a rainy day 🌧️";
    document.body.classList.add('rainy-bg');
    rainEffect.style.display = 'block';
    createRain();
  }
});
