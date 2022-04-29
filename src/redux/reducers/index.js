import { combineReducers } from 'redux';

//import reducers
import { rendering } from './rendering.reducer';
import { sendName } from './name.reducer';
import { getQuizData } from './getQuiz.reducer';
import { score } from './score.reducer';

const rootReducer = combineReducers({
    rendering,
    sendName,
    getQuizData,
    score
})

export default rootReducer;