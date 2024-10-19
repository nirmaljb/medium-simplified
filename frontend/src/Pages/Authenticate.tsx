import { useSearchParams, json, LoaderFunctionArgs, redirect } from "react-router-dom"
import { Signin } from "./Signin"
import { Signup } from "./Signup"
import { z } from "zod"
import React from "react"

type AuthMode = 'signin' | 'signup'


export function Authenticate(): React.ReactElement {
    const [searchedParams] = useSearchParams()
    const status: AuthMode = (searchedParams.get('mode') as AuthMode) || 'signin'

    if(status !== 'signin' && status !== 'signup') {
        throw json({ message: 'unsupported mode.' }, { status: 422 })
    }

    return (status === 'signin') ? <Signin /> : <Signup /> 
}

interface AuthData {
    username: string,
    email?: string,
    password: string,
}

export async function action({ request }: LoaderFunctionArgs) {
    const data = await request.formData();
    const searchedParams = new URL(request.url).searchParams
    const mode: AuthMode = (searchedParams.get('mode') as AuthMode) || 'signin';

    const authData: AuthData = {
        username: data.get('username') as string,
        email: data.get('email') as string | '',
        password: data.get('password') as string
    }
    console.log(JSON.stringify(authData))

    const baseZodObject = {
        username: z.string().min(5),
        password: z.string().min(8),
    };

    const zodObject = mode === 'signup'
    ? z.object({...baseZodObject, email: z.string().email()})
    : z.object({...baseZodObject})

    const inputStatus = zodObject.safeParse(authData)
    console.log(inputStatus)

    if(!inputStatus.success) {
        return inputStatus.error;
    }
    
    const response = await fetch(`http://localhost:8787/api/v1/${mode}`, {
        method: request.method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
    })

    if(!response.ok) {
        return response;
    }

    if(response.status === 500) {
        return json({ msg: 'Internal Server Error' }, { status: 500 })
    }
    
    const res = await response.json();
    const token = res.token;
    localStorage.setItem('token', token)

    return redirect("/")
} 