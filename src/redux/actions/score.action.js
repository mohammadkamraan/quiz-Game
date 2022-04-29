import { USER_SCORE } from '../types/score.type';

export const setScore = score => ({
    type: USER_SCORE,
    score
})