import React, { useEffect, useState, useRef } from "react";
import { Layout } from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import {
	FaUserTie,
	FaLock,
	FaChevronDown,
	FaEye,
	FaEyeSlash,
	FaCheckCircle,
	FaTimesCircle,
} from "react-icons/fa";

import { Toaster, toast } from "sonner";

import content from "../../localization/content";
import useLang from "../../hooks/useLang";

function LoginPageKSB() {
	const [userType, setUserType] = useState("");
	const [password, setPassword] = useState("");
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [users, setUsers] = useState([]);
	const [enterprise, setEnterprise] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const abortControllerRef = useRef(null);

	const [language, setLanguage] = useLang("uz");

	const ksbId = localStorage.getItem("ksbIdNumber");

	const [showPasswordModal, setShowPasswordModal] = useState(false);
	const [isFirstTimePassword, setIsFirstTimePassword] = useState(false);
	const [passwordError, setPasswordError] = useState("");

	useEffect(() => {
		const fetchLoginData = async () => {
			if (!ksbId) return;

			setIsLoading(true);

			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}

			abortControllerRef.current = new AbortController();

			try {
				const cachedData = localStorage.getItem(`loginData_${ksbId}`);
				const cachedTimestamp = localStorage.getItem(
					`loginDataTimestamp_${ksbId}`,
				);

				if (cachedData && cachedTimestamp) {
					const isExpired =
						Date.now() - parseInt(cachedTimestamp) > 5 * 60 * 1000;
					if (!isExpired) {
						const parsedData = JSON.parse(cachedData);
						setUsers(parsedData.list_users);
						setEnterprise(parsedData.enterprise);
						setIsLoading(false);
						return;
					}
				}

				const response = await fetch(
					`http://localhost:8000/api/login/${ksbId}`,
					{
						signal: abortControllerRef.current.signal,
						headers: {
							"Cache-Control": "no-cache",
							Pragma: "no-cache",
						},
					},
				);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();

				localStorage.setItem(
					`loginData_${ksbId}`,
					JSON.stringify(data),
				);
				localStorage.setItem(
					`loginDataTimestamp_${ksbId}`,
					Date.now().toString(),
				);

				setUsers(data.list_users);
				setEnterprise(data.enterprise);
			} catch (error) {
				if (error.name === "AbortError") {
					console.log("Fetch aborted");
					return;
				}
				console.error("Fetch error:", error);
				toast.error("Failed to fetch users");
			} finally {
				setIsLoading(false);
			}
		};

		fetchLoginData();

		return () => {
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
		};
	}, [ksbId]);

	const handleLogin = async () => {
		if (!userType) {
			toast.error("Please select a user type");
			return;
		}

		try {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 30000);

			const response = await fetch(
				"http://localhost:8000/api/authenticate",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						userType,
						password: password || "",
						ksbId,
					}),
					signal: controller.signal,
				},
			);

			clearTimeout(timeoutId);

			if (response.status === 403) {
				toast.error(
					<div className="flex items-center text-white">
						<FaTimesCircle className="mr-2" size={20} />
						Database is blocked
					</div>,
					{
						position: "bottom-right",
						style: { backgroundColor: "#ef4444" },
					},
				);
				return;
			}

			if (response.status === 500) {
				toast.error(
					<div className="flex items-center text-white">
						<FaTimesCircle className="mr-2" size={20} />
						Internal server error occurred. Please try again later.
					</div>,
					{
						position: "bottom-right",
						style: { backgroundColor: "#ef4444" },
					},
				);
				return;
			}

			if (!response.ok) {
				toast.error(
					<div className="flex items-center text-white">
						<FaTimesCircle className="mr-2" size={20} />
						An unexpected error occurred. Please try again.
					</div>,
					{
						position: "bottom-right",
						style: { backgroundColor: "#ef4444" },
					},
				);
				return;
			}

			const data = await response.json();

			if (data.success) {
				toast.success(
					<div className="flex items-center text-white">
						<FaCheckCircle className="mr-2" size={20} />
						{data.message}
					</div>,
					{
						position: "bottom-right",
						style: { backgroundColor: "#22c55e" },
					},
				);
				navigate("/");
			} else {
				toast.error(
					<div className="flex items-center text-white">
						<FaTimesCircle className="mr-2" size={20} />
						{data.message}
					</div>,
					{
						position: "bottom-right",
						style: { backgroundColor: "#ef4444" },
					},
				);

				if (data.message === "No offline password available") {
					setPasswordError(data.message);
					setShowPasswordModal(true);
					setIsFirstTimePassword(true);
				}
			}
		} catch (error) {
			console.error(error);
			if (error.name === "AbortError") {
				toast.error(
					<div className="flex items-center text-white">
						<FaTimesCircle className="mr-2" size={20} />
						Request timed out. Please check your connection and try
						again.
					</div>,
					{
						position: "bottom-right",
						style: { backgroundColor: "#ef4444" },
					},
				);
			} else if (!navigator.onLine) {
				toast.error(
					<div className="flex items-center text-white">
						<FaTimesCircle className="mr-2" size={20} />
						No internet connection. Please check your network and
						try again.
					</div>,
					{
						position: "bottom-right",
						style: { backgroundColor: "#ef4444" },
					},
				);
			} else {
				toast.error(
					<div className="flex items-center text-white">
						<FaTimesCircle className="mr-2" size={20} />
						Connection error. Please check your internet connection.
					</div>,
					{
						position: "bottom-right",
						style: { backgroundColor: "#ef4444" },
					},
				);
			}
		}
	};

	const handleSetPassword = async () => {
		if (!password) {
			toast.error("Please enter a password");
			return;
		}

		try {
			const response = await fetch(
				"http://localhost:8000/api/set-password",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ userType, password }),
				},
			);

			const data = await response.json();

			if (data.success) {
				setIsFirstTimePassword(false);
				setShowPasswordModal(false);
				toast.success("Password set successfully");
				navigate("/");
			} else {
				toast.error(data.message || "Failed to set password");
			}
		} catch (error) {
			console.error(error);
			toast.error("Failed to set password");
		}
	};

	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

	const handleSelect = (type) => {
		setUserType(type);
		setIsDropdownOpen(false);
	};

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	return (
		<Layout>
			<div className="flex fixed w-full items-center justify-center h-screen bg-gradient-to-br from-blue-200 to-indigo-700">
				<div className="bg-white p-12 rounded-xl shadow-2xl w-full max-w-lg transform hover:scale-105 transition-transform duration-300">
					<h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
						{content[language].login.login}
					</h2>

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
										isDropdownOpen
											? "transform rotate-180"
											: ""
									}`}
								/>
							</button>
							{isDropdownOpen && (
								<div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
									{users.map((user, index) => (
										<button
											key={index}
											onClick={() =>
												handleSelect(user.login)
											}
											className="block w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
										>
											{user.login}
										</button>
									))}
								</div>
							)}
						</div>
					</div>

					<div className="mb-6">
						<label
							htmlFor="password"
							className="block text-xl font-medium text-gray-700 mb-2"
						>
							{content[language].login.password}
						</label>
						<div className="relative">
							<div className="flex items-center mt-2 p-4 pl-4 pr-4 w-full border-2 border-gray-300 rounded-lg text-gray-700">
								<FaLock
									className="text-gray-500 mr-3"
									size={20}
								/>
								<input
									id="password"
									type={
										isPasswordVisible ? "text" : "password"
									}
									className="w-full focus:outline-none"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									placeholder={content[language].login.enter}
								/>
								<div
									className="absolute right-4 cursor-pointer"
									onClick={togglePasswordVisibility}
								>
									{isPasswordVisible ? (
										<FaEyeSlash
											className="text-gray-500"
											size={20}
										/>
									) : (
										<FaEye
											className="text-gray-500"
											size={20}
										/>
									)}
								</div>
							</div>
						</div>
					</div>

					<button
						onClick={handleLogin}
						className="w-full text-center py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform"
					>
						{content[language].login.login}
					</button>
				</div>
			</div>

			<Toaster position="bottom-right" />

			{showPasswordModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-xl w-96">
						<h2 className="text-xl font-bold mb-4">
							{isFirstTimePassword
								? "Set Password"
								: "Password Error"}
						</h2>
						{isFirstTimePassword ? (
							<>
								<p className="mb-4">
									Please set a password for {userType}
								</p>
								<button
									onClick={handleSetPassword}
									className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
								>
									Set Password
								</button>
							</>
						) : (
							<>
								<p className="text-red-500 mb-4">
									{passwordError}
								</p>
								<p className="mb-4">Please try again</p>
							</>
						)}
						<button
							onClick={() => {
								setShowPasswordModal(false);
								setPasswordError("");
							}}
							className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
						>
							Close
						</button>
					</div>
				</div>
			)}
		</Layout>
	);
}

export default LoginPageKSB;

