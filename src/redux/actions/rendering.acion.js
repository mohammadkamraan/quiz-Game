import { RENDERING_COMPONENT } from '../types/rendering.types';

// use component name for conditional rendering
export const rendering = component => ({
    type: RENDERING_COMPONENT,
    component
})