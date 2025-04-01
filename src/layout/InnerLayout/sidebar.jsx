import React, { useState } from "react";
import {
	AiOutlineHome,
	AiOutlineUser,
	AiOutlineSetting,
	AiOutlineInfoCircle,
	AiOutlineMenu,
	AiOutlineClose,
	AiFillProduct,
} from "react-icons/ai";
import { IoTrashBinOutline } from "react-icons/io5";

import { SlBasket } from "react-icons/sl";

import logo from "../../assets/icon.png";
import { RiCustomerService2Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

import content from "../../localization/content";
import useLang from "../../hooks/useLang";

function SidebarInner({ onToggle }) {
	const [isExpanded, setIsExpanded] = useState(false);

	const [language, setLanguage] = useLang();

	const toggleSidebar = () => {
		setIsExpanded(!isExpanded);
		onToggle(!isExpanded);
	};

	let notificationCount = 10;

	return (
		<div
			className={`h-full bg-gray-900 text-white fixed z-[150] flex flex-col items-center py-6 transition-all duration-300 shadow-lg ${
				isExpanded ? "w-64" : "w-20"
			}`}
		>
			<div className="flex flex-col items-center mb-8">
				<div className="text-xl font-bold mb-2 transition-opacity duration-300">
					{isExpanded ? <img src={logo} alt="" /> : "KSB"}
				</div>
			</div>
			<nav className="flex flex-col gap-6 w-full px-2 mt-4">
				<NavLink
					to="/crm"
					className={({ isActive }) =>
						`group flex items-center gap-4 px-4 py-3 hover:bg-gray-700 rounded transition-all duration-300 relative ${
							isActive ? "bg-gray-700" : ""
						}`
					}
				>
					<AiOutlineHome size={isExpanded ? 24 : 28} />
					{isExpanded && (
						<span className="text-lg">
							{content[language].innerLayout.home}
						</span>
					)}
					{!isExpanded && (
						<span className="absolute left-16 opacity-0 group-hover:opacity-100 text-sm bg-gray-800 text-white rounded p-1 transition-opacity duration-300">
							{content[language].innerLayout.home}
						</span>
					)}
				</NavLink>
				<NavLink
					to="/customers"
					className={({ isActive }) =>
						`group flex items-center gap-4 px-4 py-3 hover:bg-gray-700 rounded transition-all duration-300 relative ${
							isActive ? "bg-gray-700" : ""
						}`
					}
				>
					<RiCustomerService2Fill size={isExpanded ? 24 : 28} />
					{isExpanded && (
						<span className="text-lg">
							{content[language].innerLayout.customers}
						</span>
					)}
					{!isExpanded && (
						<span className="absolute left-16 opacity-0 group-hover:opacity-100 text-sm bg-gray-800 text-white rounded p-1 transition-opacity duration-300">
							{content[language].innerLayout.customers}
						</span>
					)}
				</NavLink>
				<NavLink
					to="/products"
					className={({ isActive }) =>
						`group flex items-center gap-4 px-4 py-3 hover:bg-gray-700 rounded transition-all duration-300 relative ${
							isActive ? "bg-gray-700" : ""
						}`
					}
				>
					<SlBasket size={isExpanded ? 24 : 28} />
					{isExpanded && (
						<span className="text-lg">
							{content[language].innerLayout.products}
						</span>
					)}
					{!isExpanded && (
						<span className="absolute left-16 opacity-0 group-hover:opacity-100 text-sm bg-gray-800 text-white rounded p-1 transition-opacity duration-300">
							{content[language].innerLayout.products}
						</span>
					)}
				</NavLink>
				<NavLink
					to="/trash"
					className={({ isActive }) =>
						`group flex items-center gap-4 px-4 py-3 hover:bg-gray-700 rounded transition-all duration-300 relative ${
							isActive ? "bg-gray-700" : ""
						}`
					}
				>
					<div className="relative">
						<IoTrashBinOutline size={isExpanded ? 24 : 28} />
						{notificationCount > 0 && (
							<span className="absolute -top-3 -right-5 bg-red-500 text-white text-xs font-bold flex items-center justify-center w-6 h-6 rounded-full">
								{notificationCount}
							</span>
						)}
					</div>

					{isExpanded && <span className="text-lg">Корзина</span>}
					{!isExpanded && (
						<span className="absolute left-16 opacity-0 group-hover:opacity-100 text-sm bg-gray-800 text-white rounded p-1 transition-opacity duration-300">
							Корзина
						</span>
					)}
				</NavLink>

				<NavLink
					to="/settings"
					className={({ isActive }) =>
						`group flex items-center gap-4 px-4 py-3 hover:bg-gray-700 rounded transition-all duration-300 relative ${
							isActive ? "bg-gray-700" : ""
						}`
					}
				>
					<AiOutlineSetting size={isExpanded ? 24 : 28} />
					{isExpanded && (
						<span className="text-lg">
							{content[language].innerLayout.settings}
						</span>
					)}
					{!isExpanded && (
						<span className="absolute left-16 opacity-0 group-hover:opacity-100 text-sm bg-gray-800 text-white rounded p-1 transition-opacity duration-300">
							{content[language].innerLayout.settings}
						</span>
					)}
				</NavLink>
			</nav>
		</div>
	);
}

export default SidebarInner;

