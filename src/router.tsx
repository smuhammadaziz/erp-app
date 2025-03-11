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
	const deviceId = localStorage.getItem("device_id");
	const ipaddressPort = localStorage.getItem("ipaddress:port");
	const mainDatabase = localStorage.getItem("mainDatabase");
	const userType = localStorage.getItem("userType");
	const userPassword = localStorage.getItem("userPassword");

	useEffect(() => {
		setTimeout(() => setLoading(false), 20);
	}, []);

	const [lastUpdateTime, setLastUpdateTime] = useState(0);

	// useEffect(() => {
	// 	const updateHandler = () => {
	// 		const now = Date.now();
	// 		// Only update if at least 5 seconds have passed since last update
	// 		if (now - lastUpdateTime > 5000) {
	// 			fetchingProductUpdateData();
	// 			setLastUpdateTime(now);
	// 		}
	// 	};

	// 	socket.on("gettingAllUpdatedProductData", updateHandler);

	// 	return () => {
	// 		socket.off("gettingAllUpdatedProductData", updateHandler);
	// 	};
	// }, [lastUpdateTime]);

	// const fetchingProductUpdateData = async () => {
	// 	try {
	// 		const response = await fetch(
	// 			`${nodeUrl}/api/update/product_update/data/${deviceId}/${ksbId}`,
	// 			{
	// 				method: "POST",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 			},
	// 		);

	// 		if (!response.ok) {
	// 			throw new Error(`ERROR PRODUCT_UPDATE: ${response.status}`);
	// 		}
	// 	} catch (error) {
	// 		console.error("Error fetching symbol data:", error);
	// 	}
	// };

	// useEffect(() => {
	// 	fetchingResponseSyncing();

	// 	const updateHandler = () => fetchingResponseSyncing();
	// 	socket.on("fetchingSyncingData", updateHandler);

	// 	return () => {
	// 		socket.off("fetchingSyncingData", updateHandler);
	// 	};
	// }, []);

	// const fetchingResponseSyncing = async () => {
	// 	try {
	// 		const responseSyncing = await fetch(
	// 			`${nodeUrl}/api/syncing/${ksbId}/${deviceId}`,
	// 			{
	// 				method: "POST",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 				body: JSON.stringify({
	// 					"ipaddress:port": ipaddressPort,
	// 					database: mainDatabase,
	// 					userName: userType,
	// 					userPassword: userPassword,
	// 				}),
	// 			},
	// 		);

	// 		if (!responseSyncing.ok) {
	// 			throw new Error(`ERROR SYNCING: ${responseSyncing.status}`);
	// 		}
	// 	} catch (error) {
	// 		console.error("Error fetching symbol data:", error);
	// 	}
	// };

	// =============================

	// useEffect(() => {
	// 	fetchUpdatingSymbolData();

	// 	const updateHandler = () => fetchUpdatingSymbolData();
	// 	socket.on("updatingSymbols", updateHandler);

	// 	return () => {
	// 		socket.off("updatingSymbols", updateHandler);
	// 	};
	// }, []);

	// const fetchUpdatingSymbolData = async () => {
	// 	try {
	// 		const response = await fetch(
	// 			`${nodeUrl}/api/update/symbol/data/${deviceId}/${ksbId}`,
	// 			{
	// 				method: "POST",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 				body: JSON.stringify({
	// 					"ipaddress:port": ipaddressPort,
	// 					database: mainDatabase,
	// 					userName: userType,
	// 					userPassword: userPassword,
	// 				}),
	// 			},
	// 		);

	// 		if (!response.ok) {
	// 			throw new Error(`HTTP error! Status: ${response.status}`);
	// 		}
	// 	} catch (error) {
	// 		console.error("Error fetching symbol data:", error);
	// 	}
	// };

	// useEffect(() => {
	// 	fetchUpdatingCurrencyData();

	// 	const updateHandler = () => fetchUpdatingCurrencyData();
	// 	socket.on("updatingCurrencies", updateHandler);

	// 	return () => {
	// 		socket.off("updatingCurrencies", updateHandler);
	// 	};
	// }, []);

	// const fetchUpdatingCurrencyData = async () => {
	// 	try {
	// 		const response = await fetch(
	// 			`${nodeUrl}/api/update/currency/data/${deviceId}/${ksbId}`,
	// 			{
	// 				method: "POST",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 				body: JSON.stringify({
	// 					"ipaddress:port": ipaddressPort,
	// 					database: mainDatabase,
	// 					userName: userType,
	// 					userPassword: userPassword,
	// 				}),
	// 			},
	// 		);

	// 		if (!response.ok) {
	// 			throw new Error(`HTTP error! Status: ${response.status}`);
	// 		}
	// 	} catch (error) {
	// 		console.error("Error fetching symbol data:", error);
	// 	}
	// };

	// useEffect(() => {
	// 	fetchUpdatingPriceTypeData();

	// 	const updateHandler = () => fetchUpdatingPriceTypeData();
	// 	socket.on("updatingPriceType", updateHandler);

	// 	return () => {
	// 		socket.off("updatingPriceType", updateHandler);
	// 	};
	// }, []);

	// const fetchUpdatingPriceTypeData = async () => {
	// 	try {
	// 		const response = await fetch(
	// 			`${nodeUrl}/api/update/price_type/data/${deviceId}/${ksbId}`,
	// 			{
	// 				method: "POST",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 				body: JSON.stringify({
	// 					"ipaddress:port": ipaddressPort,
	// 					database: mainDatabase,
	// 					userName: userType,
	// 					userPassword: userPassword,
	// 				}),
	// 			},
	// 		);

	// 		if (!response.ok) {
	// 			throw new Error(`HTTP error! Status: ${response.status}`);
	// 		}
	// 	} catch (error) {
	// 		console.error("Error fetching symbol data:", error);
	// 	}
	// };

	// useEffect(() => {
	// 	fetchWarehouseData();

	// 	const updateHandler = () => fetchWarehouseData();
	// 	socket.on("updatingWarehouse", updateHandler);

	// 	return () => {
	// 		socket.off("updatingWarehouse", updateHandler);
	// 	};
	// }, []);

	// const fetchWarehouseData = async () => {
	// 	try {
	// 		const response = await fetch(
	// 			`${nodeUrl}/api/update/warehouse/data/${deviceId}/${ksbId}`,
	// 			{
	// 				method: "POST",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 				body: JSON.stringify({
	// 					"ipaddress:port": ipaddressPort,
	// 					database: mainDatabase,
	// 					userName: userType,
	// 					userPassword: userPassword,
	// 				}),
	// 			},
	// 		);

	// 		if (!response.ok) {
	// 			throw new Error(`HTTP error! Status: ${response.status}`);
	// 		}
	// 	} catch (error) {
	// 		console.error("Error fetching symbol data:", error);
	// 	}
	// };

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

