import { FC, useEffect, useState } from "react";
import {
	IoCloseOutline,
	IoContractOutline,
	IoExpandOutline,
	IoRemove,
} from "react-icons/io5";
import logo from "../../assets/icon.png";

import { ImExit } from "react-icons/im";
import { FaTimes } from "react-icons/fa";

import content from "../../localization/content";
import useLang from "../../hooks/useLang";

import { IoExitOutline } from "react-icons/io5";

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

	const [language] = useLang();

	const [isExitModalOpen, setIsExitModalOpen] = useState(false);

	const onMinimize = () => currentWindow.minimize();
	const onMaximize = () => {
		setMaximized(!currentWindow.isMaximized());
		currentWindow.isMaximized()
			? currentWindow.unmaximize()
			: currentWindow.maximize();
	};
	const onQuit = () => app.quit();
	return (
		<div className="title-bar sticky top-0 select-none z-[999]">
			<div className="menu-button-container">
				<img
					id="icon"
					src={logo}
					className="menu-icon select-none"
					alt="amethyst"
				/>
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
					onClick={() => setIsExitModalOpen(true)}
				>
					<IoCloseOutline />
				</button>
			</div>

			{isExitModalOpen && (
				<div className="fixed inset-0 z-10  bg-black bg-opacity-80 flex items-center justify-center p-8">
					<div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 p-10 space-y-6 transform transition-all duration-300 ease-in-out">
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
