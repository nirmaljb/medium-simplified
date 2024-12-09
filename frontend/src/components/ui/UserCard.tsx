import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Blog } from "@/lib/interfaces"
import { NavLink } from "react-router-dom"

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export const UserCard: React.FC<{blog: Blog}> = ({ blog }) => {
    const { unique_id, header, body, created_at, user } = blog;

    const date = new Date(created_at);
    const dateInfo: {
        month: string,
        year: number
    } = {
        month: months[date.getUTCMonth()],
        year: date.getFullYear()
    }

    return (
      <Card className="rounded-lg hover:cursor-pointer">
          <NavLink to={`/blog/${unique_id}`}>
            <CardHeader>
                <CardTitle className="text-3xl font-extrabold">{header.substring(0, 100)}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-5 text-muted-foreground">{body.substring(0, 200)}...</p>
            </CardContent>
            <CardFooter>
                <div className="flex text-muted-foreground space-x-3">
                    <p>{dateInfo.month}, {dateInfo.year}</p>
                    <p>By {user.username}</p>
                </div>
            </CardFooter>
        </NavLink>
      </Card>
    )
  }
