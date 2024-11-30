import { clsx, type ClassValue } from "clsx"
import { json } from "react-router-dom";
import { twMerge } from "tailwind-merge"
import { jwtDecode } from "jwt-decode";

interface Decoded {
    sub: string;
    username: string;
    iat: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchWithRetry(url: string, options = {}, retries=3, backoff=300) {
    try {
        const response = await fetch(url, { ...options, timeout: 10000 })
        if(!response.ok) {
            throw json({ msg: 'Could not fetch data' }, { status: 500 })
        }
        return response;
    }
    catch(error) {
        if(retries > 0) {
            await delay(backoff);
            return fetchWithRetry(url, options, retries - 1, backoff * 2)
        }else {
            throw error;
        }
    }
};

export function readToken(token: string) {
    const payload = jwtDecode(token);
    return payload;
}

export function getAvatarCharacters(token: string) {
    const decoded: Decoded = readToken(token)
    return decoded.username.substring(0,3).toUpperCase();
}
