import React, { useState, useEffect, useCallback } from "react";
import { HiOutlineCreditCard, HiOutlineCash } from "react-icons/hi";
import { CiClock1 } from "react-icons/ci";
import PaymentModal from "./PaymentModal";
import PrintingModal from "./PrintModal";

import nodeUrl from "../../links";

import { FaBuilding, FaUserAlt } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { FaUsersLine } from "react-icons/fa6";
import { CiDiscount1 } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
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

import content from "../../localization/content";
import useLang from "../../hooks/useLang";
import SuccessModal from "./SuccessModal";
import CardPaymentModal from "./CardPaymentModal";

function SalesPageLayoutSidebar({ socket }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCardModalOpen, setIsCardModalOpen] = useState(false);
	const [isListModalOpen, setIsListModalOpen] = useState(false);
	const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
	const [selectedSale, setSelectedSale] = useState(null);
	const [status, setStatus] = useState("checking");
	const [productData, setProductData] = useState([]);

	const [language] = useLang("uz");

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
					`${nodeUrl}/api/get/process/sales/${ksb_id}`,
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

		fetchProducts();
	}, [nodeUrl, ksb_id]);

	const [currencyData, setCurrencyData] = useState({});

	const fetchCurrencyData = useCallback(async () => {
		for (const product of productData) {
			if (product && !currencyData[product]) {
				try {
					const response = await fetch(
						`${nodeUrl}/api/get/currency/data/${device_id}/${ksbIdNumber}/${product.mainCurrency}`,
					);
					const data = await response.json();

					setCurrencyData((prev) => ({
						...prev,
						[product.mainCurrency]: data[0]?.name || "-",
					}));
				} catch (error) {
					console.error("Failed to fetch currency data", error);
					setCurrencyData((prev) => ({
						...prev,
						[product.mainCurrency]: "-",
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

	const reversedArray = [...productData].reverse();

	const handleClick = async (sales_id) => {
		localStorage.setItem("sales_id", sales_id);

		if (sales_id) {
			window.location.reload();
		} else {
			alert("Ошибка");
		}
	};

	const [printModal, setPrintModal] = useState(false);
	const [successModal, setSuccessModal] = useState(false);

	return (
		<div className="salespage bg-slate-100 h-[87vh] px-6 py-2 text-slate-100 flex flex-col">
			<div className="flex flex-col items-center gap-5 mt-4">
				<button
					onClick={() => setIsModalOpen(true)}
					className="flex items-center justify-between w-full max-w-xs bg-slate-100 border-2 border-black hover:scale-105 text-black px-5 py-2 text-lg rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-400"
				>
					<span className="font-semibold flex items-center">
						<HiOutlineCash className="mr-3 text-xl" />
						{content[language].salesPage.sidebarCash}
					</span>
				</button>
				<button
					onClick={() => setIsCardModalOpen(true)}
					className="flex items-center justify-between w-full max-w-xs bg-slate-100 border-2 border-black hover:scale-105 text-black px-5 py-2 text-lg rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-400"
				>
					<span className="font-semibold flex items-center">
						<HiOutlineCreditCard className="mr-3 text-xl" />
						{content[language].salesPage.sidebarCard}
					</span>
				</button>
			</div>

			<div className="relative mt-auto mb-10">
				<button
					onClick={() => setIsListModalOpen(true)}
					className="flex items-center justify-center w-full max-w-xs bg-emerald-700 hover:bg-emerald-600 text-slate-100 px-5 py-2 text-base rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-400"
				>
					<span className="font-semibold">
						{content[language].salesPage.sidebarProcess}
					</span>
				</button>
				<div className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
					{productData.length > 0 ? productData.length : 0}
				</div>
			</div>

			<PaymentModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				totalAmount={50000}
				socket={socket}
			/>

			<CardPaymentModal
				isOpen={isCardModalOpen}
				onClose={() => setIsCardModalOpen(false)}
				totalAmount={50000}
				socket={socket}
			/>

			{printModal && (
				<PrintingModal
					setPrintModal={setPrintModal}
					setSuccessModal={setSuccessModal}
				/>
			)}

			{successModal && <SuccessModal />}

			{isListModalOpen && (
				<div className="fixed inset-0 text-black bg-gray-900/75 backdrop-blur-sm flex items-center justify-center z-40">
					<div className="bg-white rounded-xl w-full max-w-4xl h-[80vh] overflow-hidden shadow-lg">
						{/* Header */}
						<div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm">
							<h2 className="text-base font-bold flex items-center">
								<BsBasket3 className="mr-2 text-lg" />{" "}
								{content[language].salesPage.sidebarProcess}
							</h2>
							<button
								onClick={() => setIsListModalOpen(false)}
								className="p-1 hover:bg-white/20 rounded transition-colors duration-200"
							>
								<MdClose className="text-lg" />
							</button>
						</div>

						{/* Search Section */}
						{/* <div className="p-3 border-b border-gray-200">
							<div className="relative">
								<BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
								<input
									type="text"
									placeholder="Поиск..."
									className="w-[500px] pl-8 pr-2 py-2 bg-gray-50 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
								/>
							</div>
						</div> */}

						{/* Table Section */}
						<div className="overflow-y-auto max-h-[calc(75vh-5rem)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
							{reversedArray.length > 0 ? (
								<table className="w-full text-left text-gray-700 text-sm">
									<thead className="bg-gray-100 text-gray-600 font-medium">
										<tr>
											{/* <th className="px-3 py-2">
												Клиент
											</th> */}
											<th className="px-3 py-2">Дата</th>
											<th className="px-3 py-2">Сумма</th>

											{/* <th className="px-3 py-2">
												Статус
											</th> */}
											<th className="px-3 py-2 text-center">
												Действие
											</th>
										</tr>
									</thead>
									<tbody>
										{reversedArray.map((sale) => (
											<tr
												key={sale.id}
												className="border-b hover:bg-gray-50 transition-all"
											>
												{/* Client Name */}
												{/* <td className="px-3 py-2 font-medium text-gray-900">
													<div className="flex items-center space-x-2">
														<MdPersonOutline className="text-blue-600 text-sm" />
														<span className="truncate max-w-[200px]">
															{sale.client_name}
														</span>
													</div>
												</td> */}

												<td className="px-3 py-2">
													<div className="flex items-center space-x-1">
														<MdAccessTime className="text-purple-600 text-sm" />
														<span>
															{moment(
																sale.date,
															).isSame(
																moment(),
																"day",
															)
																? moment(
																		sale.date,
																  ).format(
																		"HH:mm",
																  )
																: moment(
																		sale.date,
																  ).format(
																		"DD.MM.YYYY HH:mm",
																  )}
														</span>
													</div>
												</td>

												{/* Total Price */}
												<td className="px-3 py-2">
													<div className="flex items-center space-x-1">
														<MdPriceCheck className="text-green-600 text-sm" />
														<span>
															{parseFloat(
																sale.summa,
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
																		.mainCurrency
																]
															}
														</span>
													</div>
												</td>

												{/* Date */}

												{/* Status */}
												{/* <td className="px-3 py-2">
													<span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-800">
														{sale.status}
													</span>
												</td> */}

												{/* Action Button */}
												<td className="px-3 py-2 text-center">
													{/* <div className="relative inline-block mx-2 group">
														<button className="bg-gray-100 border hover:bg-red-500 hover:text-white text-black px-2 py-1.5 rounded transition-colors duration-200 font-medium text-sm">
															<MdDeleteForever />
														</button>
													</div> */}

													<div className="relative inline-block mx-2 group">
														<button className="bg-gray-100 border hover:bg-blue-600 text-black hover:text-white px-2 py-1.5 rounded transition-colors duration-200 font-medium text-sm">
															<MdEdit />
														</button>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							) : (
								<div className="text-center py-10 text-gray-500 text-lg font-medium">
									Нет продаж
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default SalesPageLayoutSidebar;

