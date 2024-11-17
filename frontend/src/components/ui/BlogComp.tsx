import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, useNavigation } from "react-router-dom"

interface BlogArgs {
    title: string,
    body: string
}

export default function BlogComp({ title, body }: BlogArgs) {
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';
    return (
        <div className="max-w-screen-md mx-auto space-y-9 mt-10">
            <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl font-serif">write that story</h1>
            <Form method="POST" className="grid w-full max-w-screen-md items-center gap-1.5 space-y-5">
                <div>
                    <Label htmlFor="title">Your Heading</Label>
                    <Input name="title" placeholder="Title" defaultValue={title}/>
                </div>
                <div>
                    <Label htmlFor="body">Your Message</Label>
                    <Textarea name="body" placeholder="Write your body here" defaultValue={body}/>
                </div>
                <div>
                    <Button type="submit">{isLoading? 'Loading...' : 'Publish'}</Button>
                </div>
            </Form>
        </div>
    )
}
