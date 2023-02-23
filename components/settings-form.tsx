import React, { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Checkbox } from "@/components/ui/checkbox"


const allSettings = [
  {
    "label" : "Pomodoro",
    "name" : "pomodoro",
    "description": "Define how long the pomodoro focus session should be",
    "caption" : "How long should a pomodoro focus time be?",
    "type" : "number",
  },
  {
    "label" : "Short Break",
    "name" : "shortBreak",
    "description": "Define how long a short break should be",
    "caption" : "How long should a short break be?",
    "type" : "number",
  },
  {
    "label" : "Long Break",
    "name" : "longBreak",
    "description": "Define how long a long break should be. This break happens after n sessions",
    "caption" : "How long should a long break be?",
    "type" : "number",
  },
  {
    "label" : "Sessions Before Long Break",
    "name" : "sessionsBeforeLongBreak",
    "description": "Define the number of pomodoro sessions before a long break",
    "caption" : "How long should a long break be?",
    "type" : "number",
    "default": 3
  },
  {
    "label" : "Auto Start Timer",
    "name" : "autoStartTimer",
    "description": "Define if the clock automatically start",
    "caption" : "How long should a long break be?",
    "type" : "checkbox",
    "default": true
  }
]

const SettingsForm = ({settings, setSettings}) => {
  
  const [autoStartTimerValue, setAutoStartTimerValue] = useState<boolean | 'indeterminate'>(false)

  const onSubmitHandler = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault()

    const newSettings = {
      "pomodoro": parseInt(e.target["pomodoro"].value),
      "shortBreak": parseInt(e.target["shortBreak"].value),
      "longBreak": parseInt(e.target["longBreak"].value),
      "sessionsBeforeLongBreak": parseInt(e.target["sessionsBeforeLongBreak"].value),
      "autoStartTimer": autoStartTimerValue,
    }
    setSettings(newSettings)

  }, [settings, allSettings, autoStartTimerValue])
  
  return (
    <form onSubmit={(e) => onSubmitHandler(e)} className="flex flex-col space-y-4">
      
        <Label className="min-w-[230px]" htmlFor="pomodoro">Pomodoro Duration</Label>
        <Input required type="number" id="pomodoro" name="pomodoro" step="1" defaultValue={settings["pomodoro"]} />
        
        <Label className="min-w-[230px]" htmlFor="shortBreak">Short Break Duration</Label>
        <Input required type="number" id="shortBreak" name="shortBreak" step="1" defaultValue={settings["shortBreak"]} />
        
        <Label className="min-w-[230px]" htmlFor="longBreak">Long Break Duration</Label>
        <Input required type="number" id="longBreak" name="longBreak" step="1" defaultValue={settings["longBreak"]} />

        <Label className="min-w-[230px]" htmlFor="sessionsBeforeLongBreak">Pomodoro Sessions Before Long Break</Label>
        <Input required type="number" id="sessionsBeforeLongBreak" name="sessionsBeforeLongBreak" step="1" defaultValue={settings["sessionsBeforeLongBreak"]} />
        
        <div className='flex flex-row space-x-2'>
          <Checkbox id="autoStartTimer" checked={autoStartTimerValue} onCheckedChange={setAutoStartTimerValue}/>
          <Label className="min-w-[230px]" htmlFor="autoStartTimer">Auto Start Duration</Label>
        </div>
        
      
        <div className='pt-6'>
          <Button type="submit">Save changes</Button>
        </div>
        
      
    </form>
  )
}

export default SettingsForm