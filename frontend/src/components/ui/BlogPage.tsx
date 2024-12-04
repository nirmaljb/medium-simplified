import { Button } from "@/components/ui/button";
import DeleteAlert from "./delete-alert";
import { json, Link, redirect, useNavigate } from "react-router-dom";
import { fetchWithRetry } from "@/lib/utils";
import { Blog } from "@/lib/interfaces";
import { getToken } from "@/lib/auth";
import { toast } from "sonner";

interface BlogProp {
    blog: Blog
}


const BlogPage: React.FC<BlogProp> = ({ blog }) => {
    const navigate = useNavigate();
    
    async function deleteHandler() {
        const timeOutPromise  = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Blog' }), 2000))
        
        const response = await fetchWithRetry('http://localhost:8787/api/v1/delete', {
            method: 'DELETE',
            body: JSON.stringify({
                unique_id: blog.unique_id,
            }),
            credentials: 'include'
        });

        toast.promise(timeOutPromise, {
            loading: 'Loading...',
            success: (data: { name: string }) => {
                return `${data.name} has been deleted`
            },
            error: 'Something went wrong, try refreshing the page'
        })

        if(!response.ok) {
            throw json({msg: 'Something went wrong', error: response}, 400)
        }
        
        new Promise((resolve) => setTimeout(resolve, 2500)).then(() => {
            navigate('/');
        });
    }

    const token: string | null = getToken();
    return (
        <div className="flex flex-col space-y-4 mt-10 max-w-screen-md m-auto">
            {token && token ? 
            (<div className="space-x-5 justify-end">
                    <Button variant="outline"><Link to={`/blog/edit/${blog.unique_id}`}>Edit Page</Link></Button>
                    <DeleteAlert handler={deleteHandler} />
                </div>
            ): <div></div>}
            <div>
                <h1 className="scroll-m-20 text-6xl font-extrabold tracking-tight mb-10">{blog.header.substring(0, 101)}</h1>
            </div>
            <p className="text-lg font-serif text-justify leading-normal">{blog.body}</p>
            <p className="font-bold text-lg">-{blog.user.username}</p>
        </div>
    )
}

export default BlogPage;