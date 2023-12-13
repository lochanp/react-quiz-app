import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import ProgressBar from './components/ProgressBar';
import FinishedScreen from './components/FinishedScreen';
import Timer from './components/Timer';
import { QuizProvider, useQuizContext } from './context/QuizContext';

function App() {
  const { status } = useQuizContext();

  return (
    <div className='App app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen />}
        {status === 'active' && (
          <>
            <ProgressBar />
            <Question />
            <footer>
              <Timer />
              <NextButton />
            </footer>
          </>
        )}
        {status === 'finished' && <FinishedScreen />}
      </Main>
    </div>
  );
}

export default App;
