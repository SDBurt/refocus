import Head from "next/head"

import { siteConfig } from "@/config/site"
import { Layout } from "@/components/layout"


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import PomodoroClock from "@/components/PomodoroClock"
import SettingsForm from "@/components/settings-form"
import { useEffect, useState } from "react"

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

  return (
    <Layout>
      <Head>
        <title>{siteConfig.name}</title>
        <meta
          name="description"
          content={siteConfig.description}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="container items-center gap-6 pt-6 pb-8 md:py-10 max-w-[980px]">
        <div className="flex flex-col gap-2 items-center space-y-8 justify-center">
          
          
        <Tabs defaultValue="pomodoro" className="w-[680px]">
        <TabsList>
          <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pomodoro">
          <div className="flex flex-col space-y-8">
            <PomodoroClock settings={settings}/>
            {/* <TaskList /> */}
          </div>


        </TabsContent>
        
        <TabsContent value="settings">
          <SettingsForm settings={settings} setSettings={setSettings}/>
        </TabsContent>
      </Tabs>

        </div>
      </section>
    </Layout>
  )
}
