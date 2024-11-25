import React, { useState, useEffect } from "react";
import { FaPercentage } from "react-icons/fa";
import { HiOutlineCash } from "react-icons/hi";
import { HiOutlineCreditCard } from "react-icons/hi";

function SalespageSummaSection() {
	const [price, setPrice] = useState(0); // Initial price fetched from API
	const [discount, setDiscount] = useState(10); // Default discount percentage
	const [finalPrice, setFinalPrice] = useState(0); // Final price after discount

	useEffect(() => {
		// Function to fetch the overall sum
		const fetchOverallSum = async () => {
			try {
				const response = await fetch(
					"http://localhost:5000/api/products/selling",
				);
				if (!response.ok) {
					throw new Error("Failed to fetch price data.");
				}
				const data = await response.json();
				setPrice(data.overall_summa);
				setFinalPrice(
					data.overall_summa - (data.overall_summa * discount) / 100,
				);
			} catch (error) {
				console.error("Error fetching price:", error);
			}
		};

		// Fetch every 0.5 seconds
		const intervalId = setInterval(fetchOverallSum, 500);

		// Cleanup interval on component unmount
		return () => clearInterval(intervalId);
	}, [discount]); // Re-run if discount changes

	const handleDiscountChange = (e) => {
		const value = parseFloat(e.target.value) || 0;
		setDiscount(value);
		setFinalPrice(price - (price * value) / 100);
	};

	return (
		<div className="items-center py-3">
			{/* Price Section */}
			<button
				onClick={() => alert("Enter total price")}
				className="flex items-center w-[200px] px-3 py-2 text-md rounded-md border-2 border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition mb-4"
			>
				<HiOutlineCash className="mr-2 text-xl" />${price.toFixed(2)}
			</button>

			{/* Discount Section */}
			<div className="flex items-center w-[200px] mb-4">
				<FaPercentage className="mr-2 text-xl" />
				<input
					type="number"
					value={discount}
					onChange={handleDiscountChange}
					className="px-2 py-1 border rounded-md w-full"
					placeholder="Discount %"
				/>
			</div>

			{/* Final Price Section */}
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
