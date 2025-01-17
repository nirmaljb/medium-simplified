import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

export const UserAuth = createMiddleware(async (c: Context, next: Next) => {
    const token = getCookie(c, 'token');
    if(!token) {
        return c.json({ message: 'User not authorized'}, 401);
    }

    next();
})