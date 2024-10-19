import { SignupComp } from "@/components/ui/SignupComp";
import { useActionData } from "react-router-dom";
import { z } from "zod";

export function Signup() {
    const formSchema = z.object({
        email: z.string().email(),
        username: z.string().min(5),
        password: z.string().min(8)
    })

    const errorData = useActionData()
    console.log(errorData)

    return <SignupComp schema={formSchema} error={errorData}/>
}