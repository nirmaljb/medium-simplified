import { json, redirect } from "react-router-dom";
import { fetchWithRetry } from "./utils";
export const action = async () => {
    try {
        await fetchWithRetry('http://localhost:8787/api/v1/logout', {
            method: 'POST',
        })
        return redirect("/");
    }catch(err) {
        return json({message: 'Something went wrong during logout', error: err});
    }
}