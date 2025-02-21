import { clsx, type ClassValue } from "clsx"
import { json, redirect } from "react-router-dom";
import { twMerge } from "tailwind-merge"
import { jwtDecode } from "jwt-decode";
import { Blog } from "./interfaces";

interface Decoded {
    sub: string;
    username: string;
    iat: string;
    avatarId: string
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
        if(error.status === 500) {
            throw error;
        }else if(retries > 0) {
            console.log(error)
            await delay(backoff);
            return fetchWithRetry(url, options, retries - 1, backoff * 2)
        }else {
            throw error;
        }
    }
};

export async function submitEvent(values: Blog, method: string, path?: string) {
    const response = await fetchWithRetry('http://localhost:8787/api/v1/blog', {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        credentials: 'include'
    });

    if(!response.ok) {
        throw json({ message: 'Could not submit your data properly, retry' }, { status: 500 })
    }

    return redirect("/")

    // return response;
}

export function readToken(token: string) {
    const payload = jwtDecode(token);
    return payload;
}

export function getAvatarIcon(token: string) {
    const { avatarId } = readToken(token);
    return avatarId
}

export function getAvatarCharacters(token: string) {
    const decoded: Decoded = readToken(token);
    return decoded.username.substring(0,3).toUpperCase();
}
