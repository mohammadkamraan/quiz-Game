import { NAME } from "../types/name.types";


export const sendName = (state = '', action) => {
    if (action.type === NAME) {
        return action.name;
    } else {
        return state;
    }
}