import { json } from "react-router-dom";
export const logout = async () => {
    try {
        const response = await fetch('http://localhost:8787/api/v1/auth/logout', {
            method: 'POST',
            credentials: 'include'
        })

        localStorage.removeItem('username')
        localStorage.removeItem('avatar')

        return response;
    }catch(err) {
        return json({message: 'Something went wrong during logout', error: err});
    }
}