import UserCard from "@/components/ui/UserCard"
import axios from "axios"
import { useEffect, useState } from "react"

interface Blog {
    unique_id: string,
    header: string,
    body: string,
    author: string,
}

export default function Dashboard() {
    const [blogs, setBlogs] = useState([])
 
    useEffect(() => {
        async function Api() {
            const response = await axios.get('http://localhost:8787/api/v1/blogs')
            console.log(response.data.blogs)
            setBlogs(response.data.blogs)
        }
        Api()
    }, [])
        
    return (
        <div className="flex">
            {blogs.map((blog: Blog) => (
                <UserCard id={blog.unique_id} key={blog.unique_id} header={blog.header} body={blog.body} author={blog.author} />
            ))}
        </div>
    )
}
 

