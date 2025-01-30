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
	const [selectedUserType, setSelectedUserType] = useState(userType || "");

	useEffect(() => {
		const storedUserType = localStorage.getItem("userType");
		if (storedUserType) {
			setSelectedUserType(storedUserType);
			handleSelect(storedUserType);
		} else {
			setSelectedUserType(userType || "");
		}
	}, [userType]);

	const handleSelection = (usertype) => {
		setSelectedUserType(usertype);
		localStorage.setItem("userType", usertype);
		handleSelect(usertype);
	};

	const handleInputFocus = (e) => {
		e.target.select();
	};

	const handleInputChange = (e) => {
		const value = e.target.value;
		if (value === "") {
			setSelectedUserType("");
			toggleDropdown(false);
		} else {
			setSelectedUserType(value);
		}
		localStorage.setItem("userType", value);
	};

	return (
		<div className="mb-6">
			<label className="block text-xl font-medium text-gray-700 mb-2">
				{content[language].login.select}
			</label>
			<div className="relative">
				<input
					type="text"
					value={selectedUserType}
					onFocus={handleInputFocus}
					onChange={handleInputChange}
					// onClick={toggleDropdown}
					className="w-full px-4 py-4 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder=""
				/>
				<div
					className={`absolute p-3 rounded-lg hover:bg-slate-200 top-1/2 right-4 cursor-pointer transform -translate-y-1/2 transition-transform duration-200 ${
						isDropdownOpen ? "rotate-180" : ""
					}`}
					onClick={toggleDropdown}
				>
					<FaChevronDown
					// className={`absolute top-1/2 right-4 cursor-pointer transform -translate-y-1/2 transition-transform duration-200 ${
					// 	isDropdownOpen ? "rotate-180" : ""
					// }`}
					/>
				</div>
				{isDropdownOpen && (
					<div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
						{users.map((user, index) => (
							<button
								key={index}
								onClick={() => handleSelection(user.usertype)}
								className="block w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
							>
								{user.usertype}
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default UserTypeDropdown;
