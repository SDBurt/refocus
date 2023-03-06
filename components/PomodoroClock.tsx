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


export default function PomodoroClock({settings, time, startClock, stopClock, resetClock, clockRunning}) {

  // Timer
  const [flowState, setFlowState] = useState<FlowStateType>(defaultState)
  const [numPomosBeforeLongBreak, setNumPomosBeforeLongBreak] = useState(defaultPomoIntervals)
  
  const [distracted, setDistracted] = useState([])
  const [avgDiff, setAvgDiff] = useState<number>(0.0)

  const resetTimer = () => {
    resetClock(parseInt(settings[flowState]))

    setDistracted([])
    setAvgDiff(0)
  }
  const stopTimer = () => {
    stopClock()
  }
  const startTimer = () => {
    startClock()
  }

  const newFlowState = (state) => {
    setFlowState(state)
    resetClock(parseInt(settings[state]))
  }

  const signalDistracted = () => {
    
    // const newDistracted = [...distracted, time]
    const distractedLen = distracted.length

    if (distractedLen > 1) {
      const diff = distracted[distractedLen-1] - time
      const cumulativeAvg = diff - (avgDiff) / (distractedLen + 1) 
      setAvgDiff(cumulativeAvg)

    } else {
      
      const cumulativeAvg = (settings[flowState]*60 - time) / (distractedLen + 1) 
      setAvgDiff(cumulativeAvg)
    }

    const newDistracted = [...distracted, time]
    setDistracted(newDistracted)

  }

  const onTimerComplete = () => {
    
    const nextState = stateFlow[flowState].next as FlowStateType
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
    if (clockRunning && time <= 0) {  
      onTimerComplete()
      if (settings["autoStartTimer"]) {
        startTimer()
      }
    }
  }, [clockRunning, time]);

  return (
    <div className="flex flex-col space-y-6 items-center">

      <div className="flex flex-row space-x-2">
        <Button variant={flowState === "pomodoro" ? "default" : "outline"} onClick={() => newFlowState("pomodoro")}>Pomodoro</Button>
        <Button variant={flowState === "shortBreak" ? "default" : "outline"} onClick={() => newFlowState("shortBreak")}>Short Break</Button>
        <Button variant={flowState === "longBreak" ? "default" : "outline"} onClick={() => newFlowState("longBreak")}>Long Break</Button>
      </div>

      {/* Title */}
      
      {/* Subtitle with details */}
      {/* <div className="text-md font-semibold text-slate-800 dark:text-slate-600">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {stateFlow[flowState].description}
        </p> 
        <p className="text-sm text-slate-500 dark:text-slate-400">
          long break in {numPomosBeforeLongBreak} pomodoros
        </p> 
      </div> */}

      {/* Clock */}
      <div className="text-8xl font-semibold text-slate-700 dark:text-slate-400">
        <div className="text-center text-4xl font-semibold text-slate-700 dark:text-slate-400">
          {stateFlow[flowState].label}
        </div>
        {makeClock(time)}
      </div>

      {/* Button Group */}
      <div className="flex gap-2">
        
        {
          !clockRunning ? (
            <>
              <Button onClick={() => startTimer()}>Start Timer</Button>
              <Button variant="outline" onClick={() => resetTimer()}>Reset</Button>
            </>
          ) : (
            <>
              {flowState === "pomodoro" ? <Button variant="default" onClick={() => signalDistracted()}>I got distracted</Button> : null }
              <Button variant="outline" onClick={() => stopTimer()}>Stop Timer</Button>
            </>
          )
        }
      </div>
      <div className="flex flex-col items-center justify-center">
        
        {distracted && distracted.length > 0 ? (
          <>
          <p>Your attention span is approximately <b>{Math.round(avgDiff).toString()} seconds</b></p>
          <div className="flex flex-row space-x-2 max-w-screen-sm p-2 overflow-x-auto">
            {distracted.map((t, i) => {
              return (
                <div key={`${t}-${i}`} className="p-2 border rounded-md border-gray-500">
                  {makeClock(t)}
                </div>
                )
            })}
          </div>
          </>
          
        ) : null}
        
      </div>
      

    </div>
  )
}
