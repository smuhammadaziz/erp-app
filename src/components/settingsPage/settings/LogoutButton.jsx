import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

function LogoutButton() {
	return (
		<button className="w-full flex items-center text-red-500 hover:bg-red-50 p-3 rounded-lg transition-colors">
			<FaSignOutAlt className="mr-2 w-4 h-4" />
			<span className="text-sm">Logout</span>
		</button>
	);
}

export default LogoutButton;
