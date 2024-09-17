import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool } from '@neondatabase/serverless'
import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import bcryptjs from "bcryptjs";
import { signupAuth } from './middlewares/signupAuth'
import { signinAuth } from './middlewares/signinAuth'
import { tokenAuth } from './middlewares/tokenAuth'
import { inputValidation } from './middlewares/inputValidation'


type Bindings = {
  JWT_SECRET: string,
  DATABASE_URL: string
}


const app = new Hono<{ Bindings: Bindings }>()

const connectionString = `postgresql://neondb_owner:EVQfPC9iO0AY@ep-silent-fire-a1h4veav.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`
const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)
const prisma = new PrismaClient({ adapter })

app.use('/api/v1/blog/*', tokenAuth, inputValidation)

app.get('/api/v1/blogs', async (c) => {
  
  const db_response = await prisma.post.findMany({})

  return c.json({
    blogs: db_response
  })
})


app.post('/api/v1/signup', signupAuth, async (c) => {
  const { username, email, password } = await c.req.json()
  
  const hashed_password = await bcryptjs.hash(password, 10)

  const db_response = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: hashed_password
    }
  })

  console.log(db_response)
  return c.json({
    msg: 'user created'
  })

})

app.post('/api/v1/signin', signinAuth, async (c) => {
  const { username, password } = await c.req.json()
  const db_response = await prisma.user.findUnique({
    where: {
      username: username
    }
  })

  console.log(db_response)

  if(!db_response) {
    return c.json({msg: 'No user found'}, 404)
  }

  const compared = await bcryptjs.compare(password, db_response.password)
  if(!compared) return c.json({msg: "Password doesn't match"}, 401)
  
  const payload = {
    sub: db_response.unique_id,
    username: db_response.username,
    email: db_response.email
  }
  const access_token = await sign(payload, c.env.JWT_SECRET)

  return c.json({token: access_token})
})

app.post('/api/v1/blog', async (c) => {
  const { header, body } = await c.req.json()
  const jwt_payload = await c.get("user")
  const user_id = jwt_payload.sub

  //store in database under user
  const db_response = await prisma.post.create({
    data: {
      header: header,
      body: body,
      user_id: user_id
    }
  })


  //returning data
  return c.json({response: db_response})
})

app.put('/api/v1/blog', async (c) => {
  const { unique_id, header, body } = await c.req.json()
  const jwt_payload = await c.get("user")
  const user_id = jwt_payload.sub

  //search the blog in db, and replace it
  try {
    const db_response = await prisma.post.update({
      where: {
        user_id: user_id,
        unique_id: unique_id,
      },
      data: {
        header: header,
        body: body
      }
    })
    console.log(db_response)
    
    return c.json({
      unique_id,
      header,
      body
    })
  }catch(error) {
    return c.json({msg: 'internal server error', error: 'error'}, 404)
  }
})

export default app
