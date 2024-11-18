import React, { useState } from "react";
import { FaPercentage } from "react-icons/fa";
import { HiOutlineCash } from "react-icons/hi";
import { HiOutlineCreditCard } from "react-icons/hi";
import { MdDiscount } from "react-icons/md";

function SalespageSummaSection() {
	const [price, setPrice] = useState(125000);
	const [discount, setDiscount] = useState(10);
	const [finalPrice, setFinalPrice] = useState(100000);

	const handlePriceChange = (e) => {
		const value = parseFloat(e.target.value) || 0;
		setPrice(value);
		setFinalPrice(value - (value * discount) / 100);
	};

	const handleDiscountChange = (e) => {
		const value = parseFloat(e.target.value) || 0;
		setDiscount(value);
		setFinalPrice(price - (price * value) / 100);
	};

	return (
		<div className="items-center py-3">
			<button
				onClick={() => alert("Enter total price")}
				className="flex items-center w-[200px] px-3 py-2 text-md rounded-md border-2 border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition mb-4"
			>
				<HiOutlineCash className="mr-2 text-xl" />${price.toFixed(2)}
			</button>

			<button
				onClick={() => alert("Enter discount")}
				className="flex items-center w-[200px] px-3 py-2 text-md rounded-md border-2 border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition mb-4"
			>
				<FaPercentage className="mr-2 text-xl" />
				{discount}% ($12500.00)
			</button>

			<button
				onClick={() => alert("Final amount")}
				className="flex items-center w-[200px] px-3 py-2 text-md rounded-md border-2 border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
			>
				<HiOutlineCreditCard className="mr-2 text-xl" />$
				{finalPrice.toFixed(2)}
			</button>
		</div>
	);
}

export default SalespageSummaSection;
