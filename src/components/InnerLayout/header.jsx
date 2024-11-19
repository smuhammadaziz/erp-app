import React, { useState, useEffect } from "react";
import { HiOutlineCurrencyDollar } from "react-icons/hi";

function HeaderInner() {
	const [date, setDate] = useState(new Date().toLocaleDateString());
	const [currencyRate, setCurrencyRate] = useState("1 USD = 12800 UZS");
	const [language, setLanguage] = useState("EN");

	useEffect(() => {
		const interval = setInterval(() => {
			setDate(new Date().toLocaleDateString());
		}, 60000);

		return () => clearInterval(interval);
	}, []);

	const handleLanguageChange = (e) => {
		setLanguage(e.target.value);
	};

	return (
		<header className="flex justify-end items-center px-8 py-2 bg-gray-900 shadow-lg border-b-2 border-gray-900">
			<div className="flex items-center gap-8">
				{/* Custom Language Switcher */}
				<div className="relative">
					<select
						value={language}
						onChange={handleLanguageChange}
						className="appearance-none bg-gray-600 text-white text-lg font-medium px-6 py-2 rounded-lg shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out w-32"
					>
						<option value="RU" className="py-2 text-lg">
							Russian
						</option>
						<option value="UZ" className="py-2 text-lg">
							Uzbek
						</option>
					</select>
					{/* Dropdown Arrow */}
					<span className="absolute top-1/2 transform -translate-y-1/2 right-4 text-white pointer-events-none">
						&#x25BC;
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
