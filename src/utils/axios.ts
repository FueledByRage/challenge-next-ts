import axios from "axios";

export const apiFetch = axios.create({
    baseURL: 'https://glorious-slacks-foal.cyclic.app'
    //baseURL: 'http://localhost:8000'
})

export default apiFetch;