import React, { useEffect } from 'react';
import { useQuizContext } from '../context/QuizContext';

const Timer = () => {
  const { dispatch, secondsRemaining } = useQuizContext();
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);

  return (
    <div className='timer'>
      {mins < 10 && 0}
      {mins}:{secs < 10 && 0}
      {secs}
    </div>
  );
};

export default Timer;
