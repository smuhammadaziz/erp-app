import React, { useState, useEffect } from "react";
import { Layout } from "../../layout/Layout";
import { Toaster, toast } from "sonner";
import {
	FaCheckCircle,
	FaExclamationCircle,
	FaKey,
	FaWifi,
	FaTimesCircle,
	FaNetworkWired,
} from "react-icons/fa";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Loader from "../../common/loader";
import content from "../../localization/content";
import useLang from "../../hooks/useLang";
import base64 from "base-64";
import { MdOutlinePortableWifiOff } from "react-icons/md";

function IntroPageKSB() {
	const [ksbId, setKsbId] = useState("");
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState();
	const [isOnline, setIsOnline] = useState(navigator.onLine);
	const [showNetworkModal, setShowNetworkModal] = useState(false);
	const navigate = useNavigate();
	const [language] = useLang("uz");

	useEffect(() => {
		const loadingTimer = setTimeout(() => setLoading(false), 555);

		const handleOnline = () => {
			setIsOnline(true);
			setShowNetworkModal(false);
			toast.success(content[language].intro.networkRestored, {
				icon: <FaWifi />,
				style: { backgroundColor: "#22c55e", color: "white" },
			});
		};

		const handleOffline = () => {
			setIsOnline(false);
			setShowNetworkModal(true);
			toast.error(content[language].intro.networkLost, {
				icon: <FaTimesCircle />,
				style: { backgroundColor: "#ef4444", color: "white" },
			});
		};

		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);

		return () => {
			clearTimeout(loadingTimer);
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, [language]);

	const handleSignIn = async (e) => {
		e.preventDefault();

		if (!navigator.onLine) {
			setShowNetworkModal(true);
			return;
		}

		if (!ksbId || ksbId.length !== 8) {
			toast.error(content[language].intro.error, {
				icon: <FaExclamationCircle />,
				style: { backgroundColor: "#ef4444", color: "white" },
			});
			return;
		}

		try {
			const username = "Bot";
			const password = "123";
			const credentials = base64.encode(`${username}:${password}`);
			const response = await fetch(`http://localhost:8000/api/${ksbId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Basic ${credentials}`,
				},
			});
			const data = await response.json();
			const getMessage = () => {
				if (data.message && data.message[language]) {
					return data.message[language];
				}
				return data.message?.uz || "Unknown error";
			};

			if (data.status === "successfully") {
				toast.success(data.status, {
					icon: <FaCheckCircle />,
					style: { backgroundColor: "#22c55e", color: "white" },
				});
				setData(data);
				navigate("/login");
			} else if (data.status === "error") {
				toast.error(getMessage(), {
					icon: <FaExclamationCircle />,
					style: { backgroundColor: "#ef4444", color: "white" },
				});
			} else {
				toast(getMessage(), {
					icon: <FaExclamationCircle />,
					style: { backgroundColor: "#f5c000", color: "black" },
				});
			}
		} catch (error) {
			console.error("Error:", error);
			toast.error(content[language].intro.serverError, {
				icon: <FaExclamationCircle />,
				style: { backgroundColor: "#ef4444", color: "white" },
			});
		}
	};

	// Network Connection Modal
	const NetworkModal = () => {
		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
				<div className="w-full max-w-md p-6 rounded-2xl shadow-2xl bg-red-50 border-2 border-red-500">
					<div className="flex items-center mb-4">
						<MdOutlinePortableWifiOff
							className="text-red-500 mr-4"
							size={40}
						/>
						<h2 className="text-2xl font-bold text-red-800">
							No Network Connection
						</h2>
					</div>
					<p className="text-red-800 text-lg mb-6">
						{content[language].intro.noNetworkConnection}
					</p>
					<div className="flex items-center justify-center">
						<span className="ml-2 text-red-800">
							Waiting for network...
						</span>
					</div>
				</div>
			</div>
		);
	};

	return (
		<Layout>
			{loading ? (
				<Loader />
			) : (
				<div className="flex fixed w-full h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-600">
					<div className="bg-white p-10 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300 space-y-8 max-w-md">
						<div className="text-center space-y-4">
							<img
								src={logo}
								alt="logo"
								className="w-48 mx-auto"
							/>
							<h1 className="text-3xl font-bold text-gray-800">
								{content[language].intro.welcome}
							</h1>
							<p className="text-gray-600">
								{content[language].intro.please}
							</p>
						</div>
						<div className="relative">
							<input
								type="text"
								placeholder={content[language].intro.enter}
								value={ksbId}
								onChange={(e) =>
									setKsbId(e.target.value.slice(0, 8))
								}
								maxLength={8}
								disabled={!isOnline}
								className={`w-full px-5 py-3 pl-10 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition duration-200 ${
									!isOnline
										? "bg-gray-200 cursor-not-allowed"
										: ""
								}`}
							/>
							<FaKey
								className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
								size={20}
							/>
						</div>
						<div>
							<button
								onClick={handleSignIn}
								disabled={!isOnline}
								className={`w-full py-3 text-white font-semibold rounded-lg shadow-lg transition duration-300 text-lg ${
									isOnline
										? "bg-blue-600 hover:bg-blue-700"
										: "bg-gray-400 cursor-not-allowed"
								}`}
							>
								{content[language].intro.send}
							</button>
						</div>
					</div>
				</div>
			)}
			{showNetworkModal && <NetworkModal />}
			<Toaster position="bottom-right" />
		</Layout>
	);
}

export default IntroPageKSB;

