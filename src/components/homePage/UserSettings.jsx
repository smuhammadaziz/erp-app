import React, { useState, useEffect } from "react";
import { FaSpinner, FaCheckCircle, FaTimes } from "react-icons/fa";
import nodeUrl from "../../links";

const DownloaderModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [downloadStatus, setDownloadStatus] = useState("idle");
	const [error, setError] = useState(null);

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
			<div className="bg-white w-96 rounded-lg shadow-xl p-8 relative">
				<button
					onClick={closeModal}
					className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
				>
					<FaTimes />
				</button>

				{downloadStatus === "idle" && (
					<div>
						<h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
							Download Settings
						</h2>
						<p className="text-gray-600 text-center mb-6">
							Click below to initiate syncing and logging the
							data.
						</p>
						<button
							onClick={startDownload}
							className="w-full bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
						>
							Start Sync
						</button>
					</div>
				)}

				{downloadStatus === "downloading" && (
					<div className="text-center">
						<div className="flex justify-center items-center space-x-4 mb-4">
							<FaSpinner className="animate-spin text-blue-600 text-4xl" />
						</div>
						<p className="text-gray-600">Syncing...</p>
					</div>
				)}

				{downloadStatus === "completed" && (
					<div className="text-center">
						<FaCheckCircle className="text-green-500 text-4xl mb-6" />
						<h2 className="text-xl font-semibold text-gray-800 mb-4">
							Sync Complete!
						</h2>
						<p className="text-gray-600 mb-6">
							Your settings have been synced successfully.
						</p>
						<button
							onClick={closeModal}
							className="w-full bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
						>
							Done
						</button>
					</div>
				)}

				{downloadStatus === "error" && (
					<div className="text-center">
						<FaTimes className="text-red-500 text-4xl mb-6" />
						<h2 className="text-xl font-semibold text-gray-800 mb-4">
							Sync Failed
						</h2>
						<p className="text-red-600 mb-6">
							{error || "An unexpected error occurred"}
						</p>
						<button
							onClick={() => setDownloadStatus("idle")}
							className="w-full bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
						>
							Try Again
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default DownloaderModal;

