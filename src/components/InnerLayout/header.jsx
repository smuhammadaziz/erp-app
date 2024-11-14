import React, { useState, useEffect } from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import { HiOutlineCurrencyDollar } from "react-icons/hi";

function HeaderInner() {
	const [date, setDate] = useState(new Date().toLocaleDateString());
	const [currencyRate, setCurrencyRate] = useState("1 USD = 12800 UZS");

	useEffect(() => {
		const interval = setInterval(() => {
			setDate(new Date().toLocaleDateString());
		}, 60000);

		return () => clearInterval(interval);
	}, []);

	return (
		<header className="flex justify-end items-center px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg border-b-2 border-blue-700 overflow-hidden">
			<div className="flex items-center gap-8">
				<div className="relative inline-block">
					<select className="appearance-none bg-gray-800 text-white px-11 py-3 rounded-lg shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out">
						<option>RU</option>
						<option>UZ</option>
					</select>
					<span className="absolute top-1/2 transform -translate-y-1/2 left-4 text-white text-xl">
						<AiOutlineGlobal />
					</span>
				</div>

				{/* Date */}
				<div className="text-white text-xl font-semibold">{date}</div>

				{/* Currency Rate */}
				<div className="text-white text-xl font-semibold flex items-center gap-2">
					<HiOutlineCurrencyDollar className="text-2xl mt-1" />
					{currencyRate}
				</div>
			</div>
		</header>
	);
}

export default HeaderInner;
