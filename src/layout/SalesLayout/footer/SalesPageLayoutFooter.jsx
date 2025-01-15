import React, { useState, useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaPlus, FaTable, FaPalette, FaLanguage } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import SettingsPanel from "./SettingsPanel";
import TableLayoutModal from "./TableLayoutModal";
import ThemeSettingsModal from "./ThemeSettingsModal";
import LanguageSettingsModal from "./LanguageSettingsModal";
import { NavLink } from "react-router-dom";
import nodeUrl from "../../../links";

const SalesPageLayoutFooter = () => {
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [activeModal, setActiveModal] = useState(null);
	const [currencies, setCurrencies] = useState([]);
	const [prices, setPrices] = useState([]);

	const deviceId = localStorage.getItem("device_id");
	const ksbId = localStorage.getItem("ksbIdNumber");

	const [currentSettings, setCurrentSettings] = useState({
		language: "en",
		theme: "light",
		table: { density: "comfortable", fontSize: "medium" },
	});

	const [tempSettings, setTempSettings] = useState(currentSettings);

	const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);
	const openModal = (modalName) => {
		setActiveModal(modalName);
		setTempSettings(currentSettings);
	};
	const closeModal = () => setActiveModal(null);
	const saveSettings = (key) => {
		setCurrentSettings((prev) => ({ ...prev, [key]: tempSettings[key] }));
		closeModal();
	};

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

	useEffect(() => {
		const fetchCurrencies = async () => {
			try {
				const response = await fetch(
					`${nodeUrl}/api/get/currency/data/${deviceId}/${ksbId}`,
				);
				if (!response.ok) {
					throw new Error("Failed to fetch currency data");
				}
				const data = await response.json();
				setCurrencies(data);
			} catch (error) {
				console.error("Error fetching currencies:", error);
			}
		};

		fetchCurrencies();
	}, [deviceId, ksbId]);

	useEffect(() => {
		const fetchPrices = async () => {
			try {
				const response = await fetch(
					`${nodeUrl}/api/get/price/data/${deviceId}/${ksbId}`,
				);
				if (!response.ok) {
					throw new Error("Failed to fetch price data");
				}
				const data = await response.json();
				setPrices(data);
			} catch (error) {
				console.error("Error fetching prices:", error);
			}
		};

		fetchPrices();
	}, [deviceId, ksbId]);

	useEffect(() => {
		// Ensure the initial currency is set correctly
		const initialCurrencyKey = localStorage.getItem("currencyKey");
		const matchingCurrency = currencies.find(
			(currency) => currency.key === initialCurrencyKey,
		);

		if (matchingCurrency && matchingCurrency.key !== initialCurrencyKey) {
			localStorage.setItem("currencyKey", matchingCurrency.item_id);
		}
	}, [currencies]);

	const currencyRateData = JSON.parse(localStorage.getItem("currency_rate"));

	const displayMessage =
		currencyRateData &&
		currencyRateData.uzs &&
		currencyRateData.usd &&
		currencyRateData.uzsName &&
		currencyRateData.usdName
			? `${currencyRateData.uzs} ${currencyRateData.usdName} = ${currencyRateData.usd} ${currencyRateData.uzsName}`
			: "- = -";

	// productByCurrency - true bosa tovarni valyutasi
	// productByCurrency - false bosa price_type ichidagi currency

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
						<div className="flex items-center bg-slate-200 px-2 py-1 rounded-md text-gray-800 font-semibold">
							<BsCurrencyDollar className="text-lg text-green-500" />
							{displayMessage}
						</div>
					</div>
					<div className="flex items-center gap-4 mx-2">
						<select className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700">
							{prices.map((price) => (
								<option key={price.item_id} value={price.name}>
									{price.name}
								</option>
							))}
						</select>
						<select
							className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
							onChange={(e) => {
								localStorage.setItem(
									"currencyKey",
									e.target.value,
								);
								// Dispatch custom event to trigger updates
								window.dispatchEvent(
									new Event("currencyChanged"),
								);
							}}
						>
							{currencies.map((currency) => (
								<option
									key={currency.item_id}
									value={currency.item_id}
								>
									{currency.name}
								</option>
							))}
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
					<NavLink
						to="/"
						className="flex items-center justify-center w-100 bg-red-700 hover:bg-red-600 text-slate-100 px-12 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400"
					>
						<ImExit className="mr-3 text-xl" />
						<span className="font-semibold">Exit</span>
					</NavLink>
				</div>
			</div>
			<SettingsPanel
				isSettingsOpen={isSettingsOpen}
				toggleSettings={toggleSettings}
				settingsOptions={settingsOptions}
			/>
			<TableLayoutModal
				isOpen={activeModal === "tableLayout"}
				onClose={closeModal}
				onSave={() => saveSettings("table")}
				tempSettings={tempSettings}
				setTempSettings={setTempSettings}
			/>
			<ThemeSettingsModal
				isOpen={activeModal === "themeSettings"}
				onClose={closeModal}
				onSave={() => saveSettings("theme")}
				tempSettings={tempSettings}
				setTempSettings={setTempSettings}
			/>
			<LanguageSettingsModal
				isOpen={activeModal === "language"}
				onClose={closeModal}
				onSave={() => saveSettings("language")}
				tempSettings={tempSettings}
				setTempSettings={setTempSettings}
			/>
		</>
	);
};

export default SalesPageLayoutFooter;

