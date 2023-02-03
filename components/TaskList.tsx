import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const CustomList = () => {

  // Input
  const [tasks, setTasks] = useState([
    "Go for a run",
    "Do laundry",
    "Eat Lunch"
  ])

  const onSubmitHandler = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      newTask: {value: string}
    }

    setTasks(prevList => ([...prevList, formElements.newTask.value]))
  }

  return (
    <div className="flex flex-col gap-2 border p-2 w-full">
          
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <div className="flex flex-row justify-center items-center space-x-3 p-2">
            <Label htmlFor="newTask">New Task</Label>
            <Input type="text" id="newTask" placeholder="New Task Description"/>
            <Button type="submit">Add</Button>
        </div>
      </form>
    
      {tasks && tasks.length > 0 && tasks.map((task, index) => (
        <div key={`task-${index}`} className="flex flex-row justify-between items-center space-x-3 p-2 border rounded">
          <Button variant="outline">[ ]</Button>
          <p className="flex-1">{task}</p>
          <Button variant="outline">X</Button>
        </div>
      ))}
    </div>
  )
}

export default CustomList