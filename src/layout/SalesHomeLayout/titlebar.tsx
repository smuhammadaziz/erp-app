import { FC, useEffect, useState } from "react";
import { IoCloseOutline, IoRemove } from "react-icons/io5";
import logo from "../../assets/icon.png";
import { TbArrowsDiagonalMinimize2, TbMaximize } from "react-icons/tb";
import { RiInformation2Fill } from "react-icons/ri";
import { EnterpriseInfoModal } from "./EnterpriseInfoModal";
import { FaWifi } from "react-icons/fa6";
import { MdWifiOff } from "react-icons/md";
import { GoAlertFill } from "react-icons/go";

const { getCurrentWindow, app } = window.require("@electron/remote");

import nodeUrl from "../../links";

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

	// Network status check function
	const checkNetworkStatus = () => {
		if (navigator.onLine) {
			setIsNetworkAvailable(true);
		} else {
			setIsNetworkAvailable(false);
		}
	};

	// Add event listeners for network status
	useEffect(() => {
		// Initial check
		checkNetworkStatus();

		// Add event listeners
		window.addEventListener("online", checkNetworkStatus);
		window.addEventListener("offline", checkNetworkStatus);

		// Cleanup event listeners
		return () => {
			window.removeEventListener("online", checkNetworkStatus);
			window.removeEventListener("offline", checkNetworkStatus);
		};
	}, []);

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
				<div
					className={`
                        network-status-indicator 
                        transition-all 
                        duration-300 
                        ease-in-out 
                        mr-5 
                        ${
							isNetworkAvailable
								? "opacity-100 scale-100"
								: "opacity-0 scale-75 hidden"
						}`}
				>
					<button
						title="Интернет мавжуд"
						className="cursor-pointer focus:outline-none hover:bg-gray-700 p-1 transition-colors duration-200 rounded-sm -webkit-app-region-no-drag"
						style={
							{
								WebkitAppRegion: "no-drag",
							} as React.CSSProperties
						}
					>
						<FaWifi className="text-green-600 font-bold hover:text-green-600 transition-colors duration-200" />
					</button>
				</div>
				<div
					className={`
                        network-status-indicator 
                        transition-all 
                        duration-300 
                        ease-in-out 
                        mr-5 
                        ${
							!isNetworkAvailable
								? "opacity-100 scale-100"
								: "opacity-0 scale-75 hidden"
						}`}
				>
					<button
						title="Интернет мавжуд эмас"
						className="cursor-pointer focus:outline-none hover:bg-gray-700 p-1 transition-colors duration-200 rounded-sm -webkit-app-region-no-drag"
						style={
							{
								WebkitAppRegion: "no-drag",
							} as React.CSSProperties
						}
					>
						<GoAlertFill className="text-red-600 font-bold hover:text-red-600 transition-colors duration-200" />
					</button>
				</div>
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
					title="Close"
					className="close-button focus:outline-none hover:bg-gray-700 p-1 -webkit-app-region-no-drag"
					onClick={onQuit}
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
		</div>
	);
};
