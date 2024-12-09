import { z } from "zod";
export interface Blog {
    serial_id: number;
    header: string;
    body: string;
    created_at: string;
    updated_at: string;
    user_id: string;
    unique_id: string;
    user: {
        username: string
    }
}

export interface BlogProps {
    title: string,
    body: string,
    heading: string,
    method: "POST" | "GET" | "PUT" | "PATCH"
}

export const formSchema = z.object({
    email: z.string().email(),
    username: z.string().min(5),
    password: z.string().min(8)
});

export interface User {

}