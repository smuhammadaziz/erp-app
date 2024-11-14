import React, { useState, useEffect } from "react";
import { AiOutlineGlobal, AiOutlineSearch } from "react-icons/ai";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { FaPlus } from "react-icons/fa";

function SalesMainPageHeader() {
	const [date, setDate] = useState(new Date().toLocaleDateString());
	const [currencyRate, setCurrencyRate] = useState("1 USD = 12800 UZS");

	useEffect(() => {
		const interval = setInterval(() => {
			setDate(new Date().toLocaleDateString());
		}, 60000);

		return () => clearInterval(interval);
	}, []);

	return (
		<header className="flex items-center px-6 py-2 bg-gradient-to-r from-blue-100 to-blue-200 shadow-md border-b border-blue-100">
			{/* Search Bar - fills remaining space */}
			<div className="flex-grow flex items-center bg-white text-gray-700 px-4 py-2 rounded-lg shadow-md focus-within:ring-2 focus-within:ring-blue-300 mr-4">
				<AiOutlineSearch className="text-xl mr-3 text-gray-500" />
				<input
					type="text"
					placeholder="Search..."
					className="bg-white outline-none text-gray-700 w-full text-lg"
				/>
			</div>

			{/* New Sales Button */}
			<button className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 mr-4">
				<FaPlus className="mr-2" />
				New Sales
			</button>

			{/* Language Selector */}
			<div className="inline-block mr-4">
				<select className="appearance-none bg-white text-gray-700 px-10 py-2 rounded-lg shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out">
					<option>RU</option>
					<option>UZ</option>
				</select>
				{/* <span className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500 text-lg">
					<AiOutlineGlobal />
				</span> */}
			</div>

			{/* Date */}
			<div className="text-gray-700 text-lg font-semibold mr-4">
				{date}
			</div>

			{/* Currency Rate */}
			<div className="text-gray-700 text-lg font-semibold flex items-center gap-2">
				<HiOutlineCurrencyDollar className="text-2xl text-gray-500" />
				{currencyRate}
			</div>
		</header>
	);
}

export default SalesMainPageHeader;
