let shortBreakLength = 5;
let longBreakLength = 15;
let workLength = 25;
let currentCycle = 0;
let pomodoroCount = 1;
let isActive = false;
let currentTime = workLength * 60;

const CYCLE_ORDER = [
  ['work', workLength],
  ['short break', shortBreakLength],
  ['work', workLength],
  ['short break', shortBreakLength],
  ['work', workLength],
  ['long break', longBreakLength]
];

const START_STOP_BUTTON = document.getElementById('StartStopButton');
const SKIP_BUTTON = document.getElementById('SkipButton');
const TIMER_TEXT = document.getElementById('TimerText');
const POMODORO_CYCLE = document.getElementById('PomodoroCycle');
const POMODORO_COUNT = document.getElementById('PomodoroCount');

function UpdateTimerText() {
  let minutesLeft = Math.floor(currentTime / 60);
  let secondsLeft = `${currentTime % 60}`;
  if (secondsLeft.length === 1) {
    secondsLeft = `0${secondsLeft}`;
  }
  TIMER_TEXT.innerText = `${minutesLeft}:${secondsLeft}`;
}

function IncrementCycleCount() {
  currentCycle += 1;
  if (currentCycle >= CYCLE_ORDER.length) {
    currentCycle = 0;
    pomodoroCount += 1;
  }
  POMODORO_CYCLE.innerText = CYCLE_ORDER[currentCycle][0];
  POMODORO_COUNT.innerText = `Pomodoro #${pomodoroCount}`;
  currentTime = CYCLE_ORDER[currentCycle][1] * 60;
}

// Timer code to run every second
setInterval(() => {
  if (isActive === true) {
    currentTime -= 1;
    UpdateTimerText();
    if (currentTime <= 0) {
      isActive = false;
      IncrementCycleCount();
    }
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

SKIP_BUTTON.onclick = () => {
  IncrementCycleCount();
  UpdateTimerText();
};
