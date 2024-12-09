import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, useNavigate, useNavigation, useParams } from "react-router-dom"
import { BlogProps } from "@/lib/interfaces"

const BlogComp: React.FC<BlogProps> = ({ title, body, method, heading }) => {
    const navigation = useNavigation();
    const navigate = useNavigate();

    const isSubmitting = navigation.state === 'submitting';
    const { id }= useParams();


    let path = '';
    if(method === 'PATCH') {
        path = `/blog/edit/${id}`
    }else {
        path = '/create'
    }

    return (
        <div className="max-w-screen-md mx-auto space-y-9 mt-10">
            <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl font-serif">{heading}</h1>
            <Form method={method} action={path} className="grid w-full max-w-screen-md items-center gap-1.5 space-y-5">
                <div>
                    <Label htmlFor="title">Your Heading</Label>
                    <Input name="title" placeholder="Title" defaultValue={title ? title: ''}/>
                </div>
                <div>
                    <Label htmlFor="body">Your Message</Label>
                    <Textarea name="body" placeholder="Write your body here" defaultValue={body ? body : ''}/>
                </div>
                <div className="flex space-x-5 items-center">
                    <Button type="submit" disabled={isSubmitting}>{isSubmitting? 'Submitting...' : 'Publish'}</Button>
                    <Button variant="secondary" type="reset" onClick={() => navigate('/')}>Cancel</Button>
                </div>
            </Form>
        </div>
    )
}

export default BlogComp;
