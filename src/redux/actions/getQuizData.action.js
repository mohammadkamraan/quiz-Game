import {
    GET_QUIZ_DATA_REQUEST,
    GET_QUIZ_DATA_SUCCESS,
    GET_QUIZ_DATA_FAILD
} from '../types/getQuizData.types';

import { baseUrl } from '../../api/baseUrl';
import { shuffle } from '../../shuffle';

export const getQuizData = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_QUIZ_DATA_REQUEST,
            loading: true
        })
        const { data } = await baseUrl.get('api.php?amount=10&type=multiple')

        let newData = data.results.map(items => {
            return {
                ...items,
                answers: shuffle([...items.incorrect_answers, items.correct_answer])
            }
        })
        dispatch({
            type: GET_QUIZ_DATA_SUCCESS,
            loading: false,
            data: newData
        })
    } catch (err) {
        dispatch({
            type: GET_QUIZ_DATA_FAILD,
            loading: false
        })
    }
}