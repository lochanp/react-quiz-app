import React from 'react';
import { useQuizContext } from '../context/QuizContext';

const FinishedScreen = () => {
  const { points, sumPoints, highScore, dispatch } = useQuizContext();
  const percentage = Math.round((points / sumPoints) * 100);
  return (
    <>
      <p className='result'>
        <span>
          {percentage === 100
            ? '🥇'
            : percentage >= 80 && percentage < 100
            ? '🥳'
            : percentage >= 50 && percentage < 80
            ? '🙂'
            : percentage > 0 && percentage < 50
            ? '😶‍🌫️'
            : percentage === 0
            ? '🤦🏻‍♀️'
            : '🤨'}
        </span>{' '}
        You scored <strong>{points}</strong> out of {sumPoints} ({percentage}%)
      </p>
      <p className='highscore'>High score : {highScore} points</p>
      <button className='btn btn-ui' onClick={() => dispatch({ type: 'restart' })}>
        Resart Quiz
      </button>
    </>
  );
};

export default FinishedScreen;
