import React, { useState, useEffect } from "react";
import { FaPercentage } from "react-icons/fa";
import { HiOutlineCash } from "react-icons/hi";
import { HiOutlineCreditCard } from "react-icons/hi";
import { BiBasket } from "react-icons/bi";
import { RiDiscountPercentLine } from "react-icons/ri";
import { CiMoneyCheck1 } from "react-icons/ci";
import nodeUrl from "../../../links";

function SalespageSummaSection({ socket }) {
	const [price, setPrice] = useState(0);
	const [discount, setDiscount] = useState(null);
	const [finalPrice, setFinalPrice] = useState(0);

	const sales_id = localStorage.getItem("sales_id");

	useEffect(() => {
		fetchSoldProducts();

		const updateHandler = () => fetchSoldProducts();
		socket.on("gettingSoldProducts", updateHandler);

		return () => {
			socket.off("gettingSoldProducts", updateHandler);
		};
	}, [nodeUrl, sales_id]);

	const fetchSoldProducts = async () => {
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

	return (
		<div className="items-center py-1">
			<p
				className={`flex items-center w-[200px] bg-gray-100 font-bold px-3 py-2 rounded-md border-0 border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-300 transition mb-4`}
			>
				<BiBasket className="mr-2 text-2xl" />
				<span
					className={`${
						price.toString().length > 10
							? "text-xs"
							: price.toString().length > 7
							? "text-xs"
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

			<p className="flex items-center w-[200px] bg-gray-100 font-bold px-3 py-2 text-lg rounded-md border-0 border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-300 transition mb-4">
				<RiDiscountPercentLine className="mr-2 text-2xl" />{" "}
				{discount?.toLocaleString("ru-RU", {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				}) || "0,00"}
			</p>

			<p className="flex items-center font-bold bg-gray-100 w-[200px] px-3 py-2 text-lg rounded-md border-0 border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-300 transition">
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

