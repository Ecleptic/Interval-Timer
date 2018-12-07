'use-strict'

// Made the timer Global. May want to look into another way.
let timer
let isRunning = false
let darkMode = false
let currentTheme = 0

const defaultMinutesValue = '01'
const defaultSecondsValue = '10'

const themeList = [
    { main: 'darkPurple', accent: 'lightPurple', text: 'textLight' },
    {
        main: 'sLightMain',
        accent: 'sLightAccent',
        text: 'textLight'
    },
    { main: 'pinkWhiteMain', accent: 'pinkWhiteAccent', text: 'textDark' }
]

const minutesInput = document.querySelector('.minutesInput')
const secondsInput = document.querySelector('.secondsInput') //TODO: maybe not global var?
/**
 * Listen to start button.
 * If clicked while it's class is "running", then we pause and change class
 *
 * if it's already stopped, start it.
 */
const startButton = document.querySelector('#startButton')
startButton.addEventListener('click', () => {
    if (!isRunning) {
        clearInterval(timer)
        const timeInSeconds =
            parseInt(secondsInput.value) + parseInt(minutesInput.value) * 60
        startTimer(parseInt(timeInSeconds) + 1)
    } else {
        clearInterval(timer)
        // minutesInput.value = defaultMinutesValue
        // secondsInput.value = defaultSecondsValue
        isRunning = false
        // secondsInput.value = "00"
        // minutesInput.value = "0"
    }
})
// document.querySelector('#stopButton').addEventListener('click', () => {
//     clearInterval(timer)
//     // secondsInput.value = "00"
//     // minutesInput.value = "0"
// })

/**
 * Function that begins and holds the countdown.
 * @param {Integer} inputTime
 */
function startTimer(inputTime) {
    const currentTime = Date.now()
    const goalTime = currentTime + inputTime * 1000
    isRunning = true

    timer = setInterval(() => {
        let timeLeft = Math.round((goalTime - Date.now()) / 1000)
        // console.log(timeLeft)
        displayTimeLeft(timeLeft)
        if (timeLeft <= 0) {
            clearInterval(timer)
            isRunning = false
        }
    }, 1000)
}
/**
 * Get user input and start the timer
 */

const submitTimer = document
    .querySelector('.submitTimer-form')
    .addEventListener('submit', e => {
        e.preventDefault()
        clearInterval(timer)
        const timeInSeconds =
            parseInt(secondsInput.value) + parseInt(minutesInput.value) * 60
        console.log({ timeInSeconds })
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
        secondsLeft = '0' + secondsLeft
    }

    // console.log('minutes: ', Math.round(minutesLeft))
    // console.log('seconds: ', Math.round(secondsLeft))

    if (minutesLeft < 10) {
        minutesInput.value = '0' + Math.floor(minutesLeft)
    } else {
        minutesInput.value = Math.floor(minutesLeft)
    }

    if (secondsLeft < 10) {
        secondsInput.value = '0' + Math.floor(secondsLeft)
    } else {
        secondsInput.value = Math.floor(secondsLeft)
    }
}
/**
 * Listen for the incrementing buttons, and change input numbers as needed
 */
document.querySelectorAll('.incrementer').forEach(e => {
    document.addEventListener('click', incrementTime)
})

function incrementTime(e) {
    // const secondsInput = document.querySelector(".secondsInput")
    // const minutesInput = document.querySelector(".minutesInput")
    console.log('ID:', e.target.id, minutesInput.value, secondsInput.value)
    switch (e.target.id) {
        case 'increment__seconds-up': {
            if (secondsInput.value < 9) {
                console.log(secondsInput.value, 'is less than 10')
                secondsInput.value = parseInt(secondsInput.value) + 1
                secondsInput.value = '0' + secondsInput.value
            } else {
                console.log('notlessthan10')
                secondsInput.value = parseInt(secondsInput.value) + 1
            }
            break
        }
        case 'increment__seconds-down': {
            if (secondsInput.value > 0) {
                if (secondsInput.value <= 10) {
                    secondsInput.value = parseInt(secondsInput.value) - 1
                    secondsInput.value = '0' + secondsInput.value
                } else {
                    secondsInput.value = parseInt(secondsInput.value) - 1
                }
            }
            break
        }
        case 'increment__minutes-up': {
            if (minutesInput.value < 9) {
                minutesInput.value = parseInt(minutesInput.value) + 1
                minutesInput.value = '0' + minutesInput.value
            } else {
                minutesInput.value = parseInt(minutesInput.value) + 1
            }
            break
        }
        case 'increment__minutes-down': {
            if (minutesInput.value > 0) {
                if (minutesInput.value <= 10) {
                    minutesInput.value = parseInt(minutesInput.value) - 1
                    minutesInput.value = '0' + minutesInput.value
                } else {
                    minutesInput.value = parseInt(minutesInput.value) - 1
                }
            }
            break
        }
        default:
            break
    }
}

let flip = isRunning
let pause = 'M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28'
let play = 'M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26'
let svg_animation = document.querySelector('#animation')

document
    .querySelector('.timerControl__button')
    .addEventListener('click', () => {
        flip = !flip
        svg_animation.setAttribute('to', flip ? play : pause)
        svg_animation.setAttribute('from', flip ? play : pause)
        svg_animation.beginElement()
    })

document.querySelector('#themeUp').addEventListener('click', changeThemeUp)
document.querySelector('#themeDown').addEventListener('click', changeThemeDown)

function changeThemeDown() {
    if (currentTheme == 0) {
        currentTheme = themeList.length - 1
    } else {
        currentTheme--
    }
    changeTheme(themeList[currentTheme])
}
function changeThemeUp() {
    if (currentTheme == themeList.length - 1) {
        currentTheme = 0
    } else {
        currentTheme++
    }

    changeTheme(themeList[currentTheme])
}

function changeTheme({ accent, main, text }) {
    document.documentElement.style.setProperty('--mainColor', `var(--${main})`)
    document.documentElement.style.setProperty(
        '--accentColor',
        `var(--${accent})`
    )
    document.documentElement.style.setProperty('--textColor', `var(--${text})`)
}
