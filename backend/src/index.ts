import { Context, Hono } from 'hono'
import { tokenAuth } from './middlewares/tokenAuth'
import { inputValidation } from './middlewares/inputValidation'
import { cors } from "hono/cors"
import blogRouter from './router/blog'
import authRouter from './router/auth'
import { UserAuth } from './middlewares/userAuth'
import { getCookie } from 'hono/cookie'

type Bindings = {
	JWT_SECRET: string,
	DATABASE_URL: string
}

const app = new Hono<{ Bindings: Bindings }>()
const token = {
    JWT_SECRET: '',
    DATABASE_URL: '',
}

app.get('/token', (c) => {
	return c.json({ token1: c.env.JWT_SECRET, token2: c.env.DATABASE_URL});
})

app.use('*', cors({
    origin: 'http://localhost:5173',
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS', 'PATCH', 'DELETE'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
}))

app.options('*', (c) => {
    return c.text('', 204)
})

// app.use('*', UserAuth);

app.use('/api/v1/blogs/delete', tokenAuth)
app.use('/api/v1/blog/*', tokenAuth, inputValidation)

app.get('/', UserAuth, (c: Context) => {
    const token = getCookie(c, 'token');
        if(!token) {
            return c.json({ message: 'User not authorized'}, 401);
        }   
    return c.json({ message: 'User maybe logged in' })
})

app.route('/api/v1', blogRouter);
app.route('/api/v1/auth', authRouter);


export default app;
