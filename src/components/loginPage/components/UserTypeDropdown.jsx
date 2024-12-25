import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

function UserTypeDropdown({
	userType,
	isDropdownOpen,
	toggleDropdown,
	handleSelect,
	users,
	content,
	language,
}) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="mb-6">
			<label className="block text-xl font-medium text-gray-700 mb-2">
				{content[language].login.select}
			</label>
			<div className="relative">
				<button
					onClick={toggleDropdown}
					className="flex items-center justify-between w-full px-4 py-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<span>{userType || "Select User Type"}</span>
					<FaChevronDown
						className={`transition-transform duration-200 ${
							isDropdownOpen ? "transform rotate-180" : ""
						}`}
					/>
				</button>
				{isDropdownOpen && (
					<div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
						{isLoading ? (
							<div className="flex justify-center items-center py-2">
								<div className="w-6 h-6 border-4 border-t-transparent border-slate-500 rounded-full animate-spin"></div>
							</div>
						) : (
							users.map((user, index) => (
								<button
									key={index}
									onClick={() => handleSelect(user.usertype)}
									className="block w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
								>
									{user.usertype}
								</button>
							))
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default UserTypeDropdown;

