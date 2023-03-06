import Head from "next/head"

import { siteConfig } from "@/config/site"
import { Layout } from "@/components/layout"


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import PomodoroClock from "@/components/PomodoroClock"
import SettingsForm from "@/components/settings-form"
import { useState } from "react"
import useCountdown from "@/hooks/useCountdown"

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

export default function PomodoroPage() {

  const [settings, setSettings] = useState(
    {
      "pomodoro": "25", 
      "shortBreak": "5", 
      "longBreak": "25",  
      "sessionsBeforeLongBreak": "3",  
      "autoStartTimer": false
    }
  )

  const {time, resetTimer, stopTimer, startTimer, timerRunning} = useCountdown(parseInt(settings["pomodoro"]))

  return (
    <Layout>
      <Head>
        <title>{`${siteConfig.name} - ${makeClock(time)}`}</title>
        <meta
          name="description"
          content={siteConfig.description}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="container max-w-[980px] items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="flex flex-col items-center justify-center gap-2 space-y-8">
          
          <PomodoroClock
            time={time}
            clockRunning={timerRunning}
            settings={settings}
            startClock={startTimer}
            stopClock={stopTimer}
            resetClock={resetTimer}
          />

        </div>
      </section>
    </Layout>
  )
}
