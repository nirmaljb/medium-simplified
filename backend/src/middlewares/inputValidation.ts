import { Context, Next } from "hono";
import { createMiddleware } from "hono/factory";
import { z } from "zod"

export const inputValidation = createMiddleware(async (c: Context, next: Next) => {
    const Schema = z.object({
        header: z.string(),
        body: z.string()
    })

    const { header, body } = await c.req.json()
    const { success } = Schema.safeParse({header, body})

    if(!success) return c.json({msg: 'invalid inputs'}, 400)

    await next()
})