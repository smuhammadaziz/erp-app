import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { MdOutlineChangeCircle } from "react-icons/md";
import { NavLink } from "react-router-dom";

function LogoutButton() {
	return (
		<div className="">
			<NavLink
				to="/login"
				className="w-full bg-red-500 flex items-center mt-3 text-white font-bold hover:bg-transparent hover:text-red-500 border-2 border-red-500 p-3 rounded-lg transition-colors"
			>
				<FaSignOutAlt className="mr-2 w-4 h-4" />
				<span className="text-sm ">Hisobdan chiqish</span>
			</NavLink>
		</div>
	);
}

export default LogoutButton;
