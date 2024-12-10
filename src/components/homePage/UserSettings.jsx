import React, { useState, useEffect } from "react";
import { FaDownload, FaSpinner, FaCheckCircle, FaTimes } from "react-icons/fa";

const DownloaderModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [downloadStatus, setDownloadStatus] = useState("idle");
	const [progress, setProgress] = useState(0);
	const [intervalId, setIntervalId] = useState(null);

	useEffect(() => {
		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [intervalId]);

	const openModal = () => setIsModalOpen(true);

	const fetchDeviceData = async () => {
		try {
			const ksb_id = localStorage.getItem("ksbIdNumber");
			const device_id = localStorage.getItem("device_id");

			if (!ksb_id || !device_id) {
				console.error("Missing ksb_id or device_id in localStorage");
				return null;
			}

			const url = `http://localhost:8000/api/first/sync/${ksb_id}/${device_id}`;
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			console.log("Fetched Data:", data);

			// Cache the data
			localStorage.setItem("cachedData", JSON.stringify(data));

			// Save the data as a file
			const blob = new Blob([JSON.stringify(data, null, 2)], {
				type: "application/json",
			});
			const link = document.createElement("a");
			link.href = URL.createObjectURL(blob);
			link.download = "settings.json";
			link.click();

			return data;
		} catch (error) {
			console.error("Fetch Error:", error);
			return null;
		}
	};

	const startDownload = () => {
		setDownloadStatus("downloading");
		const newIntervalId = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(newIntervalId);
					setDownloadStatus("completed");
					fetchDeviceData();
					return 100;
				}
				return prev + 10;
			});
		}, 500);
		setIntervalId(newIntervalId);
	};

	const closeModal = () => {
		if (intervalId) {
			clearInterval(intervalId);
		}
		setIsModalOpen(false);
		setDownloadStatus("idle");
		setProgress(0);
		setIntervalId(null);
	};

	if (!isModalOpen) {
		return (
			<button
				onClick={openModal}
				className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
			>
				Download Settings
			</button>
		);
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[444]">
			<div className="bg-white w-96 rounded shadow-lg p-6 relative">
				<button
					onClick={closeModal}
					className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
				>
					<FaTimes />
				</button>
				{downloadStatus === "idle" && (
					<div>
						<h2 className="text-lg font-semibold text-gray-800 mb-2">
							Download Settings
						</h2>
						<p className="text-gray-600 mb-4">
							Click below to download your settings.
						</p>
						<button
							onClick={startDownload}
							className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
						>
							<FaDownload className="inline mr-2" />
							Start Download
						</button>
					</div>
				)}
				{downloadStatus === "downloading" && (
					<div className="text-center">
						<div className="w-full bg-gray-200 h-4 rounded mb-4">
							<div
								className="bg-blue-600 h-4 rounded"
								style={{ width: `${progress}%` }}
							></div>
						</div>
						<p className="text-gray-600">
							Downloading... {progress}%
						</p>
					</div>
				)}
				{downloadStatus === "completed" && (
					<div className="text-center">
						<FaCheckCircle className="text-green-500 text-4xl mb-4" />
						<h2 className="text-lg font-semibold text-gray-800 mb-2">
							Download Complete!
						</h2>
						<p className="text-gray-600 mb-4">
							Your settings have been downloaded successfully.
						</p>
						<button
							onClick={closeModal}
							className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
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

