import { Context, Hono } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";
import { signupAuth } from "../middlewares/signupAuth"
import { createToken } from "../util/jwt";
import { PrismaClient } from "@prisma/client";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcryptjs from "bcryptjs"
import { signinAuth } from "../middlewares/signinAuth";

type Bindings = {
	JWT_SECRET: string,
    DATABASE_URL: string
}

const authRouter = new Hono<{ Bindings: Bindings }>(); 

const connectionString = 'postgresql://neondb_owner:EVQfPC9iO0AY@ep-silent-fire-a1h4veav.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'
const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)
const prisma = new PrismaClient({ adapter })

authRouter.post('/logout', async (c: Context) => {
	try {
		const returnedCookie = deleteCookie(c, 'token');
		return c.json({message: 'User logged out', cookie: returnedCookie}, 200)
	}catch(err) {
		return c.json({ msg: 'Something went wrong', error: err }, 400);
	}
})


authRouter.post('/signup', signupAuth, async (c: Context) => {
	const { username, email, password } = await c.req.json()
	
	const hashed_password: string = await bcryptjs.hash(password, 10)

	try {
		const db_response = await prisma.user.create({
			data: {
				username: username,
				email: email,
				password: hashed_password
			}
		})

		const payload = {
			sub: db_response.unique_id,
			username: db_response.username,
			email: db_response.email
		}

		const generatedToken: string = await createToken(payload, c.env.JWT_SECRET);
		setCookie(c, 'token', generatedToken);

		return c.json({
			msg: 'user created'
		})
	}	
	catch(error) {
		return c.json({
			msg: 'Error occured while signup',
			error: error
		}, 409)
	}

})

authRouter.post('/signin', signinAuth, async (c: Context) => {
	const { username, password } = await c.req.json()

	try {
		const db_response = await prisma.user.findUnique({
			where: {
				username: username
			}
		})

        console.log(db_response);

		if(!db_response) {
			return c.json({ msg: 'No user found' }, 404)
		}

		const compared: boolean = await bcryptjs.compare(password, db_response.password)
		if(!compared) return c.json({ msg: "Password doesn't match" }, 401)
			
		const payload = {
			sub: db_response.unique_id,
			username: db_response.username,
			email: db_response.email
		}
        
        // console.log(c.env.JWT_SECRET);
		const generatedToken: string = await createToken(payload, c.env.JWT_SECRET)
        console.log(generatedToken);
		setCookie(c, 'token', generatedToken);
			
		return c.json({ msg: 'user logged in' }, 200)
	}
	catch(error) {
		return c.json({ msg: 'Internal server error', error: error}, 500)
	}
})

export default authRouter;