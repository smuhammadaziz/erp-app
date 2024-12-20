import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { MdOutlineChangeCircle } from "react-icons/md";
import { NavLink } from "react-router-dom";

function LogoutButton() {
	return (
		<div className="">
			<NavLink
				to="/login"
				className="w-full flex items-center text-red-500 hover:bg-red-100 font-bold p-3 rounded-lg transition-colors"
			>
				<MdOutlineChangeCircle className="mr-2 w-4 h-4" />
				<span className="text-sm">Foydalanuvchini o'zgartirish</span>
			</NavLink>
			<NavLink
				to="/intro"
				className="w-full bg-red-500 flex items-center mt-3 text-white font-bold hover:bg-transparent hover:text-red-500 border-2 border-red-500 p-3 rounded-lg transition-colors"
			>
				<FaSignOutAlt className="mr-2 w-4 h-4" />
				<span className="text-sm ">KSB-ID dan chiqish</span>
			</NavLink>
		</div>
	);
}

export default LogoutButton;
