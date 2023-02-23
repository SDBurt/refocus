import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

import { stateFlow, defaultPomoIntervals } from "@/config/pomodoro"

type FlowStateType = "pomodoro" | "shortBreak" | "longBreak"

const defaultState = "pomodoro"

const makeClock = (t: number) => {
  return (
    `
      ${
        Math.floor(t / 60) < 10
          ? `0${Math.floor(t / 60)}`
          : `${Math.floor(t / 60)}`
      }:${t % 60 < 10 ? `0${t % 60}` : t % 60}
    `
    )
}



export default function PomodoroClock({settings}) {

  // Timer
  const [time, setTime] = useState(parseInt(settings[defaultState])*60)
  const [timerRunning, setTimerRunning] = useState(false)
  const [flowState, setFlowState] = useState<FlowStateType>(defaultState)
  const [numPomosBeforeLongBreak, setNumPomosBeforeLongBreak] = useState(defaultPomoIntervals)

  const resetTimer = () => {
    setTimerRunning(false)
    setTime(parseInt(settings[flowState])*60)
  }
  const stopTimer = () => {
    setTimerRunning(false)
  }
  const startTimer = () => {
    setTimerRunning(true)
  }

  const onTimerComplete = () => {
    
    const nextState = stateFlow[flowState].next as FlowStateType
    setTimerRunning(false)
    setTime(settings[nextState]*60 || stateFlow[nextState].defaultTime*60)
    
    if (flowState === 'pomodoro') {
      setFlowState(numPomosBeforeLongBreak <= 0 ? 'longBreak' : 'shortBreak')
      setNumPomosBeforeLongBreak(prev => {
        return prev <= 0 ? defaultPomoIntervals : prev - 1
      })
    } else {
      setFlowState(nextState)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerRunning) {
        if (time > 0) {
          setTime(time - 1);
        } else if (time === 0) {

          clearInterval(interval);
          onTimerComplete()
          if (settings["autoStartTimer"]) {
            startTimer()
          }
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, time]);

  return (
    <div className="flex flex-col space-y-2">

          {/* Title */}
          <div className="text-4xl font-semibold text-slate-700 dark:text-slate-400">
            {stateFlow[flowState].label}
          </div>
          {/* Subtitle with details */}
          <div className="text-md font-semibold text-slate-800 dark:text-slate-600">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {stateFlow[flowState].description}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
            long break in {numPomosBeforeLongBreak} pomodoros
            </p>
          </div>
          {/* Clock */}
          <div className="text-8xl font-semibold text-slate-700 dark:text-slate-400">
            {makeClock(time)}
          </div>

          {/* Button Group */}
          <div className="flex gap-2">
            {
              !timerRunning ? (
                <>
                  <Button onClick={() => startTimer()}>Start Timer</Button>
                  <Button variant="outline" onClick={() => resetTimer()}>Reset Timer</Button>
                </>
              ) : (
                  <Button onClick={() => stopTimer()}>Stop Timer</Button>
              )
            }
          </div>

          </div>
  )
}
