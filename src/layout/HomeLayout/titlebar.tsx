import { FC, useEffect, useState } from "react";
import { IoCloseOutline, IoRemove } from "react-icons/io5";
import logo from "../../assets/icon.png";
import { TbArrowsDiagonalMinimize2, TbMaximize } from "react-icons/tb";
import { RiInformation2Fill } from "react-icons/ri";
import { EnterpriseInfoModal } from "./EnterpriseInfoModal";

const { getCurrentWindow, app } = window.require("@electron/remote");

import { ImExit } from "react-icons/im";
import { FaTimes } from "react-icons/fa";

import { FaWifi } from "react-icons/fa6";
import { MdWifiOff } from "react-icons/md";

import content from "../../localization/content";
import useLang from "../../hooks/useLang";

import { IoExitOutline } from "react-icons/io5";

import { MdSignalWifiStatusbarConnectedNoInternet4 } from "react-icons/md";

import nodeUrl from "../../links";

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

	const [language] = useLang();

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

		window.addEventListener("online", checkNetworkStatus);
		window.addEventListener("offline", checkNetworkStatus);

		let apiCheckInterval: NodeJS.Timeout;
		if (isNetworkAvailable) {
			apiCheckInterval = setInterval(checkApiConnection, 20 * 60 * 1000);
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

	const ksbId = localStorage.getItem("ksbIdNumber");
	const enterpriseTitle = localStorage.getItem("enterpriseName");

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
					className="cursor-pointer relative focus:outline-none hover:bg-gray-700 p-1 mr-5 transition-colors duration-200 rounded-sm -webkit-app-region-no-drag"
					onClick={() => setShowInfoModal(true)}
					style={
						{ WebkitAppRegion: "no-drag" } as React.CSSProperties
					}
				>
					<RiInformation2Fill className="text-gray-200 hover:text-white transition-colors duration-200" />
					{/* <span
						style={{
							position: "absolute",
							top: "0",
							left: "0",
							width: "8px",
							height: "8px",
							backgroundColor: "orange",
							borderRadius: "50%",
							border: "",
							transform: "translate(-20%, -10%)", // Adjust to center the dot on the corner
						}}
					></span> */}
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
					title="Close"
					className="close-button focus:outline-none hover:bg-gray-700 p-1 -webkit-app-region-no-drag"
					onClick={() => setIsExitModalOpen(true)}
					style={
						{ WebkitAppRegion: "no-drag" } as React.CSSProperties
					}
				>
					<IoCloseOutline />
				</button>
			</div>
			<EnterpriseInfoModal
				isOpen={showInfoModal}
				onClose={() => setShowInfoModal(false)}
			/>

			{isExitModalOpen && (
				<div className="fixed inset-0 z-10  bg-black bg-opacity-80 flex items-center justify-center p-8">
					<div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 p-10 space-y-6 transform transition-all duration-300 ease-in-out">
						<div className="text-center">
							<IoExitOutline className="text-5xl font-bold mb-4 flex justify-center mx-auto text-center" />
							<h2 className="text-2xl font-bold text-gray-800 mb-2">
								{content[language as string].exit.exit}
							</h2>
							<p className="text-black text-lg mb-6">
								{content[language as string].exit.exitTest}
							</p>
						</div>
						<div className="flex space-x-4">
							<button
								onClick={onQuit}
								className="flex-1 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-400"
							>
								<ImExit className="mr-2 text-xl" />
								OK
							</button>
							<button
								onClick={() => setIsExitModalOpen(false)}
								className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 flex items-center justify-center py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
							>
								<FaTimes className="mr-2 text-xl" />
								{
									content[language as string].salesPage
										.headerDiscountCancel
								}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

