import React from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function PasswordInput({
	password,
	setPassword,
	isPasswordVisible,
	togglePasswordVisibility,
	content,
	language,
}) {
	return (
		<div className="mb-6">
			<label
				htmlFor="password"
				className="block text-xl font-medium text-gray-700 mb-2"
			>
				{content[language].login.password}
			</label>
			<div className="relative">
				<div className="flex items-center mt-2 p-4 pl-4 pr-4 w-full border-2 border-gray-300 rounded-lg text-gray-700">
					<FaLock className="text-gray-500 mr-3" size={20} />
					<input
						id="password"
						type={isPasswordVisible ? "text" : "password"}
						className="w-full focus:outline-none"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder={content[language].login.enter}
					/>
					<div
						className="absolute right-4 cursor-pointer"
						onClick={togglePasswordVisibility}
					>
						{isPasswordVisible ? (
							<FaEyeSlash className="text-gray-500" size={20} />
						) : (
							<FaEye className="text-gray-500" size={20} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default PasswordInput;
