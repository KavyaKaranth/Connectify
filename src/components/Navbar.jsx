import { Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaPlus,
  FaSignOutAlt,
  FaUserFriends,
  FaEnvelope,
  FaTh
} from "react-icons/fa";

export default function Navbar({ setIsLoggedIn }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-green-100 border-b border-green-300 p-4 flex justify-between items-center">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-green-500 rounded-md text-white flex items-center justify-center font-bold text-lg">
          C
        </div>
        <span className="text-green-800 font-semibold text-lg select-none cursor-default">
          Connectify
        </span>
      </div>

      {/* Search bar */}
      <div className="flex-1 max-w-md mx-6">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 px-4 border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 hover:shadow transition"
        />
      </div>

      {/* Links */}
      <div className="flex gap-6 text-green-700 items-center text-sm">
        <Link to="/home" className="hover:text-green-900 flex items-center gap-1">
          <FaHome /> Home
        </Link>
        <Link to="/network" className="hover:text-green-900 flex items-center gap-1">
          <FaUserFriends /> Network
        </Link>
        <Link to="/posts" className="hover:text-green-900 flex items-center gap-1 cursor-pointer">
  <FaPlus /> Post
</Link>

        <Link to="/messages" className="hover:text-green-900 flex items-center gap-1">
          <FaEnvelope /> Messages
        </Link>
        <Link to="/menu" className="hover:text-green-900 flex items-center gap-1 cursor-pointer">
          <FaTh /> Menu
        </Link>
        <Link to="/profile" className="hover:text-green-900 flex items-center gap-1 cursor-pointer">
          <FaUser /> Profile
        </Link>
        
        <button
          onClick={handleLogout}
          className="hover:text-red-700 text-red-600 flex items-center gap-1 cursor-pointer"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </nav>
  );
}
