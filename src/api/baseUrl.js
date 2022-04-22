import axios from 'axios';

export const baseUrl = axios.create({
    baseURL: 'https://opentdb.com/',
    timeout: 10000
})