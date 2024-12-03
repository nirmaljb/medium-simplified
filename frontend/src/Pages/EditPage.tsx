import { ActionFunctionArgs, json, redirect, useRouteLoaderData } from "react-router-dom";
import BlogComp from "@/components/ui/BlogComp";
import { fetchWithRetry } from "@/lib/utils";
import { z } from "zod";

const EditPage: React.FC = () => {
    const { blog: BlogContent }: any = useRouteLoaderData('blog-detail');

    return <BlogComp id={BlogContent.unique_id} method="PATCH" title={BlogContent.header} body={BlogContent.body} />
};

export default EditPage;

export async function action({ request, params }: ActionFunctionArgs) {
    const data = await request.formData();
    const { id } =  params;

    const payload = {
        unique_id: id,
        header: data.get('title') as string,
        body: data.get('body') as string
    };

    const Schema = z.object({
        header: z.string().min(8),
        body: z.string().min(10),
        unique_id: z.string().uuid(),
    });

    const zod_response = Schema.safeParse(payload);
    if(!zod_response.success) {
        return zod_response.error;
    };

    try {
        const response = await fetchWithRetry('http://localhost:8787/api/v1/blog', {
            method: request.method || 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            credentials: 'include',
        })

        if(!response.ok) {
            return response;
        }
        return redirect("/");
    }catch(error) {
        return json({msg: 'Something went wrong, check console', error: error});
    }


} 