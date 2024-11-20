import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { BsCurrencyDollar, BsFillTagsFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import {
	FaPlus,
	FaTable,
	FaColumns,
	FaPrint,
	FaLanguage,
	FaUserCog,
	FaPalette,
} from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { MdBackup, MdPrivacyTip, MdShortcut } from "react-icons/md";

const SalesPageLayoutFooter = () => {
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	const toggleSettings = () => {
		setIsSettingsOpen(!isSettingsOpen);
		// Toggle body scroll
		document.body.style.overflow = isSettingsOpen ? "auto" : "hidden";
	};

	const SettingsPanel = () => {
		const settingsOptions = [
			{
				icon: <FaTable />,
				label: "Table Layout",
				description: "Configure table appearance",
			},
			{
				icon: <FaColumns />,
				label: "Column Visibility",
				description: "Show/hide table columns",
			},
			{
				icon: <FaPrint />,
				label: "Print Settings",
				description: "Configure printing options",
			},
			{
				icon: <FaLanguage />,
				label: "Language",
				description: "Change interface language",
			},
			{
				icon: <FaUserCog />,
				label: "User Preferences",
				description: "Personal settings",
			},
			{
				icon: <FaPalette />,
				label: "Theme Settings",
				description: "Customize appearance",
			},
			{
				icon: <IoMdNotifications />,
				label: "Notifications",
				description: "Alert preferences",
			},
			{
				icon: <MdBackup />,
				label: "Backup Settings",
				description: "Data backup options",
			},
			{
				icon: <MdPrivacyTip />,
				label: "Privacy",
				description: "Privacy settings",
			},
			{
				icon: <MdShortcut />,
				label: "Shortcuts",
				description: "Keyboard shortcuts",
			},
		];

		return (
			<>
				{/* Backdrop overlay */}
				<div
					className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
						isSettingsOpen
							? "opacity-100"
							: "opacity-0 pointer-events-none"
					}`}
					style={{ zIndex: 9998 }}
					onClick={toggleSettings}
				/>

				{/* Settings Panel */}
				<div
					className={`fixed bottom-0 left-0 right-0 bg-white shadow-2xl rounded-t-2xl transform transition-transform duration-300 ease-in-out ${
						isSettingsOpen ? "translate-y-0" : "translate-y-full"
					}`}
					style={{ zIndex: 9999 }}
				>
					<div className="p-4 max-h-[80vh] overflow-y-auto">
						<div className="flex justify-between items-center mb-4 sticky top-0 bg-white py-2 px-4">
							<h2 className="text-xl font-semibold text-gray-800">
								Settings
							</h2>
							<button
								onClick={toggleSettings}
								className="text-gray-800 hover:text-gray-900 p-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200"
							>
								✕
							</button>
						</div>

						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
							{settingsOptions.map((option, index) => (
								<button
									key={index}
									className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
								>
									<span className="text-2xl text-gray-700 mb-2 group-hover:text-blue-600 transition-colors duration-200">
										{option.icon}
									</span>
									<span className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
										{option.label}
									</span>
									<span className="text-sm text-gray-500 text-center mt-1">
										{option.description}
									</span>
								</button>
							))}
						</div>
					</div>
				</div>
			</>
		);
	};

	return (
		<>
			<div
				className="salesfooter bg-slate-100 px-4 py-1 shadow-lg border-t border-gray-300 flex items-center justify-between relative"
				style={{ zIndex: 1 }}
			>
				<div className="flex items-center justify-start">
					<div className="flex items-center gap-4">
						<button
							onClick={toggleSettings}
							className="text-white bg-slate-700 p-2 rounded-md text-lg flex items-center gap-2 hover:text-gray-800 transition-colors duration-200"
						>
							<FiSettings className="text-xl" />
						</button>
						<div className="flex items-center gap-2 text-gray-800">
							<BsCurrencyDollar className="text-lg text-green-500" />
							<span className="font-medium">Kurs:</span>
							<span className="font-semibold text-green-600">
								12,800 UZS
							</span>
						</div>
					</div>
					<div className="flex items-center gap-4 mx-2">
						<select className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700">
							<option value="">Asosiy sotish narxi</option>
							<option value="">Optom sotish narxi</option>
						</select>
						<select className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700">
							<option value="">$</option>
							<option value="">SUM</option>
						</select>
					</div>
					<div className="mx-2">
						<button className="bg-gradient-to-r from-green-500 to-green-700 text-white flex items-center py-2 px-6 rounded-lg shadow hover:from-green-600 hover:to-green-800 transition">
							<span className="mr-3 inline-block">
								<FaPlus />
							</span>
							Yangi Sotuv
						</button>
					</div>
				</div>
				<div className="mr-2.5">
					<a
						href="/"
						className="flex items-center justify-center w-100 bg-red-700 hover:bg-red-600 text-slate-100 px-12 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400"
					>
						<ImExit className="mr-3 text-xl" />
						<span className="font-semibold">Exit</span>
					</a>
				</div>
			</div>
			<SettingsPanel />
		</>
	);
};

export default SalesPageLayoutFooter;
