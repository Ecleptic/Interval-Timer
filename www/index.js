"use-strict";

if ("addEventListener" in document) {
  document.addEventListener(
    "DOMContentLoaded",
    function() {
      FastClick.attach(document.body);
    },
    false
  );
}

// Made the timer Global. May want to look into another way.
let timer;
let isReset = true;
let isRunning = false;
let darkMode = false;
let currentTheme = 0;

// let defaultMinutesValue = '01'
// let defaultSecondsValue = '10'

let savedMinutesValue;
let savedSecondsValue;
let saveRestMinutesValue;
let saveRestSecondsValue;
let savedRepsValue;
let currentMinutesValue;
let currentSecondsValue;
let currentRestMinutesValue;
let currentRestSecondsValue;
let currentRepsValue;

const themeList = [
  { main: "darkPurple", accent: "lightPurple", text: "textLight" },
  {
    main: "sLightMain",
    accent: "sLightAccent",
    text: "textLight"
  },
  { main: "pinkWhiteMain", accent: "pinkWhiteAccent", text: "textDark" },
  { main: "backgroundGrey", accent: "textWhite", text: "textWhite" },
  {
    main: "michaelBackground",
    accent: "michaelAccent",
    text: "michaelText"
  }
];

const minutesInput = document.querySelector("#timerInputMinutes");
const secondsInput = document.querySelector("#timerInputSeconds");
const restTimerInputMinutes = document.querySelector("#restTimerInputMinutes");
const restTimerInputSeconds = document.querySelector("#restTimerInputSeconds");
const repsInput = document.querySelector("#repsInput");

/**
 * Listen to start button.
 * If clicked while it's class is "running", then we pause and change class
 *
 * if it's already stopped, start it.
 */
const startButton = document.querySelector("#startButton");
startButton.addEventListener("click", () => {
  if (!isRunning) {
    // start
    clearInterval(timer);
    const timeInSeconds =
      parseInt(secondsInput.value) + parseInt(minutesInput.value) * 60;
    const restInSeconds =
      parseInt(restTimerInputSeconds.value) +
      parseInt(restTimerInputMinutes.value) * 60;
    startTimer(parseInt(timeInSeconds), parseInt(restInSeconds));
    transformPlay();
  } else {
    // pause
    clearInterval(timer);
    isRunning = false;
    transformPlay();
  }
});

const resetButton = document.querySelector("#resetButton");
resetButton.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  isReset = true;
  transformPlay();
  minutesInput.value = savedMinutesValue || "00";
  secondsInput.value = savedSecondsValue || "00";
  restTimerInputMinutes.value = saveRestMinutesValue || "00";
  restTimerInputSeconds.value = saveRestSecondsValue || "00";
  repsInput.value = savedRepsValue || "1";
});

/**
 * Function that begins and holds the countdown.
 * @param {Integer} inputTime
 */
function startTimer(inputTime, restInSeconds) {
  const currentTime = Date.now();
  const goalTime = currentTime + inputTime * 1000;
  const restGoal = goalTime + (restInSeconds + 1) * 1000;

  // save the other pieces.
  if (isReset) {
    savedMinutesValue = minutesInput.value;
    currentMinutesValue = minutesInput.value;
    savedSecondsValue = secondsInput.value;
    currentSecondsValue = secondsInput.value;
    saveRestMinutesValue = restTimerInputMinutes.value;
    currentRestMinutesValue = restTimerInputMinutes.value;
    saveRestSecondsValue = restTimerInputSeconds.value;
    currentRestSecondsValue = restTimerInputSeconds.value;
    savedRepsValue = repsInput.value;
    currentRepsValue = repsInput.value;
  }

  isRunning = true;
  isReset = false;
  timer = setInterval(() => {
    let timeLeft = Math.round((goalTime - Date.now()) / 1000);

    if (timeLeft >= 0) {
      displayTimeLeft(timeLeft);
    } else {
      if (currentRepsValue > 0) {
        const restLeft = Math.round(restGoal - Date.now()) / 1000;
        displayRestLeft(restLeft);
        if (restLeft <= 0 && currentRepsValue >= 0) {
          // Decrease reps and reset everything back to before
          currentRepsValue--;
          displayRestLeft(0);
          clearInterval(timer);
          repsInput.value = currentRepsValue;
          restTimerInputMinutes.value = saveRestMinutesValue;
          restTimerInputSeconds.value = saveRestSecondsValue;
          startTimer(inputTime, restInSeconds);
        }
      } else {
        clearInterval(timer);
        isRunning = false;
      }
    }
  }, 1000);
}
/**
 * Get user input and start the timer
 */

const submitTimer = document
  .querySelector(".submitTimer-form")
  .addEventListener("submit", e => {
    e.preventDefault();
    clearInterval(timer);
    isRunning = true;
    const timeInSeconds =
      parseInt(secondsInput.value) + parseInt(minutesInput.value) * 60;
    const restInSeconds =
      parseInt(restTimerInputSeconds.value) +
      parseInt(restTimerInputMinutes.value) * 60;
    startTimer(parseInt(timeInSeconds), parseInt(restInSeconds));
  });

/**
 * Write result to the page
 */

function displayTimeLeft(time) {
  const minutesLeft = time / 60;
  let secondsLeft = time % 60;

  if (isNaN(minutesInput.value)) {
    minutesInput.value = savedMinutesValue || "00 ";
  }
  if (isNaN(secondsInput.value)) {
    secondsInput.value = savedSecondsValue || "00 ";
  }
  if (isNaN(restTimerInputMinutes.value)) {
    restTimerInputMinutes.value = saveRestMinutesValue || "00";
  }
  if (isNaN(restTimerInputSeconds.value)) {
    restTimerInputSeconds.value = saveRestSecondsValue || "00";
  }
  if (isNaN(repsInput.value)) {
    repsInput.value = savedRepsValue || "0";
  }
  if (secondsLeft < 10) {
    secondsLeft = "0" + secondsLeft;
  }

  if (minutesLeft < 10) {
    minutesInput.value = "0" + Math.floor(minutesLeft);
  } else {
    minutesInput.value = Math.floor(minutesLeft);
  }

  if (secondsLeft < 10) {
    secondsInput.value = "0" + Math.floor(secondsLeft);
  } else {
    secondsInput.value = Math.floor(secondsLeft);
  }
}
function displayRestLeft(time) {
  const minutesLeft = time / 60;
  let secondsLeft = time % 60;

  if (minutesLeft < 10) {
    restTimerInputMinutes.value = "0" + Math.floor(minutesLeft);
  } else {
    restTimerInputMinutes.value = Math.floor(minutesLeft);
  }

  if (secondsLeft < 10) {
    restTimerInputSeconds.value = "0" + Math.floor(secondsLeft);
  } else {
    restTimerInputSeconds.value = Math.floor(secondsLeft);
  }
}

/**
 * Listen for the incrementing buttons, and change input numbers as needed
 */
document.querySelectorAll(".incrementer").forEach(e => {
  document.addEventListener("click", incrementTime);
});

function incrementTime(e) {
  switch (e.target.id) {
    case "increment__seconds-up": {
      if (secondsInput.value < 9) {
        secondsInput.value = parseInt(secondsInput.value) + 1;
        secondsInput.value = "0" + secondsInput.value;
      } else {
        secondsInput.value = parseInt(secondsInput.value) + 1;
      }
      break;
    }
    case "increment__seconds-down": {
      if (secondsInput.value > 0) {
        if (secondsInput.value <= 10) {
          secondsInput.value = parseInt(secondsInput.value) - 1;
          secondsInput.value = "0" + secondsInput.value;
        } else {
          secondsInput.value = parseInt(secondsInput.value) - 1;
        }
      }
      break;
    }
    case "increment__minutes-up": {
      if (minutesInput.value < 9) {
        minutesInput.value = parseInt(minutesInput.value) + 1;
        minutesInput.value = "0" + minutesInput.value;
      } else {
        minutesInput.value = parseInt(minutesInput.value) + 1;
      }
      break;
    }
    case "increment__minutes-down": {
      if (minutesInput.value > 0) {
        if (minutesInput.value <= 10) {
          minutesInput.value = parseInt(minutesInput.value) - 1;
          minutesInput.value = "0" + minutesInput.value;
        } else {
          minutesInput.value = parseInt(minutesInput.value) - 1;
        }
      }
      break;
    }
    default:
      break;
  }
}

function transformPlay() {
  const svg_animation = document.querySelector("#animation");
  const pause =
    "M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28";
  const play = "M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26";
  svg_animation.setAttribute("to", isRunning ? play : pause);
  svg_animation.setAttribute("from", isRunning ? play : pause);
  svg_animation.beginElement();
}
document.querySelector("#themeUp").addEventListener("click", changeThemeUp);
document.querySelector("#themeDown").addEventListener("click", changeThemeDown);

function changeThemeDown() {
  console.log("changeThemeDown");
  if (currentTheme === 0) {
    currentTheme = themeList.length - 1;
  } else {
    currentTheme--;
  }
  changeTheme(themeList[currentTheme]);
}

function changeThemeUp() {
  console.log("changeThemeUp");
  if (currentTheme == themeList.length - 1) {
    currentTheme = 0;
  } else {
    currentTheme++;
  }

  changeTheme(themeList[currentTheme]);
}

function changeTheme({ accent, main, text }) {
  document.documentElement.style.setProperty("--mainColor", `var(--${main})`);
  document.documentElement.style.setProperty(
    "--accentColor",
    `var(--${accent})`
  );
  document.documentElement.style.setProperty("--textColor", `var(--${text})`);
}
