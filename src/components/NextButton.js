import React from 'react';
import { useQuizContext } from '../context/QuizContext';

const NextButton = () => {
  const { dispatch, answer, index, numQuestions } = useQuizContext();
  console.log(numQuestions);
  return (
    <>
      {!answer == null || index < numQuestions - 1 ? (
        <button className='btn btn-ui' onClick={() => dispatch({ type: 'nextQuestion' })}>
          Next
        </button>
      ) : null}
      {index === numQuestions - 1 && (
        <button className='btn btn-ui' onClick={() => dispatch({ type: 'finish' })}>
          Finish
        </button>
      )}
    </>
  );
};

export default NextButton;
