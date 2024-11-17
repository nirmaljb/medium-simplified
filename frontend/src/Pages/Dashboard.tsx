import UserCard from "@/components/ui/UserCard"
interface Blog {
    unique_id: string,
    header: string,
    body: string,
    author: string,
}

export default function Dashboard({ blogs }: { blogs: Blog[] }) {
    return (
        <div className="flex">
            {blogs.map((blog: Blog) => (
                <UserCard id={blog.unique_id} key={blog.unique_id} header={blog.header} body={blog.body} author={blog.author} />
            ))}
        </div>
    )
}
 

