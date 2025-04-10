import axios from "axios";
const BASE_URL = 'http://localhost:3500'

//const BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log(BASE_URL);

export  const axios2= axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true //such as cookies, HTTP authentication headers, or client-side SSL certificates
});