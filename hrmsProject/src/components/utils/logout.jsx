import {useNavigate} from "react-router-dom";
export default function LogoutButton() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };
    return (
    <button
      onClick={handleLogout}
      className="px-2 py-1 bg-black hover:bg-green-600 text-white rounded"
    >
      Logout
    </button>
    )
}