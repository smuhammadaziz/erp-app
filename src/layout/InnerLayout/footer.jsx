import React, { useEffect, useState } from "react";

function InnerFooter() {
	const [timeLeft, setTimeLeft] = useState(null);

	useEffect(() => {
		const deadline = localStorage.getItem("its_deadline");

		if (deadline) {
			const deadlineDate = new Date(deadline);
			const currentDate = new Date();

			const differenceMs = deadlineDate - currentDate;

			const days = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(differenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
			);
			const minutes = Math.floor(
				(differenceMs % (1000 * 60 * 60)) / (1000 * 60),
			);

			if (days < 1) {
				setTimeLeft(`${hours} соат ${minutes} минут`);
			} else {
				setTimeLeft(`${days} кун`);
			}
		}
	}, []);

	if (timeLeft === null) {
		return null;
	}

	const isLessThanOneDay = timeLeft.includes("соат");

	return (
		<div className="fixed bottom-0 left-0 w-full bg-white text-black p-2 overflow-hidden border-t border-gray-200">
			<div
				className={`flex space-x-40 w-max animate-marquee ${
					isLessThanOneDay ? "bg-red-50" : "bg-white"
				}`}
			>
				{[...Array(40)].map((_, index) => (
					<p
						key={index}
						className={`whitespace-nowrap text-base ${
							isLessThanOneDay
								? "text-red-600 font-semibold animate-pulse"
								: "text-gray-900"
						}`}
					>
						Техник қўллаб қувватлаш (ITS) муддати тугашига{" "}
						<span className="font-bold">{timeLeft}</span> қолди.
						Қўшимча маълумот учун: +998 78 298 09 99
					</p>
				))}
			</div>
		</div>
	);
}

export default InnerFooter;

