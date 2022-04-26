import {
    GET_QUIZ_DATA_REQUEST,
    GET_QUIZ_DATA_SUCCESS,
    GET_QUIZ_DATA_FAILD
} from '../types/getQuizData.types';


const initialState = {
    loading: null,
    data: [],
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
                data: action.data
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