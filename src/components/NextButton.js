import React from 'react'

const NextButton = ({dispatch,answer,index,numQuestion}) => {
  return (
    <>
        {!answer == null || index < numQuestion - 1 ? <button className='btn btn-ui' onClick={() => dispatch({type:'nextQuestion'})}>Next</button> : null}
        {index === numQuestion -1 && <button className='btn btn-ui' onClick={() => dispatch({type:'finish'})}>Finish</button> }
    </>
  )
     
}

export default NextButton