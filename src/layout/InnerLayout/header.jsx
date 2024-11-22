import React, { useState, useEffect } from "react";
import { HiOutlineCurrencyDollar, HiOutlineCalendar } from "react-icons/hi"; // Added calendar icon for date
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
		<header className="flex justify-end items-center px-8 py-2 bg-gray-900 shadow-lg border-b-2 border-gray-900">
			<div className="flex items-center gap-8">
				<div className="relative">
					<select
						value={language}
						onChange={handleLanguageChange}
						className="appearance-none bg-gray-600 text-white text-lg font-medium px-6 py-2 rounded-lg shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out w-32"
					>
						<option value="ru" className="py-2 text-lg">
							{content[language].innerLayout.rus}
						</option>
						<option value="uz" className="py-2 text-lg">
							{content[language].innerLayout.uz}
						</option>
					</select>
					<span className="absolute top-1/2 transform -translate-y-1/2 right-4 text-white pointer-events-none">
						&#x25BC;
					</span>
				</div>

				<h2 className="text-white">{content[language].header}</h2>

				<div className="text-gray-400 text-md font-light flex items-center gap-2">
					<HiOutlineCalendar className="text-xl" />
					{date}
				</div>

				<div className="text-white text-lg font-medium flex items-center gap-2">
					<HiOutlineCurrencyDollar className="text-2xl mt-1" />
					{currencyRate}
				</div>
			</div>
		</header>
	);
}

export default HeaderInner;
