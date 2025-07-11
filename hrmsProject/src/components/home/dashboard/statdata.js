import {
  FaUserFriends,
  FaUserCheck,
  FaUserMinus,
  FaFile ,
} from "react-icons/fa";  
const stats = [
    {
      title: "Total Employee",
      count: 222,
      icon: FaUserFriends,
      color: "text-blue-600",
    },
    {
      title: "Present Today",
      count: 200,
      icon: FaUserCheck ,
      color: " text-blue-600",
    },
    {
      title: "On Leave",
      count: 22,
      icon: FaUserMinus,
      color: "text-blue-600",
    },
    {
      title: "Pending approvel",
      count: 222,
      icon: FaFile,
      color: " text-blue-600",
    },
];
export default stats;