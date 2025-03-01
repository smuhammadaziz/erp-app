import React, { useState, useEffect, useCallback } from "react";
import { FaBuilding, FaUserAlt, FaRegEdit } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { FaUsersLine } from "react-icons/fa6";
import { CiDiscount1 } from "react-icons/ci";
import {
	MdOutlineFormatListBulleted,
	MdCalendarToday,
	MdDelete,
	MdClose,
	MdFilterList,
	MdOutlineMoreVert,
} from "react-icons/md";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { MdPendingActions } from "react-icons/md";
import { MdOutlineDoneAll } from "react-icons/md";
import {
	HiOutlineClipboardDocumentCheck,
	HiOutlineDocumentMinus,
	HiOutlineDocumentCheck,
	HiOutlineDocument,
} from "react-icons/hi2";
import { LuClock4, LuClockAlert } from "react-icons/lu";
import { IoInformation } from "react-icons/io5";
import { FiPrinter, FiChevronDown, FiEye } from "react-icons/fi";
import { TbBasketExclamation } from "react-icons/tb";
import { RiDiscountPercentLine } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import {
	BsBasket3,
	BsCreditCard2Back,
	BsBarChart,
	BsThreeDots,
} from "react-icons/bs";

import nodeUrl from "../../links";
import {
	MdOutlineShoppingCart,
	MdAccessTime,
	MdPriceCheck,
	MdPersonOutline,
	MdOutlineInfo,
	MdPayment,
	MdInventory,
	MdWarehouse,
	MdSearch,
} from "react-icons/md";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import content from "../../localization/content";
import useLang from "../../hooks/useLang";

import moment from "moment";
import "moment/locale/ru";
import { ImInfo } from "react-icons/im";

moment.locale("ru");

function ProcessSalesComponent({ productData, setIsListModalOpen }) {
	const [language] = useLang("uz");

	const [selectedRowId, setSelectedRowId] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [showCalendar, setShowCalendar] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	const [statusFilters, setStatusFilters] = useState({
		process: false,
		delivered: false,
		falseDelivered: false,
	});
	const [showFilters, setShowFilters] = useState(false);
	const [viewMode, setViewMode] = useState("table"); // "table" or "card"
	const [showActionsMenu, setShowActionsMenu] = useState(null);

	const [currencyData, setCurrencyData] = useState({});

	const device_id = localStorage.getItem("device_id");
	const ksbIdNumber = localStorage.getItem("ksbIdNumber");

	const fetchCurrencyData = useCallback(async () => {
		for (const product of productData) {
			if (product.mainCurrency && !currencyData[product.mainCurrency]) {
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

	const [warehouseData, setWarehouseData] = useState({});

	const fetchWarehouseData = useCallback(async () => {
		for (const product of productData) {
			if (product.mainWarehouse && !currencyData[product.mainWarehouse]) {
				try {
					const response = await fetch(
						`${nodeUrl}/api/get/warehouse/data/${device_id}/${ksbIdNumber}/${product.mainWarehouse}`,
					);
					const data = await response.json();

					setWarehouseData((prev) => ({
						...prev,
						[product.mainWarehouse]: data[0]?.name || "-",
					}));
				} catch (error) {
					console.error("Failed to fetch warehouse data", error);
					setWarehouseData((prev) => ({
						...prev,
						[product.mainWarehouse]: "-",
					}));
				}
			}
		}
	}, [productData]);

	useEffect(() => {
		fetchWarehouseData();
	}, [fetchWarehouseData]);

	// Filter function that combines all filters
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

	const getStatusBadge = (status) => {
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

	// Close action menu when clicking outside
	useEffect(() => {
		const handleClickOutside = () => {
			setShowActionsMenu(null);
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	console.log(filteredData);

	return (
		<div className="fixed inset-0 bg-black/70 flex items-center text-black justify-center z-40 backdrop-blur-sm">
			<div className="bg-white rounded-xl w-full max-w-[75vw] h-[90vh] overflow-hidden flex flex-col shadow-2xl">
				{/* Header */}
				<div className="px-6 py-4 border-b flex justify-between items-center bg-white">
					<div className="flex items-center gap-3">
						<div className="bg-indigo-50 p-2 rounded-lg">
							<TbBasketExclamation className="text-2xl text-indigo-600" />
						</div>
						<div>
							<h2 className="text-xl font-semibold text-gray-800">
								{content[language].salesPage.sidebarProcess}
							</h2>
							<p className="text-sm text-gray-500">
								Управление заказами и отслеживание доставки
							</p>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<button
							className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
							onClick={() =>
								setViewMode(
									viewMode === "table" ? "card" : "table",
								)
							}
						>
							{viewMode === "table" ? (
								<MdOutlineFormatListBulleted className="text-xl" />
							) : (
								<MdOutlineFormatListBulleted className="text-xl" />
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

				{/* Search and filters */}
				<div className="p-5 bg-white border-b">
					<div className="flex flex-wrap items-center gap-3">
						<div className="relative flex-grow max-w-md">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<BiSearch className="text-gray-400" />
							</div>
							<input
								type="text"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
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
								Object.values(statusFilters).some(Boolean)
									? "bg-indigo-50 text-indigo-700 border border-indigo-200"
									: "bg-gray-50 border border-gray-300 text-gray-700 hover:bg-gray-100"
							}`}
						>
							<MdFilterList />
							Фильтры
							{Object.values(statusFilters).some(Boolean) && (
								<span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs text-white">
									{
										Object.values(statusFilters).filter(
											Boolean,
										).length
									}
								</span>
							)}
						</button>

						{(searchTerm ||
							selectedDate ||
							Object.values(statusFilters).some(Boolean)) && (
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

					{/* Status filters */}
					{showFilters && (
						<div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
							<h4 className="text-sm font-medium text-gray-700 mb-3">
								Фильтр по статусу:
							</h4>
							<div className="flex flex-wrap gap-3">
								<button
									onClick={() =>
										handleStatusFilterChange("process")
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
										handleStatusFilterChange("delivered")
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

				{/* Data display */}
				<div className="overflow-y-auto flex-grow p-5 bg-gray-50">
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
												Сумма
											</th>
											{/* <th
												scope="col"
												className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[200px]"
											>
												Автор
											</th> */}
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
														openDetailModal(sale)
													}
												>
													<td className="px-6 py-4">
														<div className="flex items-center">
															{getStatusBadge(
																sale.status,
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
																				.mainWarehouse
																		]
																	}
																</div>
																{/* <div className="text-xs text-gray-500">
																	Основной
																</div> */}
															</div>
														</div>
													</td>
													<td className="px-6 py-4">
														<div className="text-sm font-medium text-gray-900">
															{new Intl.NumberFormat(
																"ru-RU",
																{
																	style: "decimal",
																	minimumFractionDigits: 2,
																	maximumFractionDigits: 2,
																},
															).format(
																sale.summa,
															)}
														</div>
														<div className="text-xs text-gray-500">
															{
																currencyData[
																	sale
																		.mainCurrency
																]
															}
														</div>
													</td>
													{/* <td className="px-6 py-4">
														<div className="flex items-center">
															<div className="">
																<div className="text-sm font-medium text-gray-900">
																	Menedger
																</div>
															</div>
														</div>
													</td> */}
													<td className="px-6 py-4">
														<div className="flex items-center justify-center space-x-1">
															<button
																className="p-1.5 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
																onClick={(
																	e,
																) => {
																	e.stopPropagation();
																	// Edit action
																}}
															>
																<FaRegEdit />
															</button>
															<button
																className="p-1.5 text-gray-500 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors"
																onClick={(
																	e,
																) => {
																	e.stopPropagation();
																	// Delete action
																}}
															>
																<MdDelete />
															</button>
															<div className="relative">
																<button
																	className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
																	onClick={(
																		e,
																	) => {
																		e.stopPropagation();
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
																	<div
																		className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 py-1"
																		onClick={(
																			e,
																		) =>
																			e.stopPropagation()
																		}
																	>
																		<button className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2">
																			<FiEye className="text-gray-500" />
																			Просмотреть
																			детали
																		</button>
																		<button className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2">
																			<FiPrinter className="text-gray-500" />
																			Печать
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
								{[...filteredData].reverse().map((sale) => (
									<div
										key={sale.id}
										className={`bg-white rounded-xl border ${
											selectedRowId === sale.id
												? "border-indigo-300 ring-2 ring-indigo-100"
												: "border-gray-200 hover:border-indigo-200"
										} shadow-sm overflow-hidden transition-all cursor-pointer group`}
										onClick={() =>
											setSelectedRowId(sale.id)
										}
										onDoubleClick={() =>
											openDetailModal &&
											openDetailModal(sale)
										}
									>
										<div className="p-4 flex justify-between border-b border-gray-100">
											<div className="flex items-center gap-2">
												<div className="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-600">
													<MdWarehouse />
												</div>
												<div>
													<div className="font-medium text-gray-900">
														{
															warehouseData[
																sale
																	.mainWarehouse
															]
														}
													</div>
													<div className="text-xs text-gray-500">
														Основной
													</div>
												</div>
											</div>
											<div className="flex items-center">
												{getStatusBadge(sale.status)}
											</div>
										</div>

										<div className="p-4">
											<div className="flex justify-between mb-3">
												<div className="text-xs text-gray-500">
													Дата:
												</div>
												<div className="text-sm">
													{moment(sale.date).isSame(
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
												</div>
											</div>

											<div className="flex justify-between mb-3">
												<div className="text-xs text-gray-500">
													Сумма:
												</div>
												<div className="text-sm font-medium">
													{new Intl.NumberFormat(
														"ru-RU",
														{
															style: "decimal",
															minimumFractionDigits: 2,
															maximumFractionDigits: 2,
														},
													).format(sale.summa)}{" "}
													{
														currencyData[
															sale.mainCurrency
														]
													}
												</div>
											</div>

											{/* <div className="flex justify-between">
												<div className="text-xs text-gray-500">
													Автор:
												</div>
												<div className="text-sm">
													Menedger
												</div>
											</div> */}
										</div>

										<div className="bg-gray-50 p-3 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity border-t border-gray-100">
											<button className="p-1.5 bg-indigo-100 text-indigo-600 hover:bg-indigo-200 rounded-lg transition-colors">
												<FaRegEdit />
											</button>
											<button className="p-1.5 bg-rose-100 text-rose-600 hover:bg-rose-200 rounded-lg transition-colors">
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
		</div>
	);
}

export default ProcessSalesComponent;

