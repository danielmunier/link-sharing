import { SessionInfo } from "./sessionInfo"

export const Navbar = () => {
    return (
        <div className="flex justify-between p-5 text-white font-bold" >
            <a href="/">Home</a>
            <SessionInfo/>

        </div>
    )
}