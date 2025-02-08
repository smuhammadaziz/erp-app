import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import nodeUrl from "../../links";
import { v4 as uuidv4 } from "uuid";

import content from "../../localization/content";
import useLang from "../../hooks/useLang";

const DiscountModal = ({ isOpen, onClose, totalAmount }) => {
	const [price, setPrice] = useState(0);
	const [data, setData] = useState({});
	const [discountAmount, setDiscountAmount] = useState("0,00");
	const [percentageValue, setPercentageValue] = useState("0");
	const [directDiscountValue, setDirectDiscountValue] = useState("0,00");

	const [language] = useLang("uz");

	const ksbIdNumber = localStorage.getItem("ksbIdNumber");
	const device_id = localStorage.getItem("device_id");
	const sales_id = localStorage.getItem("sales_id");

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

	const formatNumber = (value) => {
		let numbers = value.replace(/[^\d,]/g, "");
		numbers = numbers.replace(/,/g, "");
		const numericValue = parseFloat(numbers) / 100;

		if (isNaN(numericValue)) {
			return "0,00";
		}

		return numericValue.toLocaleString("ru-RU", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	};

	const handlePercentageChange = (e) => {
		let value = e.target.value.replace(/[^\d]/g, "");
		let numericValue = parseInt(value, 10);

		if (numericValue > 100) {
			numericValue = 100;
		}

		if (isNaN(numericValue)) {
			numericValue = 0;
		}

		setPercentageValue(numericValue.toString());

		updateTotalDiscount(
			numericValue,
			parseFloat(
				directDiscountValue.replace(/\s/g, "").replace(",", "."),
			),
		);
	};

	const handleDirectDiscountChange = (e) => {
		const value = e.target.value;
		const formattedValue = formatNumber(value);
		setDirectDiscountValue(formattedValue);

		updateTotalDiscount(
			parseInt(percentageValue) || 0,
			parseFloat(formattedValue.replace(/\s/g, "").replace(",", ".")),
		);
	};

	const updateTotalDiscount = (percentValue, directValue) => {
		const percentageDiscount = (price * percentValue) / 100;

		const totalDiscount = percentageDiscount + directValue;

		setDiscountAmount(
			totalDiscount.toLocaleString("ru-RU", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			}),
		);
	};

	const handleFocus = (e) => {
		const { name, value } = e.target;
		if (name === "percentage" && value === "0") {
			setPercentageValue("");
		} else if (name === "directAmount" && value === "0,00") {
			setDirectDiscountValue("");
		}
	};

	const handleBlur = (e) => {
		const { name, value } = e.target;
		if (!value) {
			if (name === "percentage") {
				setPercentageValue("0");
			} else if (name === "directAmount") {
				setDirectDiscountValue("0,00");
			}
		}
	};

	const handleSubmit = async () => {
		try {
			const numericDiscount = parseFloat(
				discountAmount.replace(/\s/g, "").replace(",", "."),
			);

			const response = await fetch(`${nodeUrl}/api/sales/discount`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					salesId: sales_id,
					newDiscount: numericDiscount.toString(),
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to update discount");
			}

			onClose();
		} catch (error) {
			console.error("Error updating discount:", error);
		}
	};

	const discount =
		parseFloat(discountAmount.replace(/\s/g, "").replace(",", ".")) || 0;
	const finalAmount = Math.max(0, price - discount);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black text-black bg-opacity-80 flex items-center justify-center p-6 z-[50]">
			<div className="bg-white rounded-lg w-full max-w-3xl shadow-lg px-6 py-2 transition-all duration-300 transform scale-95">
				<div className="flex justify-between items-center mb-4 border-b">
					<h2 className="text-xl font-semibold text-gray-800">
						{content[language].salesPage.headerDiscount}
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
								{
									content[language].salesPage
										.headerDiscountSumma
								}
							</label>
							<div className="bg-green-50 p-4 rounded-md flex items-center">
								<div className="font-bold text-left text-3xl text-gray-800">
									{Number(data.summa).toLocaleString(
										"ru-RU",
										{
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										},
									)}
								</div>
							</div>
						</div>
					</div>

					<div className="flex items-start justify-between bg-gray-50 rounded-md border border-gray-200">
						<div className="w-5/5 px-6 py-6">
							<input
								type="text"
								name="percentage"
								value={percentageValue}
								onChange={handlePercentageChange}
								onFocus={handleFocus}
								onBlur={handleBlur}
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
								name="directAmount"
								value={directDiscountValue}
								onChange={handleDirectDiscountChange}
								onFocus={handleFocus}
								onBlur={handleBlur}
								className="w-full px-4 py-3 text-right text-3xl font-bold border border-gray-300 rounded-md bg-white"
							/>
							<label className="text-lg font-medium text-gray-700">
								Сумма
							</label>
						</div>
					</div>

					<div className="space-y-4">
						<div className="py-4">
							<div className="flex items-center justify-between gap-4 mb-4">
								<label className="w-1/4 text-lg font-medium text-gray-700">
									{content[language].salesPage.headerDiscount}
								</label>
								<input
									type="text"
									value={discountAmount}
									readOnly
									className="w-3/4 px-4 py-1 text-right text-3xl font-bold border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 bg-gray-50"
								/>
							</div>

							<div className="flex items-center justify-between gap-4">
								<label className="w-1/4 text-lg font-medium text-gray-700">
									{
										content[language].salesPage
											.headerDiscountToPay
									}
								</label>
								<input
									type="text"
									value={finalAmount
										.toLocaleString("ru-RU", {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										})
										.replace(".", ",")}
									readOnly
									className="w-3/4 px-4 py-1 text-right text-3xl font-bold border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 bg-gray-50"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="flex gap-6 mt-4 justify-center items-center pb-2">
					<button
						onClick={handleSubmit}
						disabled={finalAmount === 0}
						className={`w-40 py-3 px-6 rounded-md text-xl transition duration-200 
							${
								finalAmount === 0
									? "bg-gray-400 cursor-not-allowed"
									: "bg-green-600 hover:bg-green-700 text-white"
							}`}
					>
						OK
					</button>
					<button
						onClick={onClose}
						className="w-50 bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition duration-200 text-xl"
					>
						{content[language].salesPage.headerDiscountCancel}
					</button>
				</div>
			</div>
		</div>
	);
};

export default DiscountModal;
