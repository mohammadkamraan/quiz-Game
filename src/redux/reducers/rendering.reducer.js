import { RENDERING_COMPONENT } from '../types/rendering.types';

const initialState = 'start';

//send component name to components for conditional rendering
export const rendering = (state = initialState, action) => {
    if (action.type === RENDERING_COMPONENT) {
        return action.component
    } else {
        return state
    }
}