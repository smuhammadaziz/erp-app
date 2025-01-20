import React, { useState, useEffect } from "react";
import { FiSettings, FiAlertTriangle } from "react-icons/fi";
import { BsCurrencyDollar } from "react-icons/bs";
import {
	FaPlus,
	FaTable,
	FaPalette,
	FaLanguage,
	FaTimes,
	FaMoneyBill,
} from "react-icons/fa";
import { ImExit } from "react-icons/im";
import SettingsPanel from "./SettingsPanel";
import TableLayoutModal from "./TableLayoutModal";
import ThemeSettingsModal from "./ThemeSettingsModal";
import LanguageSettingsModal from "./LanguageSettingsModal";
import { NavLink, useNavigate } from "react-router-dom";
import nodeUrl from "../../../links";
import ChangePrice from "./ChangePrice";

const SalesPageLayoutFooter = () => {
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [activeModal, setActiveModal] = useState(null);
	const [currencies, setCurrencies] = useState([]);
	const [prices, setPrices] = useState([]);
	const [isExitModalOpen, setIsExitModalOpen] = useState(false);
	const navigate = useNavigate();

	const [currencyKey, setCurrencyKey] = useState("");

	useEffect(() => {
		const storedCurrencyKey =
			localStorage.getItem("currencyKey") || currencies[0]?.item_id;
		setCurrencyKey(storedCurrencyKey);
	}, [currencies]);

	const reorderedCurrencies = [
		currencies.find((currency) => currency.item_id === currencyKey),
		...currencies.filter((currency) => currency.item_id !== currencyKey),
	].filter(Boolean);

	const handleChange = (e) => {
		const selectedCurrency = e.target.value;
		setCurrencyKey(selectedCurrency);
		localStorage.setItem("currencyKey", selectedCurrency);
		window.dispatchEvent(new Event("currencyChanged"));
	};

	const [priceTypeKeyData, setPriceTypeKeyData] = useState("");

	useEffect(() => {
		const storedPriceTypeKey =
			localStorage.getItem("priceTypeKey") || prices[0]?.item_id;
		setPriceTypeKeyData(storedPriceTypeKey);
	}, [prices]);

	const reorderedPrices = [
		prices.find((price) => price.item_id === priceTypeKeyData),
		...prices.filter((price) => price.item_id !== priceTypeKeyData),
	].filter(Boolean);

	const handleChangePriceType = (e) => {
		const selectedPriceTypeKey = e.target.value;
		const selectedOption = e.target.options[e.target.selectedIndex];

		const matchingProductByCurrencyRaw = selectedOption.getAttribute(
			"data-product-by-currency",
		);
		const matchingFalseCurrencyValue = selectedOption.getAttribute(
			"data-false-currency",
		);

		const matchingProductByCurrency = matchingProductByCurrencyRaw === "1";

		localStorage.setItem("priceTypeKey", selectedPriceTypeKey);
		localStorage.setItem(
			"matchingProductByCurrency",
			matchingProductByCurrency,
		);
		localStorage.setItem(
			"falseCurrencyBoolean",
			matchingFalseCurrencyValue,
		);

		window.dispatchEvent(new Event("priceTypeChanged"));

		setPriceTypeKeyData(selectedPriceTypeKey);
	};

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
		{
			icon: <FaMoneyBill />,
			label: "Price",
			description: "Change Price",
			onClick: () => openModal("changePrice"),
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
		const initialCurrencyKey = localStorage.getItem("currencyKey");
		const matchingCurrency = currencies.find(
			(currency) => currency.key === initialCurrencyKey,
		);

		if (matchingCurrency && matchingCurrency.key !== initialCurrencyKey) {
			localStorage.setItem("currencyKey", matchingCurrency.item_id);
		}
	}, [currencies]);

	useEffect(() => {
		const priceTypeKey = localStorage.getItem("priceTypeKey");
		const productByCurrencyBoolean = localStorage.getItem(
			"matchingProductByCurrency",
		);
		const falseCurrencyBoolean = localStorage.getItem(
			"falseCurrencyBoolean",
		);
		const matchingCurrency = prices.find(
			(price) => price.item_id === priceTypeKey,
		);

		const matchingProductByCurrency = prices.find(
			(byCurrency) =>
				byCurrency.productByCurrency === productByCurrencyBoolean,
		);

		const matchingFalseCurrencyBoolean = prices.find(
			(falseCurrency) => falseCurrency.currency === falseCurrencyBoolean,
		);

		if (
			matchingCurrency &&
			matchingCurrency.item_id !== priceTypeKey &&
			matchingProductByCurrency &&
			matchingProductByCurrency.item_id !== productByCurrencyBoolean &&
			matchingFalseCurrencyBoolean &&
			matchingFalseCurrencyBoolean.currency !== falseCurrencyBoolean
		) {
			localStorage.setItem("priceTypeKey", matchingCurrency.item_id);
			localStorage.setItem(
				"matchingProductByCurrency",
				matchingCurrency.productByCurrency,
			);
			localStorage.setItem(
				"falseCurrencyBoolean",
				matchingFalseCurrencyBoolean.currency,
			);
		}
	}, [prices]);

	const currencyRateData = JSON.parse(localStorage.getItem("currency_rate"));

	const displayMessage =
		currencyRateData &&
		currencyRateData.uzs &&
		currencyRateData.usd &&
		currencyRateData.uzsName &&
		currencyRateData.usdName
			? `${currencyRateData.uzs} ${currencyRateData.usdName} = ${currencyRateData.usd} ${currencyRateData.uzsName}`
			: "- = -";

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
						<select
							className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
							value={priceTypeKeyData}
							onChange={handleChangePriceType}
						>
							{reorderedPrices.map((price) => (
								<option
									key={price.item_id}
									value={price.item_id}
									data-product-by-currency={
										price.productByCurrency
									}
									data-false-currency={price.currency}
								>
									{price.name}
								</option>
							))}
						</select>

						<select
							className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
							value={currencyKey}
							onChange={handleChange}
						>
							{reorderedCurrencies.map((currency) => (
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
					<button
						onClick={() => setIsExitModalOpen(true)}
						className="flex items-center justify-center w-100 bg-red-700 hover:bg-red-600 text-slate-100 px-12 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400"
					>
						<ImExit className="mr-3 text-xl" />
						<span className="font-semibold">Exit</span>
					</button>
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
			<ChangePrice
				isOpen={activeModal === "changePrice"}
				onClose={closeModal}
				onSave={() => saveSettings("changePrice")}
				tempSettings={tempSettings}
				setTempSettings={setTempSettings}
			/>
			{isExitModalOpen && (
				<div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
					<div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 p-6 space-y-6 transform transition-all duration-300 ease-in-out">
						<div className="text-center">
							<h2 className="text-2xl font-bold text-gray-800 mb-2">
								Exit Confirmation
							</h2>
							<p className="text-gray-600 mb-6">
								Are you sure you want to exit the sales page?
								Any unsaved changes will be lost.
							</p>
						</div>
						<div className="flex space-x-4">
							<NavLink
								to="/"
								className="flex-1 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-400"
							>
								<ImExit className="mr-2 text-xl" />
								Yes, Exit
							</NavLink>
							<button
								onClick={() => setIsExitModalOpen(false)}
								className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 flex items-center justify-center py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
							>
								<FaTimes className="mr-2 text-xl" />
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default SalesPageLayoutFooter;

