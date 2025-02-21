import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useNavigate, useNavigation, useParams } from "react-router-dom"
import { BlogProps } from "@/lib/interfaces"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'

const formSchema = z.object({
    header: z.string().min(10, {
        message: 'Heading must be at least 10 characters.'
    }).max(50, {
        message: 'Username can at most be 50 characters.'
    }),
    body: z.string().min(10, {
        message: 'Body must be at least 10 characters.'
    })
})

const BlogComp: React.FC<BlogProps> = ({ title, body, method, heading, submitHandler }) => {
    const navigation = useNavigation();
    const navigate = useNavigate();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            header: "",
            body: "",
        }
    });

    const isSubmitting = navigation.state === 'submitting';
    const { id }= useParams();

    let path = '';
    if(method === 'PATCH') {
        path = `/blog/edit/${id}`
    }else {
        path = '/create'
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values, path)
        submitHandler([values, path])
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-screen-md mx-auto space-y-5 mt-10">
                <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl font-serif">{heading}</h1>
                <FormField
                    control={form.control}
                    name="header"
                    render={({ field }) => (
                        <FormItem className="grid w-full max-w-screen-md items-center gap-1.5 pt-5 pb-1">
                            <FormLabel>Your Heading</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Heading" defaultValue={title ? title: ''} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="body"
                    render={({ field }) => (
                        <FormItem className="grid pb-1 gap-1.5">
                            <FormLabel>Your Message</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder="Write your body here" defaultValue={body ? body : ''}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex space-x-5 items-center">
                    <Button type="submit" disabled={isSubmitting}>{isSubmitting? 'Submitting...' : 'Publish'}</Button>
                    <Button variant="secondary" type="reset" onClick={() => navigate('/')}>Cancel</Button>
                </div>
            </form>
        </Form>
    )
}

export default BlogComp;
