import React from 'react'
import Button from '../Button'

const WorkhorseWordsListItem = ({ word }: { word: string }) => {
  return (
    <li key={word} className='flex gap-4 items-center mb-2'>
        <span className='w-16'>{word}</span>
        <Button label="Add" />
        <Button label="Remove" />
    </li>
  )
}

export default WorkhorseWordsListItem
