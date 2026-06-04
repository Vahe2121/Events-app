import axios, {type AxiosError} from "axios";
import {getAuthToken} from "@/shared/api/auth-token.ts";

const baseURL = import.meta.env.VITE_API_URL

if (!baseURL) {
    throw new Error('Missing environment variable environment variable');
}

export const http = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
})

http.interceptors.request.use((config) => {
    const token = getAuthToken()

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})

export type ApiValidationError = {
    message: string;
    errors: Array<{ path: string, message: string }>;
}

export function isAxiosError<T = unknown>(e: unknown): e is AxiosError<T> {
    return axios.isAxiosError(e)
}