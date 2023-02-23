import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'

const CustomCheckbox = ({id, value}) => {
  return (
    <Checkbox id={id} value={value}/>
  )
}

export default CustomCheckbox