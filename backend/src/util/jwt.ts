import { sign } from "hono/jwt";

export async function createToken(payload: {sub: string, username: string, email:string}, pass: string): Promise<string> {
    const token = await sign(payload, pass)
    return token
}