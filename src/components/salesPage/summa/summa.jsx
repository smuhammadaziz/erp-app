import React, { useState, useEffect } from "react";
import { FaPercentage } from "react-icons/fa";
import { HiOutlineCash } from "react-icons/hi";
import { HiOutlineCreditCard } from "react-icons/hi";
import nodeUrl from "../../../links";

function SalespageSummaSection() {
	const [price, setPrice] = useState(0);
	const [discount, setDiscount] = useState(null);
	const [finalPrice, setFinalPrice] = useState(0);

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
				const data = await response.json();

				setPrice(parseFloat(data[sales_id].summa));
				setDiscount(parseFloat(data[sales_id].discount));

				setFinalPrice(data[sales_id].summa - data[sales_id].discount);
			} catch (err) {
				console.log(err);
			}
		};
		const intervalId = setInterval(fetchProducts, 400);
		return () => clearInterval(intervalId);
	}, [nodeUrl, sales_id]);

	return (
		<div className="items-center py-1">
			<p
				className={`flex items-center w-[200px] font-bold px-3 py-2 rounded-md border-2 border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition mb-4`}
			>
				<HiOutlineCash className="mr-2 text-2xl" />
				<span
					className={`${
						price.toString().length > 10
							? "text-xs"
							: price.toString().length > 7
							? "text-sm"
							: price.toString().length > 5
							? "text-md"
							: "text-lg"
					}`}
				>
					{price.toLocaleString("ru-RU", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</span>
			</p>

			<p className="flex items-center w-[200px] font-bold px-3 py-2 text-md rounded-md border-2 border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition mb-4">
				<FaPercentage className="mr-2 text-2xl" />{" "}
				{discount?.toLocaleString("ru-RU", {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				}) || "0,00"}
			</p>

			<p className="flex items-center font-bold w-[200px] px-3 py-2 text-md rounded-md border-2 border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition">
				<HiOutlineCreditCard className="mr-2 text-2xl" />{" "}
				{finalPrice?.toLocaleString("ru-RU", {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				}) || "0,00"}
			</p>
		</div>
	);
}

export default SalespageSummaSection;
