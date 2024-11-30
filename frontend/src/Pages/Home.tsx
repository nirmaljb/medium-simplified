import ErrorState from "@/components/ui/error-state";
import { HomePage } from "./HomePage";
import { fetchWithRetry } from "@/lib/utils";
import { useLoaderData, json, defer } from "react-router-dom";
import { Blog } from "@/lib/interfaces";

interface LoaderData {
    blogs: Blog[]
}

export default function Home() {
    const { blogs } = useLoaderData() as LoaderData;
    return <HomePage blogs={blogs} errorState={<ErrorState />}/>
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
        blogs: await loadBlogs()
    })
}