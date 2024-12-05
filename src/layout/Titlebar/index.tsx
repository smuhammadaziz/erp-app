import { FC, useEffect, useState } from "react";
import {
	IoCloseOutline,
	IoContractOutline,
	IoExpandOutline,
	IoRemove,
} from "react-icons/io5";
import logo from "../../assets/icon.png";

import { TbArrowsDiagonalMinimize2 } from "react-icons/tb";
import { TbMaximize } from "react-icons/tb";

const { getCurrentWindow, app } = window.require("@electron/remote");

export const Titlebar: FC = () => {
	const currentWindow = getCurrentWindow();
	const [maximized, setMaximized] = useState(currentWindow.isMaximized());

	useEffect(() => {
		const icon = document.getElementById("icon") as HTMLElement;
		icon.ondragstart = () => false;
	});

	const onMinimize = () => currentWindow.minimize();
	const onMaximize = () => {
		setMaximized(!currentWindow.isMaximized());
		currentWindow.isMaximized()
			? currentWindow.unmaximize()
			: currentWindow.maximize();
	};
	const onQuit = () => app.quit();
	return (
		<div className="title-bar sticky top-0 select-none">
			<div className="menu-button-container">
				<img
					id="icon"
					src={logo}
					className="menu-icon select-none"
					alt="amethyst"
				/>
				<span className="text-white flex items-center">
					<p className="mr-2 uppercase">Dekor Land</p>
					(KSB-MERP)
				</span>
			</div>
			<div className="app-name-container select-none uppercase"></div>
			<div className="window-controls-container">
				<button
					title="Minimize"
					className="minimize-button focus:outline-none hover:bg-gray-700 p-1"
					onClick={onMinimize}
				>
					<IoRemove />
				</button>
				<button
					title="Maximize"
					className="min-max-button focus:outline-none hover:bg-gray-700 p-1"
					onClick={onMaximize}
				>
					{maximized ? <TbArrowsDiagonalMinimize2 /> : <TbMaximize />}
				</button>
				<button
					title="Close"
					className="close-button focus:outline-none hover:bg-gray-700 p-1"
					onClick={onQuit}
				>
					<IoCloseOutline />
				</button>
			</div>
		</div>
	);
};
