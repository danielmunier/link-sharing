import { SessionInfo } from "./sessionInfo"

export const Navbar = () => {
    return (
        <div className="flex justify-between ">
            <a href="/">Home</a>
            <SessionInfo/>

        </div>
    )
}