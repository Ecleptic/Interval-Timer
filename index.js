"use-strict"

// Made the timer Global. May want to look into another way.
let timer

/**
 * Function that begins and holds the countdown.
 * @param {Integer} inputTime
 */
function startTimer(inputTime) {
  const currentTime = Date.now()
  const goalTime = currentTime + inputTime * 1000

  timer = setInterval(() => {
    let timeLeft = Math.round((goalTime - Date.now()) / 1000)
    console.log(timeLeft)
    displayTimeLeft(timeLeft)
    if (timeLeft <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}
/**
 * Get user input and start the timer
 */
const timerInput = document.querySelector(".timerInput")
const submitTimer = document
  .querySelector(".submitTimer")
  .addEventListener("submit", e => {
    e.preventDefault()
    clearInterval(timer)
    startTimer(parseInt(timerInput.value) + 1)
  })

/**
 * Write result to the page
 */

function displayTimeLeft(time) {
  const timerDiv = document.querySelector(".timer")
  const timerDisplay = document.querySelector("#timerDisplay")

  timerDisplay.textContent = time
}
