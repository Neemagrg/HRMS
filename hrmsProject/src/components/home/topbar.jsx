import { FaUsersGear } from "react-icons/fa6";
import { FaSearch, FaBell, FaUser } from "react-icons/fa";
import LogoutButton from "../utils/logout";
export default function Topbar() {
    const basecss = " flex cursor-pointer text-2xl";
    return (
        <div className = "flex justify-between">
            <div className = "flex items-center p-2 gap-2.5">
                <FaUsersGear className = "cursor-pointer text-2xl" />
                <h1 className  = "text-3xl text-black font-bold">HRMS PORTAl</h1>
            </div>
            <div className="flex  items-center justify-between text-2xl gap-6 mr-4">
                <FaSearch className={`${basecss}`}/>
                <FaBell className={`${basecss}`}/>
                <FaUser className={`${basecss}`}/>
                <LogoutButton className={`${basecss}`}/>
            </div>
        </div>
    )
}