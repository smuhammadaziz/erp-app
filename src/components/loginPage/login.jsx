import React, { useEffect, useState, useRef } from "react";
import { Layout } from "../../layout/HomeLayout/layout";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Toaster, toast } from "sonner";

import content from "../../localization/content";
import useLang from "../../hooks/useLang";

import { useAuth } from "../../context/Auth";

import LoginForm from "./components/LoginForm";
import PasswordModal from "./components/PasswordModal";

import nodeUrl from "../../links";

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
	const deviceId = localStorage.getItem("device_id");
	const ipAddressPort = localStorage.getItem("ipaddress:port");
	const mainDatabase = localStorage.getItem("mainDatabase");

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

				const ipAddressPort =
					localStorage.getItem("ipaddress:port") || "";
				const database = localStorage.getItem("mainDatabase") || "";
				const userName = localStorage.getItem("mainUsername") || "";
				const userPass = localStorage.getItem("mainPassword") || "";

				if (cachedData && cachedTimestamp) {
					const isExpired =
						Date.now() - parseInt(cachedTimestamp) > 5 * 60 * 1000;
					if (!isExpired) {
						const parsedData = JSON.parse(cachedData);
						setUsers(parsedData.users);
						setEnterprise(parsedData.enterprise);
						setIsLoading(false);
						return;
					}
				}

				const response = await fetch(`${nodeUrl}/api/login/${ksbId}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						"ipaddress:port": ipAddressPort,
						database: database,
						userName: userName,
						userPass: userPass,
						deviceId: deviceId,
					}),
					signal: abortControllerRef.current.signal,
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();

				localStorage.setItem(
					"enterpriseName",
					data.enterpriseInfo.title,
				);
				localStorage.setItem("enterpriseUUID", data.enterpriseInfo.uid);

				setUsers(data.users);
				setEnterprise(data.enterprise);
			} catch (error) {
				if (error.name === "AbortError") {
					console.log("Fetch aborted");
					return;
				}
				console.error("Fetch error:", error);
				toast.error(content[language].login.error);
			} finally {
				setIsLoading(false);
			}
		};

		const intervalId = setInterval(() => {
			fetchLoginData();
		}, 1000);

		return () => {
			clearInterval(intervalId);
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
			toast.error(content[language].login.selectUserType);
			return;
		}

		try {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 30000);

			const response = await fetch(`${nodeUrl}/api/authenticate`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userType: userType,
					password: password || "",
					ksbId: ksbId,
					deviceId: deviceId,
					ipAddressPort: ipAddressPort,
					database: mainDatabase,
				}),
				signal: controller.signal,
			});

			clearTimeout(timeoutId);

			if (response.status === 403) {
				toast.error(
					<div className="flex items-center text-white">
						<FaTimesCircle className="mr-2" size={20} />
						{content[language].login.databaseBlocked}
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
						{content[language].login.serverError}
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
						{content[language].login.fetchError}
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
						{content[language].login.failedToSetPassword}
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
						{content[language].login.requestTimeOut}
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
						{content[language].login.noInternetConnection}
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
						{content[language].login.connectionError}
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
			toast.error(content[language].login.pleaseEnterPassword);
			return;
		}

		try {
			const response = await fetch(`${nodeUrl}/api/set-password`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userType: userType,
					password: password,
					ksbId: ksbId,
					deviceId: deviceId,
				}),
			});

			const data = await response.json();

			if (data.success) {
				localStorage.setItem("userType", userType);
				setIsFirstTimePassword(false);
				setShowPasswordModal(false);
				toast.success(content[language].login.passwordSetSuccessfully);
				navigate("/");
			} else {
				toast.error(content[language].login.failedToSetPassword);
			}
		} catch (error) {
			console.error(error);
			toast.error(content[language].login.failedToSetPassword);
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

