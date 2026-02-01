import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/Constant";
import { Link, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi"; // Using a user icon from react-icons


function Navbar() {
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm px-4 sticky top-0 z-50">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          TodoApp
        </Link>
      </div>
      <div className="flex gap-2">
        <div className="dropdown dropdown-end">
        
          <button
            tabIndex={0}
            className="btn btn-ghost btn-circle"
          >
            <FiUser className="text-2xl" />
          </button>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile" className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
