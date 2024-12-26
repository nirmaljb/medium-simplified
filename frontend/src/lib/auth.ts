// import Cookies from "js-cookie";

export const getToken = () => {
    const token = localStorage.getItem('username');
    // const token = Cookies.get('token');
    if(!token) return null;

    return token;
};

export const loader = async() => {
    const isTokenAvailable = getToken();
    console.log(isTokenAvailable);
    if(!isTokenAvailable) {
        console.log('user not logged in')
        // return false;
    }
    // return true;
}



