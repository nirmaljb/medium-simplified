import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import { Input } from "@/components/ui/input"
import { NavLink, Form as RouterForm, useNavigation } from "react-router-dom";

export const SigninComp: React.FC = ({ form, error }) => {
    const navigation = useNavigation()
    const isLoading = navigation.state === 'loading'
    return (
        <div className="container shadow-2xl mx-auto sm:max-w-[450px] border rounded-lg p-8 justify-items-center">
            <h1 className="text-5xl font-bold mt-2 mb-7">Login</h1>
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
                <RouterForm method="POST" className="space-y-5 w-full">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                        <Input placeholder="kaizen" {...field} required minLength={5}/>
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
                        <Input placeholder="*******" {...field} type="password" required minLength={8} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                    />
                    <div className="mt8">
                        <Button type="submit" className="w-full shadow-lg" disabled={isLoading}>{isLoading ? 'Submitting...' : 'Submit'}</Button>
                    </div>
                    <h1 className="text-sm text-muted-foreground">No account 🙄? <NavLink to='?mode=signup' className="underline text-black">Signup</NavLink></h1>
                </RouterForm>
            </Form>
    </div>
    )
}