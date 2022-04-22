import { NAME } from '../types/name.types';

export const sendName = name => ({
    type: NAME,
    name
})