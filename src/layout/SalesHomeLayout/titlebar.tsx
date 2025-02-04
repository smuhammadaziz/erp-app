import { FC, useEffect, useState } from "react";
import { IoCloseOutline, IoRemove } from "react-icons/io5";
import logo from "../../assets/icon.png";
import { TbArrowsDiagonalMinimize2, TbMaximize } from "react-icons/tb";
import { RiInformation2Fill } from "react-icons/ri";
import { EnterpriseInfoModal } from "./EnterpriseInfoModal";
import { FaWifi } from "react-icons/fa6";
import { MdWifiOff } from "react-icons/md";
import { MdSignalWifiStatusbarConnectedNoInternet4 } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { ImExit } from "react-icons/im";
import { FaTimes } from "react-icons/fa";

const { getCurrentWindow, app } = window.require("@electron/remote");

interface EnterpriseData {
	uid: string;
	title: string;
	ksb_id: string;
}

interface EnterpriseInfo {
	ip: string;
	port: string;
	info_base: string;
	its: string;
}

export const Titlebar: FC = () => {
	const currentWindow = getCurrentWindow();
	const [maximized, setMaximized] = useState<boolean>(
		currentWindow.isMaximized(),
	);
	const [showInfoModal, setShowInfoModal] = useState(false);
	const [isNetworkAvailable, setIsNetworkAvailable] = useState(true);
	const [apiStatus, setApiStatus] = useState<"ok" | "error" | "checking">(
		"checking",
	);

	const [isExitModalOpen, setIsExitModalOpen] = useState(false);

	const checkNetworkStatus = () => {
		if (navigator.onLine) {
			setIsNetworkAvailable(true);
			checkApiConnection();
		} else {
			setIsNetworkAvailable(false);
			setApiStatus("checking");
		}
	};

	const checkApiConnection = async () => {
		const ksbId = localStorage.getItem("ksbIdNumber");
		const ipaddressPort = localStorage.getItem("ipaddress:port");
		const mainDatabase = localStorage.getItem("mainDatabase");
		const userType = localStorage.getItem("userType");
		const userPassword = localStorage.getItem("userPassword");

		const credentials = Buffer.from(`${userType}:${userPassword}`).toString(
			"base64",
		);

		try {
			const response = await fetch(
				`http://${ipaddressPort}/${mainDatabase}/hs/ksbmerp_pos/ping/ksb?text=pos&ksb_id=${ksbId}`,
				{
					headers: { Authorization: `Basic ${credentials}` },
				},
			);
			setApiStatus(response.ok ? "ok" : "error");
		} catch (err) {
			setApiStatus("error");
			console.error(err);
		}
	};

	useEffect(() => {
		checkNetworkStatus();

		// Set up network status listeners
		window.addEventListener("online", checkNetworkStatus);
		window.addEventListener("offline", checkNetworkStatus);

		// Set up API checking every second when online
		let apiCheckInterval: NodeJS.Timeout;
		if (isNetworkAvailable) {
			apiCheckInterval = setInterval(checkApiConnection, 1000); // Check every 1 second
		}

		return () => {
			window.removeEventListener("online", checkNetworkStatus);
			window.removeEventListener("offline", checkNetworkStatus);
			if (apiCheckInterval) {
				clearInterval(apiCheckInterval);
			}
		};
	}, [isNetworkAvailable]);

	useEffect(() => {
		const icon = document.getElementById("icon") as HTMLElement;
		if (icon) {
			icon.ondragstart = () => false;
		}
	}, []);

	const onMinimize = () => currentWindow.minimize();
	const onMaximize = () => {
		const isMaximized = currentWindow.isMaximized();
		setMaximized(!isMaximized);
		isMaximized ? currentWindow.unmaximize() : currentWindow.maximize();
	};
	const onQuit = () => app.quit();

	const enterpriseTitle = localStorage.getItem("enterpriseName");
	const ksbId = localStorage.getItem("ksbIdNumber");

	const getNetworkStatusIcon = () => {
		if (!isNetworkAvailable) {
			return {
				icon: MdWifiOff,
				title: "Интернет мавжуд эмас",
				className: "text-red-600 font-bold hover:text-red-600",
			};
		}
		if (apiStatus === "ok") {
			return {
				icon: FaWifi,
				title: "Интернет мавжуд",
				className: "text-green-600 font-bold hover:text-green-600",
			};
		}
		return {
			icon: MdSignalWifiStatusbarConnectedNoInternet4,
			title: "Сервер билан алоқа йўқ",
			className: "text-yellow-600 font-bold hover:text-yellow-600",
		};
	};

	const NetworkStatus = () => {
		const { icon: Icon, title, className } = getNetworkStatusIcon();

		return (
			<div className="network-status-indicator transition-all duration-300 ease-in-out mr-5">
				<button
					title={title}
					className="cursor-pointer focus:outline-none hover:bg-gray-700 p-1 transition-colors duration-200 rounded-sm -webkit-app-region-no-drag"
					style={
						{ WebkitAppRegion: "no-drag" } as React.CSSProperties
					}
				>
					<Icon className={className} />
				</button>
			</div>
		);
	};

	return (
		<div className="title-bar sticky top-0 select-none justify-between z-[999]">
			<div className="menu-button-container flex items-center">
				<img
					id="icon"
					src={logo}
					className="menu-icon select-none"
					alt="amethyst"
				/>
				<span className="text-white flex items-center ml-1">
					<p className="text-slate-400 font-bold">KSB-MERP</p>
				</span>
			</div>
			<div className="mx-auto text-white items-center mt-1">
				<span>
					{ksbId ? (
						<p className="uppercase ">
							<span className="font-bold text-md mr-3">
								{enterpriseTitle}
							</span>
							<span className="font-bold text-md">
								(<span>KSB-ID </span>
								<span className="underline ml-1">{ksbId}</span>)
							</span>
						</p>
					) : (
						<p className="mr-2 uppercase">-</p>
					)}
				</span>
			</div>
			<div className="window-controls-container flex items-center">
				<NetworkStatus />
				<button
					title="informations"
					className="cursor-pointer focus:outline-none hover:bg-gray-700 p-1 mr-5 transition-colors duration-200 rounded-sm -webkit-app-region-no-drag"
					onClick={() => setShowInfoModal(true)}
					style={
						{ WebkitAppRegion: "no-drag" } as React.CSSProperties
					}
				>
					<RiInformation2Fill className="text-gray-200 hover:text-white transition-colors duration-200" />
				</button>
				<button
					title="Minimize"
					className="minimize-button focus:outline-none hover:bg-gray-700 p-1 -webkit-app-region-no-drag"
					onClick={onMinimize}
					style={
						{ WebkitAppRegion: "no-drag" } as React.CSSProperties
					}
				>
					<IoRemove />
				</button>
				<button
					title="Maximize"
					className="min-max-button focus:outline-none hover:bg-gray-700 p-1 -webkit-app-region-no-drag"
					onClick={onMaximize}
					style={
						{ WebkitAppRegion: "no-drag" } as React.CSSProperties
					}
				>
					{maximized ? <TbArrowsDiagonalMinimize2 /> : <TbMaximize />}
				</button>
				<button
					onClick={() => setIsExitModalOpen(true)}
					title="Close"
					style={
						{ WebkitAppRegion: "no-drag" } as React.CSSProperties
					}
					className="close-button focus:outline-none hover:bg-gray-700 p-1 -webkit-app-region-no-drag"
					// onClick={onQuit}
				>
					<IoCloseOutline />
				</button>
			</div>
			<EnterpriseInfoModal
				isOpen={showInfoModal}
				onClose={() => setShowInfoModal(false)}
			/>

			{isExitModalOpen && (
				<div className="fixed inset-0 z-10  bg-black bg-opacity-50 flex items-center justify-center p-4">
					<div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 p-6 space-y-6 transform transition-all duration-300 ease-in-out">
						<div className="text-center">
							<h2 className="text-2xl font-bold text-gray-800 mb-2">
								Чиқиш
							</h2>
							<p className="text-gray-600 mb-6">
								Ҳақиқатан ҳам савдо саҳифасидан чиқмоқчимисиз?
							</p>
						</div>
						<div className="flex space-x-4">
							<NavLink
								to="/"
								className="flex-1 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-400"
							>
								<ImExit className="mr-2 text-xl" />
								Ҳа, чиқиш
							</NavLink>
							<button
								onClick={() => setIsExitModalOpen(false)}
								className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 flex items-center justify-center py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
							>
								<FaTimes className="mr-2 text-xl" />
								Бекор қилиш
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
