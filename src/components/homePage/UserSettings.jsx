import React, { useState, useEffect } from "react";
import {
	FaDownload,
	FaSpinner,
	FaCheckCircle,
	FaTimes,
	FaCog,
	FaCloud,
} from "react-icons/fa";

const DownloaderModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [downloadStatus, setDownloadStatus] = useState("idle");
	const [progress, setProgress] = useState(0);
	const [intervalId, setIntervalId] = useState(null);

	// Cleanup interval on unmount
	useEffect(() => {
		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [intervalId]);

	const openModal = () => setIsModalOpen(true);

	const startDownload = () => {
		setDownloadStatus("downloading");
		const newIntervalId = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(newIntervalId);
					setDownloadStatus("completed");
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
				className="relative group bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl
                    flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-xl
                    hover:shadow-indigo-500/20 active:scale-95"
			>
				<div
					className="absolute inset-0 rounded-xl bg-gradient-to-tr from-pink-500 to-indigo-600 opacity-0 
                    group-hover:opacity-100 transition-all duration-500"
				></div>
				<FaCloud className="text-xl relative z-10" />
				<span className="relative z-10 font-medium">
					Download Settings
				</span>
			</button>
		);
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div
				className="absolute inset-0 bg-black/30 backdrop-blur-sm"
				onClick={
					downloadStatus !== "downloading" ? closeModal : undefined
				}
			></div>
			<div
				className="bg-white w-full max-w-md rounded-2xl shadow-2xl transform transition-all duration-300 scale-100
                relative overflow-hidden"
			>
				{/* Progress Bar at the top */}
				{downloadStatus === "downloading" && (
					<div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
						<div
							className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300"
							style={{ width: `${progress}%` }}
						/>
					</div>
				)}

				{downloadStatus === "idle" && (
					<div className="p-6">
						<div className="flex justify-between items-start mb-6">
							<div className="flex items-center gap-4">
								<div
									className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 
                                    flex items-center justify-center text-white shadow-lg"
								>
									<FaCog className="text-2xl animate-spin-slow" />
								</div>
								<div>
									<h2 className="text-xl font-semibold text-gray-800">
										Download Settings
									</h2>
									<p className="text-gray-500 text-sm mt-1">
										Export your preferences
									</p>
								</div>
							</div>
							<button
								onClick={closeModal}
								className="text-gray-400 hover:text-gray-600 transition-colors"
							>
								<FaTimes className="text-xl" />
							</button>
						</div>

						<div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-4 rounded-xl mb-6">
							<p className="text-gray-600">
								Download and save your current settings
								configuration for backup or transfer.
							</p>
						</div>

						<div className="flex justify-end gap-3">
							<button
								onClick={closeModal}
								className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600
                                    hover:bg-gray-50 transition-all duration-300"
							>
								Cancel
							</button>
							<button
								onClick={startDownload}
								className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500
                                    text-white hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300
                                    hover:scale-105 active:scale-95 flex items-center gap-2"
							>
								<FaDownload /> Start Download
							</button>
						</div>
					</div>
				)}

				{downloadStatus === "downloading" && (
					<div className="p-6">
						<div className="flex flex-col items-center justify-center py-4">
							<div className="relative w-24 h-24 mb-6">
								<div className="absolute inset-0 rounded-full border-8 border-indigo-100"></div>
								<div
									className="absolute inset-0 rounded-full border-8 border-indigo-500 border-t-transparent 
                                    animate-spin"
									style={{
										animationDuration: "1s",
										animationTimingFunction: "linear",
										animationIterationCount: "infinite",
									}}
								></div>
								<div className="absolute inset-0 flex items-center justify-center">
									<span className="text-xl font-bold text-indigo-500">
										{progress}%
									</span>
								</div>
							</div>
							<h3 className="text-xl font-semibold text-gray-800 mb-2">
								Downloading Settings...
							</h3>
							<p className="text-gray-500 text-center">
								Please wait while we export your settings
							</p>
						</div>
					</div>
				)}

				{downloadStatus === "completed" && (
					<div className="p-6">
						<div className="flex flex-col items-center justify-center py-4">
							<div
								className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6
                                animate-zoom-in"
							>
								<FaCheckCircle className="text-4xl text-green-500" />
							</div>
							<h3 className="text-xl font-semibold text-gray-800 mb-2">
								Download Complete!
							</h3>
							<p className="text-gray-500 text-center mb-6">
								Your settings have been successfully downloaded
							</p>
							<button
								onClick={closeModal}
								className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500
                                    text-white hover:shadow-lg transition-all duration-300 hover:scale-105 
                                    active:scale-95"
							>
								Close
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default DownloaderModal;

