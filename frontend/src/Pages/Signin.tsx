import { SigninComp } from "@/components/ui/SigninComp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useActionData } from "react-router-dom";
import { formSchema } from "@/lib/interfaces";
import { z } from "zod";

export const Signin: React.FC = () => {
  const error: { msg: string, error?: object } = useActionData();
  console.log(error)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  })

  return (
    <SigninComp form={form} error={error} />
  )
}
