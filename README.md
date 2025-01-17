# Medium Simplified
A simplified version of the app [Medium](https://medium.com/) following the **CRUD** operations and having **User Authentication**

**It's using TypeScript, Github is bugging out**

## Features
- Authentication (JWT Token)
- Sigup/Signin + Logout
- Read Post
- Create Post
- Update Post
- Delete Post

### Frontend
1. React (TypeScript)
2. React-Router-DOM
3. TailwindCSS
4. Shadcn

### Backend
1. Hono (TypeScript)
2. Prisma ORM
3. Cloudflare Workers (Wrangler)

### Databases
1. Postgresql (NeonDB)

### Prerequisites
1. Node (18.3.0+) 


### RUN

#### Frontend
```
1. cd frontend
2. npm install
3. npm run dev
```

#### Backend

***Docker***
```
1. cd backend
2. docker build -t medium-backend .
3. docker run -p 8787:8787 medium-backend
```

```
1. cd frontend
2. npm install
3. npm run dev
```

Will create a contribution docs soon.

Thank you for visiting.


