import { UserCard } from "@/components/ui/UserCard"
import { Blog } from "@/lib/interfaces"

interface Props {
    blogs: Blog[];
    errorState: JSX.Element
}
export const HomePage: React.FC<Props> = ({ blogs, errorState }) => {
    return (
        <div className="space-y-8 max-w-screen-md mt-5 m-auto">
            {blogs.map((blog: Blog) => (
                <UserCard key={blog.unique_id} blog={blog} />
            ))}
            {errorState}
        </div>
    )
}