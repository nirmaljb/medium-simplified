import ErrorState from "@/components/ui/errorState";
import HomePage from "@/components/ui/HomePage";
import { fetchWithRetry } from "@/lib/utils";
import { useLoaderData, json, defer } from "react-router-dom";

interface LoaderData {
    blogs: []
}

function Home() {
    const { blogs } = useLoaderData() as LoaderData;
    console.log(blogs)

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
        blogs: loadBlogs()
    })
}

export default Home