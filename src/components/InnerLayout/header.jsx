import React from "react";
import { useState, useEffect } from "react";

function HeaderInner() {
	const [date, setDate] = useState(new Date().toLocaleDateString());
	const [currencyRate, setCurrencyRate] = useState("1 USD = 10800 UZS"); // example rate

	useEffect(() => {
		const interval = setInterval(() => {
			setDate(new Date().toLocaleDateString());
		}, 60000); // Update date every minute

		return () => clearInterval(interval);
	}, []);

	return (
		<header className="flex justify-between items-center px-4 py-2 bg-white shadow-md">
			<div className="flex items-center gap-4">
				<select className="border p-1 rounded-md">
					<option>EN</option>
					<option>RU</option>
					<option>UZ</option>
				</select>
				<div>{date}</div>
			</div>
			<div>{currencyRate}</div>
		</header>
	);
}

export default HeaderInner;
