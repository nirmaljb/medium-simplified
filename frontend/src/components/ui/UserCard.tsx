import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { NavLink } from "react-router-dom"

interface CardProps {
    id: string,
    header: string,
    body: string,
    author: string
}

export default function UserCard({id, header, body, author}: CardProps) {
    return (
      <Card className="hover:cursor-pointer">
          <NavLink to={`/blog/${id}`}>
            <CardHeader>
                <CardTitle className="text-3xl font-extrabold">{header.substring(0, 100)}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-5 text-muted-foreground">{body.substring(0, 30)}...</p>
            </CardContent>
            <CardFooter>
                <p>Author: {author}</p>
            </CardFooter>
        </NavLink>
      </Card>
    )
  }
