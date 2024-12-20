import { FC, useEffect, useState } from "react";
import { IoCloseOutline, IoRemove } from "react-icons/io5";
import logo from "../../assets/icon.png";
import { TbArrowsDiagonalMinimize2, TbMaximize } from "react-icons/tb";
import { RiInformation2Fill } from "react-icons/ri";
import { EnterpriseInfoModal } from "./EnterpriseInfoModal";

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
	const [data, setData] = useState<EnterpriseData | null>(null);
	const [info, setInfo] = useState<EnterpriseInfo | null>(null);
	const [showInfoModal, setShowInfoModal] = useState(false);

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
	const ipaddressPort = localStorage.getItem("ipaddress:port");
	const mainDatabase = localStorage.getItem("mainDatabase");
	const mainUserType = localStorage.getItem("mainUsername");
	const mainUserPass = localStorage.getItem("mainPassword");

	useEffect(() => {
		const fetchLoginData = async () => {
			try {
				const credentials = Buffer.from(
					`${mainUserType}:${mainUserPass}`,
				).toString("base64");

				const response = await fetch(
					`http://${ipaddressPort}/${mainDatabase}/hs/ksbmerp_pos/users/ksb?text=pos&ksb_id=${ksbId}`,
					{
						headers: {
							Authorization: `Basic ${credentials}`,
						},
					},
				);

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const result = await response.json();

				if (result.enterprise) {
					setData(result.enterprise);
				} else {
					console.error("Unexpected response structure:", result);
				}
			} catch (err) {
				console.error("Error fetching data:", err);
			}
		};

		fetchLoginData();
	}, []);

	useEffect(() => {
		const fetchLoginData = async () => {
			try {
				const username = "Demo";
				const password = "";
				const credentials = Buffer.from(
					`${username}:${password}`,
				).toString("base64");

				const response = await fetch(
					`http://217.30.169.88:13080/KSB_CRM/hs/workplace/ksb-info/${ksbId}`,
					{
						headers: {
							Authorization: `Basic ${credentials}`,
						},
					},
				);

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const result = await response.json();

				if (result) {
					setInfo(result);
					// console.log(result);
				} else {
					console.error("Unexpected response structure:", result);
				}
			} catch (err) {
				console.error("Error fetching info:", err);
			}
		};

		fetchLoginData();
	}, []);

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
					{data ? (
						<p className="uppercase ">
							<span className="mr-4 ">{data.title}</span>
							<span className="font-bold text-md">
								(<span>KSB-ID</span>
								<span className="underline ml-2">
									{data.ksb_id}
								</span>
								)
							</span>
						</p>
					) : (
						<p className="mr-2 uppercase">Loading...</p>
					)}
				</span>
			</div>
			<div className="window-controls-container flex items-center">
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
				info={info}
			/>
		</div>
	);
};

