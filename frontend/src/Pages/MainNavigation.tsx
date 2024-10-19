import NavBar from "@/components/NavBar";
import { Outlet } from "react-router-dom";

export default function MainNavigation() {
    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
        </>
    )
}