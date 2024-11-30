import { SignupComp } from "@/components/ui/SignupComp";
import { useActionData } from "react-router-dom";
import { formSchema } from "@/lib/interfaces";

export function Signup() {
    const errorData = useActionData()
    console.log(errorData)

    return <SignupComp schema={formSchema} error={errorData}/>
}