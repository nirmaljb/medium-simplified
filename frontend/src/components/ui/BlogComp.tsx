import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form } from "react-router-dom"

export default function BlogComp() {
    return (
        <div className="max-w-screen-md mx-auto space-y-9 mt-10">
            <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl font-serif">write that story</h1>
            <Form method="POST" className="grid w-full max-w-screen-md items-center gap-1.5 space-y-5">
                <div>
                    <Label htmlFor="title">Your Title</Label>
                    <Input name="title" placeholder="Title" />
                </div>
                <div>
                    <Label htmlFor="body">Your Message</Label>
                    <Textarea name="body" placeholder="Write your body here"/>
                </div>
                <div>
                    <Button type="submit">Publish</Button>
                </div>
            </Form>
        </div>
    )
}
