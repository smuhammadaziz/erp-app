import React, { useState, useEffect } from "react";
import { FaPercentage } from "react-icons/fa";
import { HiOutlineCash } from "react-icons/hi";
import { HiOutlineCreditCard } from "react-icons/hi";

function SalespageSummaSection() {
	const [price, setPrice] = useState(0);
	const [discount, setDiscount] = useState(null);
	const [finalPrice, setFinalPrice] = useState(0);

	const formatNumber = (value) =>
		new Intl.NumberFormat("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		})
			.format(value)
			.replace(/,/g, " ");

	useEffect(() => {
		// const fetchOverallSum = async () => {
		// 	try {
		// 		const response = await fetch(
		// 			"http://localhost:5000/api/products/selling",
		// 		);
		// 		if (!response.ok) {
		// 			throw new Error("Failed to fetch price data.");
		// 		}
		// 		const data = await response.json();
		// 		setPrice(data.overall_summa);
		// 		setFinalPrice(
		// 			data.overall_summa - (data.overall_summa * discount) / 100,
		// 		);
		// 	} catch (error) {
		// 		console.error("Error fetching price:", error);
		// 	}
		// };

		const intervalId = setInterval([], 500);

		return () => clearInterval(intervalId);
	}, [discount]);

	const handleDiscountChange = (e) => {
		const value = parseFloat(e.target.value) || "";
		setDiscount(value);
		setFinalPrice(price - (price * value) / 100);
	};

	return (
		<div className="items-center py-1">
			<p className="flex items-center w-[200px] px-3 py-2 text-md rounded-md border-2 border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition mb-4">
				<HiOutlineCash className="mr-2 text-xl" />
				{formatNumber(price)} so'm
			</p>
			<p className="flex items-center w-[200px] px-3 py-2 text-md rounded-md border-2 border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition mb-4">
				<HiOutlineCash className="mr-2 text-xl" />
				{formatNumber(price)} so'm
			</p>

			<p className="flex items-center w-[200px] px-3 py-2 text-md rounded-md border-2 border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition">
				<HiOutlineCreditCard className="mr-2 text-xl" />
				{formatNumber(finalPrice)} so'm
			</p>
		</div>
	);
}

export default SalespageSummaSection;
