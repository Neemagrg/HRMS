import {FaLock} from "react-icons/fa";

export default function Unauthorized() {
    return (
        <div className="flex flex-col justify-center items-center h-screen text-red-600 text-xl space-y-4">
            <FaLock className="text-6xl"/>
            <p>Access Denied: You are not authorized to view this page.</p>
        </div>
    )
}