import React, { useState, useEffect } from "react";
import { FaSpinner, FaCheckCircle, FaTimes } from "react-icons/fa";

import nodeUrl from "../../links";

const DownloaderModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [downloadStatus, setDownloadStatus] = useState("idle");

	const basicUsername = localStorage.getItem("userType");
	const basicPassword = localStorage.getItem("userPassword");
	const ipaddressPort = localStorage.getItem("ipaddress:port");
	const mainDatabase = localStorage.getItem("mainDatabase");

	useEffect(() => {
		const showSettingsModal = localStorage.getItem("showSettingsModal");

		if (showSettingsModal === "true") {
			console.log("Opening modal as showSettingsModal is true");
			setIsModalOpen(true);
			localStorage.setItem("showSettingsModal", "false");
		}
	}, []);

	const registerDevice = async () => {
		try {
			const ksb_id = localStorage.getItem("ksbIdNumber");
			const device_id = localStorage.getItem("device_id");
			const user_type = localStorage.getItem("userType");
			const name_os = localStorage.getItem("device_info");
			let password = localStorage.getItem("userPassword");

			if (!ksb_id || !device_id || !user_type || !name_os) {
				console.error("Missing data in localStorage");
				return false;
			}

			if (password === "EMPTY_PASSWORD_ALLOWED") {
				password = "";
			}

			const requestBody = {
				ksb_id: ksb_id,
				device_id: device_id,
				name: name_os,
				"ipaddress:port": ipaddressPort,
				database: mainDatabase,
				username: user_type,
				password: password,
			};

			const response = await fetch(`${nodeUrl}/api/register/device`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestBody),
			});

			if (response.status === 200) {
				console.log("Device Registered Successfully");
				return true;
			} else {
				console.error(
					`Device Registration Failed! Status: ${response.status}`,
				);
				return false;
			}
		} catch (error) {
			console.error("Register Device Error:", error);
			return false;
		}
	};

	const fetchDeviceData = async () => {
		try {
			const ksb_id = localStorage.getItem("ksbIdNumber");
			const device_id = localStorage.getItem("device_id");

			if (!ksb_id || !device_id) {
				console.error("Missing ksb_id or device_id in localStorage");
				return;
			}

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

			if (response.ok) {
				const data = await response.json();
				console.log("Sync Data:", data);
			} else {
				throw new Error(`Sync API error! Status: ${response.status}`);
			}
		} catch (error) {
			console.error("Fetch Device Data Error:", error);
		}
	};

	const startDownload = async () => {
		setDownloadStatus("downloading");

		const isRegistered = await registerDevice();
		if (isRegistered) {
			await fetchDeviceData();
			setDownloadStatus("completed");
		} else {
			setDownloadStatus("idle");
		}
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setDownloadStatus("idle");
	};

	if (!isModalOpen) {
		return null;
	}

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
							Your settings have been synced successfully and
							logged to the console.
						</p>
						<button
							onClick={closeModal}
							className="w-full bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
						>
							Done
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default DownloaderModal;

