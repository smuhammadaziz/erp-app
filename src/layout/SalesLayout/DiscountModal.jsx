import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import nodeUrl from "../../links";
import { v4 as uuidv4 } from "uuid";

const DiscountModal = ({ isOpen, onClose, totalAmount }) => {
	const [selectedClient, setSelectedClient] = useState(null);

	const [cardAmount, setCardAmount] = useState(0);
	const [discountAmount, setDiscountAmount] = useState(0);
	const [isClientSearchOpen, setIsClientSearchOpen] = useState(false);
	const [customers, setCustomers] = useState([]);
	const [price, setPrice] = useState(0);

	const [data, setData] = useState({});

	const ksbIdNumber = localStorage.getItem("ksbIdNumber");
	const device_id = localStorage.getItem("device_id");
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

	const handleSaveSales = async (e) => {
		e.preventDefault();

		let currentTime = new Date();

		const mainCashData = "411c77fa-3d75-11e8-86d1-2089849ccd5a";

		let clientId = "";
		let clientName = "";
		let newProcessedProduct = [];

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
					comment: data.mainComment,
					below_cost: data.mainBelowCost,
				},
			],
			products: newProcessedProduct,
			payments: [
				{
					cash: mainCashData,
					currency: data.mainCurrency,
					sum: data.summa,
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

		window.location.reload();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black text-black bg-opacity-80 flex items-center justify-center p-6 z-[50]">
			<div className="bg-white rounded-lg w-full max-w-3xl shadow-lg px-6 py-2 transition-all duration-300 transform scale-95">
				<div className="flex justify-between items-center mb-4 border-b">
					<h2 className="text-xl font-semibold text-gray-800">
						Оплата
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
						<div className="col-span-12">
							<label className="text-sm font-medium text-gray-700">
								К Оплата
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
					</div>

					<div className="flex items-start justify-between bg-gray-50  rounded-md border border-gray-200">
						<div className="w-5/5 px-6 py-6">
							<input
								type="text"
								value={price.toLocaleString("en-US", {
									minimumFractionDigits: 2,
								})}
								disabled
								className="w-full px-4 py-3 text-right text-3xl font-bold border border-gray-300 rounded-md bg-white"
							/>
							<label className="text-lg font-medium text-gray-700">
								%
							</label>
						</div>
						<div className="w-5/5 px-2 py-6 text-3xl font-bold">
							+
						</div>
						<div className="w-5/5 px-6 py-6">
							<input
								type="text"
								value={price.toLocaleString("en-US", {
									minimumFractionDigits: 2,
								})}
								disabled
								className="w-full px-4 py-3 text-right text-3xl font-bold border border-gray-300 rounded-md bg-white"
							/>
							<label className="text-lg font-medium text-gray-700">
								Summa
							</label>
						</div>
					</div>

					<div className="space-y-4">
						<div className="py-4">
							<div className="flex items-center justify-between gap-4 mb-4">
								<label className="w-1/4 text-lg font-medium text-gray-700">
									Skidka
								</label>
								<input
									type="number"
									value={price}
									onChange={(e) =>
										setCashAmount(e.target.value)
									}
									className="w-3/4 px-4 py-1 text-right text-3xl font-semibold border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 bg-gray-50"
								/>
							</div>

							<div className="flex items-center justify-between gap-4">
								<label className="w-1/4 text-lg font-medium text-gray-700">
									K oplate
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
						className="w-40 bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition duration-200 text-xl"
					>
						Отмена
					</button>
				</div>
			</div>
		</div>
	);
};

export default DiscountModal;
