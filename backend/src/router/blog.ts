import { Pool } from "@neondatabase/serverless"
import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "@prisma/client"
import { Context, Hono } from "hono"
import { tokenAuth } from "../middlewares/tokenAuth"

const connectionString = 'postgresql://neondb_owner:EVQfPC9iO0AY@ep-silent-fire-a1h4veav.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'
const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)
const prisma = new PrismaClient({ adapter })

const blogRouter = new Hono();

blogRouter.get('/blogs', async (c: Context) => {
	try {    
		const db_response = await prisma.post.findMany({
            include: {
                user: {
                    select: { username: true }
                }
            }
        });

        console.log(db_response);
	
		return c.json({
			blogs: db_response
		})
	}catch(error) {
		return c.json({ msg: 'internal server error', error }, 500)
	}
})

blogRouter.get('/blogs/:id', async (c: Context) => {
	const id = c.req.param('id')
	console.log(id)

	try {
		const db_response = await prisma.post.findUnique({
			where: {
				unique_id: id,
			},
            include: {
                user: {
                    select: { username: true }
                }
            }
		})

		if(!db_response) return c.json({ msg: 'No blog with such id found' }, 404)
	
		return c.json( db_response )
	
	}catch(error) {
		return c.json({ msg: 'Internal Server Error', error: error }, 404)
	}
})

blogRouter.post('/blog', async (c: Context) => {
	const { header, body } = await c.req.json<{ header: string, body: string }>()
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
	return c.json({ response: db_response })
})

blogRouter.patch('/blog', async (c: Context) => {
	const { unique_id, header, body } = await c.req.json()

	console.log('payload: ', { unique_id, header, body });
	
	const jwt_payload = await c.get("user")
	const user_id = jwt_payload.sub

	console.log("user id: ", user_id)

	//search the blog in db, and replace it
	try {
		const db_response = await prisma.post.update({
			where: {
				user_id: user_id,
				unique_id: unique_id
			},
			data: {
				header: header,
				body: body,
				updated_at: new Date()
			}
		})

		console.log(db_response)
		
		return c.json({
			unique_id,
			user_id,
			header,
			body
		})
	}catch(error) {
		return c.json({msg: 'internal server error', error: 'error'}, 404)
	}
})

blogRouter.delete('/delete', tokenAuth, async (c: Context) => {
	const { unique_id } = await c.req.json();
	console.log('unique_id ' + unique_id);
	try {
		const db_response = await prisma.post.delete({
			where: {
				unique_id: unique_id
			}
		})

		console.log(db_response)

		return c.json({ msg: 'Post deleted successfully' })
	}catch(err) {
		return c.json({ msg: 'Something went wrong', error: err }, { status: 409 })
	}
})

export default blogRouter;