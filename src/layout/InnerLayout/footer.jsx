import React, { useEffect, useState } from "react";

import content from "../../localization/content";
import useLang from "../../hooks/useLang";

function InnerFooter() {
	const [timeLeft, setTimeLeft] = useState(null);
	const [daysRemaining, setDaysRemaining] = useState(null);
	const [language] = useLang("uz");

	const timeUnits = {
		uz: {
			days: "кун",
			hours: "соат",
			minutes: "минут",
		},
		ru: {
			days: "дней",
			hours: "часов",
			minutes: "минут",
		},
	};

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

			setDaysRemaining(days);

			if (days < 3) {
				setTimeLeft(
					`${hours} ${timeUnits[language].hours} ${minutes} ${timeUnits[language].minutes}`,
				);
			} else {
				setTimeLeft(`${days} ${timeUnits[language].days}`);
			}
		}
	}, [language]);

	if (timeLeft === null) {
		return null;
	}

	const showAlert = daysRemaining < 3;

	return (
		<div className="fixed bottom-0 left-0 w-full bg-white text-black p-2 overflow-hidden border-t border-gray-200">
			<div
				className={`flex space-x-40 w-max animate-marquee ${
					showAlert ? "bg-red-50" : "bg-white"
				}`}
			>
				{[...Array(40)].map((_, index) => (
					<p
						key={index}
						className={`whitespace-nowrap text-base ${
							showAlert
								? "text-red-600 font-semibold animate-pulse"
								: "text-gray-900"
						}`}
					>
						{content[language].innerFooter.its.replace(
							"${timeLeft}",
							timeLeft,
						)}
					</p>
				))}
			</div>
		</div>
	);
}

export default InnerFooter;

