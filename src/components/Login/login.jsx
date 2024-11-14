import React, { useState } from "react";
import { Layout } from "../Layout";
import { NavLink } from "react-router-dom";
import { FaUserTie, FaLock, FaChevronDown } from "react-icons/fa";

function LoginPageKSB() {
	const [userType, setUserType] = useState("");
	const [password, setPassword] = useState("");
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleLogin = () => {
		// Add login logic here (e.g., validation or API call)
		console.log("User Type:", userType, "Password:", password);
	};

	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

	const handleSelect = (type) => {
		setUserType(type);
		setIsDropdownOpen(false);
	};

	return (
		<Layout>
			<div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-indigo-700">
				<div className="bg-white p-12 rounded-xl shadow-2xl w-full max-w-lg transform hover:scale-105 transition-transform duration-300">
					<h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
						Login
					</h2>

					{/* Custom User Type Dropdown */}
					<div className="mb-6">
						<label className="block text-xl font-medium text-gray-700 mb-2">
							Select User Type
						</label>
						<div className="relative">
							<div
								className="flex items-center mt-2 p-4 pl-4 pr-4 w-full border-2 border-gray-300 rounded-lg text-gray-700 cursor-pointer"
								onClick={toggleDropdown}
							>
								<FaUserTie
									className="text-gray-500 mr-3"
									size={20}
								/>
								<span className="flex-1">
									{userType || "Select User Type"}
								</span>
								<FaChevronDown
									className={`text-gray-500 transition-transform ${
										isDropdownOpen ? "rotate-180" : ""
									}`}
								/>
							</div>
							{isDropdownOpen && (
								<div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
									<div
										className="p-4 hover:bg-gray-100 cursor-pointer"
										onClick={() =>
											handleSelect("Manager 1")
										}
									>
										Manager 1
									</div>
									<div
										className="p-4 hover:bg-gray-100 cursor-pointer"
										onClick={() =>
											handleSelect("Manager 2")
										}
									>
										Manager 2
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Password Input */}
					<div className="mb-6">
						<label
							htmlFor="password"
							className="block text-xl font-medium text-gray-700 mb-2"
						>
							Password
						</label>
						<div className="relative">
							<div className="flex items-center mt-2 p-4 pl-4 pr-4 w-full border-2 border-gray-300 rounded-lg text-gray-700">
								<FaLock
									className="text-gray-500 mr-3"
									size={20}
								/>
								<input
									id="password"
									type="password"
									className="w-full focus:outline-none"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									placeholder="Enter your password"
								/>
							</div>
						</div>
					</div>
					<NavLink
						to="/"
						onClick={handleLogin}
						className="w-full block text-center py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform"
					>
						Login
					</NavLink>
				</div>
			</div>
		</Layout>
	);
}

export default LoginPageKSB;
