import { createMiddleware } from 'hono/factory'
import { MiddlewareHandler, Context, Next } from 'hono'
import { z } from "zod"

export const signupAuth: MiddlewareHandler = createMiddleware(async (c: Context, next: Next) => {
    const object = z.object({
        username: z.string().min(5),
        email: z.string().email(),
        password: z.string()
    })
    
    const response = object.safeParse(await c.req.json())
    if(!response.success) return c.json({msg: 'Invalid inputs', error: response.error}, 409)
        
    await next()
})