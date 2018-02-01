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
const secondsInput = document.querySelector(".secondsInput")
const minutesInput = document.querySelector(".minutesInput")
const submitTimer = document
  .querySelector(".submitTimer-form")
  .addEventListener("submit", e => {
    e.preventDefault()
    clearInterval(timer)
    const timeInSeconds =
      parseInt(secondsInput.value) + parseInt(minutesInput.value) * 60
    console.log(timeInSeconds)
    startTimer(parseInt(timeInSeconds) + 1)
  })

/**
 * Write result to the page
 */

function displayTimeLeft(time) {
  // const timerDiv = document.querySelector(".timer")
  // const timerDisplay = document.querySelector("#timerDisplay")
  const secondsInput = document.querySelector(".secondsInput")
  const minutesInput = document.querySelector(".minutesInput")

  const minutesLeft = time / 60
  const secondsLeft = time % 60

  console.log("minutes: ", Math.round(minutesLeft))
  console.log("seconds: ", Math.round(secondsLeft))

  minutesInput.value = Math.floor(minutesLeft)
  secondsInput.value = Math.floor(secondsLeft)
}
