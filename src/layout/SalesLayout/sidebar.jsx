import React, { useState, useEffect, useCallback } from "react";
import { HiOutlineCreditCard, HiOutlineCash } from "react-icons/hi";
import { CiClock1 } from "react-icons/ci";
import PaymentModal from "./PaymentModal";

import nodeUrl from "../../links";

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

import moment from "moment";
import "moment/locale/ru";

moment.locale("ru");

function SalesPageLayoutSidebar() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isListModalOpen, setIsListModalOpen] = useState(false);
	const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
	const [selectedSale, setSelectedSale] = useState(null);
	const [status, setStatus] = useState("checking");
	const [productData, setProductData] = useState([]);

	const openDetailModal = (sale) => {
		setSelectedSale(sale);
		setIsDetailModalOpen(true);
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

	return (
		<div className="salespage bg-slate-100 h-[87vh] px-6 py-2 text-slate-100 flex flex-col">
			<div className="flex flex-col items-center gap-5 mt-4">
				<button
					onClick={() => setIsModalOpen(true)}
					className="flex items-center justify-center w-full max-w-xs bg-emerald-700 hover:bg-emerald-600 text-slate-100 px-5 py-2 text-lg rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-400"
				>
					<HiOutlineCash className="mr-3 text-xl" />
					<span className="font-semibold">Нақд</span>
				</button>
				<button className="flex items-center justify-center w-full max-w-xs bg-blue-700 hover:bg-blue-600 text-slate-100 px-5 py-2 text-lg rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400">
					<HiOutlineCreditCard className="mr-3 text-xl" />
					<span className="font-semibold">Пластик</span>
				</button>
			</div>

			<div className="relative mt-auto mb-10">
				<div className="absolute -top-2 -left-2 flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
					10
				</div>
				<button
					onClick={() => setIsListModalOpen(true)}
					className="flex items-center justify-center w-full max-w-xs bg-emerald-700 hover:bg-emerald-600 text-slate-100 px-5 py-2 text-base rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-400"
				>
					<CiClock1 className="mr-3 text-base" />
					<span className="font-semibold">Жараёнда</span>
				</button>
			</div>

			<PaymentModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				totalAmount={50000}
			/>

			{isListModalOpen && (
				<div className="fixed inset-0 text-black bg-black bg-opacity-50 flex items-center justify-center z-40">
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
									productData.map((sale) => (
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
																Не доставлено
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
														Смотреть
													</button>
												</div>
											</div>
										</div>
									))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default SalesPageLayoutSidebar;
