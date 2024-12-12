import React, { useEffect, useState, useRef } from "react";
import { Layout } from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Toaster, toast } from "sonner";
import content from "../../localization/content";
import useLang from "../../hooks/useLang";
import { useAuth } from "../../context/Auth";

import LoginForm from "./components/LoginForm";
import PasswordModal from "./components/PasswordModal";

function LoginPageKSB() {
	const { login } = useAuth();
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

				// const username = "User";
				// const password = "123";
				// const credentials = Buffer.from(
				// 	`${username}:${password}`,
				// ).toString("base64");

				const response = await fetch(
					`http://localhost:8000/api/login/${ksbId}`,
					{
						signal: abortControllerRef.current.signal,
						headers: {
							// "Cache-Control": "no-cache",
							// Pragma: "no-cache",
							// Authorization: `Basic ${credentials}`,
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

				// console.log(data.list_users);

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

	const handleLogin = async (e) => {
		if (e && e.preventDefault) {
			e.preventDefault();
		}

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
				login(data.token);
				localStorage.setItem("userType", userType);
				const passwordToStore = password || "EMPTY_PASSWORD_ALLOWED";

				localStorage.setItem("showSettingsModal", data.showSettings);
				localStorage.setItem("userPassword", passwordToStore);
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

			console.log("myyyy:", data);

			if (data.success) {
				localStorage.setItem("userType", userType);
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
				<LoginForm
					userType={userType}
					password={password}
					isDropdownOpen={isDropdownOpen}
					isPasswordVisible={isPasswordVisible}
					users={users}
					handleLogin={handleLogin}
					toggleDropdown={toggleDropdown}
					handleSelect={handleSelect}
					setPassword={setPassword}
					togglePasswordVisibility={togglePasswordVisibility}
					content={content}
					language={language}
				/>
			</div>

			<Toaster position="bottom-right" />

			{showPasswordModal && (
				<PasswordModal
					isFirstTimePassword={isFirstTimePassword}
					userType={userType}
					passwordError={passwordError}
					handleSetPassword={handleSetPassword}
					onClose={() => {
						setShowPasswordModal(false);
						setPasswordError("");
					}}
				/>
			)}
		</Layout>
	);
}

export default LoginPageKSB;

