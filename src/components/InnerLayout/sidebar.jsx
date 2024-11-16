import React, { useState } from "react";
import {
	AiOutlineHome,
	AiOutlineUser,
	AiOutlineSetting,
	AiOutlineInfoCircle,
	AiOutlineMenu,
	AiOutlineClose,
} from "react-icons/ai";

import logo from "../../assets/icon.png";

function SidebarInner({ onToggle }) {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleSidebar = () => {
		setIsExpanded(!isExpanded);
		onToggle(!isExpanded);
	};

	return (
		<div
			className={`h-full bg-gray-900 text-white fixed flex flex-col items-center py-6 transition-all duration-300 shadow-lg ${
				isExpanded ? "w-64" : "w-20"
			}`}
		>
			<div className="flex flex-col items-center mb-8">
				<div className="text-xl font-bold mb-2 transition-opacity duration-300">
					{isExpanded ? <img src={logo} alt="" /> : "KSB"}
				</div>
				<button
					onClick={toggleSidebar}
					className="p-2 text-white hover:bg-gray-700 rounded transition-colors duration-300"
				>
					{isExpanded ? (
						<AiOutlineClose size={24} />
					) : (
						<AiOutlineMenu size={24} />
					)}
				</button>
			</div>
			<nav className="flex flex-col gap-6 w-full px-2 mt-4">
				<a
					href="#"
					className="group flex items-center gap-4 px-4 py-3 hover:bg-gray-700 rounded transition-all duration-300 relative"
				>
					<AiOutlineHome size={isExpanded ? 24 : 28} />
					{isExpanded && <span className="text-lg">Home</span>}
					{!isExpanded && (
						<span className="absolute left-16 opacity-0 group-hover:opacity-100 text-sm bg-gray-800 text-white rounded p-1 transition-opacity duration-300">
							Home
						</span>
					)}
				</a>
				<a
					href="#"
					className="group flex items-center gap-4 px-4 py-3 hover:bg-gray-700 rounded transition-all duration-300 relative"
				>
					<AiOutlineUser size={isExpanded ? 24 : 28} />
					{isExpanded && <span className="text-lg">Profile</span>}
					{!isExpanded && (
						<span className="absolute left-16 opacity-0 group-hover:opacity-100 text-sm bg-gray-800 text-white rounded p-1 transition-opacity duration-300">
							Profile
						</span>
					)}
				</a>
				<a
					href="#"
					className="group flex items-center gap-4 px-4 py-3 hover:bg-gray-700 rounded transition-all duration-300 relative"
				>
					<AiOutlineSetting size={isExpanded ? 24 : 28} />
					{isExpanded && <span className="text-lg">Settings</span>}
					{!isExpanded && (
						<span className="absolute left-16 opacity-0 group-hover:opacity-100 text-sm bg-gray-800 text-white rounded p-1 transition-opacity duration-300">
							Settings
						</span>
					)}
				</a>
				<a
					href="#"
					className="group flex items-center gap-4 px-4 py-3 hover:bg-gray-700 rounded transition-all duration-300 relative"
				>
					<AiOutlineInfoCircle size={isExpanded ? 24 : 28} />
					{isExpanded && <span className="text-lg">About</span>}
					{!isExpanded && (
						<span className="absolute left-16 opacity-0 group-hover:opacity-100 text-sm bg-gray-800 text-white rounded p-1 transition-opacity duration-300">
							About
						</span>
					)}
				</a>
			</nav>
		</div>
	);
}

export default SidebarInner;
