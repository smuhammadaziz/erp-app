import React, { useState, useEffect } from "react";
import { FaSpinner, FaCheckCircle, FaTimes } from "react-icons/fa";
import nodeUrl from "../../links";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { MdOutlinePortableWifiOff } from "react-icons/md";

const DownloaderModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [downloadStatus, setDownloadStatus] = useState("idle");
	const [error, setError] = useState(null);
	const [isNoInternetModalOpen, setIsNoInternetModalOpen] = useState(false);

	const getStorageItem = (key, required = true) => {
		const value = localStorage.getItem(key);
		if (!value && required) {
			throw new Error(`Missing required value for ${key}`);
		}
		return value;
	};

	useEffect(() => {
		const showSettingsModal = localStorage.getItem("showSettingsModal");
		if (showSettingsModal === "true") {
			setIsModalOpen(true);
			localStorage.setItem("showSettingsModal", "false");
		}
	}, []);

	const checkInternetConnection = () => {
		return new Promise((resolve) => {
			fetch("https://www.google.com", {
				mode: "no-cors",
				cache: "no-store",
			})
				.then(() => resolve(true))
				.catch(() => resolve(false));
		});
	};

	const registerDevice = async () => {
		try {
			const requestBody = {
				ksb_id: getStorageItem("ksbIdNumber"),
				device_id: getStorageItem("device_id"),
				name: getStorageItem("device_info"),
				"ipaddress:port": getStorageItem("ipaddress:port"),
				database: getStorageItem("mainDatabase"),
				username: getStorageItem("userType"),
				password:
					localStorage.getItem("userPassword") ===
					"EMPTY_PASSWORD_ALLOWED"
						? ""
						: getStorageItem("userPassword"),
			};

			const response = await fetch(`${nodeUrl}/api/register/device`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestBody),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);
				throw new Error(
					`Device registration failed: ${response.status} ${
						errorData?.message || response.statusText
					}`,
				);
			}

			const data = await response.json();
			console.log("Device registered successfully:", data);
			localStorage.setItem("user_id", data.user_id);
			return true;
		} catch (error) {
			console.error("Register Device Error:", error);
			setError(error.message);
			return false;
		}
	};

	const ksb_id = getStorageItem("ksbIdNumber");
	const device_id = getStorageItem("device_id");
	const ipaddressPort = getStorageItem("ipaddress:port");
	const mainDatabase = getStorageItem("mainDatabase");
	const basicUsername = getStorageItem("userType");
	const basicPassword = getStorageItem("userPassword");

	const fetchDeviceData = async () => {
		try {
			const response = await fetch(
				`${nodeUrl}/api/first/sync/${ksb_id}/${device_id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						"ipaddress:port": ipaddressPort,
						database: mainDatabase,
						userName: basicUsername,
						userPassword: basicPassword,
					}),
				},
			);

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);
				throw new Error(
					`Data sync failed: ${response.status} ${
						errorData?.message || response.statusText
					}`,
				);
			}

			const data = await response.json();
			if (!data) {
				throw new Error("Received empty response from sync API");
			}

			console.log("Sync completed successfully:", data);
			return data;
		} catch (error) {
			console.error("Fetch Device Data Error:", error);
			setError(error.message);
			throw error;
		}
	};

	const startDownload = async () => {
		// First, check internet connection
		const isInternetAvailable = await checkInternetConnection();

		if (!isInternetAvailable) {
			setIsNoInternetModalOpen(true);
			return;
		}

		setDownloadStatus("downloading");
		setError(null);

		try {
			const isRegistered = await registerDevice();
			if (!isRegistered) {
				throw new Error("Device registration failed");
			}

			await fetchDeviceData();
			setDownloadStatus("completed");
		} catch (error) {
			console.error("Download process failed:", error);
			setDownloadStatus("error");
			setError(error.message);
		}
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setDownloadStatus("idle");
		setError(null);
	};

	if (!isModalOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[444]">
			<div className="bg-white w-100 rounded-lg shadow-xl p-8 relative">
				{downloadStatus === "idle" && (
					<div className="w-[500px]">
						<IoCloudDownloadOutline className="text-6xl text-center text-blue-900 flex justify-center mx-auto mb-5" />
						<h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
							Download Settings
						</h2>
						<p className="text-gray-600 text-center mb-6">
							Click below to initiate syncing and logging the
							data.
						</p>
						<button
							onClick={startDownload}
							className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
						>
							Start Sync
						</button>
					</div>
				)}

				{downloadStatus === "downloading" && (
					<div className="text-center w-[500px] h-[180px] items-center justify-center flex flex-col">
						<div className="flex justify-center items-center space-x-4 mb-4">
							<FaSpinner className="animate-spin text-blue-600 text-5xl" />
						</div>
						<p className="text-gray-600 text-2xl">Syncing...</p>
					</div>
				)}

				{downloadStatus === "completed" && (
					<div className="text-center w-[500px]">
						<FaCheckCircle className="text-green-500 text-4xl mb-6" />
						<h2 className="text-xl font-semibold text-gray-800 mb-4">
							Sync Complete!
						</h2>
						<p className="text-gray-600 mb-6">
							Your settings have been synced successfully.
						</p>
						<button
							onClick={closeModal}
							className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
						>
							Done
						</button>
					</div>
				)}

				{downloadStatus === "error" && (
					<div className="text-center w-[500px]">
						<MdErrorOutline className="text-red-500 text-6xl mb-6 flex justify-center mx-auto" />
						<h2 className="text-2xl font-semibold text-gray-800 mb-4">
							Синхронизация не удалась
						</h2>
						<p className="text-red-600 mb-6">
							Устройство уже зарегистрировано
						</p>
						<div className="flex items-center ">
							<button
								onClick={() => setDownloadStatus("idle")}
								className="w-full mx-3  bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
							>
								Try Again
							</button>
							<button
								onClick={() => setDownloadStatus("idle")}
								className="w-full mx-3 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
							>
								KSB-ID dan chiqish
							</button>
						</div>
					</div>
				)}

				{isNoInternetModalOpen && (
					<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[790] p-4">
						<div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all duration-300 ease-in-out scale-100 opacity-100 p-6 text-center">
							<div className="mb-6">
								<span className="text-center mx-auto justify-center block">
									<MdOutlinePortableWifiOff
										size={70}
										className="text-center mx-auto inline-block py-5"
									/>
								</span>
								<h2 className="text-2xl font-bold text-gray-800 mb-2">
									No Internet Connection
								</h2>
								<p className="text-gray-600 mb-4">
									Please check your network connection and try
									again.
								</p>
							</div>
							<button
								onClick={() => {
									setIsNoInternetModalOpen(false);
									setDownloadStatus("idle");
								}}
								className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors duration-300 font-semibold"
							>
								Try Again
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default DownloaderModal;

