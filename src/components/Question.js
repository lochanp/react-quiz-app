import React from 'react'
import Options from './Options'

const Question = ({currentQuestion,dispatch,answer}) => {
  return (
    <div className=''>
        <h4>{currentQuestion.question}</h4>
        <Options dispatch={dispatch} answer={answer} question={currentQuestion} />
    </div>
  )
}

export default Question