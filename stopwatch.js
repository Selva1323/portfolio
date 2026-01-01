// Simple stopwatch implementation
const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');

let startTime = 0, elapsed = 0, timerInterval = null;

function formatTime(ms){
  const total = Math.floor(ms);
  const hundredths = Math.floor((total % 1000) / 10);
  const seconds = Math.floor(total / 1000) % 60;
  const minutes = Math.floor(total / (1000*60)) % 60;
  const hours = Math.floor(total / (1000*60*60));
  return `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}.${String(hundredths).padStart(2,'0')}`;
}

function update(){
  const now = Date.now();
  const diff = elapsed + (now - startTime);
  display.textContent = formatTime(diff);
}

startBtn && startBtn.addEventListener('click', () => {
  if (!timerInterval){
    startTime = Date.now();
    timerInterval = setInterval(update, 30);
  }
});

pauseBtn && pauseBtn.addEventListener('click', () => {
  if (timerInterval){
    clearInterval(timerInterval); timerInterval = null; elapsed += Date.now() - startTime;
  }
});

resetBtn && resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval); timerInterval = null; startTime = 0; elapsed = 0; display.textContent = '00:00:00.00';
});