import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { BsCurrencyDollar } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import {
	FaPlus,
	FaTable,
	FaColumns,
	FaPrint,
	FaLanguage,
	FaUserCog,
	FaPalette,
	FaMoon,
	FaSun,
	FaTimes,
	FaCheck,
	FaSave,
} from "react-icons/fa";

const Modal = ({ isOpen, onClose, title, children, onSave }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-100 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
			<div className="bg-white rounded-lg w-full max-w-md mx-4 shadow-xl z-60">
				<div className="flex justify-between items-center p-4 border-b">
					<h2 className="text-xl font-semibold text-gray-800">
						{title}
					</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700 transition-colors"
					>
						<FaTimes className="text-xl" />
					</button>
				</div>
				<div className="p-4">
					{children}
					<div className="mt-6 flex justify-end space-x-3 border-t pt-4">
						<button
							onClick={onClose}
							className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
						>
							Cancel
						</button>
						<button
							onClick={onSave}
							className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
						>
							<FaSave className="mr-2" />
							Save Changes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const SalesPageLayoutFooter = () => {
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [activeModal, setActiveModal] = useState(null);

	const [currentSettings, setCurrentSettings] = useState({
		language: "en",
		theme: "light",
		table: {
			density: "comfortable",
			fontSize: "medium",
			showGridLines: true,
			enableStripedRows: true,
		},
	});

	const [tempSettings, setTempSettings] = useState({
		language: "en",
		theme: "light",
		table: {
			density: "comfortable",
			fontSize: "medium",
			showGridLines: true,
			enableStripedRows: true,
		},
	});

	const toggleSettings = () => {
		setIsSettingsOpen(!isSettingsOpen);
	};

	const openModal = (modalName) => {
		setActiveModal(modalName);
		setTempSettings({ ...currentSettings });
	};

	const closeModal = () => {
		setActiveModal(null);
		setTempSettings({ ...currentSettings });
	};

	const saveTableSettings = () => {
		setCurrentSettings((prev) => ({
			...prev,
			table: tempSettings.table,
		}));
		setActiveModal(null);
	};

	const saveThemeSettings = () => {
		setCurrentSettings((prev) => ({
			...prev,
			theme: tempSettings.theme,
		}));
		setActiveModal(null);
	};

	const saveLanguageSettings = () => {
		setCurrentSettings((prev) => ({
			...prev,
			language: tempSettings.language,
		}));
		setActiveModal(null);
		// Show success toast or notification here
	};

	// Table Layout Modal Content
	const TableLayoutModal = () => (
		<Modal
			isOpen={activeModal === "tableLayout"}
			onClose={closeModal}
			title="Table Layout Settings"
			onSave={saveTableSettings}
			className="z-50"
		>
			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Density
					</label>
					<select
						className="w-full p-2 border rounded-md bg-white"
						value={tempSettings.table.density}
						onChange={(e) =>
							setTempSettings((prev) => ({
								...prev,
								table: {
									...prev.table,
									density: e.target.value,
								},
							}))
						}
					>
						<option value="comfortable">Comfortable</option>
						<option value="compact">Compact</option>
						<option value="spacious">Spacious</option>
					</select>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Font Size
					</label>
					<select
						className="w-full p-2 border rounded-md bg-white"
						value={tempSettings.table.fontSize}
						onChange={(e) =>
							setTempSettings((prev) => ({
								...prev,
								table: {
									...prev.table,
									fontSize: e.target.value,
								},
							}))
						}
					>
						<option value="small">Small</option>
						<option value="medium">Medium</option>
						<option value="large">Large</option>
					</select>
				</div>

				<div className="space-y-2">
					<label className="flex items-center space-x-2 cursor-pointer">
						<input
							type="checkbox"
							checked={tempSettings.table.showGridLines}
							onChange={(e) =>
								setTempSettings((prev) => ({
									...prev,
									table: {
										...prev.table,
										showGridLines: e.target.checked,
									},
								}))
							}
							className="rounded border-gray-300"
						/>
						<span className="text-sm text-gray-700">
							Show grid lines
						</span>
					</label>

					<label className="flex items-center space-x-2 cursor-pointer">
						<input
							type="checkbox"
							checked={tempSettings.table.enableStripedRows}
							onChange={(e) =>
								setTempSettings((prev) => ({
									...prev,
									table: {
										...prev.table,
										enableStripedRows: e.target.checked,
									},
								}))
							}
							className="rounded border-gray-300"
						/>
						<span className="text-sm text-gray-700">
							Enable striped rows
						</span>
					</label>
				</div>
			</div>
		</Modal>
	);

	// Theme Settings Modal Content
	const ThemeSettingsModal = () => (
		<Modal
			isOpen={activeModal === "themeSettings"}
			onClose={closeModal}
			title="Theme Settings"
			onSave={saveThemeSettings}
		>
			<div className="flex justify-center space-x-4">
				<button
					className={`p-4 rounded-lg flex flex-col items-center ${
						tempSettings.theme === "light"
							? "bg-blue-100 text-blue-600"
							: "bg-gray-100 text-gray-600"
					}`}
					onClick={() =>
						setTempSettings((prev) => ({ ...prev, theme: "light" }))
					}
				>
					<FaSun className="text-2xl mb-2" />
					<span>Light</span>
				</button>
				<button
					className={`p-4 rounded-lg flex flex-col items-center ${
						tempSettings.theme === "dark"
							? "bg-blue-100 text-blue-600"
							: "bg-gray-100 text-gray-600"
					}`}
					onClick={() =>
						setTempSettings((prev) => ({ ...prev, theme: "dark" }))
					}
				>
					<FaMoon className="text-2xl mb-2" />
					<span>Dark</span>
				</button>
			</div>
		</Modal>
	);

	// Language Settings Modal Content
	const LanguageSettingsModal = () => (
		<Modal
			isOpen={activeModal === "language"}
			onClose={closeModal}
			title="Language Settings"
			onSave={saveLanguageSettings}
		>
			<div className="space-y-2">
				{[
					{ code: "en", name: "English" },
					{ code: "uz", name: "O'zbekcha" },
					{ code: "ru", name: "Русский" },
				].map((lang) => (
					<button
						key={lang.code}
						className={`w-full p-3 text-left rounded-lg flex items-center ${
							tempSettings.language === lang.code
								? "bg-blue-100 text-blue-600"
								: "hover:bg-gray-100"
						}`}
						onClick={() =>
							setTempSettings((prev) => ({
								...prev,
								language: lang.code,
							}))
						}
					>
						<FaLanguage className="mr-2" />
						{lang.name}
					</button>
				))}
			</div>
		</Modal>
	);

	const settingsOptions = [
		{
			icon: <FaTable />,
			label: "Table Layout",
			description: "Configure table appearance",
			onClick: () => openModal("tableLayout"),
		},
		{
			icon: <FaPalette />,
			label: "Theme Settings",
			description: "Customize appearance",
			onClick: () => openModal("themeSettings"),
		},
		{
			icon: <FaLanguage />,
			label: "Language",
			description: "Change interface language",
			onClick: () => openModal("language"),
		},
	];

	const SettingsPanel = () => (
		<>
			<div
				className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
					isSettingsOpen
						? "opacity-100"
						: "opacity-0 pointer-events-none"
				}`}
				// style={{ zIndex: 1 }}
				onClick={toggleSettings}
			/>
			<div
				className={`fixed z-0 bottom-0 left-0 right-0 bg-white shadow-2xl rounded-t-2xl transform transition-transform duration-300 ease-in-out ${
					isSettingsOpen ? "translate-y-0" : "translate-y-full"
				}`}
				// style={{ zIndex: 1 }}
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
								onClick={option.onClick}
								className="flex flex-col items-center justify-center p-4 bg-slate-200 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
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

	// Rest of the component remains the same...
	return (
		<>
			<div className="salesfooter bg-slate-100 px-4 py-1 shadow-lg border-t border-gray-300 flex items-center justify-between relative">
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
			<TableLayoutModal />
			<ThemeSettingsModal />
			<LanguageSettingsModal />
		</>
	);
};

export default SalesPageLayoutFooter;
