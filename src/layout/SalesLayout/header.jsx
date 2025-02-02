import React, { useState, useEffect, useCallback } from "react";
import { FaBuilding, FaUserAlt } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { FaUsersLine } from "react-icons/fa6";
import { CiDiscount1 } from "react-icons/ci";
import {
	MdOutlineFormatListBulleted,
	MdCalendarToday,
	MdOutlineSignalWifiStatusbarConnectedNoInternet4,
	MdOutlineSignalWifiStatusbar4Bar,
} from "react-icons/md";

import { BiSearch } from "react-icons/bi";
import DiscountModal from "./DiscountModal";

import {
	MdOutlineShoppingCart,
	MdAccessTime,
	MdPriceCheck,
	MdPersonOutline,
	MdOutlineInfo,
	MdClose,
	MdPayment,
	MdInventory,
	MdWarehouse,
	MdSearch,
	MdFilterList,
} from "react-icons/md";
import { BsBasket3, BsCreditCard2Back, BsBarChart } from "react-icons/bs";
import nodeUrl from "../../links";
import ProductTable from "../../components/productPage/products/ProductTable";

import moment from "moment";
import "moment/locale/ru";

moment.locale("ru");
function SalesPageLayoutHeader() {
	const [isModalOpen, setIsModalOpen] = useState({
		klientlar: false,
		smenaYopish: false,
		skidka: false,
	});

	const [isListModalOpen, setIsListModalOpen] = useState(false);
	const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
	const [selectedSale, setSelectedSale] = useState(null);
	const [status, setStatus] = useState("checking");
	const [productData, setProductData] = useState([]);

	const [isModalOpenDis, setIsModalOpenDis] = useState(false);

	const checkNetworkStatus = async () => {
		if (!navigator.onLine) {
			setStatus("offline");
			return;
		}

		try {
			const response = await fetch("https://www.google.com/favicon.ico", {
				method: "HEAD",
				cache: "no-store",
			});

			if (response.ok) {
				setStatus("online");
			} else {
				setStatus("no-internet");
			}
		} catch (error) {
			setStatus("no-internet");
		}
	};

	useEffect(() => {
		checkNetworkStatus();

		const handleOnline = () => checkNetworkStatus();
		const handleOffline = () => setStatus("offline");

		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);

		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, []);

	const handleOpenModal = (modalType) => {
		setIsModalOpen((prevState) => ({ ...prevState, [modalType]: true }));
	};

	const handleCloseModal = (modalType) => {
		setIsModalOpen((prevState) => ({ ...prevState, [modalType]: false }));
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	const openDetailModal = (sale) => {
		setSelectedSale(sale);
		setIsDetailModalOpen(true);
	};

	const renderStatusButton = () => {
		switch (status) {
			case "online":
				return (
					<button className="flex items-center mr-2 justify-center bg-green-500 hover:bg-green-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600">
						<MdOutlineSignalWifiStatusbar4Bar className="mr-3 text-xl" />
						<span className="font-semibold">Online</span>
					</button>
				);
			case "no-internet":
				return (
					<button className="flex items-center mr-2 justify-center bg-green-500 hover:bg-green-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600">
						<MdOutlineSignalWifiStatusbar4Bar className="mr-3 text-xl" />
						<span className="font-semibold">Online</span>
					</button>
				);
			case "offline":
				return (
					<button className="flex items-center mr-2 justify-center bg-red-500 hover:bg-red-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600">
						<MdOutlineSignalWifiStatusbarConnectedNoInternet4 className="mr-3 text-xl" />
						<span className="font-semibold">Offline</span>
					</button>
				);
			default:
				return (
					<button className="flex items-center mr-2 justify-center bg-gray-400 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500">
						<span className="font-semibold">Checking...</span>
					</button>
				);
		}
	};

	const basicUsername = localStorage.getItem("userType");
	const ksb_id = localStorage.getItem("ksbIdNumber");
	const ksbIdNumber = localStorage.getItem("ksbIdNumber");
	const device_id = localStorage.getItem("device_id");

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch(
					`${nodeUrl}/api/all/sales/${ksb_id}`,
				);
				if (!response.ok) {
					throw new Error("Failed to fetch products");
				}
				const data = await response.json();
				setProductData(data);
			} catch (err) {
				console.log(err);
			}
		};
		// const intervalId = setInterval(fetchProducts, 400);
		// return () => clearInterval(intervalId);

		fetchProducts();
	}, [nodeUrl, ksb_id]);

	const [currencyData, setCurrencyData] = useState({});

	const fetchCurrencyData = useCallback(async () => {
		for (const product of productData) {
			if (product.details && !currencyData[product.details]) {
				try {
					const response = await fetch(
						`${nodeUrl}/api/get/currency/data/${device_id}/${ksbIdNumber}/${product.details[0].currency}`,
					);
					const data = await response.json();

					setCurrencyData((prev) => ({
						...prev,
						[product.details[0].currency]: data[0]?.name || "-",
					}));
				} catch (error) {
					console.error("Failed to fetch currency data", error);
					setCurrencyData((prev) => ({
						...prev,
						[product.details[0].currency]: "-",
					}));
				}
			}
		}
	}, [productData]);

	useEffect(() => {
		fetchCurrencyData();
	}, [fetchCurrencyData]);

	const [cashData, setCashData] = useState("");

	const cashDataAll = JSON.parse(localStorage.getItem("settingsCashData"));

	function findObjectById(id) {
		const result = cashDataAll.find((item) => item.cash_id === id);
		return result || null;
	}

	const today = new Date().toLocaleDateString("ru-RU", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});

	return (
		<div className="salesfooter px-4 py-1 bg-slate-100 shadow-lg border-t border-gray-300 flex items-center justify-between">
			<div className="flex items-center justify-start">
				<div className="flex items-center gap-4 pr-5">
					<span className="text-gray-600 text-lg flex items-center gap-2">
						<FaUserAlt className="text-xl" />
						<span className="font-medium">{basicUsername}</span>
					</span>
				</div>
				<div className="flex items-center">
					<button
						onClick={() => handleOpenModal("smenaYopish")}
						className="flex items-center mr-2 justify-center bg-blue-500 hover:bg-blue-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600"
					>
						<BsClock className="mr-3 text-xl" />
						<span className="font-semibold">Smena yopish</span>
					</button>
					<button
						onClick={() => handleOpenModal("klientlar")}
						className="flex items-center mr-2 justify-center bg-blue-500 hover:bg-blue-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600"
					>
						<FaUsersLine className="mr-3 text-xl" />
						<span className="font-semibold">Klientlar</span>
					</button>
				</div>
			</div>
			<div className="mr-2.5 flex items-center">
				{renderStatusButton()}
				<button1
					// onClick={() => handleOpenModal("skidka")}
					onClick={() => setIsModalOpenDis(true)}
					className="flex items-center mr-2 cursor-pointer justify-center bg-red-500 hover:bg-red-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600"
				>
					<CiDiscount1 className="mr-3 text-xl" />
					<span className="font-semibold">Skidka</span>
				</button1>
				<button
					onClick={() => setIsListModalOpen(true)}
					className="flex items-center mr-6 justify-center bg-green-600 hover:bg-green-700 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600"
				>
					<MdOutlineFormatListBulleted className="mr-3 text-xl" />
					<span className="font-semibold">списка</span>
				</button>
				<button className="flex items-center justify-center bg-blue-900 hover:bg-blue-950 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-950">
					<MdCalendarToday className="mr-3 text-xl" />
					<span className="font-semibold">{today}</span>
				</button>
			</div>
			{isListModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
					<div className="bg-white rounded-lg w-full max-w-5xl max-h-[85vh] overflow-hidden">
						<div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center bg-blue-600 text-white">
							<h2 className="text-xl font-semibold flex items-center">
								<BsBasket3 className="mr-2" /> Списка продаж
							</h2>
							<button
								onClick={() => setIsListModalOpen(false)}
								className="p-1 hover:bg-green-700 rounded-full transition-colors"
							>
								<MdClose className="text-2xl" />
							</button>
						</div>

						<div className="p-4">
							<div className="relative">
								<BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
								<input
									type="text"
									placeholder="Поиск..."
									className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								/>
							</div>
						</div>
						<div className="overflow-y-auto max-h-[calc(70vh-4rem)]">
							<div className="grid gap-4 p-4">
								{productData.length > 0 &&
									productData
										.map((sale) => (
											<div
												key={sale.id}
												className="bg-slate-50 border rounded-lg p-4 shadow-sm hover:shadow-md hover:bg-slate-100 transition-shadow"
											>
												<div className="flex items-start">
													<MdPersonOutline className="text-gray-500 mr-2 text-xl" />
													<div>
														<p className="text-sm text-gray-500">
															Клиент
														</p>
														<p className="font-medium text-lg block truncate">
															{sale.client_name}
														</p>
													</div>
												</div>

												<div className="grid grid-cols-3 gap-4">
													<div className="flex items-start">
														<MdPriceCheck className="text-gray-500 mr-2 text-xl" />
														<div>
															<p className="text-sm text-gray-500">
																Сумма
															</p>
															<p className="font-medium text-lg">
																{parseFloat(
																	sale.total_price,
																).toLocaleString(
																	"ru-RU",
																	{
																		minimumFractionDigits: 2,
																		maximumFractionDigits: 2,
																	},
																)}{" "}
																{
																	currencyData[
																		sale
																			.details[0]
																			.currency
																	]
																}
															</p>
														</div>
													</div>
													<div className="flex items-start">
														<MdAccessTime className="text-gray-500 mr-2 text-xl" />
														<div>
															<p className="text-sm text-gray-500">
																Дата
															</p>
															<p className="font-medium text-lg">
																{moment(
																	sale.date,
																).format("LLL")}
															</p>
														</div>
													</div>
													<div className="flex items-center justify-between">
														<div className="flex items-center">
															<div className="mr-4 items-center">
																<p className="text-sm text-gray-500">
																	Статус
																</p>
																<span className="inline-flex text-xl items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-300 text-green-800">
																	{/* {sale.status} */}
																	Не
																	доставлено
																</span>
															</div>
														</div>
														<button
															onClick={() =>
																openDetailModal(
																	sale,
																)
															}
															className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg flex items-center transition-colors"
														>
															<MdOutlineInfo className="mr-1" />
															более
														</button>
													</div>
												</div>
											</div>
										))
										.reverse()}
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Detail Modal */}
			{isDetailModalOpen && selectedSale && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden">
						<div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center bg-blue-600 text-white">
							<h2 className="text-xl font-semibold flex items-center">
								<MdOutlineInfo className="mr-2" /> Подробности
								продажи
							</h2>
							<button
								onClick={() => setIsDetailModalOpen(false)}
								className="p-1 hover:bg-blue-700 rounded-full transition-colors"
							>
								<MdClose className="text-2xl" />
							</button>
						</div>

						<div className="overflow-y-auto max-h-[calc(90vh-4rem)]">
							<div className="px-6 py-4 space-y-6">
								<div className="bg-slate-50 p-4 rounded-lg">
									<h3 className="text-lg font-semibold mb-4 flex items-center">
										<MdPersonOutline className="mr-2" />{" "}
										Информация о продаже
									</h3>
									<div className="grid grid-cols-3 gap-4">
										<p>
											<span className="text-gray-600">
												Клиент:
											</span>{" "}
											{selectedSale.client_name}
										</p>
										<p>
											<span className="text-gray-600">
												Дата:
											</span>{" "}
											{moment(selectedSale.date).format(
												"LLL",
											)}
										</p>
										<p className="text-gray-600">
											Статус:
											<span className="inline-flex ml-2 text-xl items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-300 text-green-800">
												{/* {selectedSale.status} */}
												Не доставлено
											</span>
										</p>
									</div>
								</div>

								{/* Products */}
								<div className="">
									<h3 className="text-lg font-semibold mb-4 flex items-center">
										<MdInventory className="mr-2" />{" "}
										Продукты
									</h3>
									<div className="space-y-3">
										{selectedSale.products.map(
											(product, index) => (
												<div
													key={index}
													className="border rounded-lg p-3 bg-slate-50 hover:bg-slate-100"
												>
													<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
														<p className="font-medium">
															{
																product.product_name
															}
														</p>
														<p>
															Количество:{" "}
															<span className="font-medium">
																{
																	product.quantity
																}
															</span>
														</p>
														<p>
															Цена:{" "}
															<span className="font-medium">
																{parseFloat(
																	product.price,
																).toLocaleString(
																	"ru-RU",
																	{
																		minimumFractionDigits: 2,
																		maximumFractionDigits: 2,
																	},
																)}{" "}
																{
																	currencyData[
																		selectedSale
																			.details[0]
																			.currency
																	]
																}
															</span>
														</p>
														<p>
															Сумма:{" "}
															<span className="font-medium">
																{parseFloat(
																	product.sum,
																).toLocaleString(
																	"ru-RU",
																	{
																		minimumFractionDigits: 2,
																		maximumFractionDigits: 2,
																	},
																)}{" "}
																{
																	currencyData[
																		selectedSale
																			.details[0]
																			.currency
																	]
																}
															</span>
														</p>
													</div>
												</div>
											),
										)}
									</div>
								</div>

								<div className="bg-slate-50 p-4 rounded-lg">
									<h3 className="text-lg font-semibold mb-4 flex items-center">
										<MdPayment className="mr-2" />
										Реквизиты платежа
									</h3>
									<div className="space-y-2">
										{selectedSale.payments.map(
											(payment, index) => (
												<div
													key={index}
													className="flex justify-between"
												>
													<span>
														{
															findObjectById(
																payment.cash,
															).name
														}
													</span>
													<span className="font-medium">
														{parseFloat(
															payment.sum,
														).toLocaleString(
															"ru-RU",
															{
																minimumFractionDigits: 2,
																maximumFractionDigits: 2,
															},
														)}{" "}
														{
															currencyData[
																payment.currency
															]
														}
													</span>
												</div>
											),
										)}
										<div className="flex justify-between border-t pt-2 mt-2">
											<span className="font-semibold">
												Skidka
											</span>
											<span className="font-medium">
												{parseFloat(
													selectedSale.details[0]
														.discount,
												).toLocaleString("ru-RU", {
													minimumFractionDigits: 2,
													maximumFractionDigits: 2,
												})}{" "}
												{
													currencyData[
														selectedSale.details[0]
															.currency
													]
												}
											</span>
										</div>
										<div className="border-t pt-2 mt-2">
											<div className="flex justify-between font-semibold">
												<span>Общая сумма</span>
												<span>
													{parseFloat(
														selectedSale.total_price -
															selectedSale
																.details[0]
																.discount,
													).toLocaleString("ru-RU", {
														minimumFractionDigits: 2,
														maximumFractionDigits: 2,
													})}{" "}
													{
														currencyData[
															selectedSale
																.details[0]
																.currency
														]
													}
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			<DiscountModal
				isOpen={isModalOpenDis}
				onClose={() => setIsModalOpenDis(false)}
				total_price={5000}
			/>
		</div>
	);
}

export default SalesPageLayoutHeader;
