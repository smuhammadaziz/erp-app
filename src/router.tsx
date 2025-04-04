import { FC, useEffect, useState } from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import IndexPage from "./pages";
import { PopupPage } from "./pages/popup";
import { io } from "socket.io-client";

import LoginPageKSB from "./components/loginPage/login";
import IntroPageKSB from "./components/introPage/intro";
import Loader from "./common/loader";
import SalesMainPage from "./pages/sales/sales";
import CustomersPage from "./pages/customers/customers";
import ProductsPage from "./pages/products/products";
import SettingsPage from "./pages/settings/settings";
import { AuthProvider, ProtectedRoute } from "./context/Auth";
import nodeUrl from "./links";
import TrashPage from "./pages/trash/trash";
import { IoExitOutline } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { FaTimes } from "react-icons/fa";
import content from "./localization/content";
import useLang from "./hooks/useLang";

const socket = io("http://localhost:8000");

const fetchSalesInterval = () => {
	const storedTime = Number(localStorage.getItem("selectedTimeInMs"));
	return storedTime || 900000;
};

export const Router: FC = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [fetchTime, setFetchTime] = useState(fetchSalesInterval());
	const [verified, setVerified] = useState("");
	const [showExitModal, setShowExitModal] = useState(false);
	const [language] = useLang();

	useEffect(() => {
		const isVerified = localStorage.getItem("isVerified");
		if (isVerified) {
			setVerified(isVerified);
		}
	}, []);

	useEffect(() => {
		const handleStorageChange = () => {
			setFetchTime(fetchSalesInterval());
		};

		window.addEventListener("storage", handleStorageChange);

		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, []);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.altKey && e.key === "F4") {
				e.preventDefault();
				setShowExitModal(true);
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	const ksbId = localStorage.getItem("ksbIdNumber");
	const deviceId = localStorage.getItem("device_id");
	const ipaddressPort = localStorage.getItem("ipaddress:port");
	const mainDatabase = localStorage.getItem("mainDatabase");
	const userType = localStorage.getItem("userType");
	const userPassword = localStorage.getItem("userPassword");

	useEffect(() => {
		setTimeout(() => setLoading(false), 20);
	}, []);

	const checkInternetConnection = async () => {
		try {
			const online = window.navigator.onLine;

			if (!online) {
				console.log(
					"No internet connection detected via navigator.onLine.",
				);
				return false;
			}

			const ksbId = localStorage.getItem("ksbIdNumber");
			const ipaddressPort = localStorage.getItem("ipaddress:port");
			const mainDatabase = localStorage.getItem("mainDatabase");
			const userType = localStorage.getItem("userType");
			const userPassword = localStorage.getItem("userPassword");

			const currentBody = {
				"ipaddress:port": ipaddressPort,
				database: mainDatabase,
				username: userType,
				password: userPassword,
			};

			const response = await fetch(`${nodeUrl}/api/check/ping/${ksbId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(currentBody),
			});

			return response.status === 200;
		} catch (error) {
			return false;
		}
	};

	useEffect(() => {
		const sendSalesToAPI = async () => {
			try {
				const updatedFetchTime = fetchSalesInterval();
				setFetchTime(updatedFetchTime);

				const isOnline = await checkInternetConnection();

				if (isOnline) {
					const response = await fetch(
						`${nodeUrl}/api/send/sales/${ksbId}`,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								ip: ipaddressPort,
								project: mainDatabase,
								username: userType,
								password: userPassword,
								device_id: deviceId,
							}),
						},
					);

					const data = await response.json();

					if (data.message === "Sales processing completed") {
						console.log("Sales processing completed");
					} else {
						console.log(
							"Failed to send sales data to API in background",
						);
					}
				} else {
					console.log(
						"No internet connection detected. Sales data not sent to API.",
					);
				}
			} catch (err) {
				console.log(err);
			}
		};

		const interval = setInterval(() => {
			sendSalesToAPI();
		}, fetchTime);

		return () => clearInterval(interval);
	}, [fetchTime]);

	const handleQuit = () => {
		const { app } = window.require("@electron/remote");
		app.quit();
	};

	return loading ? (
		<Loader />
	) : (
		<HashRouter>
			<AuthProvider>
				<Routes>
					<Route path="/">
						<Route
							index
							element={
								verified ? (
									<Navigate to="/login" />
								) : (
									<IntroPageKSB setVerified={setVerified} />
								)
							}
						/>
					</Route>
					<Route
						path="/login"
						element={
							verified ? (
								<LoginPageKSB
									verified={verified}
									socket={socket}
								/>
							) : (
								<Navigate to="/intro" />
							)
						}
					/>
					<Route
						path="/crm"
						element={
							verified ? (
								<IndexPage socket={socket} />
							) : (
								<Navigate to="/intro" />
							)
						}
					/>
					<Route
						path="/intro"
						element={<IntroPageKSB setVerified={setVerified} />}
					/>
					<Route
						path="/sales"
						element={
							<ProtectedRoute>
								<SalesMainPage socket={socket} />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/customers"
						element={
							<ProtectedRoute>
								<CustomersPage socket={socket} />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/products"
						element={
							<ProtectedRoute>
								<ProductsPage socket={socket} />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/trash"
						element={
							<ProtectedRoute>
								<TrashPage socket={socket} />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/settings"
						element={
							<ProtectedRoute>
								<SettingsPage socket={socket} />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</AuthProvider>

			{showExitModal && (
				<div className="fixed inset-0 z-[9999] bg-black bg-opacity-80 flex items-center justify-center p-8">
					<div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 p-10 space-y-6 transform transition-all duration-300 ease-in-out">
						<div className="text-center">
							<IoExitOutline className="text-5xl font-bold mb-4 flex justify-center mx-auto text-center" />
							<h2 className="text-2xl font-bold text-gray-800 mb-2">
								{content[language as string].exit.exit}
							</h2>
							<p className="text-black text-lg mb-6">
								{content[language as string].exit.exitTest}
							</p>
						</div>
						<div className="flex space-x-4">
							<button
								onClick={handleQuit}
								className="flex-1 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-400"
							>
								<ImExit className="mr-2 text-xl" />
								OK
							</button>
							<button
								onClick={() => setShowExitModal(false)}
								className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 flex items-center justify-center py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
							>
								<FaTimes className="mr-2 text-xl" />
								{
									content[language as string].salesPage
										.headerDiscountCancel
								}
							</button>
						</div>
					</div>
				</div>
			)}
		</HashRouter>
	);
};

