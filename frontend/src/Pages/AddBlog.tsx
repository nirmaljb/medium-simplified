import BlogComp from "@/components/ui/BlogComp";
import { fetchWithRetry } from "@/lib/utils";
import { ActionFunctionArgs, redirect } from "react-router-dom";
import { z } from "zod";

export default function AddBlog({ title, body, method }) {
    return <BlogComp method={method} title={title ? title: ''} body={body ? body : ''} />
}

export async function action({ request,  params }: ActionFunctionArgs) {
    const data = await request.formData()
    const { id: unique_id } = params;

    console.log(unique_id);

    const payload = {
        header: data.get('title') as string,
        body: data.get('body') as string
    };

    const baseSchema = z.object({
        header: z.string().min(8),
        body: z.string().min(10)
    })

    const extendedSchema = baseSchema.extend({
        unique_id: z.string().uuid().optional()
    })
    
    if(unique_id) {
        Object.assign(payload, { unique_id })
    }


    const zod_response = extendedSchema.safeParse(payload);
    if(!zod_response.success) {
        return zod_response.error;
    }
    
    const response = await fetchWithRetry('http://localhost:8787/api/v1/blog', {
        method: request.method || 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include'
    })

    if(!response.ok) {
        return response;
    }

    return redirect('/')
} 