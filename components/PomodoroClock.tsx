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


const sortEpochs = (epochs: number[]): number[] => {
  return epochs.sort((n1,n2) => n1 - n2);
}

const averageDifference = (sortedEpochs: number[]): number => {

  const num_epochs = sortedEpochs.length

  for (let i = 0; i < num_epochs-1; i++) {
    const diff = sortedEpochs[i+1] - sortedEpochs[i]

  }

  return 0
}


export default function PomodoroClock({settings}) {

  // Timer
  const [time, setTime] = useState(parseInt(settings[defaultState])*60)
  const [timerRunning, setTimerRunning] = useState(false)
  const [flowState, setFlowState] = useState<FlowStateType>(defaultState)
  const [numPomosBeforeLongBreak, setNumPomosBeforeLongBreak] = useState(defaultPomoIntervals)
  
  const [distracted, setDistracted] = useState([])
  const [avgDiff, setAvgDiff] = useState<number>(0.0)

  const resetTimer = () => {
    setTimerRunning(false)
    setTime(parseInt(settings[flowState])*60)
    setDistracted([])
    setAvgDiff(0)
  }
  const stopTimer = () => {
    setTimerRunning(false)
  }
  const startTimer = () => {
    setTimerRunning(true)
  }

  const newFlowState = (state) => {
    setFlowState(state)
    setTime(parseInt(settings[state])*60)
  }

  const signalDistracted = () => {
    
    // const newDistracted = [...distracted, time]
    const distractedLen = distracted.length

    console.log("First: ", time, avgDiff,  distractedLen)

    if (distractedLen > 1) {
      
      console.log("distracted_len: ", distractedLen)
      console.log(distracted[distractedLen-1], time)
      
      const diff = distracted[distractedLen-1] - time
      console.log("diff: ", diff)
      
      const cumulativeAvg = diff - (avgDiff) / (distractedLen + 1)
      console.log("cumulativeAvg: ", cumulativeAvg)
      
      setAvgDiff(cumulativeAvg)

    }

    const newDistracted = [...distracted, time]
    setDistracted(newDistracted)

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
          !timerRunning ? (
            <>
              <Button onClick={() => startTimer()}>Start Timer</Button>
              <Button variant="outline" onClick={() => resetTimer()}>Reset</Button>
            </>
          ) : (
            <>
              {flowState === "pomodoro" ? <Button variant="default" onClick={() => signalDistracted()}>Distracted</Button> : null }
              <Button variant="outline" onClick={() => stopTimer()}>Stop Timer</Button>
            </>
          )
        }
      </div>
      <div className="flex flex-col items-center justify-center">
        <p>Your attention span is approximately <b>{Math.round(avgDiff).toString()} seconds</b></p>
        {distracted && distracted.length > 0 ? <div className="flex flex-row space-x-2 max-w-screen-sm p-2 overflow-x-auto">
          {distracted.map((t, i) => {
            return (
              <div key={`${t}-${i}`} className="p-2 border rounded-md border-gray-500">
                {makeClock(t)}
              </div>
              )
          })}
          
        </div> : null}
        
      </div>
      

    </div>
  )
}
