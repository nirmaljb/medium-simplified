import { json, defer, Await, LoaderFunctionArgs, useRouteLoaderData } from "react-router-dom"
import BlogPage from "@/components/ui/BlogPage"
import { Suspense } from "react";
import { fetchWithRetry } from "@/lib/utils";
import LoadingState from "@/components/ui/loading-state";

interface Blog {
    unique_id: string,
    header: string,
    body: string,
    author: string,
}

export default function Blog() {
    const { blog } = useRouteLoaderData('blog-detail');
    
    return (
        <Suspense fallback={<LoadingState />}>
            <Await resolve={blog}>
                {(loadedBlog: Blog) => <BlogPage blog={loadedBlog} />}
            </Await>
        </Suspense>
    )
}

async function loadBlog(id: string) {
    try {
        const response = await fetchWithRetry(`http://localhost:8787/api/v1/blogs/${id}`)
        
        if(!response.ok) {
            throw json({ message: 'Blog failed to generate, refresh the page again' }, { status: 500 })
        }
        
        const resData = await response.json()
    
        return resData;
    }
    catch(error) {
        throw json({ message: 'Blog failed to generate, refresh the page again', error: error}, { status: 500 })
    }
}

export async function loader({ params }: LoaderFunctionArgs) {
    const paramId: string = params.id || '';

    return defer({
        blog: await loadBlog(paramId)
    })
}