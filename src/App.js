import { useEffect, useReducer } from 'react';
import Header from './components/Header'
import Main from './components/Main';
import Loader from './components/Loader'
import Error from './components/Error'
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import ProgressBar from './components/ProgressBar';
import FinishedScreen from './components/FinishedScreen';
import Timer from './components/Timer';

const initialState = {
  questions : [],
  //loading,error,ready,active,finished
  status : 'loading',
  index : 0,
  answer : null,
  points : 0,
  highScore : 0,
  secondsRemaining : null
};

function reducer(state,action) {
  switch (action.type) {
    case 'dataRecived':
      return {
        ...state,
        questions :action.payload,
        status:'ready'
      }
    case 'dataFailed':
      return {
        ...state,
        staus:'error'
      }
      case 'start':
        return {
          ...state,
          status:'active',
          secondsRemaining : state.questions.length * 30
        }
        case 'newAnswer':
          const question = state.questions.at(state.index)
        return {
          ...state,
          answer :action.payload,
          points : action.payload === question.correctOption ? state.points + question.points : state.points
        }
        case 'nextQuestion':
          return {
            ...state,
            index: state.index + 1,
            answer : null
          }
        case 'finish':
          return {
            ...state,
            status: 'finished',
            highScore : state.points > state.highScore ? state.points : state.highScore
          }
        case 'restart':
          return {
            ...state,
            status : 'ready',
            index : 0,
            answer : null,
            points : 0,
            highScore : 0,
            secondsRemaining : null
          }
        case 'tick':
          return {
            ...state,
            secondsRemaining :state.secondsRemaining - 1,
            status : state.secondsRemaining === 0 ? 'finished' : state.status
          }
    default:
      throw new Error('unknown')
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const numQuestions = state?.questions?.length;
  const sumPoints = state?.questions?.reduce((prev,cur) => prev + cur.points, 0)

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/lochanp/json-quiz-data/main/questions.json').then((res) => res.json()).then((data) => dispatch({type:'dataRecived',payload:data.questions}))
    .catch((err) => dispatch({type:'error'}))
  }, [])

  return (
    <div className="App app">
      <Header />
      <Main>
        {state.status === 'loading' && <Loader /> }
        {state.status === 'error' && <Error /> }
        {state.status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} /> }
        {state.status === 'active' && 
          <>
            <ProgressBar numQuestions={numQuestions} index={state.index} points={state.points} sumPoints={sumPoints} answer={state.answer} />
            <Question answer={state.answer} dispatch={dispatch} currentQuestion={state.questions[state.index]} />
            <footer>
              <Timer secondsRemaining={state.secondsRemaining} dispatch={dispatch} />
              <NextButton dispatch={dispatch} answer={state.answer} numQuestion={numQuestions} index={state.index} />
            </footer>
          </>}
        {state.status === 'finished' && <FinishedScreen dispatch={dispatch} highScore={state.highScore} sumPoints={sumPoints} points={state.points} />}
      </Main>
    </div> 
  );
}

export default App;
