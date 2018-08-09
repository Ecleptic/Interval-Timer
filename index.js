"use-strict"

// Made the timer Global. May want to look into another way.
let timer
let isRunning = false

const secondsInput = document.querySelector(".secondsInput") //TODO: maybe not global var?
const minutesInput = document.querySelector(".minutesInput")
/**
 * Listen to start button.
 * If clicked while it's class is "running", then we pause and change class
 *
 * if it's already stopped, start it.
 */
const startButton = document.querySelector("#startButton")
startButton.addEventListener("click", () => {
  clearInterval(timer)
  const timeInSeconds =
    parseInt(secondsInput.value) + parseInt(minutesInput.value) * 60
  startTimer(parseInt(timeInSeconds) + 1)
})
document.querySelector("#stopButton").addEventListener("click", () => {
  clearInterval(timer)
  // secondsInput.value = "00"
  // minutesInput.value = "0"
})

/**
 * Function that begins and holds the countdown.
 * @param {Integer} inputTime
 */
function startTimer(inputTime) {
  const currentTime = Date.now()
  const goalTime = currentTime + inputTime * 1000

  timer = setInterval(() => {
    let timeLeft = Math.round((goalTime - Date.now()) / 1000)
    // console.log(timeLeft)
    displayTimeLeft(timeLeft)
    if (timeLeft <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}
/**
 * Get user input and start the timer
 */

const submitTimer = document
  .querySelector(".submitTimer-form")
  .addEventListener("submit", e => {
    e.preventDefault()
    clearInterval(timer)
    const timeInSeconds =
      parseInt(secondsInput.value) + parseInt(minutesInput.value) * 60
    // console.log(timeInSeconds)
    startTimer(parseInt(timeInSeconds) + 1)
  })

/**
 * Write result to the page
 */

function displayTimeLeft(time) {
  // const timerDiv = document.querySelector(".timer")
  // const timerDisplay = document.querySelector("#timerDisplay")
  // const secondsInput = document.querySelector(".secondsInput")
  // const minutesInput = document.querySelector(".minutesInput")

  const minutesLeft = time / 60
  let secondsLeft = time % 60

  if (secondsLeft < 10) {
    secondsLeft = "0" + secondsLeft
  }

  // console.log("minutes: ", Math.round(minutesLeft))
  // console.log("seconds: ", Math.round(secondsLeft))

  minutesInput.value = Math.floor(minutesLeft)
  if (secondsLeft < 10) {
    secondsInput.value = "0" + Math.floor(secondsLeft)
  } else {
    secondsInput.value = Math.floor(secondsLeft)
  }
}
/**
 * Listen for the incrementation buttons, and change input numbers as needed
 */
document.querySelectorAll(".incrementer").forEach(e => {
  document.addEventListener("click", incrementTime)
})

function incrementTime(e) {
  // const secondsInput = document.querySelector(".secondsInput")
  // const minutesInput = document.querySelector(".minutesInput")
  switch (e.target.id) {
    case "increment__seconds-up": {
      secondsInput.value = parseInt(secondsInput.value) + 1
      break
    }
    case "increment__seconds-down": {
      if (secondsInput.value > 0) {
        if (secondsInput.value <= 10) {
          secondsInput.value = parseInt(secondsInput.value) - 1
          secondsInput.value = "0" + secondsInput.value
        } else {
          secondsInput.value = parseInt(secondsInput.value) - 1
        }
      }
      break
    }
    case "increment__minutes-up": {
      minutesInput = parseInt(minutesInput.value) + 1
      break
    }
    case "increment__minutes-down": {
      if (minutesInput.value > 0) {
        minutesInput = parseInt(minutesInput.value) - 1
      }
      break
    }
    default:
      break
  }
}
