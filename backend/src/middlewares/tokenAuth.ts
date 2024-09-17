import { Context, Next } from "hono";
import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

export const tokenAuth = createMiddleware(async (c: Context, next: Next) => {
    const authentication = c.req.header('authorization')
    const token = authentication && authentication.split(' ')[1]

    if(!token) return c.json({msg: 'invalid token'}, 401)
    
    try {
        const decodedPayload = verify(token, c.env.JWT_SECRET)
        c.set('user', decodedPayload)
        await next()
    }
    catch(error) {
        return c.json({msg: 'internal server error', error: error}, 404)
    }
})