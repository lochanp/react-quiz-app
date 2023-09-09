import React from 'react'

const ProgressBar = ({index,numQuestions,points,sumPoints,answer}) => {
  return (
    <header className='progress'>
        <progress max={numQuestions} value={index + Number(answer !== null)}></progress>
        <p>Question<strong>{index+1}</strong>/{numQuestions}</p>
        <p><strong>{points}</strong>/{sumPoints}</p>
    </header>
  )
}

export default ProgressBar