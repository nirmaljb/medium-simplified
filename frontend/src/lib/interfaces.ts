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
    method: "POST" | "GET" | "PUT" | "PATCH",
    submitHandler: () => Promise<void>,
}

// export interface User {

// }

export interface Blog {
    header: string,
    body: string
}

export interface BlogObject {
    values: Blog,
    path: string,
}

export const formSchemaBlog = z.object({
    header: z.string().min(10, {
        message: 'Heading must be at least 10 characters.'
    }).max(50, {
        message: 'Username can at most be 50 characters.'
    }),
    body: z.string().min(10, {
        message: 'Body must be at least 10 characters.'
    })
});