import { Button } from "@/components/ui/button";
import DeleteAlert from "./delete-alert";
import { json, Link, useNavigate } from "react-router-dom";
import { fetchWithRetry } from "@/lib/utils";
import { Blog } from "@/lib/interfaces";
import { getToken } from "@/lib/auth";
import { toast } from "sonner";
import { FaArrowLeft } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



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
        
        new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
            navigate('/');
        });
    }

    const token: string | null = getToken();
    return (
        <div className="flex flex-col space-y-4 mt-20 max-w-screen-md m-auto">
            {token && token ? 
            (<div className="flex items-center justify-between">
                <div>
                    <Link to={`/`}>
                        <div className="border py-2 px-3 rounded-xl">
                            <FaArrowLeft />
                        </div>
                    </Link>
                </div>
                <div className="space-x-6">
                    <Button variant="outline">
                        <Link to={`/blog/edit/${blog.unique_id}`}>Edit</Link>
                        <CiEdit />
                    </Button>
                    <DeleteAlert handler={deleteHandler} />
                </div>
                </div>
            ): <div></div>}
            <div className="pt-10">
                <h1 className="scroll-m-20 text-6xl font-extrabold tracking-tight mb-10">{blog.header.substring(0, 101)}</h1>
            </div>
            <p className="text-lg font-serif text-justify leading-loose">{blog.body}</p>
            <div className="flex space-x-2 items-center pt-20">
                <Avatar>
                <AvatarImage src="https://avatar.iran.liara.run/public/boy" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-lg">Written by <span className="font-bold text-xl">{blog.user.username}</span></p>
            </div>
        </div>
    )
}

export default BlogPage;