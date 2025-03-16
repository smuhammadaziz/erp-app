import React, { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import nodeUrl from "../../links";
import { v4 as uuidv4 } from "uuid";
import { MdClear } from "react-icons/md";

import content from "../../localization/content";
import useLang from "../../hooks/useLang";
import PrintingModal from "./PrintModal";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import LoadingModalSendSales from "./LoadingModal";

const PaymentModal = ({ isOpen, onClose, totalAmount, socket }) => {
	const [selectedClient, setSelectedClient] = useState(null);

	const [cardAmount, setCardAmount] = useState(0);
	const [discountAmount, setDiscountAmount] = useState(0);
	const [isClientSearchOpen, setIsClientSearchOpen] = useState(false);
	const [customers, setCustomers] = useState([]);
	const [price, setPrice] = useState(0);
	const [discount, setDiscount] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const [comment, setComment] = useState("");

	const [language] = useLang("uz");

	const [data, setData] = useState({});

	const ksbIdNumber = localStorage.getItem("ksbIdNumber");
	const device_id = localStorage.getItem("device_id");
	const ipaddress = localStorage.getItem("ipaddress:port");
	const database = localStorage.getItem("mainDatabase");
	const username = localStorage.getItem("userType");
	const password = localStorage.getItem("userPassword");
	const sales_id = localStorage.getItem("sales_id");

	const [printModal, setPrintModal] = useState(false);
	const [successModal, setSuccessModal] = useState(false);
	const [errorModal, setErrorModal] = useState(false);
	const [loadingModal, setLoadingModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		const fetchCustomers = async () => {
			try {
				const response = await fetch(
					`${nodeUrl}/api/get/client/${ksbIdNumber}/${device_id}`,
				);
				const result = await response.json();

				setCustomers(Array.isArray(result.data) ? result.data : []);
			} catch (error) {
				console.error("Error fetching customers:", error);
				setCustomers([]);
			}
		};

		fetchCustomers();
	}, []);

	useEffect(() => {
		fetchSoldProducts();

		const updateHandler = () => fetchSoldProducts();
		socket.on("gettingSoldProducts", updateHandler);

		return () => {
			socket.off("gettingSoldProducts", updateHandler);
		};
	}, [nodeUrl, sales_id]);

	const fetchSoldProducts = async () => {
		try {
			const response = await fetch(
				`${nodeUrl}/api/get/sales/${sales_id}`,
			);
			if (!response.ok) {
				throw new Error("Failed to fetch products");
			}
			const datas = await response.json();

			setPrice(parseFloat(datas[sales_id].summa));
			setDiscount(parseFloat(datas[sales_id].discount));

			setTotalPrice(
				parseFloat(datas[sales_id].summa - datas[sales_id].discount),
			);

			setData(datas[sales_id]);
		} catch (err) {
			console.log(err);
		}
	};

	const [cashAmount, setCashAmount] = useState(totalPrice);
	const [isTyping, setIsTyping] = useState(false);

	const searchInputRef = useRef();
	const cardInputRef = useRef();
	const handleSubmitButton = useRef();

	const formatRussianNumber = (num) => {
		return num.toLocaleString("ru-RU", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	};

	useEffect(() => {
		if (isOpen && searchInputRef.current) {
			setCashAmount(totalPrice);
			searchInputRef.current.value = formatRussianNumber(totalPrice);
			searchInputRef.current.focus();
			searchInputRef.current.select();
		}
	}, [isOpen]);

	const handleFocus = () => {
		if (searchInputRef.current) {
			searchInputRef.current.select();
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			if (isTyping) {
				const numericValue = parseFloat(cashAmount) || 0;
				setCashAmount(numericValue);
				setIsTyping(false);
			}

			if (cardInputRef.current) {
				cardInputRef.current.focus();
			}
		}
	};

	const parseFormattedNumber = (formattedValue) => {
		if (!formattedValue) return 0;
		const numericString = formattedValue
			.toString()
			.replace(/[^\d,\.]/g, "")
			.replace(",", ".");
		return parseFloat(numericString) || 0;
	};

	const defaultClient = {
		client_id: "00000000-0000-0000-0000-000000000000",
		delete: false,
		name: "<не указан>",
		archive: false,
		phone_number: "",
		negative_balance: [],
		positive_balance: [],
	};

	const [currencyData, setCurrencyData] = useState({});

	useEffect(() => {
		const fetchCurrencyData = async () => {
			if (!data.products || data.products.length === 0) return;

			const updatedCurrencyData = { ...currencyData };

			for (const product of data.products) {
				if (
					product.product_currency &&
					!updatedCurrencyData[product.product_currency]
				) {
					try {
						const response = await fetch(
							`${nodeUrl}/api/get/currency/data/${device_id}/${ksbIdNumber}/${product.product_currency}`,
						);
						const fetchedData = await response.json();
						updatedCurrencyData[product.product_currency] =
							fetchedData[0]?.name || "-";
					} catch (error) {
						console.error("Failed to fetch currency data", error);
						updatedCurrencyData[product.product_currency] = "-";
					}
				}
			}

			setCurrencyData(updatedCurrencyData);
		};

		fetchCurrencyData();
	}, [data.products]);

	const checkInternetConnection = async () => {
		try {
			const online = window.navigator.onLine;
			console.log("Navigator online status:", online);

			if (!online) {
				console.log(
					"No internet connection detected via navigator.onLine.",
				);
				return false;
			}

			const ksbId = localStorage.getItem("ksbIdNumber");
			const ipaddressPort = localStorage.getItem("ipaddress:port");
			const mainDatabase = localStorage.getItem("mainDatabase");
			const userType = localStorage.getItem("userType");
			const userPassword = localStorage.getItem("userPassword");

			const credentials = Buffer.from(
				`${userType}:${userPassword}`,
			).toString("base64");

			const response = await fetch(
				`http://${ipaddressPort}/${mainDatabase}/hs/ksbmerp_pos/ping/ksb?text=pos&ksb_id=${ksbId}`,
				{
					headers: { Authorization: `Basic ${credentials}` },
				},
			);

			console.log("Response status:", response.status);

			return response.status === 200;
		} catch (error) {
			console.error("Error during internet connection check:", error);
			return false;
		}
	};

	const [showErrorModal, setShowErrorModal] = useState(false);
	const [showError, setShowError] = useState("");

	const handleSaveSalesToDatabase = async () => {
		let currentTime = new Date();

		const mainCashValue = JSON.parse(localStorage.getItem("settingsCash"));

		const mainCashCashData = mainCashValue.find(
			(e) => e.type == "Наличные",
		);

		const mainCashCardData = mainCashValue.find((e) => e.type == "Пластик");

		const userType = localStorage.getItem("userType");

		let clientId = defaultClient.client_id;
		let clientName = defaultClient.name;
		let newProcessedProduct = [];

		if (selectedClient && selectedClient.client_id) {
			clientId = selectedClient.client_id;
			clientName = selectedClient.name || "<не указан>";
		} else {
			clientId = defaultClient.client_id;
			clientName = defaultClient.name;
		}

		if (data.products) {
			newProcessedProduct = data.products.map((product) => ({
				product: product.product_id,
				product_name: product.product_name,
				warehouse: product.product_warehouse,
				currency: product.product_currency,
				quantity: product.soni,
				price: product.narxi,
				sum: product.summa,
			}));
		} else {
			newProcessedProduct = [];
		}

		const cashValue = searchInputRef.current
			? parseFormattedNumber(searchInputRef.current.value)
			: 0;
		const cardValue = cardInputRef.current
			? parseFormattedNumber(cardInputRef.current.value)
			: 0;

		let paymentsArray = [];

		if (cashValue > 0) {
			paymentsArray.push({
				cash: mainCashCashData.cash,
				currency: data.mainCurrency,
				sum: cashValue,
			});
		}

		if (cardValue > 0) {
			paymentsArray.push({
				cash: mainCashCardData.cash,
				currency: data.mainCurrency,
				sum: cardValue,
			});
		}

		const currentData = {
			id: sales_id,
			ksb_id: ksbIdNumber,
			device_id: device_id,
			date: currentTime,
			status: data.status,
			client_id: clientId,
			client_name: clientName,
			total_price: data.summa,
			details: [
				{
					document: sales_id,
					client: clientId,
					warehouse: data.mainWarehouse,
					price_type: data.mainPriceType,
					rate: data.mainRate,
					currency: data.mainCurrency,
					discount: data.discount,
					comment: comment,
					below_cost: data.mainBelowCost,
				},
			],
			products: newProcessedProduct,
			payments: paymentsArray,
			seller: userType,
		};

		try {
			const response = await fetch(`${nodeUrl}/api/sales`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(currentData),
			});

			if (response.ok) {
				const result = await response.json();

				console.log(result);
			} else {
				console.error("Failed to submit data to the API");
			}
		} catch (error) {
			console.error("Error submitting the sell data:", error);
		}
	};

	const handleCreateEmptySalesInDatabase = async () => {
		const newSalesId = uuidv4();
		localStorage.setItem("sales_id", newSalesId);

		try {
			const response = await fetch(
				`${nodeUrl}/api/create/sales/${newSalesId}`,
				{
					method: "POST",
				},
			);
			const data = await response.json();

			if (response.ok) {
				console.log("Created");
			} else {
				console.log("error");
			}
		} catch (err) {
			console.log("error creating empty sales", err);
		}
	};

	const handleDeleleOneSalesFromDatabase = async () => {
		try {
			const response = await fetch(
				`${nodeUrl}/api/delete/one/sales/${sales_id}`,
				{
					method: "DELETE",
				},
			);

			const data = await response.json();
		} catch (error) {
			console.error("Error deleting", error);
		}
	};

	const handleSendSalesToAPI = async () => {
		const mainCashValue = JSON.parse(localStorage.getItem("settingsCash"));

		const mainCashCashData = mainCashValue.find(
			(e) => e.type == "Наличные",
		);

		const mainCashCardData = mainCashValue.find((e) => e.type == "Пластик");

		let clientId = defaultClient.client_id;
		let clientName = defaultClient.name;
		let newProcessedProductForSendAPI = [];

		if (selectedClient && selectedClient.client_id) {
			clientId = selectedClient.client_id;
			clientName = selectedClient.name || "<не указан>";
		} else {
			clientId = defaultClient.client_id;
			clientName = defaultClient.name;
		}

		const isOnline = await checkInternetConnection();
		if (isOnline) {
			if (data.products) {
				newProcessedProductForSendAPI = data.products.map(
					(product) => ({
						product: product.product_id,
						warehouse: product.product_warehouse,
						currency: product.product_currency,
						quantity: Number(product.soni),
						price: Number(product.narxi),
						sum: Number(product.summa),
					}),
				);
			} else {
				newProcessedProductForSendAPI = [];
			}

			const cashValue = searchInputRef.current
				? parseFormattedNumber(searchInputRef.current.value)
				: 0;
			const cardValue = cardInputRef.current
				? parseFormattedNumber(cardInputRef.current.value)
				: 0;

			let paymentsApiArray = [];

			if (cashValue > 0) {
				paymentsApiArray.push({
					cash: mainCashCashData.cash,
					currency: data.mainCurrency,
					sum: Number(cashValue),
				});
			}

			if (cardValue > 0) {
				paymentsApiArray.push({
					cash: mainCashCardData.cash,
					currency: data.mainCurrency,
					sum: Number(cardValue),
				});
			}

			const oneSale = {
				sales: [
					{
						details: [
							{
								document: sales_id,
								client: clientId,
								warehouse: data.mainWarehouse,
								price_type: data.mainPriceType,
								rate: Number(data.mainRate),
								currency: data.mainCurrency,
								discount: Number(data.discount),
								comment: comment,
								below_cost:
									data.mainBelowCost === 1 ? true : false,
							},
						],
						products: newProcessedProductForSendAPI,
						payments: paymentsApiArray,
					},
				],
			};

			const salesBody = {
				ksb_id: ksbIdNumber,
				device_id: device_id,
				host: ipaddress,
				authUser: username,
				authPass: password,
				database: database,
				salesData: oneSale,
				id: sales_id,
			};

			try {
				const response = await fetch(`${nodeUrl}/api/send/one/sale`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(salesBody),
				});

				const data = await response.json();
				return data;
			} catch (error) {
				console.error("Error sending sales data:", error);
				throw error;
			}
		}
	};

	const handlePrintOneSales = async () => {
		const full_title = localStorage.getItem("enterpriseFullTitle");
		const short_title = localStorage.getItem("enterpriseName");

		const phone1 = localStorage.getItem("enterprisePhone1");
		const phone2 = localStorage.getItem("enterprisePhone2");
		const slogan1 = localStorage.getItem("enterpriseSlogan1");
		const slogan2 = localStorage.getItem("enterpriseSlogan2");

		const user_type = localStorage.getItem("userType");

		try {
			await fetch(`${nodeUrl}/api/print/${sales_id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					full_title:
						full_title === "null" ? short_title : full_title,
					phone1: phone1 === "null" ? "" : phone1,
					phone2: phone2 === "null" ? "" : phone2,
					slogan1: slogan1 === "null" ? "" : slogan1,
					slogan2: slogan2 === "null" ? "" : slogan2,
					user_type: user_type,
				}),
			});
		} catch (err) {
			console.log(err);
		}
	};

	const handleSaveSales = async () => {
		try {
			setLoadingModal(true);

			await handleSaveSalesToDatabase();

			const isOnline = await checkInternetConnection();
			if (isOnline) {
				try {
					const result = await handleSendSalesToAPI();
					if (result && result.status === "error") {
						setErrorMessage(
							result.details || "Failed to send sales",
						);
						setLoadingModal(false);
						setErrorModal(true);
						return;
					}
				} catch (error) {
					console.error("Error sending sales to API:", error);
					setLoadingModal(false);
					setErrorMessage("Failed to connect to server");
					setErrorModal(true);
					return;
				}
			}

			await handleCreateEmptySalesInDatabase();

			await handleDeleleOneSalesFromDatabase();

			setLoadingModal(false);
			setSuccessModal(true);

			setTimeout(() => {
				window.location.reload();
			}, 100);
		} catch (error) {
			console.error("Error in save sales process:", error);
			setLoadingModal(false);
			setErrorMessage(
				error.message || "An error occurred during the sales process",
			);
			setErrorModal(true);
		}
	};

	const handleSaveSalesWithPrint = async () => {
		try {
			setLoadingModal(true);

			await handleSaveSalesToDatabase();
			await handlePrintOneSales();

			const isOnline = await checkInternetConnection();
			if (isOnline) {
				try {
					const result = await handleSendSalesToAPI();
					if (result && result.status === "error") {
						setErrorMessage(
							result.details || "Failed to send sales",
						);
						setLoadingModal(false);
						setErrorModal(true);
						return;
					}
				} catch (error) {
					console.error("Error sending sales to API:", error);
					setLoadingModal(false);
					setErrorMessage("Failed to connect to server");
					setErrorModal(true);
					return;
				}
			}

			await handleCreateEmptySalesInDatabase();

			await handleDeleleOneSalesFromDatabase();

			setLoadingModal(false);
			setSuccessModal(true);

			setTimeout(() => {
				window.location.reload();
			}, 100);
		} catch (error) {
			console.error("Error in save sales process:", error);
			setLoadingModal(false);
			setErrorMessage(
				error.message || "An error occurred during the sales process",
			);
			setErrorModal(true);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 text-black bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[50]">
			<div className="bg-white rounded-xl w-full max-w-4xl shadow-xl overflow-hidden flex flex-col">
				<div className="bg-blue-600 px-6 py-3 flex justify-between items-center">
					<h2 className="text-lg font-medium text-white">
						{content[language].salesPage.sidebarCashPay}
					</h2>
					<button
						onClick={onClose}
						className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 transition duration-200 rounded-full"
					>
						<IoClose className="w-5 h-5" />
					</button>
				</div>

				{/* Content - Split Layout */}
				<div className="flex flex-row flex-1 overflow-hidden">
					{/* Left Side - Information */}
					<div className="w-1/2 p-5 bg-gray-50 border-r border-gray-200 flex flex-col space-y-4">
						{/* Summary Cards */}
						<div className="grid grid-cols-2 gap-3">
							<div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
								<label className="text-xs font-medium text-gray-500 block mb-1">
									{
										content[language].salesPage
											.headerDiscountSumma
									}
								</label>
								<div className="font-semibold text-xl text-gray-800">
									{price.toLocaleString("ru-RU", {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</div>
							</div>

							<div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
								<label className="text-xs font-medium text-gray-500 block mb-1">
									{content[language].salesPage.headerDiscount}
								</label>
								<div className="font-semibold text-xl text-gray-800">
									{discount.toLocaleString("ru-RU", {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</div>
							</div>
						</div>

						{/* Client Selection */}
						<div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
							<label className="text-xs font-medium text-gray-500 block mb-1">
								Клиент
							</label>
							<div className="relative group">
								<input
									type="text"
									value={
										selectedClient
											? selectedClient.name
											: null
									}
									readOnly
									placeholder="Клиент танланг"
									className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
								/>
								<button
									onClick={() => setIsClientSearchOpen(true)}
									className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-md bg-gray-100 text-gray-500 hover:bg-blue-500 hover:text-white transition-all duration-200"
								>
									<IoSearchOutline className="w-4 h-4" />
								</button>
							</div>
						</div>

						{/* Total to Pay */}
						<div className="bg-blue-50 rounded-lg border border-blue-100 p-3 shadow-sm">
							<label className="text-xs font-medium text-blue-700 block mb-1">
								{content[language].salesPage.sidebarCashToPay}
							</label>
							<div className="font-bold text-xl text-gray-800">
								{totalPrice.toLocaleString("ru-RU", {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
							</div>
						</div>

						{/* Total Price (Final) */}
						{/* <div className="bg-green-50 rounded-lg border border-green-100 p-3 shadow-sm mt-auto">
							<label className="text-xs font-medium text-green-700 block mb-1">
								{
									content[language].salesPage
										.sidebarCashTotalPrice
								}
							</label>
							<div className="font-bold text-xl text-gray-800">
								{totalPrice.toLocaleString("ru-RU", {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
							</div>
						</div> */}
					</div>

					{/* Right Side - Input Fields */}
					<div className="w-1/2 p-5 flex flex-col space-y-4">
						{/* Cash Payment */}
						<div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
							<div className="flex items-center gap-3 mb-2">
								<div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-4 h-4 text-blue-600"
									>
										<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"></path>
									</svg>
								</div>
								<label className="text-sm font-medium text-gray-700">
									{
										content[language].salesPage
											.sidebarCashCash
									}
								</label>
							</div>
							<input
								ref={searchInputRef}
								type="text"
								value={
									isTyping
										? cashAmount
										: formatRussianNumber(cashAmount)
								}
								onChange={(e) => {
									if (!isTyping) {
										setIsTyping(true);
										setCashAmount(
											e.target.value.replace(
												/[^0-9]/g,
												"",
											),
										);
									} else {
										const numericInput =
											e.target.value.replace(
												/[^0-9]/g,
												"",
											);
										setCashAmount(numericInput);
									}
								}}
								onBlur={() => {
									if (isTyping) {
										const numericValue =
											parseFloat(cashAmount) ||
											totalPrice;
										setCashAmount(numericValue);
										setIsTyping(false);
									}
								}}
								onFocus={handleFocus}
								onKeyPress={handleKeyPress}
								className="w-full px-3 py-2 text-right text-lg font-medium border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
							/>
						</div>
						{/* Card Payment */}
						<div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
							<div className="flex items-center gap-3 mb-2">
								<div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-4 h-4 text-indigo-600"
									>
										<path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path>
									</svg>
								</div>
								<label className="text-sm font-medium text-gray-700">
									{
										content[language].salesPage
											.sidebarCashCard
									}
								</label>
							</div>
							<input
								ref={cardInputRef}
								type="text"
								value={cardAmount === 0 ? "" : cardAmount}
								onChange={(e) => {
									const numericInput = e.target.value.replace(
										/[^0-9]/g,
										"",
									);
									setCardAmount(Number(numericInput) || 0);
								}}
								onKeyPress={(e) => {
									if (e.key == "Enter") {
										handleSubmitButton.current.focus();
									}
								}}
								className="w-full px-3 py-2 text-right text-lg font-medium border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
							/>
						</div>
						{/* Comment */}
						<div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
							<label className="text-sm font-medium text-gray-700 block mb-2">
								{content?.[language]?.salesPage
									?.sidebarCashComment ?? ""}
							</label>
							<textarea
								className="w-full px-3 py-2 text-gray-700 border border-gray-200 rounded-lg resize-none h-[80px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								placeholder={`${
									content?.[language]?.salesPage
										?.sidebarCashComment ?? ""
								}...`}
								onChange={(e) => setComment(e.target.value)}
							/>
						</div>
						<div className="flex-grow"></div>
					</div>
				</div>

				<div className="bg-gray-100 px-6 py-3 border-t border-gray-200 flex justify-end gap-3">
					<button
						onClick={onClose}
						className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-200 text-sm font-medium"
					>
						{content[language].salesPage.headerDiscountCancel}
					</button>
					<button
						ref={handleSubmitButton}
						onClick={() => {
							setPrintModal(true);
						}}
						className="px-10 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 text-sm font-medium shadow-sm"
					>
						OK
					</button>
				</div>
			</div>

			<ClientSearchModal
				isOpen={isClientSearchOpen}
				onClose={() => setIsClientSearchOpen(false)}
				onSelect={setSelectedClient}
				clients={customers}
			/>

			{printModal && (
				<PrintingModal
					setPrintModal={setPrintModal}
					setSuccessModal={setSuccessModal}
					setErrorModal={setErrorModal}
					handleSaveSales={handleSaveSales}
					handleSaveSalesWithPrint={handleSaveSalesWithPrint}
				/>
			)}

			{loadingModal && <LoadingModalSendSales />}

			{successModal && <SuccessModal />}

			{errorModal && (
				<ErrorModal
					errorMessage={errorMessage}
					setErrorModal={setErrorModal}
				/>
			)}

			{showErrorModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-[100]">
					<div className="bg-white w-[400px] rounded-lg shadow-xl overflow-hidden">
						<div className="bg-red-500 px-4 py-3">
							<h2 className="text-base font-medium text-white">
								Ошибка
							</h2>
						</div>
						<div className="p-4">
							<p className="text-sm text-gray-700 mb-4">
								{showError}
							</p>
							<div className="flex justify-end">
								<button
									onClick={() => setShowErrorModal(false)}
									className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-all duration-200"
								>
									OK
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

const ClientSearchModal = ({ isOpen, onClose, onSelect, clients = [] }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const [language] = useLang("uz");

	if (!isOpen) return null;

	const clientsArray = Array.isArray(clients) ? clients : [];

	const filteredClients =
		searchTerm.trim() === ""
			? clientsArray
			: clientsArray.filter(
					(client) =>
						client?.name
							?.toLowerCase()
							.includes(searchTerm.toLowerCase().trim()) ||
						client?.phone_number
							?.toLowerCase()
							.includes(searchTerm.toLowerCase().trim()),
			  );

	return (
		<div className="fixed inset-0 rounded-lg bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
			<div
				className="bg-white rounded-lg w-[800px] shadow-xl flex flex-col"
				style={{ height: "600px" }}
			>
				<div className="px-5 py-3 border-b flex justify-between items-center bg-white sticky top-0">
					<h2 className="text-lg font-semibold">
						{content[language].salesPage.sidebarClientSelect}
					</h2>
					<button
						onClick={onClose}
						className="p-1 rounded-full hover:bg-gray-100"
					>
						<IoClose className="w-5 h-5" />
					</button>
				</div>

				<div className="px-4 pt-4 bg-white sticky top-0 z-10 border-b-2 pb-4">
					<div className="relative">
						<input
							type="text"
							placeholder={`${content[language].salesPage.sidebarClientSearch}...`}
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
						/>
						<IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
					</div>
				</div>

				<div
					className="flex-1 overflow-y-auto px-4"
					style={{ minHeight: "300px" }}
				>
					{filteredClients.length === 0 ? (
						<div className="flex items-center justify-center h-full text-gray-500">
							No clients found
						</div>
					) : (
						filteredClients.map((client) => (
							<div
								key={client.client_id}
								onClick={() => {
									onSelect(client);
									onClose();
									setSearchTerm("");
								}}
								className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer rounded-lg border border-transparent hover:border-gray-200 mb-2"
							>
								<div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
									<span className="text-green-700 font-medium">
										{client.name.charAt(0)}
									</span>
								</div>
								<div className="min-w-0 flex-1">
									<div className="font-medium truncate">
										{client.name}
									</div>
									<div className="text-sm text-gray-500 truncate">
										{client.phone_number}
									</div>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default PaymentModal;

