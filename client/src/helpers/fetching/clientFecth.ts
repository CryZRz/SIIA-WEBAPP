import axios from "axios";

export const clientFetch = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Accept": "application/json",
        "X-Request-With": "XMLHttpRequest"
    },
    withCredentials: true
})

const token = localStorage.getItem("AuthToken")

export const clientAuthFetch = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Accept": "application/json",
        "X-Request-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
    },
    withCredentials: true
})