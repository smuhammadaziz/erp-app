import React, { useState, useEffect, useCallback } from "react";
import { FaBuilding, FaUserAlt } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { FaUsersLine } from "react-icons/fa6";
import { CiDiscount1 } from "react-icons/ci";
import { MdOutlineFormatListBulleted, MdCalendarToday } from "react-icons/md";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { MdPendingActions } from "react-icons/md";
import { MdOutlineDoneAll } from "react-icons/md";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { HiOutlineDocumentMinus } from "react-icons/hi2";
import { HiOutlineDocumentCheck } from "react-icons/hi2";
import { HiOutlineDocument } from "react-icons/hi2";
import { LuClock4 } from "react-icons/lu";
import { LuClockAlert } from "react-icons/lu";
import { IoInformation } from "react-icons/io5";
import { FiPrinter } from "react-icons/fi";

import { RiDiscountPercentLine } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import DiscountModal from "./DiscountModal";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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

import content from "../../localization/content";
import useLang from "../../hooks/useLang";

import moment from "moment";
import "moment/locale/ru";
import { ImInfo } from "react-icons/im";

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
	const [productData, setProductData] = useState([]);
	const [selectedRowId, setSelectedRowId] = useState(null);

	const [isModalOpenDis, setIsModalOpenDis] = useState(false);

	const [language] = useLang("uz");

	const handleOpenModal = (modalType) => {
		setIsModalOpen((prevState) => ({ ...prevState, [modalType]: true }));
	};

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

	const today = new Date().toLocaleDateString("ru-RU", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});

	const [warehouseData, setWarehouseData] = useState({});

	const settingsWarehouse = JSON.parse(
		localStorage.getItem("settingsWarehouse"),
	);

	const fetchWarehouseData = useCallback(async () => {
		for (const product of productData) {
			if (
				product.details[0].warehouse &&
				!warehouseData[product.details[0].warehouse]
			) {
				const deviceId = localStorage.getItem("device_id");
				const ksbId = localStorage.getItem("ksbIdNumber");

				try {
					if (
						!Array.isArray(settingsWarehouse) ||
						settingsWarehouse.length === 0
					) {
						throw new Error("Invalid settingsWarehouse data");
					}

					const response = await fetch(
						`${nodeUrl}/api/get/warehouse/data/${deviceId}/${ksbId}/${product.details[0].warehouse}`,
					);

					const apiData = await response.json();

					const mainWarehouseIds = settingsWarehouse
						.filter((item) => item.main)
						.map((item) => item.warehouse);

					const warehouseData = mainWarehouseIds.reduce(
						(acc, warehouseId) => {
							const matchedWarehouse = apiData.find(
								(item) => item.item_id === warehouseId,
							);

							acc[warehouseId] = matchedWarehouse
								? matchedWarehouse.name
								: "-";
							return acc;
						},
						{},
					);

					setWarehouseData((prev) => ({ ...prev, ...warehouseData }));
				} catch (error) {
					console.error(
						"Error fetching or processing warehouse data",
						error,
					);
				}
			}
		}
	}, [productData, warehouseData]);

	useEffect(() => {
		fetchWarehouseData();
	}, [fetchWarehouseData]);

	const [searchTerm, setSearchTerm] = useState("");
	const [showCalendar, setShowCalendar] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	const [statusFilters, setStatusFilters] = useState({
		process: false,
		delivered: false,
		falseDelivered: false,
	});

	// Filter function that combines all filters
	const getFilteredData = () => {
		return productData.filter((sale) => {
			// Search filter
			const searchMatch =
				sale.client_name
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				warehouseData[sale.details[0].warehouse]
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				sale.total_price.toString().includes(searchTerm);

			// Date filter
			const dateMatch = selectedDate
				? moment(sale.date).isSame(moment(selectedDate), "day")
				: true;

			// Status filters
			const statusMatch =
				(!statusFilters.process &&
					!statusFilters.delivered &&
					!statusFilters.falseDelivered) ||
				(statusFilters.process && sale.status === "process") ||
				(statusFilters.delivered && sale.status === "delivered") ||
				(statusFilters.falseDelivered &&
					sale.status === "falseDelivered");

			return searchMatch && dateMatch && statusMatch;
		});
	};

	const handleStatusFilterChange = (status) => {
		setStatusFilters((prev) => ({
			...prev,
			[status]: !prev[status],
		}));
	};

	const handleDateSelect = (date) => {
		setSelectedDate(date);
		setShowCalendar(false);
	};

	const filteredData = getFilteredData();

	useEffect(() => {
		if (!selectedDate) {
			setShowCalendar(false);
		}
	}, [selectedDate]);

	return (
		<div className="salesfooter px-4 py-1 bg-slate-100 shadow-lg border-t border-gray-300 flex items-center justify-between">
			<div className="flex items-center justify-start">
				<div className="flex items-center gap-4 pr-5">
					<span className="text-black text-lg flex items-center gap-2">
						<HiOutlineUserCircle className="text-2xl" />
						<span className="font-medium">{basicUsername}</span>
					</span>
				</div>
				{/* <div className="mx-5">|</div>
				<div className="flex items-center">
					<button
						onClick={() => handleOpenModal("klientlar")}
						className="flex items-center mr-2 justify-center bg-slate-100 hover:bg-slate-300 rounded-lg text-black px-7 py-2 text-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600"
					>
						<FaUsersLine className="mr-3 text-xl" />
						<span className="font-semibold">
							{content[language].salesPage.headerClients}
						</span>
					</button>
				</div> */}
			</div>
			<div className="flex items-center">
				<button
					// onClick={() => handleOpenModal("skidka")}
					onClick={() => setIsModalOpenDis(true)}
					className="flex w-[150px]  items-center mr-2 cursor-pointer justify-center bg-red-500 hover:bg-red-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600"
				>
					<RiDiscountPercentLine className="mr-3 text-2xl " />
					<span className="font-500">
						{content[language].salesPage.headerDiscount}
					</span>
				</button>
				<button
					onClick={() => setIsListModalOpen(true)}
					className="flex w-[200px] items-center mr-4 justify-center bg-green-600 hover:bg-green-500 text-slate-100 px-6 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600"
				>
					<MdOutlineFormatListBulleted className="mr-3 text-xl" />
					<span className="font-500">
						{content[language].salesPage.headerList}
					</span>
				</button>
				<p className="flex items-center w-[180px] justify-center bg-slate-100 border-2 border-black  text-black px-7 py-1.5 text-lg rounded-lg transition duration-300 ease-in-out ">
					{/* <MdCalendarToday className="mr-3 text-xl" /> */}
					<span className="font-semibold">{today}</span>
				</p>
			</div>
			{isListModalOpen && (
				<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-40">
					<div className="bg-white rounded-lg w-full max-w-[85vw] h-[90vh] overflow-hidden">
						<div className="px-4 py-3 border-b border-gray-200 flex text-white justify-between items-center bg-blue-600">
							<h2 className="text-lg font-semibold flex items-center gap-2 text-white">
								<BsBasket3 className="text-xl" />
								{content[language].salesPage.headerList}
							</h2>
							<button
								onClick={() => setIsListModalOpen(false)}
								className="p-1.5 hover:bg-blue-500 rounded-lg transition-colors"
							>
								<MdClose className="text-xl" />
							</button>
						</div>

						<div className="p-3 border-b border-gray-200 bg-gray-50">
							<div className="flex flex-wrap gap-4 items-center">
								<div className="relative max-w-md flex-grow">
									<BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
									<input
										type="text"
										value={searchTerm}
										onChange={(e) =>
											setSearchTerm(e.target.value)
										}
										placeholder="Поиск..."
										className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
									/>
								</div>
								<div className="relative">
									<button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-2">
										<FiPrinter />
										Печать{" "}
									</button>
								</div>
								<div className="relative">
									<button
										onClick={() => {
											if (selectedDate) {
												setSelectedDate(null);
											} else {
												setShowCalendar(!showCalendar);
											}
										}}
										className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
									>
										{selectedDate ? (
											<>
												{moment(selectedDate).format(
													"DD.MM.YYYY",
												)}
												<MdClose className="text-sm" />
											</>
										) : (
											"Выберите дату"
										)}
									</button>
									{showCalendar && (
										<div className="absolute top-full mt-2 z-50">
											<Calendar
												onChange={handleDateSelect}
												value={selectedDate}
												className="border border-gray-200 rounded-lg shadow-lg"
											/>
										</div>
									)}
								</div>
								<div className="flex gap-4">
									<label className="flex items-center gap-2 text-sm">
										<input
											type="checkbox"
											checked={statusFilters.delivered}
											onChange={() =>
												handleStatusFilterChange(
													"delivered",
												)
											}
											className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
										/>
										Тасдиқланган
									</label>
									<label className="flex items-center gap-2 text-sm">
										<input
											type="checkbox"
											checked={
												statusFilters.falseDelivered
											}
											onChange={() =>
												handleStatusFilterChange(
													"falseDelivered",
												)
											}
											className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
										/>
										Тасдиқланмаган
									</label>
									<label className="flex items-center gap-2 text-sm">
										<input
											type="checkbox"
											checked={statusFilters.process}
											onChange={() =>
												handleStatusFilterChange(
													"process",
												)
											}
											className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
										/>
										Кутилмоқда
									</label>
								</div>
								<div className="font-bold ml-10">
									({filteredData ? filteredData.length : 0})
								</div>
							</div>
						</div>

						<div className="overflow-y-auto max-h-[calc(90vh-8rem)]">
							<table className="w-full border-collapse">
								<thead>
									<tr className="bg-gray-100">
										<th className="border w-[200px] border-gray-200 p-2 text-left font-medium text-sm align-top">
											Дата
										</th>
										<th className="border w-[500px] border-gray-200 font-medium text-sm">
											<div className="p-2 border-b border-gray-200 text-left">
												Склад
											</div>
											<div className="p-2 text-left">
												Клиент
											</div>
										</th>
										<th className="border border-gray-200 p-2 text-left font-medium text-sm align-top">
											Сумма
										</th>
										<th className="border w-[150px] border-gray-200 p-2 text-left font-medium text-sm align-top">
											Статус
										</th>
										<th className="border border-gray-200 p-2 text-left font-medium text-sm align-top">
											Автор
										</th>
									</tr>
								</thead>
								<tbody>
									{filteredData.length > 0 ? (
										[...filteredData]
											.reverse()
											.map((sale) => (
												<tr
													key={sale.id}
													className={`cursor-pointer transition-colors ${
														selectedRowId ===
														sale.id
															? "bg-blue-200 text-black hover:bg-blue-200"
															: "hover:bg-gray-50"
													}`}
													onClick={() =>
														setSelectedRowId(
															sale.id,
														)
													}
													onDoubleClick={() =>
														openDetailModal(sale)
													}
												>
													<td className="border border-gray-200 p-2 text-sm w-[200px]">
														<span className="mr-4">
															{sale.status ===
															"process" ? (
																<HiOutlineDocument
																	className={`text-xl inline ${
																		selectedRowId ===
																		sale.id
																			? "text-black"
																			: "text-blue-600"
																	}`}
																/>
															) : sale.status ===
															  "delivered" ? (
																<HiOutlineDocumentCheck
																	className={`text-xl inline ${
																		selectedRowId ===
																		sale.id
																			? "text-black"
																			: "text-blue-600"
																	}`}
																/>
															) : sale.status ===
															  "falseDelivered" ? (
																<HiOutlineDocument
																	className={`text-xl inline ${
																		selectedRowId ===
																		sale.id
																			? "text-black"
																			: "text-blue-600"
																	}`}
																/>
															) : (
																sale.status
															)}
														</span>
														{moment(
															sale.date,
														).isSame(
															moment(),
															"day",
														)
															? moment(
																	sale.date,
															  ).format("HH:mm")
															: moment(
																	sale.date,
															  ).format(
																	"DD.MM.YYYY HH:mm",
															  )}
													</td>
													<td className="border border-gray-200 text-sm w-[500px]">
														<div
															className="p-1 border-b border-gray-200 truncate"
															title={
																sale.details[0]
																	?.warehouse
															}
														>
															{
																warehouseData[
																	sale
																		.details[0]
																		.warehouse
																]
															}
														</div>
														<div
															className={`p-1 truncate font-medium ${
																sale.client_name ===
																"<не указан>"
																	? "text-slate-300"
																	: ""
															}`}
															title={
																sale.client_name
															}
														>
															{sale.client_name}
														</div>
													</td>
													<td className="border border-gray-200 font-medium p-2 text-sm">
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
																sale.details[0]
																	.currency
															]
														}
													</td>
													<td className="border border-gray-200 p-1 w-[150px]">
														{sale.status ===
														"process" ? (
															<p
																className={`${
																	selectedRowId ===
																	sale.id
																		? "bg-orange-600"
																		: "bg-orange-500"
																} px-3 py-1 w-[100px] rounded-full text-xs font-medium text-white text-center`}
															>
																Кутилмоқда
															</p>
														) : sale.status ===
																"delivered" ||
														  sale.status ===
																"falseDelivered" ? (
															<p
																className={`${
																	selectedRowId ===
																	sale.id
																		? "bg-green-600"
																		: "bg-green-500"
																} px-3 py-1 w-[100px] rounded-full text-xs font-medium text-white text-center`}
															>
																Юборилди
															</p>
														) : (
															sale.status
														)}
													</td>
													<td className="border border-gray-200 p-2 text-sm">
														{sale.seller}
													</td>
												</tr>
											))
									) : (
										<tr>
											<td
												colSpan="6"
												className="text-center py-10 text-gray-500 text-sm border border-gray-200"
											>
												Ҳозирча савдолар йўқ
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}
			{/* Detail Modal */}
			{isDetailModalOpen && selectedSale && (
				<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg w-full max-w-[95vw] min-h-[80vh] overflow-hidden">
						<div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-white">
							<h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
								<MdOutlineInfo className="text-xl" />
								Подробности продажи
							</h2>
							<button
								onClick={() => setIsDetailModalOpen(false)}
								className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
							>
								<MdClose className="text-xl" />
							</button>
						</div>

						<div className="overflow-y-auto max-h-[calc(90vh-4rem)]">
							{/* Basic Info Header */}
							<div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
								<div className="grid grid-cols-3 gap-4 text-sm">
									<div>
										<span className="text-gray-500 block">
											Клиент
										</span>
										<span
											className={`font-medium ${
												selectedSale.client_name ===
												"<не указан>"
													? "text-slate-300"
													: "text-gray-900"
											}`}
										>
											{selectedSale.client_name}
										</span>
									</div>

									<div>
										<span className="text-gray-500 block">
											Дата
										</span>
										<span className="font-medium text-gray-900">
											{moment(selectedSale.date).isSame(
												moment(),
												"day",
											)
												? moment(
														selectedSale.date,
												  ).format("HH:mm")
												: moment(
														selectedSale.date,
												  ).format("DD.MM.YYYY HH:mm")}
										</span>
									</div>
									<div>
										<span className="text-gray-500 block">
											Статус
										</span>
										<span className="flex items-center">
											<span className="mr-3">
												{selectedSale.status ===
												"process" ? (
													<p
														className={`${
															selectedRowId ===
															selectedSale.id
																? "bg-orange-600"
																: "bg-orange-500"
														} px-3 py-1 w-[100px] rounded-full text-xs font-medium text-white text-center`}
													>
														Кутилмоқда
													</p>
												) : selectedSale.status ===
														"delivered" ||
												  selectedSale.status ===
														"falseDelivered" ? (
													<p
														className={`${
															selectedRowId ===
															selectedSale.id
																? "bg-green-600"
																: "bg-green-500"
														} px-3 py-1 w-[100px] rounded-full text-xs font-medium text-white text-center`}
													>
														Юборилди
													</p>
												) : (
													selectedSale.status
												)}
											</span>
											{selectedSale.status ===
											"process" ? (
												<HiOutlineDocument
													className={`text-xl inline ${
														selectedRowId ===
														selectedSale.id
															? "text-blue-600"
															: "text-blue-600"
													}`}
												/>
											) : selectedSale.status ===
											  "delivered" ? (
												<HiOutlineDocumentCheck
													className={`text-xl inline ${
														selectedRowId ===
														selectedSale.id
															? "text-blue-600"
															: "text-blue-600"
													}`}
												/>
											) : selectedSale.status ===
											  "falseDelivered" ? (
												<HiOutlineDocument
													className={`text-xl inline ${
														selectedRowId ===
														selectedSale.id
															? "text-blue-600"
															: "text-blue-600"
													}`}
												/>
											) : (
												selectedSale.status
											)}
										</span>
									</div>
								</div>
							</div>

							{/* Products Table */}
							<div className="px-4 py-3">
								<h3 className="text-base font-semibold mb-3">
									Продукты
								</h3>
								<div className="border border-gray-200 rounded-lg overflow-hidden">
									<div className="grid grid-cols-4 gap-4 bg-gray-50 px-4 py-2 border-b border-gray-200 text-sm font-medium text-gray-500">
										<div>Продукт</div>
										<div>Количество</div>
										<div>Цена</div>
										<div>Сумма</div>
									</div>
									<div className="divide-y divide-gray-200">
										{selectedSale.products.map(
											(product, index) => (
												<div
													key={index}
													className="grid grid-cols-4 gap-4 px-4 py-2 text-sm"
												>
													<div
														className="truncate"
														title={
															product.product_name
														}
													>
														{product.product_name}
													</div>
													<div>
														{product.quantity}
													</div>
													<div>
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
													</div>
													<div>
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
													</div>
												</div>
											),
										)}
									</div>
								</div>
							</div>

							{/* Payment Details */}
							<div className="px-4 py-3 border-t border-gray-200">
								<h3 className="text-base font-semibold mb-3">
									Реквизиты платежа
								</h3>
								<div className="border border-gray-200 rounded-lg overflow-hidden">
									<div className="divide-y divide-gray-200">
										<div className="grid grid-cols-2 px-4 py-2 bg-gray-50">
											<span className="font-medium text-gray-900">
												Общая сумма
											</span>
											<span className="text-right">
												{parseFloat(
													selectedSale.total_price,
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
										<div className="grid grid-cols-2 px-4 py-2">
											<span className="font-medium text-gray-900">
												Skidka
											</span>
											<span className="text-right">
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
										{selectedSale.payments.map(
											(payment, index) => (
												<div
													key={index}
													className="grid grid-cols-2 px-4 py-2"
												>
													<span className="text-gray-600">
														{
															findObjectById(
																payment.cash,
															)?.name
														}
													</span>
													<span className="text-right">
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

