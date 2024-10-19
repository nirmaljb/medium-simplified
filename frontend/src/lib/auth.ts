import { redirect } from "react-router-dom";

export function getAuthToken() {
    const token = localStorage.getItem('token')
    if(!token) return null;

    return token;
}

export function checkAuthToken() {
    const storedToken = getAuthToken()
    if(!storedToken) {
        console.log('not logged in, loggin in')
        return redirect('/')
    }

    return null;
}