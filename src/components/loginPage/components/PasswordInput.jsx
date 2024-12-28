import React, { useRef, useEffect } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function PasswordInput({
	password,
	setPassword,
	isPasswordVisible,
	togglePasswordVisibility,
	content,
	language,
	userType,
	onEnterPress,
}) {
	const passwordInputRef = useRef(null);

	useEffect(() => {
		if (userType && passwordInputRef.current) {
			passwordInputRef.current.focus();
		}
	}, [userType]);

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			onEnterPress();
		}
	};

	return (
		<div className="mb-6">
			<label
				htmlFor="password"
				className="block text-xl font-medium text-gray-700 mb-2"
			>
				{content[language].login.password}
			</label>
			<div className="relative">
				<div
					className={`flex items-center mt-2 p-4 pl-4 pr-4 w-full border-2 ${
						userType
							? "border-gray-100"
							: "border-gray-200 bg-gray-100"
					} rounded-lg text-gray-700`}
				>
					<FaLock className="text-gray-500 mr-3" size={20} />
					<input
						ref={passwordInputRef}
						id="password"
						type={isPasswordVisible ? "text" : "password"}
						className="w-full focus:outline-none"
						value={password}
						onChange={(e) =>
							userType && setPassword(e.target.value)
						}
						onKeyPress={handleKeyPress}
						placeholder={content[language].login.enter}
						disabled={!userType}
					/>
					<div
						className={`absolute right-4 cursor-pointer ${
							!userType && "pointer-events-none"
						}`}
						onClick={
							userType ? togglePasswordVisibility : undefined
						}
					>
						{isPasswordVisible ? (
							<FaEyeSlash
								className={`text-gray-500 ${
									!userType && "text-gray-300"
								}`}
								size={20}
							/>
						) : (
							<FaEye
								className={`text-gray-500 ${
									!userType && "text-gray-300"
								}`}
								size={20}
							/>
						)}
					</div>
				</div>
				{!userType && (
					<p className="text-sm text-gray-500 mt-2">
						{content[language].login.selectUserType}
					</p>
				)}
			</div>
		</div>
	);
}

export default PasswordInput;
