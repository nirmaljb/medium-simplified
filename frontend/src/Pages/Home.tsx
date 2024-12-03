import ErrorState from "@/components/ui/error-state";
import { HomePage } from "./HomePage";
import { fetchWithRetry } from "@/lib/utils";
import { useLoaderData, json, defer, Await } from "react-router-dom";
import { Blog } from "@/lib/interfaces";
import LoadingComp from "@/components/ui/loading-state";
import { Suspense } from "react";

interface LoaderData {
    blogs: Blog[]
}

export default function Home() {
    const { blogs } = useLoaderData() as LoaderData;
    return (
        <Suspense fallback={<LoadingComp />}>
            <Await resolve={blogs}>
            {(loadedBlogs: Blog[]) => <HomePage blogs={loadedBlogs} errorState={<ErrorState />}/>}
            </Await>
           
        </Suspense>
    )
}

async function loadBlogs() {
    try {
        const response = await fetchWithRetry('http://localhost:8787/api/v1/blogs');
        const resData = await response.json()
        return resData.blogs;
    }
    catch(error) {
        console.log(error)
        throw json({ message: 'Could not fetch data' }, { status: 500 })
    }
}

export async function loader() {
    return defer({
        blogs: loadBlogs()
    })
}