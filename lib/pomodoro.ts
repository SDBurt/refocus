const timerSettings = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
}

let timer = null

let currentTime = {
  minutes: timerSettings.pomodoro,
  seconds: 0,
}

export const startTimer = (duration) => {
  let time = duration * 60
  let minutes
  let seconds

  const runningTimer = setInterval(() => {
    timer = runningTimer
    minutes = Math.floor(time / 60)
    seconds = time - minutes * 60
    // minutes = minutes < 10 ? "0" + minutes : minutes;

    currentTime = {
      minutes,
      seconds,
    }

    if (time === 0) {
      clearInterval(runningTimer)
    }
  }, 1000)
}
