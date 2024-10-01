let shortBreakLength = 5;
let longBreakLength = 15;
let workLength = 25;
let currentCycle = 0;
let isActive = false;
let currentTime = workLength * 60;

const START_STOP_BUTTON = document.getElementById('StartStopButton');
const SKIP_BUTTON = document.getElementById('SkipButton');
const TIMER_TEXT = document.getElementById('TimerText');
const POMODORO_CYCLE = document.getElementById('PomodoroCycle');
const POMODORO_COUNT = document.getElementById('PomodoroCount');

// Timer code to run every second
setInterval(() => {
  if (isActive === true) {
    let minutesLeft = Math.floor(currentTime / 60);
    let secondsLeft = `${currentTime % 60}`;
    if (secondsLeft === '0') {
      secondsLeft = '00';
    }
    currentTime -= 1;
    TIMER_TEXT.innerText = `${minutesLeft}:${secondsLeft}`;
  }
}, 1000);

START_STOP_BUTTON.onclick = () => {
  isActive = !isActive;
  if (isActive === true) {
    START_STOP_BUTTON.innerText = 'Pause';
  } else {
    START_STOP_BUTTON.innerText = 'Resume';
  }
};
