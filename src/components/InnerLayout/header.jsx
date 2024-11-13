import React, { useState, useEffect } from "react";

function HeaderInner() {
	const [date, setDate] = useState(new Date().toLocaleDateString());
	const [currencyRate, setCurrencyRate] = useState("1 USD = 12800 UZS");

	useEffect(() => {
		const interval = setInterval(() => {
			setDate(new Date().toLocaleDateString());
		}, 60000); // Update date every minute

		return () => clearInterval(interval);
	}, []);

	return (
		<header className="flex justify-between items-center px-6 py-3 bg-white shadow-md border-b overflow-hidden">
			<div className="flex items-center gap-6">
				<div className="">
					<select className="appearance-none bg-gray-100 border border-gray-300 text-gray-600 px-4 py-2 rounded-md cursor-pointer">
						<option>EN</option>
						<option>RU</option>
						<option>UZ</option>
					</select>
				</div>
				<div className="text-gray-700 font-medium">{date}</div>
			</div>
			<div className="text-lg font-semibold text-blue-600">
				{currencyRate}
			</div>
		</header>
	);
}

export default HeaderInner;
