import { Link, LoaderFunctionArgs, NavLink, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
    DropdownMenuGroup,
  } from "@/components/ui/dropdown-menu"
  
import WritingIcon from "./ui/writeIcon"
import { getToken } from "@/lib/auth"
import { getAvatarCharacters } from "@/lib/utils"
import { useEffect, useState } from "react"
import { logout } from "@/lib/logout";

const NavItem = ({ to, children }: { to: string, children: string }) => (
    <NavLink to={to} 
        className={({ isActive }) => 
            `text-sm font-medium transition-colors drop-shadow-2xl duration-150 ${
                isActive ? 'text-black font-bold border-black' : 'text-gray-600 hover:text-black'
            }`
        }>
        {children}
    </NavLink>
)


export default function NavBar() {
    const navigate = useNavigate();

    
    const logoutHandler = async () => {
        await logout();
        navigate("/");
    }   
    
    const [token, setToken] = useState<string | null>('asfsfas');
    const [avatar, setAvatar] = useState<string>('NJB');
    const [avatarIcon, setAvatarIcon] = useState<string>('');
    
    
    return (
        <header className="bg-[#f9f9f9f2] border-gray-200">
            <div className="container mx-auto md:max-w-screen-md px-3 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="font-light text-lg drop-shadow-2xl text-gray-800 cursor-pointer font-serif">Medium</Link>
                    </div>
                    <nav>
                        <ul className="flex space-x-6 items-center">
                            {token?.length === 0 ? (
                                <li>
                                    <NavItem to="auth">Login</NavItem>
                                </li>
                                ) : (
                                    <>
                                <li className="justify-center items-center">
                                    <WritingIcon />
                                    <NavItem to="create">Write</NavItem>
                                </li>
                                <li>
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={avatarIcon} />
                                        <AvatarFallback>{avatar}</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            My Blogs
                                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Bookmarks
                                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Settings
                                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Keyboard shortcuts
                                            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Button variant="destructive" onClick={logoutHandler}>Logout</Button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                                </li>
                                    </>
                                )
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}