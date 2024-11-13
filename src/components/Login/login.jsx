import React, { useState } from "react";

import { Layout } from "../Layout";
import { NavLink } from "react-router-dom";

function LoginPageKSB() {
	const [userType, setUserType] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		// Add login logic here (e.g., validation or API call)
		console.log("User Type:", userType, "Password:", password);
	};

	return (
		<Layout>
			<div className="flex items-center justify-center h-screen bg-gray-100">
				<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
					<h2 className="text-2xl font-bold mb-6 text-center">
						Login
					</h2>

					<div className="mb-4">
						<label
							htmlFor="userType"
							className="block text-sm font-medium text-gray-700"
						>
							Select User Type
						</label>
						<select
							id="userType"
							className="mt-2 p-2 w-full border border-gray-300 rounded-md"
							value={userType}
							onChange={(e) => setUserType(e.target.value)}
						>
							<option value="" disabled>
								Select User Type
							</option>
							<option value="manager1">Manager 1</option>
							<option value="manager2">Manager 2</option>
						</select>
					</div>

					<div className="mb-4">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							id="password"
							type="password"
							className="mt-2 p-2 w-full border border-gray-300 rounded-md"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter your password"
						/>
					</div>

					<NavLink
						to="/"
						onClick={handleLogin}
						className="w-full block text-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
					>
						Login
					</NavLink>
				</div>
			</div>
		</Layout>
	);
}

export default LoginPageKSB;
