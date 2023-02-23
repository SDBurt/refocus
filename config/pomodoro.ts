export type StateFlowType = {
  label: string
  description: string
  next: string
  defaultTime: number
  color: string
}

export const stateFlow: { [key: string]: StateFlowType } = {
  pomodoro: {
    label: "Pomodoro",
    description: "Focus session",
    next: "shortBreak",
    defaultTime: 1,
    color: "green",
  },
  shortBreak: {
    label: "Short Break",
    description:
      "Take a short break, typically 5-10 minutes, which promotes assimilation",
    next: "pomodoro",
    defaultTime: 1,
    color: "blue",
  },
  longBreak: {
    label: "Long Break",
    description: "take a longer break.",
    next: "pomodoro",
    defaultTime: 1,
    color: "red",
  },
}

export const pomodoroDescription = `
A time management technique where you break work into intervals.
`

export const defaultPomoIntervals = 3
export const defaultTime = 5
export const defaultState = "pomodoro"

export default stateFlow
