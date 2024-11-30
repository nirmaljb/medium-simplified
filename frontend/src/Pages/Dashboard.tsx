import { UserCard } from "@/components/ui/UserCard"
import { Blog } from "@/lib/interfaces"

export default function Dashboard({ blogs }: { blogs: Blog[] }) {
    return (
        <div className="flex">
            {blogs.map((blog: Blog) => (
                <UserCard id={blog.unique_id} key={blog.unique_id} header={blog.header} body={blog.body} author={blog.user_id} />
            ))}
        </div>
    )
}
 

