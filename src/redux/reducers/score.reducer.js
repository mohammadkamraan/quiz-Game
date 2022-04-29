import { USER_SCORE } from '../types/score.type';

export const score = (state = 0, action) => {
    const type = action.type;
    if (type === USER_SCORE) {
        return action.score;
    } else {
        return state;
    }
}