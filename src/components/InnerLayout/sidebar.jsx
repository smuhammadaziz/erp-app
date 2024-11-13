// SidebarInner.js
import React, { useState } from "react";
import {
	FaHome,
	FaUserAlt,
	FaCog,
	FaInfoCircle,
	FaBars,
	FaTimes,
} from "react-icons/fa";

function SidebarInner({ onToggle }) {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleSidebar = () => {
		setIsExpanded(!isExpanded);
		onToggle(!isExpanded); // Notify parent component of new state
	};

	return (
		<div
			className={`h-full bg-blue-800 text-white fixed flex flex-col items-center py-6 transition-all duration-300 ${
				isExpanded ? "w-64" : "w-20"
			}`}
		>
			<div className="flex items-center gap-2 mb-6">
				<div className="text-2xl font-bold transition-opacity duration-300">
					{isExpanded ? "Logo" : "L"}
				</div>
				<button
					onClick={toggleSidebar}
					className="ml-auto p-2 text-white hover:bg-blue-600 rounded focus:outline-none"
				>
					{isExpanded ? <FaTimes /> : <FaBars />}
				</button>
			</div>
			<nav className="flex flex-col gap-4 w-full">
				<a
					href="#"
					className="flex items-center gap-4 px-4 py-2 hover:bg-blue-600 rounded transition-all duration-300"
				>
					<FaHome size={isExpanded ? 20 : 28} />
					{isExpanded && <span className="text-lg">Home</span>}
				</a>
				<a
					href="#"
					className="flex items-center gap-4 px-4 py-2 hover:bg-blue-600 rounded transition-all duration-300"
				>
					<FaUserAlt size={isExpanded ? 20 : 28} />
					{isExpanded && <span className="text-lg">Profile</span>}
				</a>
				<a
					href="#"
					className="flex items-center gap-4 px-4 py-2 hover:bg-blue-600 rounded transition-all duration-300"
				>
					<FaCog size={isExpanded ? 20 : 28} />
					{isExpanded && <span className="text-lg">Settings</span>}
				</a>
				<a
					href="#"
					className="flex items-center gap-4 px-4 py-2 hover:bg-blue-600 rounded transition-all duration-300"
				>
					<FaInfoCircle size={isExpanded ? 20 : 28} />
					{isExpanded && <span className="text-lg">About</span>}
				</a>
			</nav>
		</div>
	);
}

export default SidebarInner;
