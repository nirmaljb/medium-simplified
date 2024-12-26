
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { NavLink, Form as RouterForm } from "react-router-dom";
import { z } from "zod";

export function SignupComp({ schema, error }) {

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  })

  return (
    <div className="container shadow-2xl mx-auto sm:max-w-[450px] border rounded-lg p-8 justify-items-center">
      <h1 className="text-5xl font-bold mt-2 mb-7">Signup</h1>
      <Form {...form}>
      {error && error.issues && error.issues.map((err) => (
          <Alert variant="destructive" className="my-3">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {err.message}
            </AlertDescription>
          </Alert>
        ))}
        {error && error.msg && 
          <Alert variant="destructive" className="my-3">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error.msg}
            </AlertDescription>
          </Alert>
        }
        <RouterForm method="POST" className="space-y-4 w-full">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="kaizen" {...field} required minLength={5} />
                </FormControl>
                  <FormDescription>
                  This is your public display name.
                  </FormDescription>  
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="kaizen@gmail.com" {...field} required type="email"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="*******" {...field} required type="password" minLength={8} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          <Button type="submit" className="w-full shadow-2xl">Submit</Button>
          <p className="text-sm text-muted-foreground">Have an account 🤗? <NavLink to='?mode=signin'  className="underline text-black">Signin</NavLink></p>
        </RouterForm>
      </Form>
    </div>
  )
}
