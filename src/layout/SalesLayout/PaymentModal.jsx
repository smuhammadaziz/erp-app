import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import nodeUrl from "../../links";
import { v4 as uuidv4 } from "uuid";

import content from "../../localization/content";
import useLang from "../../hooks/useLang";

const PaymentModal = ({ isOpen, onClose, totalAmount }) => {
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
		const fetchProducts = async () => {
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
					parseFloat(
						datas[sales_id].summa - datas[sales_id].discount,
					),
				);

				setData(datas[sales_id]);
			} catch (err) {
				console.log(err);
			}
		};
		const intervalId = setInterval(fetchProducts, 1000);
		return () => clearInterval(intervalId);
	}, [nodeUrl, sales_id]);

	const [cashAmount, setCashAmount] = useState(price);

	const defaultClient = {
		client_id: "00000000-0000-0000-0000-000000000000",
		delete: false,
		name: "Оддий Харидор",
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

	const handleSaveSales = async (e) => {
		e.preventDefault();

		let currentTime = new Date();
		const mainCashData = "411c77fa-3d75-11e8-86d1-2089849ccd5a";

		let clientId = "";
		let clientName = "";
		let newProcessedProduct = [];
		let newProcessedProductForSendAPI = [];

		if (selectedClient) {
			clientId = selectedClient.client_id;
			clientName = selectedClient.name;
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
			payments: [
				{
					cash: mainCashData,
					currency: data.mainCurrency,
					sum: data.summa - data.discount,
				},
			],
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
				onClose();
			} else {
				console.error("Failed to submit data to the API");
			}
		} catch (error) {
			console.error("Error submitting the sell data:", error);
		}

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
						payments: [
							{
								cash: mainCashData,
								currency: data.mainCurrency,
								sum: Number(data.summa - data.discount),
							},
						],
					},
				],
			};

			const salesBody = {
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
				if (response.ok) {
					console.log("Sent sales successfully.");
				} else {
					console.log("Failed to send sales.");
				}
			} catch (error) {
				console.error("Error sending sales data:", error);
			}
		}

		window.location.reload();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black text-black bg-opacity-80 flex items-center justify-center p-6 z-[50]">
			<div className="bg-white rounded-lg w-full max-w-3xl shadow-lg px-6 py-2 transition-all duration-300 transform scale-95">
				<div className="flex justify-between items-center mb-4 border-b">
					<h2 className="text-xl font-semibold text-gray-800">
						{content[language].salesPage.sidebarCashPay}
					</h2>
					<button
						onClick={onClose}
						className="p-2 text-gray-600 hover:text-gray-800 transition duration-200"
					>
						<IoClose className="w-6 h-6" />
					</button>
				</div>

				<div className="space-y-6">
					<div className="grid grid-cols-12 gap-4">
						<div className="col-span-8">
							<label className="text-sm font-medium text-gray-700">
								{
									content[language].salesPage
										.headerDiscountSumma
								}
							</label>
							<div className="bg-green-50 p-4 rounded-md flex items-center">
								<div className="font-bold text-left text-3xl text-gray-800">
									{price.toLocaleString("ru-RU", {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</div>
							</div>
						</div>

						<div className="col-span-4">
							<label className="text-sm font-medium text-gray-700">
								{content[language].salesPage.headerDiscount}
							</label>
							<div className="bg-red-50 p-4 rounded-md flex items-center">
								<div className="font-bold text-left text-3xl text-gray-800">
									{discount.toLocaleString("ru-RU", {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</div>
							</div>
						</div>
					</div>

					<div className="space-y-4">
						<div className="flex items-center justify-between gap-4">
							<label className="w-1/4 text-lg font-medium text-gray-700">
								Клиент
							</label>
							<div className="w-3/4 relative group">
								<input
									type="text"
									value={
										selectedClient
											? selectedClient.name
											: defaultClient.name
									}
									readOnly
									placeholder="оддий харидор"
									className="w-full px-4 pr-16 py-2 text-right text-xl font-semibold border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 bg-gray-50"
								/>
								<button
									onClick={() => setIsClientSearchOpen(true)}
									className="absolute right-4 p-1 rounded-lg top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
								>
									<IoSearchOutline className="w-6 h-6" />
								</button>
								<span className="absolute left-1/2 transform -translate-x-1/2 mt-10 w-max px-3 py-1 text-xs bg-black text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									{selectedClient
										? selectedClient.name
										: defaultClient.name}
								</span>
							</div>
						</div>

						<div className="flex items-center justify-between gap-4">
							<label className="w-1/4 text-lg font-medium text-gray-700">
								{content[language].salesPage.sidebarCashToPay}
							</label>
							<div className="relative w-3/4">
								<input
									type="text"
									value={totalPrice.toLocaleString("ru-RU", {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
									disabled
									className="w-full px-4 py-1 text-right text-3xl font-bold border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 bg-gray-50 pr-16"
								/>
								{/* <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black text-xl font-bold">
									{currencyData[data.mainCurrency]}
								</span> */}
							</div>
						</div>

						<div className="border-t-2 py-4">
							<div className="flex items-center justify-between gap-4 mb-4">
								<label className="w-1/4 text-lg font-medium text-gray-700">
									{
										content[language].salesPage
											.sidebarCashCash
									}
								</label>
								<input
									type="text"
									value={totalPrice.toLocaleString("ru-RU", {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
									onChange={(e) =>
										setCashAmount(e.target.value)
									}
									className="w-3/4 px-4 py-1 text-right text-3xl font-bold border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 bg-gray-50"
								/>
							</div>

							<div className="flex items-center justify-between gap-4">
								<label className="w-1/4 text-lg font-medium text-gray-700">
									{
										content[language].salesPage
											.sidebarCashCard
									}
								</label>
								<input
									type="text"
									value={cardAmount}
									onChange={(e) =>
										setCardAmount(Number(e.target.value))
									}
									className="w-3/4 px-4 py-1 text-right text-3xl font-semibold border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 bg-gray-50"
								/>
							</div>
						</div>
					</div>

					<div className="flex items-start justify-between bg-gray-50  rounded-md border border-gray-200">
						<div className="w-3/5 px-6 py-6">
							<input
								type="text"
								value={totalPrice.toLocaleString("ru-RU", {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
								disabled
								className="w-full px-4 py-3 text-right text-3xl font-bold border border-gray-300 rounded-md bg-white"
							/>
							<label className="text-lg font-medium text-gray-700">
								{
									content[language].salesPage
										.sidebarCashTotalPrice
								}
							</label>
						</div>
						<div className="w-2/5 py-6 pr-6 pl-0">
							<textarea
								className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-md bg-white resize-none"
								placeholder={`${
									content?.[language]?.salesPage
										?.sidebarCashComment ?? ""
								}...`}
								onChange={(e) => setComment(e.target.value)}
								rows="4"
							/>
						</div>
					</div>
				</div>

				<div className="flex gap-6 mt-4 justify-center items-center pb-2">
					<button
						onClick={handleSaveSales}
						className="w-40 bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition duration-200 text-xl"
					>
						OK
					</button>
					<button
						onClick={onClose}
						className="w-48 bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition duration-200 text-xl"
					>
						{content[language].salesPage.headerDiscountCancel}
					</button>
				</div>
			</div>

			<ClientSearchModal
				isOpen={isClientSearchOpen}
				onClose={() => setIsClientSearchOpen(false)}
				onSelect={setSelectedClient}
				clients={customers}
			/>
		</div>
	);
};

const ClientSearchModal = ({ isOpen, onClose, onSelect, clients = [] }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const [language] = useLang("uz");

	if (!isOpen) return null;

	const defaultClient = {
		client_id: "00000000-0000-0000-0000-000000000000",
		delete: false,
		name: "Оддий Харидор",
		archive: false,
		phone_number: "",
		negative_balance: [],
		positive_balance: [],
	};

	const clientsArray = Array.isArray(clients)
		? [defaultClient, ...clients]
		: [defaultClient];

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
				className="bg-white rounded-lg w-[600px] shadow-xl flex flex-col"
				style={{ height: "500px" }}
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

				<div className="px-4 pt-4 bg-white sticky top-0 z-10">
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
					className="flex-1 overflow-y-auto mt-4 px-4"
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
