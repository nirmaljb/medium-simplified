import { useRouteError } from "react-router-dom"
import MainNavigation from "./MainNavigation";

interface ErrorType {
    msg: string,
    status: number
}

export default function Error() {
    const error: ErrorType = useRouteError()
    console.log(error);
    let title = 'An error occurred!';
    let message = 'Something went wrong!';

    if (error.status === 500) {
        message = error.data.message;
    }

    if (error.status === 404) {
        title = 'Not found!';
        message = 'Could not find resource or page.';
    }
    return (
        <>
            <MainNavigation />
            <h1>Error page</h1>
        </>
    )
}