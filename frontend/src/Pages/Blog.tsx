import BlogPage from "@/components/ui/BlogPage"
import { useParams } from "react-router-dom"

export default function Blog() {
    const { id } = useParams()

    return <BlogPage />
}

export async function loader({ request, params }) {
    const searchedParams = new URL(request.url).searchParams;
    const paramsId = searchedParams.get('id')

    const response = await fetch(`http://localhost:8787/api/v1/blog/${paramsId}`)
    return response;

}