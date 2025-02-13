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

const socket = io("http://localhost:8000");

export const Router: FC = () => {
	const [loading, setLoading] = useState<boolean>(true);

	const fetchTime = Number(localStorage.getItem("selectedTimeInMs"));

	const ksbId = localStorage.getItem("ksbIdNumber");
	const ipaddressPort = localStorage.getItem("ipaddress:port");
	const mainDatabase = localStorage.getItem("mainDatabase");
	const userType = localStorage.getItem("userType");
	const userPassword = localStorage.getItem("userPassword");

	useEffect(() => {
		setTimeout(() => setLoading(false), 20);
	}, []);

	// const sendSalesBackground = async () => {
	// 	try {
	// 		const url = `${nodeUrl}/api/send/sales/${ksbId}`;

	// 		const requestBody = {
	// 			ip: ipaddressPort,
	// 			project: mainDatabase,
	// 			username: userType,
	// 			password: userPassword,
	// 		};

	// 		const data = await fetch(url, {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify(requestBody),
	// 		});

	// 		if (data.ok) {
	// 			console.log("ok");
	// 		} else {
	// 			console.log("err");
	// 		}
	// 	} catch (err) {
	// 		console.log("error occured when sending sales background");
	// 	}
	// };

	// const checkInternetConnection = async () => {
	// 	try {
	// 		const online = window.navigator.onLine;

	// 		if (!online) {
	// 			return false;
	// 		}

	// 		const credentials = Buffer.from(
	// 			`${userType}:${userPassword}`,
	// 		).toString("base64");

	// 		const response = await fetch(
	// 			`http://${ipaddressPort}/${mainDatabase}/hs/ksbmerp_pos/ping/ksb?text=pos&ksb_id=${ksbId}`,
	// 			{
	// 				headers: { Authorization: `Basic ${credentials}` },
	// 			},
	// 		);

	// 		return response.status === 200;
	// 	} catch (error) {
	// 		console.error("Error during internet connection check:", error);
	// 		return false;
	// 	}
	// };

	// useEffect(() => {
	// 	let sendSales: any;

	// 	const checkNetwork = async () => {
	// 		const isOnline = await checkInternetConnection();

	// 		if (isOnline) {
	// 			if (!sendSales) {
	// 				sendSales = setInterval(sendSalesBackground, fetchTime);
	// 			}
	// 		} else {
	// 			console.log("Network not available");
	// 			if (sendSales) {
	// 				clearInterval(sendSales);
	// 				sendSales = null;
	// 			}
	// 		}
	// 	};

	// 	const intervalId = setInterval(checkNetwork, 20 * 60 * 1000);

	// 	checkNetwork();

	// 	return () => {
	// 		clearInterval(intervalId);
	// 		if (sendSales) clearInterval(sendSales);
	// 	};
	// }, [fetchTime]);

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
								<ProtectedRoute>
									<IndexPage socket={socket} />
								</ProtectedRoute>
							}
						/>
					</Route>
					<Route
						path="/login"
						element={<LoginPageKSB socket={socket} />}
					/>
					<Route path="/intro" element={<IntroPageKSB />} />
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
								<CustomersPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/products"
						element={
							<ProtectedRoute>
								<ProductsPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/settings"
						element={
							<ProtectedRoute>
								<SettingsPage />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</AuthProvider>
		</HashRouter>
	);
};
