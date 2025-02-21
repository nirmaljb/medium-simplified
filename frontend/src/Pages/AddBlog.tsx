import BlogComp from "@/components/ui/BlogComp";
import { BlogObject } from "@/lib/interfaces";
import { fetchWithRetry, submitEvent } from "@/lib/utils";
import { ActionFunctionArgs, redirect, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const AddBlog: React.FC =() => {
    return <BlogComp method="POST" title="" body="" heading="write that story" submitHandler={submitHandler}/>
}

export default AddBlog;

const submitHandler = async (obj) => {
    const values = obj[0];
    const path = obj[1];

    console.log(obj);

    const promise =  () => new Promise((resolve) => setTimeout(() => resolve({ name: 'blog' }), 1000));

    await submitEvent(values, 'POST', path)

    toast.promise(promise, {
        loading: 'Loading...',
        success: (data: { name: string }) => {
          return `Your ${data.name} has been added`;
        },
        error: 'Error',
    });
    await new Promise((resolve) => setTimeout(resolve, 2000)).then(() => redirect("/"));
    // return redirect("/")
}

export async function action({ request }: ActionFunctionArgs) {
    const data = await request.formData();

    const payload = {
        header: data.get('title') as string,
        body: data.get('body') as string
    };

    const Schema = z.object({
        header: z.string().min(8),
        body: z.string().min(10)
    })

    const zod_response = Schema.safeParse(payload);
    if(!zod_response.success) {
        return zod_response.error;
    }

    const promise =  () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Blog' }), 1000));
    
    const response = await fetchWithRetry('http://localhost:8787/api/v1/blog', {
        method: request.method || 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include'
    })

    toast.promise(promise, {
        loading: 'Loading...',
        success: (data: { name: string}) => {
          return `New ${data.name} has been added`;
        },
        error: 'Error',
    });

    if(!response.ok) {
        return response;
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    return redirect('/')
} 