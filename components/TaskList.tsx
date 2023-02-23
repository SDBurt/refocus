import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'


const CustomList = () => {

  // Input
  const [tasks, setTasks] = useState([
    "Go for a run",
    "Do laundry",
    "Eat Lunch",
  ])
  const [checked, setChecked] = useState<(boolean | 'indeterminate')[]>([
    false,
    false,
    false
  ])

  const onSubmitHandler = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      newTask: {value: string}
    }

    setTasks((prevList) => ([...prevList, formElements.newTask.value]))
  }

  const checkboxClickedHandler = (index) => {
    const newChecked = [...checked]
    newChecked[index] = newChecked[index] === 'indeterminate' ? false : 'indeterminate'
    setChecked(newChecked)
  }

  return (
    <div className="flex w-full flex-col gap-2 border p-2">
          
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <div className="flex flex-row items-center justify-center space-x-3 p-2">
            <Label htmlFor="newTask">New Task</Label>
            <Input type="text" id="newTask" placeholder="New Task Description"/>
            <Button type="submit">Add</Button>
        </div>
      </form>
    
      {tasks && tasks.length > 0 && tasks.map((task, index) => (
        <div key={`task-${index}`} className="flex flex-row items-center justify-between space-x-3 rounded border p-2">
  
          <Checkbox
            name={`task-${index}`}
            checked={checked[index]}
            onCheckedChange={(checked: boolean | 'indeterminate') => checkboxClickedHandler(index)}
          />
          <Label className="flex-1" htmlFor={`task-${index}`}>
            {!checked[index] ? task : <s>{task}</s>}
          </Label>
          <Button variant="outline">X</Button>
        </div>
      ))}
    </div>
  )
}

export default CustomList