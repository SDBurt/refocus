import Head from "next/head"

import { siteConfig } from "@/config/site"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"


const defaultTime = 5

const makeClock = (time) => {
  return (
    `
      ${
        Math.floor(time / 60) < 10
          ? `0${Math.floor(time / 60)}`
          : `${Math.floor(time / 60)}`
      }:${time % 60 < 10 ? `0${time % 60}` : time % 60}
    `
    )
}

export default function PlaygroundPage() {

  // Timer
  const [time, setTime] = useState(defaultTime)
  const [timerRunning, setTimerRunning] = useState(false)


  const resetTimer = () => {
    setTimerRunning(false)
    setTime(defaultTime)
  }
  const stopTimer = () => {
    setTimerRunning(false)
  }
  const startTimer = () => {
    setTimerRunning(true)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerRunning) {
        if (time > 0) {
          setTime(time - 1);
        } else if (time === 0) {
          // TODO: Send notification to user.
          clearInterval(interval);
          setTimerRunning(false)
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, time]);

  return (
    <>
      {/* Clock */}
      <div className="font-semibold text-8xl text-slate-700 dark:text-slate-400 sm:text-8xl">
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
    </>
  )
}
