import UserCard from "@/components/ui/UserCard";
import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";


interface Blog {
    body: string,
    created_at: string,
    header: string,
    serial_id: number,
    unique_id: string,
    updated_at: string,
    user_id: string,
}

interface LoaderData {
    blogs: Blog[]
}

function Home() {
    const { blogs } = useLoaderData() as LoaderData;
    console.log(blogs)
    return (
      <div className="max-w-screen-md space-y-9 mx-auto p-4">
        <h1 className="text-5xl font-extrabold font-serif">My Blogs</h1>
        {/* <div className="grid md:grid-cols-2 gap-5"> */}
        <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={blogs}>
            {(loadedBlogs) => loadedBlogs.map((blog: Blog) => (
                <UserCard id={blog.unique_id} key={blog.unique_id} header={blog.header} body={blog.body} author={blog.user_id}/>
            ))}
        </Await>
        </Suspense>
        {/* </div> */}
      </div>
    )
}

async function loadBlogs() {
    const response = await fetch('http://localhost:8787/api/v1/blogs');

    if(!response.ok) {
        throw json({ msg: 'Could not fetch data' }, { status: 500 })
    }else {
        const resData = await response.json()
        return resData.blogs;
    }

} 

export async function loader() {
    return defer({
        blogs: loadBlogs()
    })
}

export default Home