import { UserCard } from "@/components/ui/UserCard"
import { Blog } from "@/lib/interfaces"

export default function Dashboard({ blogs }: { blogs: Blog[] }) {
    return (
        <div className="flex">
            {blogs.map((blog: Blog) => (
                <UserCard key={blog.unique_id} blog={blog} />
            ))}
        </div>
    )
}
 

