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

authRouter.post('/logout', (c: Context) => {
	try {
		deleteCookie(c, 'token');
		return c.json({message: 'User logged out'}, 200)
	}catch(err) {
		return c.json({ msg: 'Something went wrong', error: err }, 400);
	}
})


authRouter.post('/signup', signupAuth, async (c: Context) => {
	const { username, email, password } = await c.req.json()
	
	const hashed_password: string = await bcryptjs.hash(password, 10)
	const avatarId: number = Math.floor(Math.random() * (100 - 1 + 1) + 1); //generating a random number between 1-100

	try {
		const db_response = await prisma.user.create({
			data: {
				username: username,
				email: email,
				password: hashed_password,
				avatar: `https://avatar.iran.liara.run/public/${avatarId}`
			}
		})

		const payload = {
			sub: db_response.unique_id,
			username: db_response.username,
			email: db_response.email,
		}

		const returnedPayload = {
			username: db_response.username,
			avatar: db_response.avatar
		}

		const generatedToken: string = await createToken(payload, c.env.JWT_SECRET);
		setCookie(c, 'token', generatedToken, {
			maxAge: 7 * 24 * 60 * 60,
			path: '/',
			secure: true,
			httpOnly: true,
			sameSite: 'Lax'
		});

		return c.json({
			payload: returnedPayload,
			msg: 'user created',
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

        const returnedPayload = {
			username: db_response?.username,
			avatar: db_response?.avatar
		}

		if(!db_response) {
			return c.json({ msg: 'No user found' }, 404)
		}

		const compared: boolean = await bcryptjs.compare(password, db_response.password)
		if(!compared) return c.json({ msg: "Password doesn't match" }, 401)
			
		const payload = {
			sub: db_response.unique_id,
			username: db_response.username,
			email: db_response.email,
			avatar: db_response.avatar
		}
        
		const generatedToken: string = await createToken(payload, c.env.JWT_SECRET)

		setCookie(c, 'token', generatedToken, {
			maxAge: 7 * 24 * 60 * 60,
			path: '/',
			secure: true,
			sameSite: 'Lax',
			httpOnly: true
		});
			
		return c.json({ msg: 'user logged in', payload: returnedPayload }, 200)
	}
	catch(error) {
		return c.json({ msg: 'Internal server error', error: error}, 500)
	}
})

export default authRouter;