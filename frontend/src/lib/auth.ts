import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

export const getToken = () => {
    const token = Cookies.get('token');
    if(!token) return null;

    return token;
};

export const checkToken = () => {
    const isTokenAvailable = getToken();
    if(!isTokenAvailable) {
        console.log('user not logged in')
        return redirect('/');
    }
    return null;
}



