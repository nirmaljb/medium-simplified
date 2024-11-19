import { Button } from "@/components/ui/button";
import DeleteAlert from "./delete-alert";
import { json, Link, redirect, useNavigate } from "react-router-dom";
import { fetchWithRetry } from "@/lib/utils";

interface Blog {
    unique_id: string,
    header: string, 
    body: string, 
    author: string
}

export default function BlogPage({ blog }: { blog: Blog }) {
    const navigate = useNavigate();
    async function deleteHandler() {
        await fetchWithRetry('http://localhost:8787/api/v1/blogs/delete', {
            method: 'DELETE',
            body: JSON.stringify({
                unique_id: blog.unique_id,
            }),
            credentials: 'include'
        }).then((response) => {
            if(!response.ok) {
                throw json({msg: 'Something went wrong', error: response}, 400)
            }
        })
        
        return redirect('/');
        // return navigate('/');
    }
    return (
        <div className="flex flex-col space-y-4 mt-10 max-w-screen-md m-auto">
            <div className="space-x-5 justify-end">
                <Button variant="outline"><Link to={`/blog/edit/${blog.unique_id}`}>Edit Page</Link></Button>
                <DeleteAlert handler={deleteHandler} />
            </div>
            <div>
                <h1 className="scroll-m-20 text-6xl font-extrabold tracking-tight mb-10">{blog.header.substring(0, 101)}</h1>
            </div>
            <p className="text-lg font-serif text-justify leading-normal">{blog.body}</p>
            <p>{blog.author}</p>
        </div>
    )
}