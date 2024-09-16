import { Hono } from 'hono'
import { sign, verify } from 'hono/jwt'
import { z } from "zod"

type Bindings = {
  JWT_SECRET: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/api/v1/blogs', (c) => {
  return c.json({
    blogs: []
  })
})


app.post('/api/v1/signup', async (c) => {
  const { username, email, password } = await c.req.json()

  const object = z.object({
    username: z.string().min(5),
    email: z.string().email(),
    password: z.string()
  })

  const response = object.safeParse({username, email, password})
  if(!response.success) return c.json({msg: 'Invalid inputs', error: response.error})

  const payload = {
    username,
    email
  }

  const token = await sign(payload, c.env.JWT_SECRET)
  return c.json({secret: token})

})

app.post('/api/v1/signin', async (c) => {
  const { token } = await c.req.json()

  try {
    const response = await verify(token, c.env.JWT_SECRET)
    
    return c.json({
      response: response
    })
  }catch(error) {
    return c.json({msg: 'token was tampered with, login again'})
  }
})

app.post('/api/v1/blog', async (c) => {
  const { header, body } = await c.req.json()

  //store in database under user


  //returning data
  return c.json({header, body})
})

app.put('/api/v1/blog', async (c) => {
  const { blog_id, header, body } = await c.req.json()

  //search the blog in db, and replace it

  return c.json({
    blog_id,
    header,
    body
  })
})

export default app
