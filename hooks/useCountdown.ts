import { useEffect, useState } from "react"

function useCountdown(defaultTime: number) {
  // Timer
  const [time, setTime] = useState(defaultTime * 60)
  const [timerRunning, setTimerRunning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerRunning) {
        if (time > 0) {
          setTime(time - 1)
        } else if (time === 0) {
          clearInterval(interval)
        }
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [timerRunning, time])

  function resetTimer(t: number) {
    setTimerRunning(false)
    setTime(t * 60)
  }
  function stopTimer() {
    setTimerRunning(false)
  }
  function startTimer() {
    setTimerRunning(true)
  }

  return {
    time,
    setTime,
    resetTimer,
    stopTimer,
    startTimer,
    timerRunning,
    setTimerRunning,
  }
}

export default useCountdown
