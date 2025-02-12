import React, { useState, useEffect, useCallback } from "react";
import { FaBuilding, FaUserAlt } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { FaUsersLine } from "react-icons/fa6";
import { CiDiscount1 } from "react-icons/ci";
import { MdOutlineFormatListBulleted, MdCalendarToday } from "react-icons/md";

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
						onClick={() => handleOpenModal("klientlar")}
						className="flex items-center mr-2 justify-center bg-blue-500 hover:bg-blue-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600"
					>
						<FaUsersLine className="mr-3 text-xl" />
						<span className="font-semibold">
							{content[language].salesPage.headerClients}
						</span>
					</button>
				</div>
			</div>
			<div className="mr-2.5 flex items-center">
				<button
					// onClick={() => handleOpenModal("skidka")}
					onClick={() => setIsModalOpenDis(true)}
					className="flex items-center mr-2 cursor-pointer justify-center bg-red-500 hover:bg-red-600 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600"
				>
					<CiDiscount1 className="mr-3 text-xl" />
					<span className="font-semibold">
						{content[language].salesPage.headerDiscount}
					</span>
				</button>
				<button
					onClick={() => setIsListModalOpen(true)}
					className="flex items-center mr-6 justify-center bg-green-600 hover:bg-green-700 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600"
				>
					<MdOutlineFormatListBulleted className="mr-3 text-xl" />
					<span className="font-semibold">
						{content[language].salesPage.headerList}
					</span>
				</button>
				<button className="flex items-center justify-center bg-blue-900 hover:bg-blue-950 text-slate-100 px-7 py-2 text-md rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-950">
					<MdCalendarToday className="mr-3 text-xl" />
					<span className="font-semibold">{today}</span>
				</button>
			</div>
			{isListModalOpen && (
				<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-40">
					<div className="bg-white rounded-lg w-full max-w-[95vw] h-[90vh] overflow-hidden">
						<div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-white">
							<h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
								<BsBasket3 className="text-xl" />
								{content[language].salesPage.headerList}
							</h2>
							<button
								onClick={() => setIsListModalOpen(false)}
								className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
							>
								<MdClose className="text-xl" />
							</button>
						</div>

						<div className="p-3 border-b border-gray-200 bg-gray-50">
							<div className="relative max-w-md">
								<BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
								<input
									type="text"
									placeholder="Поиск..."
									className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
								/>
							</div>
						</div>

						<div className="overflow-y-auto max-h-[calc(90vh-8rem)]">
							<div className="min-w-full divide-y divide-gray-200">
								{/* Header */}
								<div className="bg-gray-50 border-y border-gray-200">
									<div className="grid grid-cols-12 gap-2 px-4 py-3 text-sm font-medium text-gray-500">
										<div className="col-span-5">Клиент</div>
										<div className="col-span-2">Сумма</div>
										<div className="col-span-3">Дата</div>
										<div className="col-span-1">Статус</div>
										<div className="col-span-1 text-right mr-6">
											Действия
										</div>
									</div>
								</div>

								{/* Table Body */}
								<div className="divide-y divide-gray-200 bg-white">
									{productData.length > 0 ? (
										productData
											.map((sale) => (
												<div
													key={sale.id}
													className="hover:bg-gray-50"
												>
													<div className="grid grid-cols-12 gap-2 px-4 py-3 text-sm">
														<div className="col-span-5 flex items-center gap-2">
															<MdPersonOutline className="text-gray-400 text-lg flex-shrink-0" />
															<span
																className="font-medium text-gray-900 truncate"
																title={
																	sale.client_name
																}
															>
																{
																	sale.client_name
																}
															</span>
														</div>
														<div className="col-span-2 flex items-center">
															<span className="text-gray-900">
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
															</span>
														</div>
														<div className="col-span-3 flex items-center">
															<span className="text-gray-900">
																{moment(
																	sale.date,
																).format("LLL")}
															</span>
														</div>
														<div className="col-span-1 flex items-center">
															<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
																{sale.status ===
																"process"
																	? "Юборилмади"
																	: sale.status ===
																	  "delivered"
																	? "Юборилди"
																	: sale.status}
															</span>
														</div>

														<div className="col-span-1 flex items-center justify-end">
															<button
																onClick={() =>
																	openDetailModal(
																		sale,
																	)
																}
																className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors"
															>
																<MdOutlineInfo className="text-lg" />
																{
																	content[
																		language
																	].product
																		.view
																}
															</button>
														</div>
													</div>
												</div>
											))
											.reverse()
									) : (
										<div className="flex items-center justify-center py-10 text-gray-500 text-sm">
											Ҳозирча савдолар йўқ
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Detail Modal */}
			{isDetailModalOpen && selectedSale && (
				<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg w-full max-w-[95vw] max-h-[90vh] overflow-hidden">
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
										<span className="font-medium text-gray-900">
											{selectedSale.client_name}
										</span>
									</div>
									<div>
										<span className="text-gray-500 block">
											Дата
										</span>
										<span className="font-medium text-gray-900">
											{moment(selectedSale.date).format(
												"LLL",
											)}
										</span>
									</div>
									<div>
										<span className="text-gray-500 block">
											Статус
										</span>
										<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
											Не доставлено
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
