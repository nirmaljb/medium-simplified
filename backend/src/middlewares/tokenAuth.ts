import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

export const tokenAuth = createMiddleware(async (c: Context, next: Next) => {
    const token = getCookie(c, 'token');
    console.log(token);
    if(!token) return c.json({ msg: 'invalid token' }, 401)
    
    try {
        const decodedPayload = verify(token, c.env.JWT_SECRET)
        c.set('user', decodedPayload)
        await next()
    }
    catch(error) {
        return c.json({msg: 'internal server error', error: error}, 404)
    }
})