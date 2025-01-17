import { useRouteError } from "react-router-dom"
import MainNavigation from "./MainNavigation";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface ErrorType {
    data: {
        message: string,
    },
    internal: boolean,
    status: number,
    statusText: string
}

export default function Error() {
    const error = useRouteError() as ErrorType;
    console.log(error);

    let message = "We've encountered an error";

    // if (error.status === 500) {
    //     message = error.data.message;
    // }

    if (error.status === 404) {
        message = 'Could not find resource or page.';
    }

    if (error.status === 401) {
        message = 'User is not authorized.'
    }
    return (
        <>
            <MainNavigation />
            <Alert variant="destructive" className="max-w-screen-sm md:max-w-screen-md mx-auto min-h-fit">
                <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertTitle className="text-xl">Error</AlertTitle>
                    <AlertDescription>
                        {message}
                </AlertDescription>
            </Alert>
        </>
    )
}