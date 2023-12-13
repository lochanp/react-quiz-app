import React from 'react';
import Options from './Options';
import { useQuizContext } from '../context/QuizContext';

const Question = () => {
  const { questions, dispatch, answer, index } = useQuizContext();
  const currentQuestion = questions.at(index);
  return (
    <div className=''>
      <h4>{currentQuestion.question}</h4>
      <Options question={currentQuestion} />
    </div>
  );
};

export default Question;
