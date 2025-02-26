import React, { useState, useEffect, useCallback } from "react";
import { HiOutlineCreditCard, HiOutlineCash } from "react-icons/hi";
import { CiClock1 } from "react-icons/ci";
import PaymentModal from "./PaymentModal";
import PrintingModal from "./PrintModal";

import nodeUrl from "../../links";

import { FaBuilding, FaUserAlt } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { FaMoneyBill } from "react-icons/fa";
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
import ProcessSalesComponent from "./processSales";

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
					onClick={() => {
						setIsModalOpen(true);
						// setPrintModal(false);
					}}
					className="flex items-center justify-center w-full max-w-xs bg-emerald-700 hover:bg-emerald-600 text-slate-100 px-5 py-2 text-lg rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-400"
				>
					<span className="font-500 flex items-center">
						{/* <FaMoneyBill className="mr-3 text-xl" /> */}
						{content[language].salesPage.sidebarCash}
					</span>
				</button>
				<button
					onClick={() => setIsCardModalOpen(true)}
					className="flex items-center justify-center spacing-2 w-full max-w-xs bg-blue-700 hover:bg-blue-600 text-slate-100 px-5 py-2 text-lg rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
				>
					<span className="font-500 flex items-center">
						{/* <HiOutlineCreditCard className="mr-3 text-xl" /> */}
						{content[language].salesPage.sidebarCard}
					</span>
				</button>
			</div>

			<div className="relative mt-auto mb-10">
				<button
					onClick={() => setIsListModalOpen(true)}
					className="flex items-center justify-center w-full max-w-xs bg-green-600 hover:bg-green-500 text-slate-100 px-5 py-2 text-base rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-400"
				>
					<span className="font-500">
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
				setPrintModal={setPrintModal}
			/>

			<CardPaymentModal
				isOpen={isCardModalOpen}
				onClose={() => setIsCardModalOpen(false)}
				totalAmount={50000}
				socket={socket}
				setPrintModal={setPrintModal}
			/>

			{printModal && (
				<PrintingModal
					setPrintModal={setPrintModal}
					setSuccessModal={setSuccessModal}
				/>
			)}

			{successModal && <SuccessModal />}

			{isListModalOpen && (
				<ProcessSalesComponent
					productData={productData}
					setIsListModalOpen={setIsListModalOpen}
				/>
			)}
		</div>
	);
}

export default SalesPageLayoutSidebar;

