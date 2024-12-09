import React, { useState, useEffect } from "react";
import { HiOutlineCurrencyDollar, HiOutlineCalendar } from "react-icons/hi";
import content from "../../localization/content";
import useLang from "../../hooks/useLang";

function HeaderInner() {
	const [date, setDate] = useState(new Date().toLocaleDateString());
	const [currencyRate, setCurrencyRate] = useState("1 USD = 12800 UZS");
	const [language, setLanguage] = useLang("uz");

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
		<header className="flex justify-end items-center px-8 py-3 bg-gray-900 shadow-xl border-b border-gray-800 transition-all duration-500">
			<div className="flex items-center gap-x-6">
				<h2 className="text-white text-xl font-semibold tracking-wide">
					{content[language].header}
				</h2>

				<div className="relative group ">
					<select
						value={language}
						onChange={handleLanguageChange}
						className="appearance-none z-[50] bg-gray-700/50 text-white text-lg font-medium px-6 py-2.5 rounded-xl shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-600/50 transition-all duration-300 ease-in-out w-36 backdrop-blur-sm"
					>
						<option value="ru" className="py-2 text-lg bg-gray-800">
							{content[language].innerLayout.rus}
						</option>
						<option value="uz" className="py-2 text-lg bg-gray-800">
							{content[language].innerLayout.uz}
						</option>
					</select>
					<span className="absolute top-1/2 transform -translate-y-1/2 right-4 text-white pointer-events-none transition-transform duration-300 group-hover:translate-y-[-45%]">
						&#x25BC;
					</span>
				</div>

				<div className="text-gray-300 text-md font-medium flex items-center gap-2 bg-gray-800/40 px-4 py-2 rounded-lg hover:bg-gray-700/40 transition-colors duration-300">
					<HiOutlineCalendar className="text-xl text-blue-400" />
					{date}
				</div>

				<div className="text-white text-lg font-medium flex items-center gap-2 bg-gray-800/40 px-4 py-2 rounded-lg hover:bg-gray-700/40 transition-colors duration-300">
					<HiOutlineCurrencyDollar className="text-2xl text-green-400" />
					{currencyRate}
				</div>
			</div>
		</header>
	);
}

export default HeaderInner;

