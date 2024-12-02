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

	const openModal = () => setIsModalOpen(true);

	const startDownload = () => {
		setDownloadStatus("downloading");

		const downloadInterval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(downloadInterval);
					setDownloadStatus("completed");
					return 100;
				}
				return prev + 10;
			});
		}, 500);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setDownloadStatus("idle");
		setProgress(0);
	};

	const ModalWrapper = ({ children }) => (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
			<div
				className="bg-white rounded-xl shadow-2xl w-96"
				data-testid="modal-content"
			>
				{children}
			</div>
		</div>
	);

	if (!isModalOpen) {
		return (
			<button
				onClick={openModal}
				className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center 
                   hover:bg-blue-600 transition-all duration-300"
			>
				<FaDownload className="mr-2" /> Download
			</button>
		);
	}

	return (
		<ModalWrapper>
			{downloadStatus === "idle" && (
				<div className="text-center p-6 space-y-4">
					<h2 className="text-xl font-semibold text-gray-800">
						Download Settings
					</h2>
					<p className="text-gray-600 mb-4">
						Ready to download your user settings?
					</p>
					<div className="flex justify-center space-x-3">
						<button
							onClick={startDownload}
							className="bg-blue-500 text-white px-4 py-2 rounded-lg 
                         hover:bg-blue-600 transition-all duration-300"
						>
							<FaDownload className="mr-2 inline" /> Download
						</button>
						<button
							onClick={closeModal}
							className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg 
                         hover:bg-gray-300 transition-all duration-300"
						>
							Cancel
						</button>
					</div>
				</div>
			)}

			{downloadStatus === "downloading" && (
				<div className="text-center p-6 space-y-4">
					<FaSpinner className="mx-auto text-4xl text-blue-500 animate-spin mb-4" />
					<h2 className="text-xl font-semibold text-gray-800">
						Downloading
					</h2>
					<div className="w-full bg-gray-200 rounded-full h-2 mb-4">
						<div
							className="bg-blue-600 h-2 rounded-full transition-all duration-500"
							style={{ width: `${progress}%` }}
						></div>
					</div>
					<p className="text-gray-600">{progress}% Complete</p>
				</div>
			)}

			{downloadStatus === "completed" && (
				<div className="text-center p-6 space-y-4">
					<FaCheckCircle className="mx-auto text-5xl text-green-500 mb-4" />
					<h2 className="text-xl font-semibold text-gray-800">
						Download Complete
					</h2>
					<p className="text-gray-600 mb-4">
						Your settings were successfully downloaded.
					</p>
					<button
						onClick={closeModal}
						className="bg-green-500 text-white px-4 py-2 rounded-lg 
                       hover:bg-green-600 transition-all duration-300"
					>
						Close
					</button>
				</div>
			)}
		</ModalWrapper>
	);
};

export default DownloaderModal;
