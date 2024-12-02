import React, { useState } from "react";
import {
	FaDownload,
	FaSpinner,
	FaCheckCircle,
	FaExclamationTriangle,
} from "react-icons/fa";

const DownloaderModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [downloadStatus, setDownloadStatus] = useState("idle");
	const [progress, setProgress] = useState(0);

	const openModal = () => {
		setIsModalOpen(true);
		setDownloadStatus("idle");
		setProgress(0);
	};

	const startDownload = () => {
		setDownloadStatus("downloading");

		// Simulate download process
		let currentProgress = 0;
		const downloadInterval = setInterval(() => {
			currentProgress += 5;
			setProgress(currentProgress);

			if (currentProgress >= 100) {
				clearInterval(downloadInterval);
				setDownloadStatus("completed");
			}
		}, 500);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setDownloadStatus("idle");
		setProgress(0);
	};

	const renderModalContent = () => {
		switch (downloadStatus) {
			case "idle":
				return (
					<div className="text-center p-6">
						<h2 className="text-xl font-bold mb-4">
							Download Settings
						</h2>
						<p className="mb-6">
							Would you like to download your user settings?
						</p>
						<div className="flex justify-center space-x-4">
							<button
								onClick={startDownload}
								className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600 transition"
							>
								<FaDownload className="mr-2" /> Download
							</button>
							<button
								onClick={closeModal}
								className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
							>
								Cancel
							</button>
						</div>
					</div>
				);

			case "downloading":
				return (
					<div className="text-center p-6">
						<FaSpinner className="mx-auto text-4xl text-blue-500 animate-spin mb-4" />
						<h2 className="text-xl font-bold mb-4">
							Downloading Settings
						</h2>
						<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
							<div
								className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
								style={{ width: `${progress}%` }}
							></div>
						</div>
						<p>{progress}% Complete</p>
					</div>
				);

			case "completed":
				return (
					<div className="text-center p-6">
						<FaCheckCircle className="mx-auto text-5xl text-green-500 mb-4" />
						<h2 className="text-xl font-bold mb-4">
							Download Complete
						</h2>
						<p>
							Your user settings have been successfully
							downloaded.
						</p>
						<button
							onClick={closeModal}
							className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
						>
							Close
						</button>
					</div>
				);

			default:
				return (
					<div className="text-center p-6">
						<FaExclamationTriangle className="mx-auto text-5xl text-red-500 mb-4" />
						<h2 className="text-xl font-bold mb-4">
							Download Error
						</h2>
						<p>There was an issue downloading your settings.</p>
						<button
							onClick={closeModal}
							className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
						>
							Try Again
						</button>
					</div>
				);
		}
	};

	if (!isModalOpen) {
		return (
			<button
				onClick={openModal}
				className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600 transition"
			>
				<FaDownload className="mr-2" /> Download Settings
			</button>
		);
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div
				className="bg-white rounded-lg shadow-xl w-96 animate-fade-in-down"
				style={{
					animation: "fade-in-down 0.3s ease-out",
					"@keyframes fade-in-down": {
						"0%": { opacity: "0", transform: "translateY(-20px)" },
						"100%": { opacity: "1", transform: "translateY(0)" },
					},
				}}
			>
				{renderModalContent()}
			</div>
		</div>
	);
};

export default DownloaderModal;
