let shortBreakLength = 5;
let longBreakLength = 15;
let workLength = 25;
let currentCycle = 0;
let pomodoroCount = 1;
let isActive = false;
let timePassed = 0;
let endingTimestamp;

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

function GetCurrentCycleLength() {
  return CYCLE_ORDER[currentCycle][1];
}

function GetSecondsLeft() {
  let millisecondsLeft;
  if (isActive === false) {
    millisecondsLeft = GetCurrentCycleLength() * 60 * 1000 - timePassed;
  } else {
    let currentTimestamp = Date.now();
    millisecondsLeft = endingTimestamp - currentTimestamp;
  }
  let secondsLeft = Math.floor(millisecondsLeft / 1000);
  return Math.max(secondsLeft, 0);
}

function PauseTimer() {
  UpdateSiteTitle();
  isActive = false;
  START_STOP_BUTTON.innerText = 'Resume';
}

function UpdateTimerText() {
  let totalSeconds = GetSecondsLeft();
  let minutesLeft = Math.floor(totalSeconds / 60);
  let secondsLeft = totalSeconds % 60;
  if (secondsLeft <= 0) {
    secondsLeft = `0${secondsLeft}`;
  }
  TIMER_TEXT.innerText = `${minutesLeft}:${secondsLeft}`;
}

function UpdateSiteTitle() {
  let totalSeconds = GetSecondsLeft();
  let minutesLeft = Math.floor(totalSeconds / 60);
  let secondsLeft = totalSeconds % 60;

  if (secondsLeft <= 0) {
    secondsLeft = `0${secondsLeft}`;
  }
  let timerText = `${minutesLeft}:${secondsLeft}`;
  if (isActive === true) {
    document.title = timerText;
  } else {
    document.title = `PAUSED ${timerText}`;
  }
}

function IncrementCycleCount() {
  timePassed = 0;
  currentCycle += 1;
  if (currentCycle >= CYCLE_ORDER.length) {
    currentCycle = 0;
    pomodoroCount += 1;
  }
  POMODORO_CYCLE.innerText = CYCLE_ORDER[currentCycle][0];
  POMODORO_COUNT.innerText = `Pomodoro #${pomodoroCount}`;
}

// Timer code to run every second
setInterval(() => {
  if (isActive === true) {
    UpdateSiteTitle();
    UpdateTimerText();
    if (GetSecondsLeft() <= 0) {
      PauseTimer();
      IncrementCycleCount();
    }
  }
}, 1000);

START_STOP_BUTTON.onclick = () => {
  isActive = !isActive;
  if (isActive === true) {
    endingTimestamp = Date.now();
    endingTimestamp = endingTimestamp +=
      GetCurrentCycleLength() * 60 * 1000 - timePassed;
    START_STOP_BUTTON.innerText = 'Pause';
  } else {
    START_STOP_BUTTON.innerText = 'Resume';
    let cycleLengthInMilliseconds = GetCurrentCycleLength() * 60 * 1000;
    timePassed = cycleLengthInMilliseconds - (endingTimestamp - Date.now());
  }
};

SKIP_BUTTON.onclick = () => {
  PauseTimer();
  IncrementCycleCount();
  UpdateTimerText();
  UpdateSiteTitle();
};

UpdateSiteTitle();
