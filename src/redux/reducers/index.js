import { combineReducers } from 'redux';

//import reducers
import { rendering } from './rendering.reducer';
import { sendName } from './name.reducer';
import { getQuizData } from './getQuiz.reducer';

const rootReducer = combineReducers({
    rendering,
    sendName,
    getQuizData
})

export default rootReducer;