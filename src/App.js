import { useEffect, useReducer } from 'react';
import Header from './components/Header'
import Main from './components/Main';
import Loader from './components/Loader'
import Error from './components/Error'
import StartScreen from './components/StartScreen';
import Question from './components/Question';

const initialState = {
  questions : [],
  //loading,error,ready,active,finished
  status : 'loading',
  index : 0,
  answer : null,
  points : 0
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
          status:'active'
        }
        case 'newAnswer':
          const question = state.question.at(state.index)
        return {
          ...state,
          answer :action.payload,
          points : action.payload === question.correctOption ? state.points + question.points : state.points
        }
    default:
      throw new Error('unknown')
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const numQuestions = state.questions.length;

  useEffect(() => {
    fetch('http://localhost:8000/questions').then((res) => res.json()).then((data) => dispatch({type:'dataRecived',payload:data}))
    .catch((err) => dispatch({type:'error'}))
  }, [])

  console.log(state.questions[state.index]);

  return (
    <div className="App app">
      <Header />
      <Main>
        {state.status === 'loading' && <Loader /> }
        {state.status === 'error' && <Error /> }
        {state.status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} /> }
        {state.status === 'active' && <Question answer={state.answer} dispatch={dispatch} currentQuestion={state.questions[state.index]} />}
      </Main>
    </div> 
  );
}

export default App;
