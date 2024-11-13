import React from "react";
import { FaHome, FaUserAlt, FaCog, FaInfoCircle } from "react-icons/fa";

function SidebarInner() {
	return (
		<div className="w-64 h-full bg-blue-800 text-white fixed flex flex-col items-center py-6">
			<div className="text-2xl font-bold mb-6">Company Logo</div>
			<nav className="flex flex-col gap-4">
				<a href="#" className="flex items-center gap-2 text-lg">
					<FaHome /> Home
				</a>
				<a href="#" className="flex items-center gap-2 text-lg">
					<FaUserAlt /> Profile
				</a>
				<a href="#" className="flex items-center gap-2 text-lg">
					<FaCog /> Settings
				</a>
				<a href="#" className="flex items-center gap-2 text-lg">
					<FaInfoCircle /> About
				</a>
			</nav>
		</div>
	);
}

export default SidebarInner;
