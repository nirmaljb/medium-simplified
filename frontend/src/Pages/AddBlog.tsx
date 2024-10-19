import BlogComp from "@/components/ui/BlogComp";
import { getAuthToken } from "@/lib/auth";
import { ActionFunctionArgs, redirect } from "react-router-dom";
import { z } from "zod";

export default function AddBlog() {
    return <BlogComp />
}

export async function action({ request }: ActionFunctionArgs) {
    const data = await request.formData()
    
    const payload = {
        header: data.get('title') as string,
        body: data.get('body') as string
    }

    console.log(payload)

    const token: string | null = getAuthToken() || null
    
    const schema = z.object({
        header: z.string().min(10),
        body: z.string()
    })

    const zod_response = schema.safeParse(payload);
    console.log(zod_response)
    if(!zod_response.success) {
        return zod_response.error;
    }

    
    const response = await fetch('http://localhost:8787/api/v1/blog', {
        method: request.method || 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    })

    if(!response.ok) {
        return response;
    }

    return redirect('/')
} 