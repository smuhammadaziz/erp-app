import React, { useState, useEffect, useCallback } from "react";

import {
	MdOutlineFormatListBulleted,
	MdOutlineInfo,
	MdCalendarToday,
	MdFilterList,
	MdClose,
	MdWarehouse,
	MdDelete,
} from "react-icons/md";
import {
	HiOutlineUserCircle,
	HiOutlineDocumentCheck,
	HiOutlineDocument,
	HiOutlineDocumentMinus,
} from "react-icons/hi2";
import { SlBasket } from "react-icons/sl";
import { FiPrinter, FiEye } from "react-icons/fi";
import { PiWarningCircleBold, PiCardsThreeFill } from "react-icons/pi";
import { RiDiscountPercentLine } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { GoAlert } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { TbBasketExclamation } from "react-icons/tb";
import { IoBasketOutline } from "react-icons/io5";

import DiscountModal from "./DiscountModal";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import nodeUrl from "../../links";

import content from "../../localization/content";
import useLang from "../../hooks/useLang";

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
	const [productData, setProductData] = useState([]);
	const [selectedRowId, setSelectedRowId] = useState(null);

	const [isModalOpenDis, setIsModalOpenDis] = useState(false);

	const [showPopup, setShowPopup] = useState(false);
	const [activePopupId, setActivePopupId] = useState(null);
	const [language] = useLang("uz");

	const [searchTerm, setSearchTerm] = useState("");
	const [showCalendar, setShowCalendar] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	const [statusFilters, setStatusFilters] = useState({
		process: false,
		delivered: false,
		falseDelivered: false,
	});
	const [showFilters, setShowFilters] = useState(false);
	const [viewMode, setViewMode] = useState("table");
	const [showActionsMenu, setShowActionsMenu] = useState(null);

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

	useEffect(() => {
		if (!selectedDate) {
			setShowCalendar(false);
		}
	}, [selectedDate]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (!event.target.closest(".popup-container")) {
				setShowPopup(false);
			}
		};
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	// ==================== new code ====================

	useEffect(() => {
		const savedViewMode = localStorage.getItem("viewModeProcess");
		if (savedViewMode) {
			setViewMode(savedViewMode);
		}
	}, []);

	const getFilteredData = () => {
		return productData.filter((sale) => {
			const searchMatch =
				sale.client_name
					?.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				warehouseData[sale.mainWarehouse]
					?.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				sale.summa?.toString().includes(searchTerm);

			const dateMatch = selectedDate
				? moment(sale.date).isSame(moment(selectedDate), "day")
				: true;

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

	const getStatusBadge = (status, error) => {
		switch (status) {
			case "process":
				return (
					<div className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
						<HiOutlineDocument className="text-sm" />
					</div>
				);
			case "delivered":
				return (
					<div className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
						<HiOutlineDocumentCheck className="text-sm" />
					</div>
				);
			case "falseDelivered":
				return (
					<div className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
						<HiOutlineDocumentMinus className="text-sm" />
					</div>
				);
			case "problem":
				return (
					<div className="relative inline-block popup-container">
						<div
							className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-rose-100 text-rose-800 border border-rose-200 cursor-pointer"
							onClick={(e) => {
								e.stopPropagation();
								setShowPopup(!showPopup);
							}}
						>
							<PiWarningCircleBold className="text-sm" />
						</div>

						{showPopup &&
							(viewMode === "table" ? (
								<div className="absolute left-0 top-100 z-10 w-[300px] -translate-y-5/50 rounded-lg bg-white p-3 text-sm shadow-lg border border-gray-300">
									<p className="text-red-600">{error}</p>
								</div>
							) : (
								<div className="absolute right-0 top-100 z-10 w-[300px] -translate-y-5/50 rounded-lg bg-white p-3 text-sm shadow-lg border border-gray-300">
									<p className="text-red-600">{error}</p>
								</div>
							))}
					</div>
				);
			default:
				return status;
		}
	};

	const clearAllFilters = () => {
		setSearchTerm("");
		setSelectedDate(null);
		setStatusFilters({
			process: false,
			delivered: false,
			falseDelivered: false,
		});
	};

	useEffect(() => {
		const handleClickOutside = () => {
			setShowActionsMenu(null);
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const [isExitModalOpen, setIsExitModalOpen] = useState(false);

	const deleteOneSales = async (salesId) => {
		try {
			const response = await fetch(
				`${nodeUrl}/api/delete/one/sales/${salesId}`,
				{
					method: "DELETE",
				},
			);

			if (response.ok) {
				console.log("removed");
			} else {
				console.log("no item to remove");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div className="salesfooter px-4 py-1 bg-slate-100 shadow-lg border-t border-gray-300 flex items-center justify-between">
			<div className="flex items-center justify-start">
				<div className="flex items-center gap-4 pr-5">
					<span className="text-black text-lg flex items-center gap-2">
						<HiOutlineUserCircle className="text-2xl" />
						<span className="font-medium">{basicUsername}</span>
					</span>
				</div>
			</div>
			<div className="flex items-center">
				<button
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
					<span className="font-semibold">{today}</span>
				</p>
			</div>
			{isListModalOpen && (
				<div className="fixed inset-0 bg-black/70 flex items-center text-black justify-center z-40 backdrop-blur-sm">
					<div className="bg-white rounded-xl w-full max-w-[90vw] h-[90vh] overflow-hidden flex flex-col shadow-2xl">
						<div className="px-6 py-4 border-b flex justify-between items-center bg-white">
							<div className="flex items-center gap-3">
								<div className="bg-indigo-50 p-2 rounded-lg">
									<SlBasket className="text-2xl text-indigo-600" />
								</div>
								<div>
									<h2 className="text-xl font-semibold text-gray-800">
										{content[language].salesPage.headerList}
									</h2>
									<p className="text-sm text-gray-500">
										Управление заказами и отслеживание
										доставки
									</p>
								</div>
							</div>

							<div className="flex items-center gap-3">
								<button
									className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
									onClick={() => {
										const newViewMode =
											viewMode === "table"
												? "card"
												: "table";
										setViewMode(newViewMode); // Update state
										localStorage.setItem(
											"viewModeProcess",
											newViewMode,
										);
									}}
								>
									{viewMode === "table" ? (
										<MdOutlineFormatListBulleted className="text-xl" />
									) : (
										<PiCardsThreeFill className="text-xl" />
									)}
								</button>
								<button
									onClick={() => setIsListModalOpen(false)}
									className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
								>
									<MdClose className="text-xl" />
								</button>
							</div>
						</div>

						{/* === filters === */}
						<div className="p-5 bg-white border-b">
							<div className="flex flex-wrap items-center gap-3">
								<div className="relative flex-grow max-w-md">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<BiSearch className="text-gray-400" />
									</div>
									<input
										type="text"
										value={searchTerm}
										onChange={(e) =>
											setSearchTerm(e.target.value)
										}
										placeholder="Поиск по имени, складу или сумме..."
										className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all"
									/>
									{searchTerm && (
										<button
											onClick={() => setSearchTerm("")}
											className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
										>
											<MdClose />
										</button>
									)}
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
										className={`px-4 py-2.5 rounded-lg text-sm flex items-center gap-2 transition-all ${
											selectedDate
												? "bg-indigo-500 text-white hover:bg-indigo-600"
												: "bg-gray-50 border border-gray-300 text-gray-700 hover:bg-gray-100"
										}`}
									>
										<MdCalendarToday />
										{selectedDate
											? `${moment(selectedDate).format(
													"DD.MM.YYYY",
											  )}`
											: "Выберите дату"}
										{selectedDate && (
											<MdClose className="text-sm hover:text-gray-100" />
										)}
									</button>
									{showCalendar && (
										<div className="absolute top-full mt-2 z-50">
											<Calendar
												onChange={handleDateSelect}
												value={selectedDate}
												className="border border-gray-200 rounded-lg shadow-xl"
											/>
										</div>
									)}
								</div>

								<button
									onClick={() => setShowFilters(!showFilters)}
									className={`px-4 py-2.5 rounded-lg text-sm flex items-center gap-2 transition-all ${
										Object.values(statusFilters).some(
											Boolean,
										)
											? "bg-indigo-50 text-indigo-700 border border-indigo-200"
											: "bg-gray-50 border border-gray-300 text-gray-700 hover:bg-gray-100"
									}`}
								>
									<MdFilterList />
									Фильтры
									{Object.values(statusFilters).some(
										Boolean,
									) && (
										<span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs text-white">
											{
												Object.values(
													statusFilters,
												).filter(Boolean).length
											}
										</span>
									)}
								</button>

								{(searchTerm ||
									selectedDate ||
									Object.values(statusFilters).some(
										Boolean,
									)) && (
									<button
										onClick={clearAllFilters}
										className="px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all"
									>
										Сбросить фильтры
									</button>
								)}

								<div className="ml-auto text-sm text-gray-500 font-medium">
									Найдено:{" "}
									<span className="text-gray-900 font-semibold">
										{filteredData.length}
									</span>
								</div>
							</div>

							{showFilters && (
								<div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
									<h4 className="text-sm font-medium text-gray-700 mb-3">
										Фильтр по статусу:
									</h4>
									<div className="flex flex-wrap gap-3">
										<button
											onClick={() =>
												handleStatusFilterChange(
													"process",
												)
											}
											className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all ${
												statusFilters.process
													? "bg-indigo-100 text-indigo-800 border border-indigo-300"
													: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
											}`}
										>
											<HiOutlineDocument
												className={
													statusFilters.process
														? "text-indigo-600"
														: "text-gray-500"
												}
											/>
											В процессе
										</button>
										<button
											onClick={() =>
												handleStatusFilterChange(
													"delivered",
												)
											}
											className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all ${
												statusFilters.delivered
													? "bg-emerald-100 text-emerald-800 border border-emerald-300"
													: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
											}`}
										>
											<HiOutlineDocumentCheck
												className={
													statusFilters.delivered
														? "text-emerald-600"
														: "text-gray-500"
												}
											/>
											Доставлено
										</button>
										<button
											onClick={() =>
												handleStatusFilterChange(
													"falseDelivered",
												)
											}
											className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all ${
												statusFilters.falseDelivered
													? "bg-rose-100 text-rose-800 border border-rose-300"
													: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
											}`}
										>
											<HiOutlineDocumentMinus
												className={
													statusFilters.falseDelivered
														? "text-rose-600"
														: "text-gray-500"
												}
											/>
											Не доставлено
										</button>
									</div>
								</div>
							)}
						</div>

						<div className="overflow-y-auto flex-grow p-5 bg-gray-50 z-100 relative">
							{filteredData.length > 0 ? (
								viewMode === "table" ? (
									<div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
										<table className="min-w-full divide-y divide-gray-200 table-fixed">
											<thead className="bg-gray-50">
												<tr>
													<th
														scope="col"
														className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[200px]"
													>
														Дата
													</th>
													<th
														scope="col"
														className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[200px]"
													>
														Склад
													</th>
													<th
														scope="col"
														className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[200px]"
													>
														Клиент
													</th>
													<th
														scope="col"
														className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[200px]"
													>
														Сумма
													</th>
													<th
														scope="col"
														className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[200px]"
													>
														Статус
													</th>
													<th
														scope="col"
														className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[200px]"
													>
														Автор
													</th>
													<th
														scope="col"
														className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-[100px]"
													>
														Действия
													</th>
												</tr>
											</thead>
											<tbody className="bg-white divide-y divide-gray-200">
												{[...filteredData]
													.reverse()
													.map((sale) => (
														<tr
															key={sale.id}
															className={`group transition-all ${
																selectedRowId ===
																sale.id
																	? "bg-indigo-50"
																	: "hover:bg-gray-50"
															}`}
															onClick={() =>
																setSelectedRowId(
																	sale.id,
																)
															}
															onDoubleClick={() =>
																openDetailModal &&
																openDetailModal(
																	sale,
																)
															}
														>
															<td className="px-6 py-4">
																<div className="flex items-center">
																	{getStatusBadge(
																		sale.status,
																		sale.errorMessage,
																	)}
																	<div className="ml-3 text-sm text-gray-500">
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
																	</div>
																</div>
															</td>
															<td className="px-6 py-4">
																<div className="flex items-center">
																	{/* <div className="flex-shrink-0 h-8 w-8 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-600">
																									<MdWarehouse />
																								</div> */}
																	<div className="">
																		<div className="text-sm font-medium text-gray-900">
																			{
																				warehouseData[
																					sale
																						.details[0]
																						.warehouse
																				]
																			}
																		</div>
																		<div className="text-xs text-gray-500">
																			Основной
																		</div>
																	</div>
																</div>
															</td>
															<td className="px-6 py-4">
																<div className="flex items-center">
																	<div>
																		<div
																			className={`text-sm font-medium text-gray-900 ${
																				sale.client_name ===
																				"<не указан>"
																					? "text-slate-300"
																					: ""
																			}`}
																		>
																			{(() => {
																				const words =
																					sale.client_name.split(
																						" ",
																					);
																				return words.length >
																					5
																					? words
																							.slice(
																								0,
																								3,
																							)
																							.join(
																								" ",
																							) +
																							"..."
																					: sale.client_name;
																			})()}
																		</div>
																	</div>
																</div>
															</td>

															<td className="px-6 py-4">
																<div className="text-sm font-medium text-gray-900">
																	{parseFloat(
																		sale.total_price,
																	).toLocaleString(
																		"ru-RU",
																		{
																			minimumFractionDigits: 2,
																			maximumFractionDigits: 2,
																		},
																	)}{" "}
																</div>
																<div className="text-xs text-gray-500">
																	{
																		currencyData[
																			sale
																				.details[0]
																				.currency
																		]
																	}
																</div>
															</td>
															<td className="px-6 py-4">
																<div className="flex items-center">
																	<div className="">
																		<div className="text-sm font-medium text-gray-900">
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
																			  "problem" ? (
																				<p
																					className={`${
																						selectedRowId ===
																						sale.id
																							? "bg-red-600"
																							: "bg-red-500"
																					} px-3 py-1 w-[100px] rounded-full text-xs font-medium text-white text-center`}
																				>
																					Хатолик
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
																		</div>
																	</div>
																</div>
															</td>

															<td className="px-6 py-4">
																<div className="flex items-center">
																	<div className="">
																		<div className="text-sm font-medium text-gray-900">
																			{
																				sale.seller
																			}
																		</div>
																	</div>
																</div>
															</td>
															<td className="px-6 py-4">
																<div className="flex items-center justify-center space-x-1">
																	<button
																		className="p-1.5 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
																		onClick={(
																			e,
																		) => {
																			handleClick(
																				sale.id,
																			);
																		}}
																	>
																		<FaRegEdit />
																	</button>
																	<div>
																		<button
																			className="p-1.5 text-gray-500 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors"
																			onClick={() =>
																				setIsExitModalOpen(
																					true,
																				)
																			}
																		>
																			<MdDelete />
																		</button>
																	</div>
																	<div className="">
																		<button
																			className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
																			onClick={(
																				e,
																			) => {
																				setShowActionsMenu(
																					showActionsMenu ===
																						sale.id
																						? null
																						: sale.id,
																				);
																			}}
																		>
																			<BsThreeDots />
																		</button>
																		{showActionsMenu ===
																			sale.id && (
																			<div className="absolute right-10 mt-1 w-48 bg-white z-60 rounded-lg shadow-lg border border-gray-200 py-1">
																				<button className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2">
																					<FiEye className="text-gray-500" />
																					Просмотреть
																					детали
																				</button>
																				<button className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2">
																					<FiPrinter className="text-gray-500" />
																					Печать
																				</button>
																				<button className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2">
																					<FaRegEdit className="text-gray-500" />
																					Давом
																					эттириш
																				</button>
																				<button
																					onClick={(
																						e,
																					) => {
																						e.preventDefault(); // Prevent default behavior
																						e.stopPropagation(); // Stop event propagation
																						console.log(
																							"Delete button clicked",
																						);
																						setIsExitModalOpen(
																							true,
																						);
																					}}
																					className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
																				>
																					<MdDelete className="text-gray-500 text-lg" />
																					Ўчириш
																				</button>
																			</div>
																		)}
																	</div>
																</div>
															</td>
														</tr>
													))}
											</tbody>
										</table>
									</div>
								) : (
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
										{[...filteredData]
											.reverse()
											.map((sale) => (
												<div
													key={sale.id}
													className={`bg-white rounded-xl border ${
														selectedRowId ===
														sale.id
															? "border-indigo-300 ring-2 ring-indigo-100"
															: "border-gray-200 hover:border-indigo-200"
													} shadow-sm overflow-hidden transition-all cursor-pointer group`}
													onClick={() =>
														setSelectedRowId(
															sale.id,
														)
													}
													onDoubleClick={() =>
														openDetailModal &&
														openDetailModal(sale)
													}
												>
													<div className="p-4 flex justify-between border-b border-gray-100">
														<div className="flex items-center gap-2">
															<div className="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-600">
																<IoBasketOutline />
															</div>
															<div>
																<div className="font-medium text-gray-900">
																	{
																		warehouseData[
																			sale
																				.details[0]
																				.warehouse
																		]
																	}
																</div>
																<div className="text-xs text-gray-500">
																	Основной
																</div>
															</div>
														</div>
														<div className="flex items-center">
															{getStatusBadge(
																sale.status,
																sale.errorMessage,
															)}
														</div>
													</div>

													<div className="p-4">
														<div className="flex justify-between mb-3">
															<div className="text-xs text-gray-500">
																Дата:
															</div>
															<div className="text-sm">
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
															</div>
														</div>

														<div className="flex justify-between mb-3">
															<div className="text-xs text-gray-500">
																Клиент:
															</div>
															<div
																className={`text-sm font-medium ${
																	sale.client_name ===
																	"<не указан>"
																		? "text-slate-300"
																		: ""
																}`}
															>
																{sale.client_name.split(
																	" ",
																).length > 5
																	? sale.client_name
																			.split(
																				" ",
																			)
																			.slice(
																				0,
																				4,
																			)
																			.join(
																				" ",
																			) +
																	  " ..."
																	: sale.client_name}
															</div>
														</div>

														<div className="flex justify-between mb-3">
															<div className="text-xs text-gray-500">
																Сумма:
															</div>
															<div className="text-sm font-medium">
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
															</div>
														</div>
														<div className="flex justify-between mb-3">
															<div className="text-xs text-gray-500">
																Статус:
															</div>
															<div className="text-sm font-medium">
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
																  "problem" ? (
																	<p
																		className={`${
																			selectedRowId ===
																			sale.id
																				? "bg-red-600"
																				: "bg-red-500"
																		} px-3 py-1 w-[100px] rounded-full text-xs font-medium text-white text-center`}
																	>
																		Хатолик
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
															</div>
														</div>

														<div className="flex justify-between">
															<div className="text-xs text-gray-500">
																Автор:
															</div>
															<div className="text-sm">
																{sale.seller}
															</div>
														</div>
													</div>

													<div className="bg-gray-50 p-3 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity border-t border-gray-100">
														<button
															onClick={(e) => {
																handleClick(
																	sale.id,
																);
															}}
															className="p-1.5 bg-indigo-100 text-indigo-600 hover:bg-indigo-200 rounded-lg transition-colors"
														>
															<FaRegEdit />
														</button>
														<button
															onClick={() =>
																setIsExitModalOpen(
																	true,
																)
															}
															className="p-1.5 bg-rose-100 text-rose-600 hover:bg-rose-200 rounded-lg transition-colors"
														>
															<MdDelete />
														</button>
														<button className="p-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
															<BsThreeDots />
														</button>
													</div>
												</div>
											))}
									</div>
								)
							) : (
								<div className="flex flex-col items-center justify-center h-64 rounded-xl border border-gray-200 bg-white shadow-sm">
									<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
										<TbBasketExclamation className="text-3xl text-gray-400" />
									</div>
									<h3 className="text-lg font-medium text-gray-700 mb-1">
										Ҳозирча савдолар йўқ
									</h3>
								</div>
							)}
						</div>
					</div>
					{isExitModalOpen && (
						<div className="fixed inset-0 z-10 bg-opacity-90   flex items-center justify-center p-4">
							<div className="bg-white w-full max-w-md rounded-2xl border border-gray-200 p-6 space-y-6 transform transition-all duration-300 ease-in-out">
								<div className="text-center">
									<h2 className="text-2xl font-bold text-gray-800 mb-5 flex justify-center">
										<GoAlert className="text-red-600 text-6xl" />
									</h2>
									<p className="text-black text-lg mb-6">
										Танланган савдони ўчирмоқчимисиз?
									</p>
								</div>

								<div className="flex space-x-4">
									<button
										onClick={() => {
											deleteOneSales(selectedRowId);
											setIsExitModalOpen(false);
										}}
										className="flex-1 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-400"
									>
										Ҳа
									</button>
									<button
										onClick={() =>
											setIsExitModalOpen(false)
										}
										className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 flex items-center justify-center py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
									>
										Йўқ
									</button>
								</div>
							</div>
						</div>
					)}
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

