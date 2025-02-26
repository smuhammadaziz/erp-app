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
import { TbBasketExclamation } from "react-icons/tb";

import { RiDiscountPercentLine } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DiscountModal from "./DiscountModal";

import { BsBasket3, BsCreditCard2Back, BsBarChart } from "react-icons/bs";
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

	const [currencyData, setCurrencyData] = useState({});

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
					console.error("Failed to fetch currency data", error);
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
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				warehouseData[sale.mainWarehouse]
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				sale.summa.toString().includes(searchTerm);

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
			// return dateMatch && statusMatch;
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
		<div>
			<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-40">
				<div className="bg-white rounded-lg w-full max-w-[70vw] h-[90vh] overflow-hidden">
					<div className="px-4 py-3 border-b border-gray-200 flex text-white justify-between items-center bg-blue-600">
						<h2 className="text-lg font-semibold flex items-center gap-2 text-white">
							<TbBasketExclamation className="text-xl" />
							{content[language].salesPage.sidebarProcess}
						</h2>
						<button
							onClick={() => setIsListModalOpen(false)}
							className="p-1.5 hover:bg-blue-500 rounded-lg transition-colors"
						>
							<MdClose className="text-xl" />
						</button>
					</div>

					<div className="p-3 border-b border-gray-200 bg-gray-50">
						<div className="flex justify-between flex-wrap gap-4 items-center">
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
										className="w-[300px] pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
									/>
								</div>
								<div className="relative text-black">
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
							</div>
							<div className="font-bold text-black mr-5">
								({filteredData ? filteredData.length : 0})
							</div>
						</div>
					</div>

					<div className="overflow-y-auto max-h-[calc(90vh-8rem)]">
						<table className="w-full border-collapse">
							<thead>
								<tr className="bg-gray-100 text-black">
									<th className="border w-[200px] border-gray-200 p-2 text-left font-medium text-sm align-top">
										Дата
									</th>
									<th className="border w-[300px] border-gray-200 p-2 text-left font-medium text-sm align-top">
										Склад
									</th>

									<th className="border w-[150px] border-gray-200 p-2 text-left font-medium text-sm align-top">
										Сумма
									</th>
									<th className="border w-[200px] border-gray-200 p-2 text-left font-medium text-sm align-top">
										Автор
									</th>
									<th className="border border-gray-200 p-2 text-left font-medium text-sm align-top">
										Amallar
									</th>
								</tr>
							</thead>
							<tbody>
								{filteredData.length > 0 ? (
									[...filteredData].reverse().map((sale) => (
										<tr
											key={sale.id}
											className={`cursor-pointer transition-colors ${
												selectedRowId === sale.id
													? "bg-blue-200 text-black hover:bg-blue-200"
													: "hover:bg-gray-50 text-black"
											}`}
											onClick={() =>
												setSelectedRowId(sale.id)
											}
											onDoubleClick={() =>
												openDetailModal(sale)
											}
										>
											<td className="border w-[200px] border-gray-200 p-2 text-sm">
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
												{moment(sale.date).isSame(
													moment(),
													"day",
												)
													? moment(sale.date).format(
															"HH:mm",
													  )
													: moment(sale.date).format(
															"DD.MM.YYYY HH:mm",
													  )}
											</td>
											<td className="border p-2 w-[300px] border-gray-200 text-sm">
												<span className="">
													Асосий склад
												</span>
											</td>

											<td className="border border-gray-200 w-[150px] font-medium p-2 text-sm">
												{/* {parseFloat(
													sale.total_price,
												).toLocaleString("ru-RU", {
													minimumFractionDigits: 2,
													maximumFractionDigits: 2,
												})}{" "}
												{
													currencyData[
														sale.mainCurrency
													]
												} */}
												100 000,00
											</td>
											<td className="border border-gray-200 w-[200px] p-2 text-sm">
												Menedger
											</td>
											<td className="border border-gray-200 p-2 text-sm">
												<button className="py-2 px-6 bg-green-600 text-white rounded-lg">
													<FaRegEdit className="text-lg" />
												</button>
												<button className="py-2 px-6 ml-5  bg-red-500 text-white rounded-lg">
													<MdDelete className="text-lg" />
												</button>
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
		</div>
	);
}

export default ProcessSalesComponent;

