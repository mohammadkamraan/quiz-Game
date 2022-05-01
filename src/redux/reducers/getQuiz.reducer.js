import {
    GET_QUIZ_DATA_REQUEST,
    GET_QUIZ_DATA_SUCCESS,
    GET_QUIZ_DATA_FAILD
} from '../types/getQuizData.types';


const initialState = {
    loading: null,
    questions: [],
    hasError: null
}

export const getQuizData = (state = initialState, action) => {
    switch (action.type) {
        case GET_QUIZ_DATA_REQUEST:
            return {
                ...state,
                loading: action.loading
            }
        case GET_QUIZ_DATA_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                questions: action.questions
            }
        case GET_QUIZ_DATA_FAILD:
            return {
                ...state,
                loading: action.loading,
                hasError: action.hasError
            }
        default:
            return state
    }
}

export const currentQuestionIndex = (state = 0, action) => {
    const type = 'CURRENT_QUESTION_INDEX'

    if (type === action.type) {
        return action.currentQuestionIndex;
    }

    return state
}

export const answerIsCorrect = (state = null, action) => {
    const type = 'ANSWER_IS_CORRECT';

    if (type === action.type) {
        return action.answerIsCorrect;
    }

    return state;
}
