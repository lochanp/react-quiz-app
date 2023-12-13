import { createContext, useContext, useEffect, useReducer } from 'react';

const QuizContext = createContext();

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataRecived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready'
      };
    case 'dataFailed':
      return {
        ...state,
        staus: 'error'
      };
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * 30
      };
    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points
      };
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null
      };
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highScore: state.points > state.highScore ? state.points : state.highScore
      };
    case 'restart':
      return {
        ...state,
        status: 'ready',
        index: 0,
        answer: null,
        points: 0,
        highScore: 0,
        secondsRemaining: null
      };
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status
      };
    default:
      throw new Error('unknown');
  }
}

function QuizProvider({ children }) {
  const [{ questions, status, index, answer, points, secondsRemaining }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const sumPoints = questions?.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/lochanp/json-quiz-data/main/questions.json')
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataRecived', payload: data.questions }))
      .catch(err => dispatch({ type: 'error' }));
  }, []);

  return (
    <QuizContext.Provider
      value={{ numQuestions, sumPoints, questions, status, index, answer, points, secondsRemaining, dispatch }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuizContext() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('Quiz context used outside the QuizProvider scope');
  }
  return context;
}

export { QuizProvider, useQuizContext };
