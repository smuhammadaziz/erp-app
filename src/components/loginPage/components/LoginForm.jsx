import React from "react";
import UserTypeDropdown from "./UserTypeDropdown";
import PasswordInput from "./PasswordInput";

function LoginForm({
	userType,
	password,
	isDropdownOpen,
	isPasswordVisible,
	users,
	handleLogin,
	toggleDropdown,
	handleSelect,
	setPassword,
	togglePasswordVisibility,
	content,
	language,
}) {
	return (
		<div className="bg-white p-12 rounded-xl shadow-2xl w-full max-w-lg transform hover:scale-105 transition-transform duration-300">
			<h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
				{content[language].login.login}
			</h2>

			<UserTypeDropdown
				userType={userType}
				isDropdownOpen={isDropdownOpen}
				toggleDropdown={toggleDropdown}
				handleSelect={handleSelect}
				users={users}
				content={content}
				language={language}
			/>

			<PasswordInput
				password={password}
				setPassword={setPassword}
				isPasswordVisible={isPasswordVisible}
				togglePasswordVisibility={togglePasswordVisibility}
				content={content}
				language={language}
				onEnterPress={handleLogin}
			/>

			<button
				onClick={handleLogin}
				className="w-full text-center py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform"
			>
				{content[language].login.login}
			</button>
		</div>
	);
}

export default LoginForm;
