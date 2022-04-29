import { SEND_SCORE } from '../types/score.type';

export const sendScore = score => ({
    type: SEND_SCORE,
    score
})