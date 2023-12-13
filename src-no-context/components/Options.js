import React from 'react'

const Options = ({question,dispatch,answer}) => {
  return (
    <div className='options'>
        {question.options.map((option,index) => (
            <button 
                onClick={() => dispatch({type:'newAnswer',payload:index})} 
                className={`btn btn-option ${index === answer  ? 'answer' : ''} ${answer !== null ? index === question.correctOption ? 'correct' : 'wrong' : ''}`}
                key={index}
                disabled={answer !== null}>{option}
            </button>
        ))}
    </div>
  )
}

export default Options