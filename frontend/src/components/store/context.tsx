import { createContext } from "react";

export const UserContext = createContext({
    username: '',
    isLoggedIn: false
});