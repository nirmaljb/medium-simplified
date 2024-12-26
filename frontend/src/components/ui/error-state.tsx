import { Box } from "lucide-react"
export default function ErrorState() {
    return <div className="flex flex-col justify-center items-center  gap-4">
        <Box className="w-10 h-10 text-muted-foreground" />
        <h1 className="text-3xl text-muted-foreground">No blogs found</h1>
    </div>
}