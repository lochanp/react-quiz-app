import React from 'react';
import { useQuizContext } from '../context/QuizContext';

const ProgressBar = () => {
  const { index, numQuestions, points, sumPoints, answer } = useQuizContext();
  return (
    <header className='progress'>
      <progress max={numQuestions} value={index + Number(answer !== null)}></progress>
      <p>
        Question<strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{sumPoints}
      </p>
    </header>
  );
};

export default ProgressBar;
